/*
 * Copyright 2018-2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

// sets up dependencies
const Alexa = require('ask-sdk-core');
const i18next = require('i18next');
const languageStrings = require('./languageStrings');

// Safe localization getter — returns a `t` function. Falls back to `languageStrings` if interceptor hasn't set `requestAttributes.t`.
function getT(handlerInput) {
  try {
    const reqAttr = handlerInput.attributesManager.getRequestAttributes();
    if (reqAttr && typeof reqAttr.t === 'function') return reqAttr.t;
  } catch (e) {
    // ignore
  }
  // Fallback t implementation using languageStrings
  const locale = (handlerInput.requestEnvelope && handlerInput.requestEnvelope.request && handlerInput.requestEnvelope.request.locale) || 'en';
  const lang = locale.split('-')[0];
  const resources = languageStrings[lang] || languageStrings.en;
  const map = (resources && resources.translation) || {};
  return function fallbackT(key) {
    const value = map[key];
    if (Array.isArray(value)) return value[Math.floor(Math.random() * value.length)];
    return value || '';
  };
}

// core functionality for fact skill
const GetNewFactHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    // checks request type
    return request.type === 'LaunchRequest'
      || (request.type === 'IntentRequest'
        && request.intent.name === 'GetNewFactIntent');
  },
  handle(handlerInput) {
    const t = getT(handlerInput);
    // gets a random fact by assigning an array to the variable
    // the random item from the array will be selected by the i18next library
    // the i18next library is set up in the Request Interceptor
    const randomFact = t('FACTS');
    // concatenates a standard message with the random fact
    const speakOutput = t('GET_FACT_MESSAGE') + randomFact;

    return handlerInput.responseBuilder
      .speak(speakOutput)
      // Uncomment the next line if you want to keep the session open so you can
      // ask for another fact without first re-opening the skill
      // .reprompt(t('HELP_REPROMPT'))
      .withSimpleCard(t('SKILL_NAME'), randomFact)
      .getResponse();
  },
};

const HelpHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const t = getT(handlerInput);
    return handlerInput.responseBuilder
      .speak(t('HELP_MESSAGE'))
      .reprompt(t('HELP_REPROMPT'))
      .getResponse();
  },
};

const FallbackHandler = {
  // The FallbackIntent can only be sent in those locales which support it,
  // so this handler will always be skipped in locales where it is not supported.
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.FallbackIntent';
  },
  handle(handlerInput) {
    const t = getT(handlerInput);
    return handlerInput.responseBuilder
      .speak(t('FALLBACK_MESSAGE'))
      .reprompt(t('FALLBACK_REPROMPT'))
      .getResponse();
  },
};

const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent'
        || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    const t = getT(handlerInput);
    return handlerInput.responseBuilder
      .speak(t('STOP_MESSAGE'))
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);
    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);
    console.log(`Error stack: ${error.stack}`);
    const t = getT(handlerInput);
    return handlerInput.responseBuilder
      .speak(t('ERROR_MESSAGE'))
      .reprompt(t('ERROR_MESSAGE'))
      .getResponse();
  },
};

const LocalizationInterceptor = {
  async process(handlerInput) {
    // Create an isolated i18next instance to avoid global state and async race conditions
    const localizationClient = i18next.createInstance();
    await localizationClient.init({
      lng: handlerInput.requestEnvelope.request.locale,
      resources: languageStrings,
      returnObjects: true
    });
    // Creates a localize function to support arguments and random selection for arrays
    localizationClient.localize = function localize() {
      const args = arguments;
      const value = localizationClient.t(...args);
      if (Array.isArray(value)) {
        return value[Math.floor(Math.random() * value.length)];
      }
      return value;
    };
    // Save the localize function on request attributes for handlers to use
    const attributes = handlerInput.attributesManager.getRequestAttributes() || {};
    attributes.t = function translate(...args) {
      return localizationClient.localize(...args);
    };
    // Ensure request attributes are set (some contexts expect setRequestAttributes to have been called)
    handlerInput.attributesManager.setRequestAttributes(attributes);
  }
};

const skillBuilder = Alexa.SkillBuilders.custom();


const skill = skillBuilder
  .addRequestHandlers(
    GetNewFactHandler,
    HelpHandler,
    ExitHandler,
    FallbackHandler,
    SessionEndedRequestHandler,
  )
  .addRequestInterceptors(LocalizationInterceptor)
  .addErrorHandlers(ErrorHandler)
  .withCustomUserAgent('sample/basic-fact/v2')
  .lambda();

exports.handler = (event, context) => {
  return new Promise((resolve, reject) => {
    try {
      skill(event, context, (err, result) => {
        if (err) return reject(err);
        return resolve(result);
      });
    } catch (err) {
      return reject(err);
    }
  });
};

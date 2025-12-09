/**
 * Local Test Harness for Cricket Trivia Skill
 * 
 * This script simulates Alexa requests locally without needing an Alexa device
 * or AWS Lambda. Useful for quick testing during development.
 * 
 * Run: node invoke.js
 */

const handler = require('./index').handler;

// Sample LaunchRequest (user says "Alexa, open Cricket Trivia")
const launchRequest = {
  version: '1.0',
  session: {
    new: true,
    sessionId: 'amzn1.echo-api.session.test',
    attributes: {},
    user: {
      userId: 'amzn1.ask.account.TEST_USER'
    },
    application: {
      applicationId: 'amzn1.ask.skill.TEST_SKILL'
    }
  },
  request: {
    type: 'LaunchRequest',
    requestId: 'amzn1.echo-api.request.test',
    timestamp: new Date().toISOString(),
    locale: 'en-IN'
  },
  context: {
    System: {
      application: {
        applicationId: 'amzn1.ask.skill.TEST_SKILL'
      }
    }
  }
};

// Sample IntentRequest (user says "tell me a cricket fact")
const factRequest = {
  version: '1.0',
  session: {
    new: false,
    sessionId: 'amzn1.echo-api.session.test',
    attributes: {},
    user: {
      userId: 'amzn1.ask.account.TEST_USER'
    },
    application: {
      applicationId: 'amzn1.ask.skill.TEST_SKILL'
    }
  },
  request: {
    type: 'IntentRequest',
    requestId: 'amzn1.echo-api.request.test',
    timestamp: new Date().toISOString(),
    locale: 'en-IN',
    intent: {
      name: 'GetNewFactIntent',
      confirmationStatus: 'NONE'
    }
  },
  context: {
    System: {
      application: {
        applicationId: 'amzn1.ask.skill.TEST_SKILL'
      }
    }
  }
};

// Sample HelpIntent request
const helpRequest = {
  ...factRequest,
  request: {
    ...factRequest.request,
    intent: {
      name: 'AMAZON.HelpIntent',
      confirmationStatus: 'NONE'
    }
  }
};

// Sample StopIntent request
const stopRequest = {
  ...factRequest,
  request: {
    ...factRequest.request,
    intent: {
      name: 'AMAZON.StopIntent',
      confirmationStatus: 'NONE'
    }
  }
};

// Lambda context mock
const mockContext = {
  invokeid: 'test-invoke-id',
  logGroupName: '/aws/lambda/cricket-trivia-skill',
  logStreamName: 'test-stream',
  functionVersion: '$LATEST',
  functionName: 'cricket-trivia-skill',
  memoryLimitInMB: '128'
};

// Test runner
console.log('🎯 Cricket Trivia Skill - Local Test Harness\n');
console.log('========================================\n');

async function runTest(testName, request) {
  console.log(`\n📝 Test: ${testName}`);
  console.log(`   Request Type: ${request.request.type}`);
  if (request.request.intent) {
    console.log(`   Intent: ${request.request.intent.name}`);
  }
  console.log('   Locale: en-IN\n');

  try {
    const response = await handler(request, mockContext);
    const speak = response?.response?.outputSpeech?.ssml || response?.response?.outputSpeech?.text;
    if (speak) {
      console.log('   ✅ Response:');
      console.log(`      "${speak}"`);
    } else {
      console.log('   ✅ Response (full object):');
      console.log(JSON.stringify(response, null, 2));
    }
    if (response?.response?.card) {
      console.log(`      Card Title: ${response.response.card.title}`);
      console.log(`      Card Content: ${response.response.card.content?.substring(0, 50)}...`);
    }
    console.log('');
    return true;
  } catch (err) {
    console.error('   ❌ Error:', err && err.message ? err.message : err);
    return false;
  }
}

async function runAllTests() {
  let passed = 0;
  let failed = 0;

  // Run each test
  if (await runTest('Launch Request', launchRequest)) passed++; else failed++;
  if (await runTest('Get Fact Intent', factRequest)) passed++; else failed++;
  if (await runTest('Help Intent', helpRequest)) passed++; else failed++;
  if (await runTest('Stop Intent', stopRequest)) passed++; else failed++;

  // Summary
  console.log('========================================');
  console.log(`\n✨ Test Summary: ${passed} passed, ${failed} failed\n`);

  if (failed === 0) {
    console.log('🎉 All tests passed! Ready for Lambda deployment.\n');
  } else {
    console.log('⚠️  Some tests failed. Please review the errors above.\n');
  }
}

// Run tests
runAllTests().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});

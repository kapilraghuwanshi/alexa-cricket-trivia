# Cricket Trivia — Alexa Skill

Mind-boggling cricket facts that'll make you go "Woah!" 

**🎧 Try it now:** ["Alexa, open Cricket Trivia"](https://www.amazon.in/dp/B086K4N469)

---

## 📋 Overview

Cricket Trivia is an Alexa skill that shares interesting, fun, and mind-blowing facts about cricket. Users can launch the skill and ask for facts repeatedly during a single session.

- **60+ Cricket Facts** — Covering legends, records, modern players, women's cricket, and interesting historical tidbits
- **Multiple Locales** — Currently supports `en-IN` (India English)
- **Simple & Voice-First** — Optimized for Alexa devices
- **Open Source** — Built with the Alexa Skills Kit (ASK) SDK v2

**Live on Amazon:** https://www.amazon.in/dp/B086K4N469

---

## 🚀 Quick Start

### For Users (on Alexa Device)
```
"Alexa, open Cricket Trivia"
"Tell me a cricket fact"
"Give me another fact"
"Help"
"Stop"
```

### For Developers (Local Testing)

```bash
# 1. Install dependencies
cd lambda
npm install

# 2. Run local test harness (no AWS/Alexa device needed)
node invoke.js

# 3. See sample facts and responses
```

---

## 📁 Project Structure

```
alexa-cricket-trivia/
├── README.md                      # This file
├── DEPLOYMENT.md                  # Complete deployment guide (AWS → Store)
├── skill.json                     # Alexa skill manifest
├── interactionModels/
│   └── custom/
│       └── en-IN.json            # Skill intents and interaction model
├── lambda/                        # AWS Lambda function code
│   ├── index.js                  # Main skill handler
│   ├── languageStrings.js        # 60+ facts and localized strings
│   ├── util.js                   # S3 utilities (optional)
│   ├── package.json              # Node dependencies
│   └── invoke.js                 # Local test harness
├── assets/
│   └── images/
│       ├── en-IN_smallIconUri.png    # 108x108 px icon
│       └── en-IN_largeIconUri.png    # 512x512 px icon
└── LICENSE                        # ISC License
```

---

## 🏗️ Architecture

### Tech Stack
- **Alexa SDK:** `ask-sdk-core` v2.14.0 (modern Node.js handler pattern)
- **Localization:** `i18next` v22.5.1 (supports multiple locales)
- **Runtime:** Node.js 18+ (AWS Lambda)
- **Cloud:** AWS Lambda (serverless execution)

### Request Flow
```
User Voice Input
    ↓
Alexa Service (Voice → Intent)
    ↓
AWS Lambda (cricket-trivia-skill function)
    ↓
Handler (index.js)
    ├─ LocalizationInterceptor (adds requestAttributes.t)
    ├─ GetNewFactHandler (LaunchRequest, GetNewFactIntent)
    ├─ HelpHandler, ExitHandler, etc.
    └─ ErrorHandler
    ↓
Response Builder
    ├─ Speak (audio response)
    └─ Card (display on device/app)
    ↓
Alexa Service (Response → Audio)
    ↓
User Hears Fact
```

---

## 🔄 Recent Updates (v1.1.1 Revamp)

✅ **Modernized Code**
- Updated i18next localization to use isolated instances (async-safe)
- Added `engines` field targeting Node.js 18+
- Improved error handling and response consistency

✅ **Content Quality**
- Fixed typos (e.g., "Crciket" → "Cricket")
- Removed duplicate and inaccurate facts
- Added **30+ new facts** covering modern cricketers, women's cricket, and recent records
- Total: **60+ facts** now

✅ **Developer Tools**
- Added local test harness (`invoke.js`) for easy offline testing
- Added build script (`npm run build`) to create Lambda deployment zip
- Comprehensive deployment guide (`DEPLOYMENT.md`)

---

## 🎮 Local Development

### Test the Skill Locally

No AWS account or Alexa device needed to test the handler:

```bash
cd lambda
npm install

# Run the test harness
node invoke.js
```

**Expected output:**
```
🎯 Cricket Trivia Skill - Local Test Harness

========================================

📝 Test: Launch Request
   Request Type: LaunchRequest
   Locale: en-IN

   ✅ Response:
      "Here's your interesting cricket trivia curated by Kapil Raghuwanshi: ..."
```

### Add or Modify Facts

Edit `lambda/languageStrings.js`:

```javascript
FACTS: [
  'Your fact here...',
  'Another fact...',
  // ... more facts
]
```

Then re-run `node invoke.js` to test.

---

## 🚀 Deployment

### Quick Deploy (5 steps)

1. **Build:**
   ```bash
   cd lambda
   npm install
   npm run build
   # Creates ../cricket-trivia-lambda.zip
   ```

2. **Deploy to Lambda:**
   - Use AWS Console or CLI to upload `cricket-trivia-lambda.zip`
   - Copy the function ARN

3. **Update Manifest:**
   - Edit `skill.json` and replace the Lambda endpoint ARN

4. **Test on Device:**
   - Say "Alexa, open Cricket Trivia"

5. **Submit to Store:**
   - Use [Alexa Developer Console](https://developer.amazon.com/alexa) to submit

**📖 Detailed Guide:** See [`DEPLOYMENT.md`](./DEPLOYMENT.md) for step-by-step instructions with AWS CLI examples, troubleshooting, and certification tips.

---

## 📊 Skill Intents

The skill responds to these Alexa intents:

| Intent | What It Does |
|--------|-------------|
| `LaunchRequest` | User opens the skill; returns a fact |
| `GetNewFactIntent` | User asks for a fact; returns a random fact |
| `AMAZON.HelpIntent` | User asks for help; explains what the skill does |
| `AMAZON.StopIntent` | User says "stop"; closes the skill |
| `AMAZON.CancelIntent` | User says "cancel"; closes the skill |
| `AMAZON.FallbackIntent` | User says something unexpected; suggests alternatives |
| `SessionEndedRequest` | Session ends (timeout, etc.) |

---

## 🌍 Localization

Currently supports:
- **en-IN** (English - India) — Primary locale

To add more locales:
1. Update `skill.json` → `publishingInformation.locales` with new locale code
2. Add translations to `lambda/languageStrings.js`:
   ```javascript
   module.exports = {
     en: { translation: { /* English strings */ } },
     'en-US': { translation: { /* US English strings */ } },
     // Add more locales here
   }
   ```
3. Add corresponding interaction model in `interactionModels/custom/`

---

## 🔧 Configuration

### Lambda Environment

The skill runs on AWS Lambda with:
- **Memory:** 128 MB (default, adjustable)
- **Timeout:** 3 seconds (default, adjustable)
- **Runtime:** Node.js 18.x or higher
- **Handler:** `index.handler`

### Trigger

Lambda is triggered by Alexa service when users interact with the skill.

---

## 📝 License

ISC License — See [`LICENSE`](./LICENSE) file

---

## 👤 Author

**Kapil Raghuwanshi**

- GitHub: [kapilraghuwanshi](https://github.com/kapilraghuwanshi)
- Skill: [Cricket Trivia on Amazon](https://www.amazon.in/dp/B086K4N469)

---

## 🙋 FAQ

### Q: Can I add my own facts?
**A:** Yes! Edit `lambda/languageStrings.js` → `FACTS` array, then redeploy.

### Q: How do I test without an Alexa device?
**A:** Run `node lambda/invoke.js` for local testing of the handler.

### Q: Can I add more languages?
**A:** Yes! Add new locales to `languageStrings.js` and update `skill.json`.

### Q: Where's the Alexa skill?
**A:** Live on [Amazon India](https://www.amazon.in/dp/B086K4N469) — enable it on your device.

### Q: How do I report bugs or suggest facts?
**A:** Open an issue or PR on this GitHub repo.

---

## 🔗 Resources

- **Alexa Developer Docs:** https://developer.amazon.com/docs/ask-overviews/what-is-the-alexa-skills-kit.html
- **ASK SDK for Node.js:** https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs
- **Lambda Guide:** https://docs.aws.amazon.com/lambda/latest/dg/nodejs-handler.html
- **i18next Docs:** https://www.i18next.com
- **Skill Certification:** https://developer.amazon.com/docs/app-submission/understand-certification-requirements.html

---

## 📌 Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.1.1 | Dec 2025 | Revamped: modernized code, added 30+ facts, improved localization, added deployment docs |
| 1.0.0 | Original | Initial Cricket Trivia skill for Alexa |

---

**Last Updated:** December 2025  
**Status:** ✅ Live on Alexa Skills Store (India)  
**Next Update:** TBD (community contributions welcome!)

---

## ⚡ Revamp Summary (Crisp)

- **What changed:** Modernized localization, targeted Node.js 18+, removed unused deps, added build script, added local test harness, and expanded facts to 60+.
- **Content:** Fixed typos, removed duplicates, corrected factual errors, and added 30+ new modern facts (men's & women's cricket).
- **Developer tools:** `lambda/invoke.js` for local testing; `npm run build` creates `cricket-trivia-lambda.zip` for Lambda.
- **Docs:** `DEPLOYMENT.md` contains step-by-step deployment and submission instructions for AWS and Alexa Store.
- **Ready for deployment:** Build → Upload Lambda zip → Update `skill.json` ARN → Test on device → Submit for certification.

If you want, I can commit these changes and push a release branch, deploy the Lambda zip for you (you'll need to provide AWS access), or update `skill.json` with a new ARN after you deploy. Which would you like next?

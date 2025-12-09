# Cricket Trivia Skill - Deployment Guide

This guide walks you through deploying the updated Cricket Trivia skill to AWS Lambda and publishing it to the Alexa Skills Store.

## Prerequisites

- **AWS Account** with permissions to create/update Lambda functions
- **Alexa Developer Account** (developer.amazon.com)
- **Node.js 18+** installed locally
- **ASK CLI** (AWS Skills Kit CLI) installed: `npm install -g ask-cli`
- **Zip utility** (included on macOS/Linux)

---

## Step 1: Build the Lambda Deployment Package

Navigate to the `lambda` directory and build the deployable zip file:

```bash
cd lambda

# Install dependencies
npm install

# Build the zip file (creates cricket-trivia-lambda.zip in parent directory)
npm run build
```

**Output:** `../cricket-trivia-lambda.zip` (ready for Lambda upload)

### What's included in the zip:
- `index.js` — Main skill handler with modernized i18next localization
- `languageStrings.js` — Updated facts (60+ cricket trivia), skill messages, and locales
- `util.js` — S3 pre-signed URL helper (if using persistent storage)
- `node_modules/` — All dependencies (ask-sdk-core, i18next)
- `package.json` — Metadata

---

## Step 2: Deploy to AWS Lambda

You have two options:

### Option A: Using AWS Console (Manual)

1. Go to [AWS Lambda Console](https://console.aws.amazon.com/lambda)
2. Click **Create function** OR select your existing Cricket Trivia function
3. **For new function:**
   - Name: `cricket-trivia-skill` (or similar)
   - Runtime: **Node.js 18.x** or **Node.js 20.x**
   - Role: Create a new role with basic Lambda execution permissions
4. **For existing function:**
   - Skip to next step
5. In the **Code** section, click **Upload from** → **Zip file**
6. Select `cricket-trivia-lambda.zip` and click **Deploy**
7. **Important:** Copy the **ARN** of the function (top-right, looks like):
   ```
   arn:aws:lambda:us-east-1:YOUR-ACCOUNT-ID:function:cricket-trivia-skill
   ```

### Option B: Using AWS CLI (Faster)

```bash
# List existing Lambda functions
aws lambda list-functions --region us-east-1

# Update an existing function
aws lambda update-function-code \
  --function-name cricket-trivia-skill \
  --zip-file fileb://cricket-trivia-lambda.zip \
  --region us-east-1

# Or create a new function
aws lambda create-function \
  --function-name cricket-trivia-skill \
  --runtime nodejs18.x \
  --role arn:aws:iam::YOUR-ACCOUNT-ID:role/lambda-execution-role \
  --handler index.handler \
  --zip-file fileb://cricket-trivia-lambda.zip \
  --region us-east-1
```

### Verify Deployment
```bash
aws lambda get-function --function-name cricket-trivia-skill --region us-east-1
```

---

## Step 3: Update the Skill Manifest (`skill.json`)

The `skill.json` file contains the Lambda ARN endpoint. You **must update this** after deploying:

1. Open `skill.json` in your editor
2. Find the `apis.custom.endpoint.uri` section:
   ```json
   "apis": {
     "custom": {
       "endpoint": {
         "uri": "arn:aws:lambda:us-east-1:YOUR-ACCOUNT-ID:function:cricket-trivia-skill"
       }
     }
   }
   ```
3. Replace the old ARN with your new Lambda ARN from Step 2
4. **Optional improvements:**
   - Update `testingInstructions`: 
     ```json
     "testingInstructions": "Say 'Alexa, open Cricket Trivia' and ask for a fact. You can ask for more facts or say 'stop' to exit."
     ```
   - Update `publishingInformation.locales.en-IN.description` if needed
   - Add more locales (e.g., `en-US`, `en-GB`) if desired

Example updated section:
```json
"apis": {
  "custom": {
    "endpoint": {
      "uri": "arn:aws:lambda:us-east-1:<account>:function:cricket-trivia-skill"
    },
    "interfaces": []
  }
}
```

---

## Step 4: Test the Skill Locally (Optional)

Create a local test file to verify the handler works:

```bash
cat > lambda/test-invoke.js << 'EOF'
const handler = require('./index').handler;

const launchRequest = {
  version: '1.0',
  session: {
    new: true,
    sessionId: 'amzn1.echo-api.session.test',
    attributes: {},
    user: { userId: 'amzn1.ask.account.PLACEHOLDER' },
    application: { applicationId: 'amzn1.ask.skill.PLACEHOLDER' }
  },
  request: {
    type: 'LaunchRequest',
    requestId: 'amzn1.echo-api.request.test',
    timestamp: new Date().toISOString(),
    locale: 'en-IN'
  },
  context: {
    System: { application: { applicationId: 'amzn1.ask.skill.PLACEHOLDER' } }
  }
};

handler(launchRequest, {}, (err, result) => {
  if (err) console.error('Error:', err);
  else console.log('Response:', JSON.stringify(result, null, 2));
});
EOF
node test-invoke.js
```

**Expected output:** A fact from the FACTS array with proper response format.

---

## Step 5: Submit to Alexa Skills Store

### Using ASK CLI (Recommended)

```bash
# Initialize ASK CLI (one-time setup)
ask init

# From the project root directory, validate the skill
ask validate --stage development

# Submit for certification
ask submit --stage development
```

### Using Alexa Developer Console (Manual)

1. Go to [Alexa Developer Console](https://developer.amazon.com/alexa/console/ask)
2. Select your **Cricket Trivia** skill
3. Click **Distribution** (left sidebar)
4. Fill in all required fields:
   - **Skill Preview & Testing**
     - Skill name: Cricket Trivia
     - One-sentence description: "Learn fun and mind-blowing facts about Cricket."
     - Detailed description: (use the description from `skill.json`)
     - Example phrases: (already in `skill.json`)
     - Category: **Knowledge & Trivia** (already set)
   - **Icons**
     - 108x108 px icon (already in `assets/images/`)
     - 512x512 px icon (already in `assets/images/`)
   - **Testing Instructions:** "Say 'Alexa, open Cricket Trivia' and ask for a fact."
   - **Privacy Policy URL** (optional, but recommended for store submission)
   - **Terms of Use URL** (optional, but recommended for store submission)

5. Click **Save and Continue**

6. In **Availability** section:
   - Choose countries/regions (already set to India: `en-IN`)
   - Set pricing (free or paid)
   - Click **Save and Continue**

7. Review all information and click **Submit for Certification**

### Certification Review

Amazon reviews all skills before publishing:
- **Timeline:** 1-7 days (typically 3-5 days)
- **Checklist:**
  - ✅ Skill invocation name is available
  - ✅ Lambda endpoint is reachable
  - ✅ All facts are accurate and appropriate
  - ✅ No ads or paid content (unless declared)
  - ✅ Icons are high quality
  - ✅ Skill name matches submission
  - ✅ Response messages are clear and appropriate

**If rejected:** Amazon will send detailed feedback. Common issues:
- Typos or grammatical errors
- Inaccurate content
- Non-functional endpoint
- Missing or low-quality icons
- Terms of use required for certain skill types

---

## Step 6: Post-Submission Monitoring

### Check Submission Status
```bash
# Using ASK CLI
ask status --stage development

# Or in Alexa Developer Console → Skill > Build > Submission Status
```

### Monitor Skill Performance
Once published:
1. Go to **Alexa Developer Console** → Your Skill → **Analytics**
2. Track:
   - Unique customers
   - Sessions per day
   - User feedback and ratings
   - Crash/error logs (if any)

---

## Troubleshooting

### Lambda Function Not Responding
- **Check:** ARN is correct in `skill.json`
- **Check:** Lambda execution role has basic permissions
- **Check:** Handler is `index.handler` in Lambda configuration
- **Test:** Invoke Lambda manually from AWS Console

### Skill Not Found on Store
- **Check:** Certification status in Alexa Developer Console
- **Check:** Correct region/locale (`en-IN` for India)
- **Check:** 24-48 hours may be needed for indexing

### Facts Not Updating
- **Check:** You redeployed the zip with `npm run build`
- **Check:** Lambda was updated with the new zip
- **Check:** Skill invocation test uses fresh request

### Localization Issues
- **Current:** Skill uses `en-IN` locale (India English)
- **To add more locales:** Update `skill.json` → `publishingInformation.locales` and add new language keys in `languageStrings.js`

---

## Files Modified for This Update

| File | Changes |
|------|---------|
| `lambda/package.json` | Added `engines` (Node 18+), removed `ask-sdk-model`, added `build` script |
| `lambda/index.js` | Modernized `LocalizationInterceptor` to use isolated i18next instance (async-safe) |
| `lambda/languageStrings.js` | Fixed typos, removed duplicates, added 30+ new cricket facts, updated to 60+ total facts |
| `skill.json` | Ready for ARN update after Lambda deployment |

---

## Quick Checklist Before Final Submission

- [ ] Lambda function deployed and ARN copied
- [ ] `skill.json` updated with new Lambda ARN
- [ ] All 60+ facts reviewed and verified for accuracy
- [ ] Icons are 108x108 and 512x512 px (high quality)
- [ ] Skill name and invocation name finalized
- [ ] Testing instructions clear and concise
- [ ] Privacy policy and terms of use (if required for your region)
- [ ] ASK CLI validation passes: `ask validate --stage development`
- [ ] Local test passes (optional but recommended)

---

## Support & Resources

- **ASK CLI Docs:** https://developer.amazon.com/docs/ask-overviews/what-is-the-alexa-skills-kit.html
- **Lambda Node.js Guide:** https://docs.aws.amazon.com/lambda/latest/dg/nodejs-handler.html
- **Alexa Skills Store Requirements:** https://developer.amazon.com/docs/app-submission/understand-certification-requirements.html
- **Skill Certification Guide:** https://developer.amazon.com/docs/app-submission/understand-certification-requirements.html

---

## Next Steps After Publishing

1. **Promote your skill:** Share the link from the Alexa Skills Store
2. **Monitor analytics:** Track user engagement in Alexa Developer Console
3. **Iterate:** Based on feedback, update facts, improve messaging, add features
4. **Maintain:** Test monthly to ensure Lambda endpoint stays healthy

---

**Last Updated:** December 2025  
**Skill Version:** 1.1.1 (revamped for store relaunch)

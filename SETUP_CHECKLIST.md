# Setup Checklist - Cold Calling Bot

Follow these steps to get your bot fully operational:

## ✅ Step 1: Create .env.local File

1. In your project root, create a file named `.env.local`
2. Add your API keys (see below)

## ✅ Step 2: Add Twilio Credentials

Get from: https://console.twilio.com

```env
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_PHONE_NUMBER=+1234567890
TWILIO_WEBHOOK_URL=http://localhost:3000/api/agent/call/webhook
```

## ✅ Step 3: Add OpenAI API Key (Optional but Recommended)

Get from: https://platform.openai.com/api-keys

```env
OPENAI_API_KEY=sk-your-api-key-here
OPENAI_MODEL=gpt-4o
```

## ✅ Step 4: Configure Twilio Webhook

1. Go to https://console.twilio.com
2. Phone Numbers → Manage → Active numbers
3. Click your phone number
4. Under "Voice & Fax", set:
   - **A CALL COMES IN**: `http://localhost:3000/api/agent/call/webhook`
   - Method: `HTTP POST`
5. Save

**For local testing, use ngrok:**
```bash
npm install -g ngrok
ngrok http 3000
# Use the ngrok URL in Twilio webhook
```

## ✅ Step 5: Restart Server

After adding API keys:
```bash
npm run dev
```

## ✅ Step 6: Test the System

1. Go to `/agent/campaigns`
2. Create a test campaign
3. Add a contact manually or search for businesses
4. Start a test call

## 🎯 Quick Test Flow

1. **Create Campaign**: `/agent/campaigns` → "New Campaign"
   - Name: "Test Campaign"
   - Location: "New York, NY"
   - Max Calls: 5 (for testing)

2. **Start Campaign**: Click "Start" on your campaign

3. **Monitor**: Check Twilio Console → Monitor → Logs → Calls

4. **View Results**: Check `/agent/leads` for generated leads

## 📚 Documentation

- `TWILIO_SETUP.md` - Detailed Twilio setup
- `OPENAI_SETUP.md` - OpenAI integration guide
- `QUICK_START_COLD_CALLING.md` - Quick reference

## 🐛 Troubleshooting

- **No calls being made?** Check Twilio credentials in .env.local
- **Webhook errors?** Verify webhook URL is accessible (use ngrok for local)
- **Conversation not working?** Check OpenAI API key if using AI mode


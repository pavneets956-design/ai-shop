# Quick Twilio Setup

## 🚀 3-Step Setup

### Step 1: Add Credentials to `.env.local`

Create or update `.env.local` in your project root:

```env
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_PHONE_NUMBER=+1234567890
TWILIO_WEBHOOK_URL=https://yourdomain.com/api/agent/call/webhook
```

**Where to find these:**
- **Account SID & Auth Token**: Twilio Console → Dashboard
- **Phone Number**: Twilio Console → Phone Numbers → Active numbers
- **Webhook URL**: Your public URL + `/api/agent/call/webhook`

### Step 2: Configure Webhook in Twilio

1. Go to https://console.twilio.com
2. Phone Numbers → Manage → Active numbers
3. Click your phone number
4. Under "Voice & Fax", set:
   - **A CALL COMES IN**: `https://yourdomain.com/api/agent/call/webhook`
   - Method: `HTTP POST`
5. Save

### Step 3: Restart Your Server

```bash
npm run dev
```

## ✅ Test It

1. Go to `/agent/campaigns`
2. Create a campaign
3. Click "Start Call" on a contact
4. Check Twilio Console → Monitor → Logs → Calls

## 🔧 Local Development

For local testing, use **ngrok**:

```bash
# Install ngrok
npm install -g ngrok

# Start your server
npm run dev

# In another terminal, start ngrok
ngrok http 3000

# Use the ngrok URL in your webhook:
TWILIO_WEBHOOK_URL=https://abc123.ngrok.io/api/agent/call/webhook
```

## 📚 Full Guide

See `TWILIO_SETUP.md` for detailed instructions and troubleshooting.


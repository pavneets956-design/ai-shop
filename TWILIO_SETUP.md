# Twilio Integration Setup Guide

Complete guide to connect your Twilio account to the AI Cold Calling Bot.

## 📋 Prerequisites

- Twilio account (sign up at https://www.twilio.com)
- Twilio phone number (purchased or trial number)
- Your application running and accessible via public URL (for webhooks)

## 🔑 Step 1: Get Your Twilio Credentials

1. **Log in to Twilio Console**
   - Go to https://console.twilio.com
   - Navigate to your dashboard

2. **Find Your Account SID and Auth Token**
   - Account SID: Found on the dashboard (starts with `AC`)
   - Auth Token: Click "Show" to reveal (starts with your auth token)
   - Copy both values

3. **Get Your Phone Number**
   - Go to Phone Numbers → Manage → Active numbers
   - Copy your Twilio phone number (format: `+1234567890`)

## ⚙️ Step 2: Configure Environment Variables

Add these to your `.env.local` file (or `.env` for production):

```env
# Twilio Credentials
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_PHONE_NUMBER=+1234567890

# Webhook URL (your public URL)
TWILIO_WEBHOOK_URL=https://yourdomain.com/api/agent/call/webhook
# OR for local development with ngrok:
# TWILIO_WEBHOOK_URL=https://your-ngrok-url.ngrok.io/api/agent/call/webhook

# Optional: Agent name
AGENT_NAME=Sarah
```

### For Local Development

If testing locally, you'll need to expose your local server:

1. **Install ngrok** (or similar tool):
   ```bash
   npm install -g ngrok
   # OR download from https://ngrok.com
   ```

2. **Start your Next.js server**:
   ```bash
   npm run dev
   ```

3. **Start ngrok** in another terminal:
   ```bash
   ngrok http 3000
   ```

4. **Copy the ngrok URL** (e.g., `https://abc123.ngrok.io`) and use it in your webhook URL:
   ```env
   TWILIO_WEBHOOK_URL=https://abc123.ngrok.io/api/agent/call/webhook
   ```

## 🔗 Step 3: Configure Twilio Webhook

1. **Go to Twilio Console → Phone Numbers**
2. **Click on your phone number**
3. **Scroll to "Voice & Fax" section**
4. **Set the webhook URL**:
   - **A CALL COMES IN**: `https://yourdomain.com/api/agent/call/webhook`
   - **CALL STATUS CHANGES**: `https://yourdomain.com/api/agent/call/webhook/status`
   - Method: `HTTP POST`
5. **Save Configuration**

## 🧪 Step 4: Test the Integration

### Test 1: Verify Credentials

1. Go to `/agent/campaigns` in your app
2. Create a test campaign
3. Try to start a call
4. Check the console for any errors

### Test 2: Make a Test Call

1. Use the "Start Call" button on a contact
2. Check Twilio Console → Monitor → Logs → Calls
3. You should see the call being initiated

### Test 3: Verify Webhook

1. Make a test call
2. Check your server logs for webhook requests
3. The call should connect and the AI should start talking

## 🎙️ Step 5: Enable Speech Recognition (Optional)

For better speech recognition, you can configure:

1. **In Twilio Console → Phone Numbers → Your Number**
2. **Enable "Speech Recognition"**
3. **Set Language**: English (US)
4. **Set Model**: Default or Enhanced

## 📞 Step 6: Configure Voice Settings

The bot uses Twilio's Polly voices. Available voices:
- `Polly.Joanna` (Female, US English) - Default
- `Polly.Matthew` (Male, US English)
- `Polly.Amy` (Female, British English)
- `Polly.Brian` (Male, British English)

To change the voice, edit `app/api/agent/call/webhook/route.ts` and update the `voice` attribute in the `<Say>` tags.

## 🔒 Step 7: Security & Best Practices

### 1. Validate Twilio Requests (Recommended)

Add request validation to verify webhooks are from Twilio:

```typescript
import twilio from "twilio";

// In your webhook route
const twilioSignature = request.headers.get('x-twilio-signature');
const url = request.url;
const params = await request.formData();

if (twilio.validateRequest(
  process.env.TWILIO_AUTH_TOKEN!,
  twilioSignature!,
  url,
  params
)) {
  // Process webhook
} else {
  return new Response('Unauthorized', { status: 403 });
}
```

### 2. Rate Limiting

Implement rate limiting to prevent abuse:
- Limit calls per hour/day
- Respect do-not-call lists
- Add delays between calls

### 3. Error Handling

Monitor Twilio logs for:
- Failed calls
- Webhook errors
- Authentication issues

## 🐛 Troubleshooting

### Issue: "Twilio not configured" error

**Solution**: 
- Check that all three environment variables are set
- Restart your server after adding environment variables
- Verify the values are correct (no extra spaces)

### Issue: Webhook not receiving requests

**Solution**:
- Verify your webhook URL is publicly accessible
- Check ngrok is running (if using local dev)
- Test webhook URL in browser (should return XML)
- Check Twilio webhook logs in console

### Issue: Calls not connecting

**Solution**:
- Verify phone number format: `+1234567890` (with country code)
- Check Twilio account has sufficient balance
- Verify phone number is active in Twilio console
- Check call logs in Twilio dashboard

### Issue: Speech not being recognized

**Solution**:
- Enable speech recognition in Twilio console
- Check microphone permissions
- Verify language settings
- Test with simple responses first

### Issue: "Unauthorized" errors

**Solution**:
- Verify Account SID and Auth Token are correct
- Check for typos in environment variables
- Ensure Auth Token is not expired (regenerate if needed)

## 📊 Monitoring

### Twilio Console
- **Monitor → Logs → Calls**: See all call attempts
- **Monitor → Logs → Errors**: Check for errors
- **Usage**: Track API usage and costs

### Your Application
- Check server logs for webhook requests
- Monitor call success rates
- Track conversation outcomes

## 💰 Cost Considerations

Twilio pricing (as of 2024):
- **Voice Calls**: ~$0.013 per minute (varies by country)
- **Speech Recognition**: Included in call cost
- **Phone Number**: ~$1/month per number

**Tips**:
- Start with Twilio trial account (free credits)
- Monitor usage in Twilio console
- Set up usage alerts
- Use call duration limits to control costs

## ✅ Verification Checklist

- [ ] Twilio Account SID added to `.env.local`
- [ ] Twilio Auth Token added to `.env.local`
- [ ] Twilio Phone Number added to `.env.local`
- [ ] Webhook URL configured in Twilio console
- [ ] Webhook URL is publicly accessible
- [ ] Server restarted after adding env variables
- [ ] Test call successfully initiated
- [ ] Webhook receiving requests (check logs)
- [ ] AI agent responding in calls

## 🚀 Next Steps

Once Twilio is connected:

1. **Test with a real call** to your own number
2. **Create a campaign** and start calling
3. **Monitor results** in the dashboard
4. **Adjust settings** based on performance
5. **Scale up** successful campaigns

## 📞 Support

- **Twilio Docs**: https://www.twilio.com/docs
- **Twilio Support**: https://support.twilio.com
- **Your App Logs**: Check server console for errors

---

**Note**: For production use, ensure you:
- Use production Twilio account (not trial)
- Implement proper authentication
- Add request validation
- Set up monitoring and alerts
- Comply with local calling regulations (TCPA, etc.)


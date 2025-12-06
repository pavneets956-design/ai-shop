# AI Sales Agent System

A personal AI agent that automatically calls businesses to pitch the AI Receptionist Pro product. The agent engages prospects in natural conversations, handles objections, and schedules follow-ups.

## Features

### 🤖 Intelligent Conversation Engine
- Natural, human-like conversations
- Adapts pitch based on prospect responses
- Handles objections intelligently
- Qualifies leads automatically
- Tracks conversation state and outcomes

### 📞 Call Management
- Automated outbound calling
- Call scheduling and time management
- Call history and transcripts
- Real-time call status tracking
- Integration ready for Twilio

### 📊 Contact Management
- Add and organize target companies
- Track contact status and history
- Industry categorization
- Search and filter contacts

### ⚙️ Customizable Settings
- Agent name and voice selection
- Call hours configuration
- Pitch style customization
- Automation preferences
- Talking points configuration

## How It Works

1. **Add Contacts**: Import or manually add companies you want to reach
2. **Configure Agent**: Set up the agent's personality, voice, and pitch style
3. **Start Campaign**: Activate the agent to begin calling
4. **Monitor Results**: Track calls, outcomes, and schedule follow-ups

## Conversation Flow

The agent follows a structured conversation flow:

1. **Introduction**: Greets prospect and introduces the solution
2. **Qualification**: Asks about current call handling process
3. **Pitch**: Presents AI Receptionist Pro benefits
4. **Objection Handling**: Addresses concerns naturally
5. **Close**: Attempts to schedule demo or get commitment
6. **Follow-up**: Schedules next steps if needed

## Key Talking Points

The agent automatically emphasizes:
- 24/7 availability and cost savings
- Multi-language support
- CRM integration capabilities
- ROI and time savings
- Risk-free 30-day trial

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Twilio (for production)

Add to `.env.local`:
```env
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+1234567890
```

### 3. Set Up Webhook URL

In Twilio Console, set your webhook URL to:
```
https://yourdomain.com/api/agent/call/webhook
```

### 4. Start Using

1. Navigate to `/agent`
2. Add contacts in `/agent/contacts`
3. Configure settings in `/agent/settings`
4. Start calling!

## API Endpoints

- `POST /api/agent/call` - Process call responses
- `PUT /api/agent/call` - Initiate new call
- `POST /api/agent/call/webhook` - Twilio webhook handler

## Conversation Engine

The `ConversationEngine` class handles all conversation logic:
- State management
- Response generation
- Objection handling
- Lead qualification
- Outcome tracking

## Call Manager

The `CallManager` class handles:
- Call initiation
- Telephony integration
- Call result tracking
- Status monitoring

## Next Steps

1. **Integrate Twilio**: Connect real telephony service
2. **Add Speech Recognition**: Use OpenAI Whisper or similar
3. **Implement Text-to-Speech**: Use ElevenLabs or similar for natural voice
4. **Add Analytics**: Track conversion rates and optimize pitch
5. **CRM Integration**: Connect to your CRM for lead management

## Example Conversation

**Agent**: "Hi, this is Sarah from AI Shop. I'm calling because I believe your business could benefit from our AI Receptionist solution. Do you have a moment to chat?"

**Prospect**: "Sure, what is this about?"

**Agent**: "Great! I noticed you might be handling calls manually. Our AI Receptionist Pro works 24/7, never misses a call, and costs 97% less than hiring a full-time receptionist. Would you like to hear more?"

The agent continues the conversation naturally, adapting to the prospect's responses and objections.

---

**Note**: This is a demo system. For production use, you'll need to:
- Set up Twilio account and phone number
- Configure webhooks properly
- Add speech recognition and TTS
- Implement proper error handling
- Add database persistence
- Set up authentication and authorization


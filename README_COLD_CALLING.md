# AI Cold Calling Bot for Local Businesses

A comprehensive AI-powered cold calling system designed to automatically call local businesses and generate leads. The system uses intelligent conversation engines, campaign management, and local business discovery to help you reach potential customers efficiently.

## 🚀 Features

### Core Capabilities

1. **Automated Cold Calling**
   - AI agent makes calls automatically based on your campaigns
   - Respects call hours and daily limits
   - Handles retries and failed calls intelligently

2. **Local Business Discovery**
   - Search for businesses by location and industry
   - Import businesses from CSV files
   - Automatic data enrichment and validation

3. **Campaign Management**
   - Create targeted campaigns for specific locations/industries
   - Set call limits and hours
   - Track campaign performance in real-time
   - Pause/resume campaigns as needed

4. **Intelligent Conversation Engine**
   - Natural, human-like conversations
   - Adapts pitch based on business type and location
   - Handles objections intelligently
   - Tracks conversation state and outcomes

5. **Lead Management**
   - Automatic lead scoring
   - Track leads through the sales funnel
   - Schedule follow-ups automatically
   - Pipeline visualization

## 📋 Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- (Optional) Twilio account for production calling

### Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set Up Database**
   ```bash
   # Update .env with your DATABASE_URL
   npx prisma migrate dev
   npx prisma generate
   ```

3. **Configure Environment Variables**
   Create a `.env.local` file:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/ai_shop"
   
   # Optional: For production calling with Twilio
   TWILIO_ACCOUNT_SID=your_account_sid
   TWILIO_AUTH_TOKEN=your_auth_token
   TWILIO_PHONE_NUMBER=+1234567890
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

5. **Access the Application**
   - Navigate to `http://localhost:3000/agent`
   - Go to "Campaigns" to create your first campaign

## 🎯 How to Use

### Step 1: Create a Campaign

1. Navigate to `/agent/campaigns`
2. Click "New Campaign"
3. Fill in:
   - **Campaign Name**: e.g., "Local Restaurants - Downtown"
   - **Location**: City, state, or zip code (e.g., "New York, NY")
   - **Industry** (optional): e.g., "restaurant", "dentist", "plumber"
   - **Max Calls Per Day**: Number of calls to make daily (default: 50)

4. Click "Create Campaign"
   - The system will automatically search for businesses in that location
   - Businesses matching your criteria will be added to the campaign

### Step 2: Configure Agent Settings

1. Go to `/agent/settings`
2. Customize:
   - **Agent Name**: Name your AI agent will use
   - **Voice Type**: Choose professional or friendly voice
   - **Call Hours**: Set when calls should be made
   - **Pitch Style**: Conversational, professional, friendly, or direct

### Step 3: Start the Campaign

1. Go back to `/agent/campaigns`
2. Find your campaign
3. Click "Start" to begin automated calling
4. Monitor progress in real-time

### Step 4: Track Results

- **Leads**: View all leads generated at `/agent/leads`
- **Calls**: See call history at `/agent/calls`
- **Contacts**: Manage contacts at `/agent/contacts`

## 🏗️ Architecture

### Key Components

1. **ConversationEngine** (`lib/agent/conversationEngine.ts`)
   - Handles conversation flow
   - Manages conversation state
   - Generates contextual responses
   - Tracks pain points and objections

2. **CallManager** (`lib/agent/callManager.ts`)
   - Manages call initiation
   - Integrates with telephony services (Twilio)
   - Tracks call results
   - Handles call webhooks

3. **BusinessDiscovery** (`lib/agent/businessDiscovery.ts`)
   - Searches for local businesses
   - Validates and formats phone numbers
   - Enriches business data
   - Imports from CSV

4. **CampaignManager** (`lib/agent/campaignManager.ts`)
   - Manages campaign lifecycle
   - Builds and processes call queues
   - Tracks campaign statistics
   - Handles scheduling and retries

### Database Schema

- **Contact**: Stores business contact information
- **Campaign**: Campaign configuration and settings
- **Call**: Individual call records with transcripts
- **Lead**: Generated leads from calls

## 🔧 API Endpoints

### Campaigns
- `GET /api/agent/campaigns` - List all campaigns
- `POST /api/agent/campaigns` - Create new campaign
- `PUT /api/agent/campaigns` - Update campaign (start/pause/stop)

### Business Search
- `POST /api/agent/businesses/search` - Search for local businesses
- `PUT /api/agent/businesses/search` - Import businesses from CSV

### Calls
- `PUT /api/agent/call` - Initiate a call
- `POST /api/agent/call` - Process call response
- `POST /api/agent/call/webhook` - Twilio webhook handler

## 🎨 Conversation Flow

The AI agent follows this conversation structure:

1. **Introduction**
   - Greets prospect
   - Introduces itself and purpose
   - Uses local business context

2. **Qualification**
   - Asks about current call handling
   - Identifies pain points
   - Detects interest level

3. **Pitch**
   - Presents solution benefits
   - Addresses specific pain points
   - Uses local business examples

4. **Objection Handling**
   - Addresses price concerns
   - Handles "not interested" responses
   - Manages "think about it" scenarios

5. **Close**
   - Attempts to schedule demo
   - Gets contact information
   - Sets follow-up expectations

## 📊 Campaign Statistics

Each campaign tracks:
- Total calls made
- Successful calls
- Interested leads
- Scheduled demos
- Conversion rate

## 🔒 Best Practices

1. **Respectful Calling**
   - Set appropriate call hours (9 AM - 5 PM recommended)
   - Limit daily calls to avoid spam
   - Honor do-not-call requests

2. **Targeted Campaigns**
   - Focus on specific industries
   - Use location-based targeting
   - Refine based on results

3. **Follow-up Strategy**
   - Schedule follow-ups for interested leads
   - Track conversation outcomes
   - Personalize follow-up messages

4. **Compliance**
   - Check local regulations (TCPA, etc.)
   - Maintain opt-out mechanisms
   - Keep call records for compliance

## 🚧 Production Setup

### Twilio Integration

1. **Get Twilio Credentials**
   - Sign up at https://www.twilio.com
   - Get Account SID and Auth Token
   - Purchase a phone number

2. **Configure Webhook**
   - Set webhook URL: `https://yourdomain.com/api/agent/call/webhook`
   - Configure for voice calls
   - Enable speech recognition

3. **Environment Variables**
   ```env
   TWILIO_ACCOUNT_SID=ACxxxxx
   TWILIO_AUTH_TOKEN=xxxxx
   TWILIO_PHONE_NUMBER=+1234567890
   ```

### Speech Recognition & TTS

For production, you'll need:
- **Speech-to-Text**: OpenAI Whisper, Google Speech-to-Text, or Twilio Speech Recognition
- **Text-to-Speech**: ElevenLabs, Google TTS, or Twilio Voice

### Database

Run migrations:
```bash
npx prisma migrate deploy
```

## 📈 Scaling

- Use job queues (Bull, BullMQ) for call processing
- Implement rate limiting
- Add caching for business data
- Use CDN for static assets
- Monitor with analytics tools

## 🐛 Troubleshooting

### Calls Not Being Made
- Check campaign status (should be "active")
- Verify call hours are correct
- Check daily call limit
- Review Twilio configuration

### No Businesses Found
- Try different location formats
- Check industry spelling
- Verify API keys (if using external APIs)

### Conversation Issues
- Review conversation logs
- Adjust pitch style in settings
- Update conversation engine prompts

## 📝 License

This project is part of the AI Shop application.

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## 📞 Support

For issues or questions:
- Check the troubleshooting section
- Review API documentation
- Check Twilio/telephony provider logs

---

**Note**: This is a demo system. For production use, ensure:
- Proper error handling
- Database persistence
- Authentication/authorization
- Rate limiting
- Compliance with local regulations
- Proper logging and monitoring


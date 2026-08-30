# OpenAI Integration Setup

Upgrade your cold calling bot to use GPT-4o for intelligent, natural conversations!

## 🚀 Quick Setup

### Step 1: Get OpenAI API Key

1. Go to https://platform.openai.com
2. Sign up or log in
3. Navigate to API Keys: https://platform.openai.com/api-keys
4. Click "Create new secret key"
5. Copy the key (starts with `sk-`)

### Step 2: Add to Environment Variables

Add to your `.env.local`:

```env
OPENAI_API_KEY=sk-your-api-key-here
OPENAI_MODEL=gpt-4o  # Optional: defaults to gpt-4o
```

### Step 3: Restart Server

```bash
npm run dev
```

## ✅ That's It!

The bot will automatically use OpenAI if the API key is configured, otherwise it falls back to the rule-based engine.

## 🎯 Benefits of OpenAI Version

- **Natural Conversations**: Responds contextually, not just pattern matching
- **Better Objection Handling**: Understands nuance and responds appropriately
- **Adaptive**: Handles unexpected responses gracefully
- **Smarter**: Learns from conversation context
- **More Human-like**: Can't tell it's AI

## 💰 Cost Considerations

OpenAI GPT-4o pricing (as of 2024):
- **Input**: ~$2.50 per 1M tokens
- **Output**: ~$10 per 1M tokens
- Average call: ~500-1000 tokens (~$0.01-0.02 per call)

**Tips**:
- Set `max_tokens` limit (default: 300)
- Monitor usage in OpenAI dashboard
- Set up usage alerts
- Use gpt-4o-mini for lower costs if needed

## 🔧 Configuration Options

### Change Model

In `.env.local`:
```env
OPENAI_MODEL=gpt-4o-mini  # Cheaper, still very good
# or
OPENAI_MODEL=gpt-4o       # Best quality (default)
```

### Adjust Temperature

Edit `lib/agent/openaiConversationEngine.ts`:
```typescript
temperature: 0.7,  // Lower = more consistent, Higher = more creative
```

### Adjust Max Tokens

```typescript
max_tokens: 300,  // Shorter responses for phone calls
```

## 🧪 Testing

1. Make a test call
2. Try unexpected responses
3. Notice how it adapts naturally
4. Compare with rule-based version

## 📊 Monitoring

- **OpenAI Dashboard**: https://platform.openai.com/usage
- Check token usage
- Monitor costs
- Review API errors

## 🔄 Fallback Behavior

If OpenAI API:
- Is not configured → Uses rule-based engine
- Fails → Falls back to rule-based engine
- Times out → Falls back to rule-based engine

Your bot will always work, even if OpenAI is unavailable!

## 🐛 Troubleshooting

### "OpenAI API key not found" warning

**Solution**: Add `OPENAI_API_KEY` to `.env.local` and restart server

### API errors

**Solution**: 
- Check API key is correct
- Verify you have credits in OpenAI account
- Check rate limits
- Review error logs

### Responses too long

**Solution**: Reduce `max_tokens` in the engine (default: 300)

### Responses not natural enough

**Solution**: 
- Increase `temperature` slightly (0.8-0.9)
- Adjust system prompt
- Use gpt-4o instead of gpt-4o-mini

## 📝 Customization

Edit `lib/agent/openaiConversationEngine.ts` to:
- Customize system prompt
- Adjust response style
- Add custom instructions
- Modify conversation flow

## ✅ Verification

After setup:
1. Check server logs for "OpenAI API key found"
2. Make a test call
3. Notice more natural responses
4. Check OpenAI dashboard for usage

---

**Note**: The bot automatically detects if OpenAI is configured and uses it. No code changes needed - just add the API key!


# ⚡ Quick Deploy - 5 Minutes to Production

Fastest way to get your AI Shop live.

## 🚀 Step-by-Step

### 1. Push to GitHub (2 minutes)

```powershell
# In your project folder
cd "C:\Users\gillp\CascadeProjects\AI shop"

# Initialize git (if not done)
git init
git add .
git commit -m "Production ready"

# Create repo at: https://github.com/new
# Name it: ai-shop
# Then run:
git remote add origin https://github.com/YOUR_USERNAME/ai-shop.git
git branch -M main
git push -u origin main
```

### 2. Deploy to Vercel (2 minutes)

1. Go to: **https://vercel.com**
2. Click **"Sign up"** → Use GitHub
3. Click **"Add New Project"**
4. Import your `ai-shop` repository
5. Click **"Deploy"** (don't add env vars yet)
6. Wait for build (~2 minutes)
7. **Copy your domain** (e.g., `ai-shop-xyz.vercel.app`)

### 3. Add Environment Variables (1 minute)

In Vercel → Your Project → Settings → Environment Variables:

**Add ALL of these:**

```
DATABASE_URL=postgresql://postgres.dggpzqhsrlhodqplycnv:Reet%401998@aws-0-us-west-2.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1&sslmode=require

TWILIO_ACCOUNT_SID=YOUR_TWILIO_ACCOUNT_SID
TWILIO_AUTH_TOKEN=YOUR_TWILIO_AUTH_TOKEN
TWILIO_PHONE_NUMBER=+16592223313
TWILIO_WEBHOOK_URL=https://YOUR_DOMAIN.vercel.app/api/agent/call/webhook

NEXTAUTH_URL=https://YOUR_DOMAIN.vercel.app
NEXTAUTH_SECRET=DSiuFWlzjN0mO8UvraJnoM9gqpRXLkhw

OPENAI_API_KEY=YOUR_OPENAI_API_KEY
OPENAI_MODEL=gpt-4o
```

**Replace `YOUR_DOMAIN` with your actual Vercel domain!**

### 4. Update Webhook URLs

After adding env vars, Vercel will auto-redeploy. Then:

1. Go back to Environment Variables
2. Update `TWILIO_WEBHOOK_URL` with your real domain
3. Update `NEXTAUTH_URL` with your real domain
4. Save (auto-redeploys)

### 5. Configure Twilio (1 minute)

1. Go to: **https://console.twilio.com**
2. Phone Numbers → Your number (`+16592223313`)
3. Configure → Voice
4. Set webhook: `https://your-domain.vercel.app/api/agent/call/webhook`
5. Save

### 6. Test! 🎉

1. Visit: `https://your-domain.vercel.app`
2. Go to `/agent/contacts`
3. Add your phone number
4. Click "Start Call"
5. Answer your phone!

---

## ✅ Done!

Your AI Shop is now live in production!

**Your URLs:**
- Homepage: ` https://your-domain.vercel.app`
- Agent: `https://your-domain.vercel.app/agent`
- Contacts: `https://your-domain.vercel.app/agent/contacts`

---

## 🆘 Troubleshooting

**Build fails?**
- Check Vercel build logs
- Ensure all env vars are added
- Verify DATABASE_URL format

**Webhook not working?**
- Check Twilio console → Monitor → Logs
- Verify webhook URL is correct
- Ensure HTTPS (not HTTP)

**Database errors?**
- Check Supabase connection
- Verify SSL mode enabled
- Check IP restrictions

---

**Need help? Check `PRODUCTION_LAUNCH.md` for detailed guide.**


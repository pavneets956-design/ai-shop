# 🚀 Production Launch Checklist

Complete step-by-step guide to launch your AI Shop + AI Agent to production.

## ✅ Pre-Launch Checklist

### 1. Code Preparation
- [x] Next.js config updated for production images
- [x] Prisma postinstall script added
- [ ] Code committed to GitHub
- [ ] All environment variables documented

### 2. Database Setup
- [x] Supabase database configured
- [x] Connection string ready
- [ ] Database migrations tested
- [ ] Backup strategy in place

### 3. API Keys & Secrets
- [x] Twilio Account SID
- [x] Twilio Auth Token
- [x] Twilio Phone Number
- [x] OpenAI API Key
- [x] Database URL
- [x] NextAuth Secret

---

## 🚀 Deployment Steps

### Step 1: Push to GitHub

```powershell
# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "Production ready - AI Shop + AI Agent"

# Create GitHub repo and push
# Go to: https://github.com/new
# Create repository, then:
git remote add origin https://github.com/YOUR_USERNAME/ai-shop.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel

1. **Go to:** https://vercel.com
2. **Sign up/Login** (use GitHub)
3. **Click "Add New Project"**
4. **Import your repository**
5. **Configure:**
   - Framework: Next.js (auto-detected)
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`

### Step 3: Add Environment Variables

In Vercel → Your Project → Settings → Environment Variables:

**Add these (copy from your .env.local):**

```
DATABASE_URL=postgresql://postgres.dggpzqhsrlhodqplycnv:Reet%401998@aws-0-us-west-2.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1&sslmode=require

TWILIO_ACCOUNT_SID=YOUR_TWILIO_ACCOUNT_SID
TWILIO_AUTH_TOKEN=YOUR_TWILIO_AUTH_TOKEN
TWILIO_PHONE_NUMBER=+16592223313
TWILIO_WEBHOOK_URL=https://YOUR_VERCEL_DOMAIN.vercel.app/api/agent/call/webhook

NEXTAUTH_URL=https://YOUR_VERCEL_DOMAIN.vercel.app
NEXTAUTH_SECRET=DSiuFWlzjN0mO8UvraJnoM9gqpRXLkhw

OPENAI_API_KEY=YOUR_OPENAI_API_KEY
OPENAI_MODEL=gpt-4o
```

**⚠️ Important:** Replace `YOUR_VERCEL_DOMAIN` with your actual Vercel domain after first deployment.

### Step 4: Deploy

1. Click **"Deploy"**
2. Wait 2-3 minutes for build
3. Copy your production URL (e.g., `ai-shop-abc123.vercel.app`)

### Step 5: Update Webhook URLs

After deployment, update these environment variables in Vercel with your actual domain:

1. Go to Vercel → Settings → Environment Variables
2. Update `TWILIO_WEBHOOK_URL` to: `https://your-actual-domain.vercel.app/api/agent/call/webhook`
3. Update `NEXTAUTH_URL` to: `https://your-actual-domain.vercel.app`
4. Redeploy (Vercel will auto-redeploy when env vars change)

### Step 6: Configure Twilio Webhook

1. Go to: https://console.twilio.com
2. Phone Numbers → Your number (`+16592223313`)
3. Configure → Voice Configuration
4. Set "A call comes in" to: `https://your-actual-domain.vercel.app/api/agent/call/webhook`
5. Method: `HTTP POST`
6. Save

### Step 7: Test Production

1. Visit: `https://your-domain.vercel.app`
2. Go to: `/agent/contacts`
3. Add a test contact
4. Make a test call
5. Verify everything works

---

## 🌐 Custom Domain (Optional but Recommended)

### Buy Domain
- **Namecheap:** https://www.namecheap.com (~$10-15/year)
- **Google Domains:** https://domains.google.com
- **Cloudflare:** https://www.cloudflare.com/products/registrar

### Add to Vercel

1. Vercel Dashboard → Project → Settings → Domains
2. Add your domain
3. Follow DNS instructions
4. Wait for DNS propagation (5-30 minutes)
5. Update environment variables with custom domain

---

## ✅ Post-Launch Checklist

- [ ] Production site accessible
- [ ] All pages load correctly
- [ ] Database connections working
- [ ] Twilio webhook receiving requests
- [ ] Test call successful
- [ ] Environment variables correct
- [ ] Custom domain configured (if using)
- [ ] SSL certificate active (automatic)

---

## 🔧 Production Optimizations

### 1. Enable Analytics
- Vercel Analytics (built-in)
- Google Analytics (optional)

### 2. Error Tracking
- Sentry (recommended)
- LogRocket

### 3. Monitoring
- Vercel Dashboard
- Twilio Console
- Supabase Dashboard

### 4. Backups
- Supabase has automatic backups
- Consider additional backup strategy

---

## 🎯 Your Production URLs

- **App:** `https://your-domain.vercel.app`
- **Agent Dashboard:** `https://your-domain.vercel.app/agent`
- **Contacts:** `https://your-domain.vercel.app/agent/contacts`
- **Calls:** `https://your-domain.vercel.app/agent/calls`
- **Leads:** `https://your-domain.vercel.app/agent/leads`

---

## 🚨 Important Notes

1. **Never commit `.env.local`** - it's in `.gitignore`
2. **Always use HTTPS** in production
3. **Test webhooks** before going live
4. **Monitor costs** (Twilio, OpenAI, Supabase)
5. **Set up alerts** for errors

---

## 📞 Support Resources

- **Vercel Docs:** https://vercel.com/docs
- **Twilio Docs:** https://www.twilio.com/docs
- **Supabase Docs:** https://supabase.com/docs
- **Next.js Docs:** https://nextjs.org/docs

---

**Ready to launch? Follow the steps above and you'll be live in 15 minutes! 🚀**


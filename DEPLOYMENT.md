# Production Deployment Guide

Complete guide to deploy your AI Shop + AI Agent to production.

## 🚀 Quick Deploy to Vercel (Recommended)

### Step 1: Prepare Your Code

1. **Commit your code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/ai-shop.git
   git push -u origin main
   ```

### Step 2: Deploy to Vercel

1. **Go to:** https://vercel.com
2. **Sign up/Login** with GitHub
3. **Click "Add New Project"**
4. **Import your GitHub repository**
5. **Configure Project:**
   - Framework Preset: **Next.js**
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)

### Step 3: Add Environment Variables in Vercel

In Vercel Dashboard → Your Project → Settings → Environment Variables, add:

```env
# Database
DATABASE_URL="postgresql://postgres.dggpzqhsrlhodqplycnv:Reet%401998@aws-0-us-west-2.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1&sslmode=require"

# Twilio
TWILIO_ACCOUNT_SID=YOUR_TWILIO_ACCOUNT_SID
TWILIO_AUTH_TOKEN=YOUR_TWILIO_AUTH_TOKEN
TWILIO_PHONE_NUMBER=+16592223313
TWILIO_WEBHOOK_URL=https://your-domain.vercel.app/api/agent/call/webhook

# NextAuth
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=DSiuFWlzjN0mO8UvraJnoM9gqpRXLkhw

# OpenAI
OPENAI_API_KEY=YOUR_OPENAI_API_KEY
OPENAI_MODEL=gpt-4o
```

**Important:** Replace `your-domain.vercel.app` with your actual Vercel domain after deployment.

### Step 4: Deploy

1. Click **"Deploy"**
2. Wait for build to complete (~2-3 minutes)
3. Copy your production URL (e.g., `ai-shop-xyz.vercel.app`)

### Step 5: Update Twilio Webhook

1. Go to: https://console.twilio.com
2. Phone Numbers → Your number (`+16592223313`)
3. Configure → Voice Configuration
4. Set "A call comes in" to: `https://your-domain.vercel.app/api/agent/call/webhook`
5. Save

### Step 6: Update Environment Variables

After deployment, update `TWILIO_WEBHOOK_URL` and `NEXTAUTH_URL` in Vercel with your actual domain.

### Step 7: Run Database Migrations

After first deployment, run:
```bash
npx prisma generate
npx prisma db push
```

Or use Vercel's build command to auto-generate Prisma client.

---

## 🌐 Custom Domain Setup (Optional)

### Option 1: Use Vercel's Free Domain

Vercel gives you a free domain like `your-app.vercel.app` - this works perfectly!

### Option 2: Add Custom Domain

1. **Buy a domain** (Namecheap, Google Domains, Cloudflare - ~$10-15/year)
2. **In Vercel Dashboard:**
   - Go to Project → Settings → Domains
   - Add your domain
   - Follow DNS configuration instructions
3. **Update environment variables** with your custom domain

---

## ✅ Post-Deployment Checklist

- [ ] App deployed to Vercel
- [ ] All environment variables added
- [ ] Database migrations run
- [ ] Twilio webhook updated to production URL
- [ ] Test call works from production
- [ ] Custom domain configured (if using)
- [ ] SSL certificate active (automatic with Vercel)

---

## 🔧 Production Optimizations

### 1. Enable Prisma in Build

Vercel will auto-detect Prisma, but ensure `postinstall` script:

```json
"scripts": {
  "postinstall": "prisma generate"
}
```

### 2. Database Connection Pooling

Your Supabase connection already uses pooling - perfect for production!

### 3. Environment-Specific Settings

- Development: Use `.env.local`
- Production: Use Vercel Environment Variables

---

## 🐛 Troubleshooting

### Build Fails

- Check Vercel build logs
- Ensure all environment variables are set
- Verify `DATABASE_URL` is correct

### Database Connection Issues

- Check Supabase connection string
- Verify SSL mode is enabled
- Check IP restrictions in Supabase

### Twilio Webhook Not Working

- Verify webhook URL is publicly accessible
- Check Twilio logs in console
- Ensure HTTPS (not HTTP)

---

## 📊 Monitoring

- **Vercel Analytics:** Built-in performance monitoring
- **Twilio Console:** Monitor calls and webhooks
- **Supabase Dashboard:** Database performance

---

## 🚀 Next Steps After Launch

1. Set up error tracking (Sentry, LogRocket)
2. Add analytics (Google Analytics, Plausible)
3. Set up monitoring alerts
4. Configure backups
5. Set up CI/CD for automatic deployments

---

**Your app will be live at:** `https://your-app.vercel.app`


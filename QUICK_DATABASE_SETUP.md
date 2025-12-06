# Quick Database Setup - 5 Minutes

## 🚀 Fastest Way: Use Supabase (Free)

### Step 1: Get Free Database (2 minutes)

1. Go to: https://supabase.com
2. Click "Start your project" → Sign up (free)
3. Click "New Project"
4. Fill in:
   - Name: `ai-shop` (or any name)
   - Database Password: Create a strong password (save it!)
   - Region: Choose closest to you
5. Click "Create new project"
6. Wait 2 minutes for setup

### Step 2: Get Connection String (1 minute)

1. In Supabase dashboard, click **Settings** (gear icon)
2. Click **Database** in left menu
3. Scroll to **Connection string**
4. Click **URI** tab
5. Copy the connection string (looks like):
   ```
   postgresql://postgres.xxxxx:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
   ```
6. **Replace `[YOUR-PASSWORD]`** with the password you created in Step 1

### Step 3: Add to .env.local (1 minute)

1. Open `.env.local` file in your project
2. Add this line (paste your connection string):
   ```env
   DATABASE_URL="postgresql://postgres.xxxxx:your_actual_password@aws-0-us-east-1.pooler.supabase.com:6543/postgres"
   ```
3. **Important**: 
   - Keep the quotes `" "`
   - Replace `your_actual_password` with your real password
   - Save the file

### Step 4: Run Commands (1 minute)

Open your terminal in the project folder and run:

```bash
# Generate Prisma client
npx prisma generate

# Create database tables
npx prisma db push
```

**Expected output:**
```
✔ Generated Prisma Client
✔ Pushed database schema
```

### Step 5: Done! ✅

Restart your server:
```bash
npm run dev
```

Now your calls will be saved to the database!

---

## 📋 Alternative: Other Free Databases

### Railway (railway.app)
- Sign up → New → Database → PostgreSQL
- Copy connection string
- Add to .env.local

### Neon (neon.tech)
- Sign up → Create Project
- Copy connection string
- Add to .env.local

---

## ✅ Verify It Works

1. Make a test call
2. Go to: `http://localhost:3000/agent/calls`
3. You should see your call with full transcript!

---

## 🆘 Troubleshooting

**"Can't reach database"**
- Check DATABASE_URL in .env.local
- Make sure password is correct
- Restart server after adding URL

**"Prisma error"**
- Run: `npx prisma generate`
- Then: `npx prisma db push`

**Need help?** See `DATABASE_SETUP.md` for detailed guide.


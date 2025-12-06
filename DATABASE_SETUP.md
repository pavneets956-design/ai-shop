# Database Setup Guide - Step by Step

Complete guide to set up your PostgreSQL database for the cold calling bot.

## Step 1: Choose Your Database Provider

You have several options:

### Option A: Local PostgreSQL (Advanced)
- Install PostgreSQL on your computer
- Create a database manually
- Use localhost connection

### Option B: Cloud Database (Recommended - Easiest)
- **Supabase** (Free tier available): https://supabase.com
- **Railway** (Free tier): https://railway.app
- **Neon** (Free tier): https://neon.tech
- **Vercel Postgres**: If deploying on Vercel

## Step 2: Get Your Database URL

### If using Supabase (Recommended):

1. **Sign up**: Go to https://supabase.com and create a free account
2. **Create Project**: Click "New Project"
3. **Get Connection String**:
   - Go to Project Settings → Database
   - Scroll to "Connection string"
   - Copy the "URI" (it looks like: `postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres`)
   - Replace `[YOUR-PASSWORD]` with your actual database password

### If using Railway:

1. **Sign up**: Go to https://railway.app
2. **Create PostgreSQL**: Click "New" → "Database" → "PostgreSQL"
3. **Get Connection String**: Click on your database → "Connect" → Copy the "Postgres Connection URL"

### If using Neon:

1. **Sign up**: Go to https://neon.tech
2. **Create Project**: Click "Create Project"
3. **Get Connection String**: Copy the connection string from the dashboard

## Step 3: Add Database URL to .env.local

### Step 3.1: Open .env.local File

**Method 1: Using VS Code / Cursor**
1. In your project folder, look for `.env.local` file
2. If it doesn't exist, create a new file named `.env.local`
3. Open it

**Method 2: Using File Explorer**
1. Navigate to: `C:\Users\gillp\CascadeProjects\AI shop`
2. Create a new text file
3. Rename it to `.env.local` (make sure to include the dot at the start)

**Method 3: Using PowerShell**
```powershell
cd "C:\Users\gillp\CascadeProjects\AI shop"
notepad .env.local
```

### Step 3.2: Add Database URL

Paste this into your `.env.local` file:

```env
# Database Connection
DATABASE_URL="postgresql://user:password@host:5432/database_name"
```

**Replace with your actual connection string:**

Example for Supabase:
```env
DATABASE_URL="postgresql://postgres.xxxxx:your_password@aws-0-us-east-1.pooler.supabase.com:6543/postgres"
```

Example for Railway:
```env
DATABASE_URL="postgresql://postgres:password@containers-us-west-xxx.railway.app:5432/railway"
```

**Important**: 
- Keep the quotes around the URL
- Replace `your_password` with your actual password
- Don't share this file or commit it to git

## Step 4: Install Prisma Client

Open your terminal in the project folder and run:

```bash
npm install @prisma/client
```

(This should already be installed, but run it to be sure)

## Step 5: Generate Prisma Client

```bash
npx prisma generate
```

This creates the Prisma client based on your schema.

## Step 6: Push Database Schema

This creates all the tables in your database:

```bash
npx prisma db push
```

This will:
- Create all tables (Contact, Campaign, Call, Lead)
- Set up relationships
- Create indexes

**Expected output:**
```
✔ Generated Prisma Client
✔ Pushed database schema
```

## Step 7: Verify Database Connection

Test if everything works:

```bash
npx prisma studio
```

This opens a visual database browser at `http://localhost:5555`

You should see your tables:
- Contact
- Campaign
- Call
- Lead

## Step 8: Restart Your Server

After setting up the database:

```bash
# Stop your current server (Ctrl+C)
# Then restart:
npm run dev
```

## Troubleshooting

### Error: "Can't reach database server"

**Solution:**
- Check your DATABASE_URL is correct
- Make sure your database is running (if local)
- Check firewall settings
- Verify database credentials

### Error: "Environment variable not found"

**Solution:**
- Make sure `.env.local` is in the project root
- Check the file is named exactly `.env.local` (with the dot)
- Restart your server after adding the variable

### Error: "Schema validation error"

**Solution:**
- Run `npx prisma generate` first
- Then run `npx prisma db push`

### Error: "Table already exists"

**Solution:**
- This is normal if you've run it before
- The command will update existing tables
- Or reset: `npx prisma migrate reset` (⚠️ deletes all data)

## Quick Setup Commands (Copy & Paste)

```bash
# 1. Make sure you're in the project folder
cd "C:\Users\gillp\CascadeProjects\AI shop"

# 2. Generate Prisma client
npx prisma generate

# 3. Push schema to database
npx prisma db push

# 4. (Optional) Open database browser
npx prisma studio
```

## What Gets Created

After setup, your database will have:

1. **Contact** table - Stores business contacts
2. **Campaign** table - Stores campaign configurations
3. **Call** table - Stores all call records and transcripts
4. **Lead** table - Stores generated leads

## Next Steps

Once database is set up:
1. ✅ Make a test call
2. ✅ Check `/agent/calls` to see saved conversations
3. ✅ View leads at `/agent/leads`

## Need Help?

- **Supabase Docs**: https://supabase.com/docs
- **Prisma Docs**: https://www.prisma.io/docs
- **Railway Docs**: https://docs.railway.app

---

**Quick Tip**: If you're just testing, you can use Supabase's free tier - it's perfect for development and gives you a database URL instantly!


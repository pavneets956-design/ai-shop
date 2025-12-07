# NextAuth Setup Complete ✅

## What's Been Done

1. ✅ **Prisma Schema Updated**
   - Added NextAuth models: `Account`, `Session`, `VerificationToken`
   - Updated `User` model to include NextAuth relations
   - Made `password` optional for OAuth users

2. ✅ **NextAuth API Route Created**
   - `/app/api/auth/[...nextauth]/route.ts`
   - Configured with Google OAuth provider
   - Uses Prisma adapter for database sessions

3. ✅ **Login Page Updated**
   - Shows signup first (default)
   - Google OAuth button prominently displayed
   - Email/password option below

4. ✅ **Session Provider Added**
   - Wrapped app with `SessionProvider` in layout

5. ✅ **SQL File Created**
   - `SUPABASE_NEXTAUTH_TABLES.sql` - ready to run in Supabase

## Next Steps

### 1. Install Prisma Adapter

```powershell
npm install @next-auth/prisma-adapter
```

### 2. Run SQL in Supabase

1. Go to **Supabase Dashboard → SQL Editor**
2. Open `SUPABASE_NEXTAUTH_TABLES.sql`
3. Copy and paste the SQL
4. Click **Run**

This creates:
- `Account` table
- `Session` table  
- `VerificationToken` table
- Updates `User` table (makes password optional)

### 3. Get Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select existing)
3. Enable **Google+ API**
4. Go to **Credentials → Create Credentials → OAuth 2.0 Client ID**
5. Application type: **Web application**
6. Authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (for local)
   - `https://aitechshop.org/api/auth/callback/google` (for production)
7. Copy **Client ID** and **Client Secret**

### 4. Add to `.env.local`

```env
# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here

# NextAuth (already have these)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET=DSiuFWlzjN0mO8UvraJnoM9gqpRXLkhw
```

### 5. Add to Vercel Environment Variables

1. Go to **Vercel Dashboard → Your Project → Settings → Environment Variables**
2. Add:
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
   - Update `NEXTAUTH_URL` to `https://aitechshop.org`

### 6. Test Locally

```powershell
npm run dev
```

Visit `http://localhost:3000/login` and try "Sign up with Google"

## Files Created/Modified

- ✅ `prisma/schema.prisma` - Added NextAuth models
- ✅ `app/api/auth/[...nextauth]/route.ts` - NextAuth API route
- ✅ `app/login/page.tsx` - Updated with Google button
- ✅ `components/Providers.tsx` - Session provider wrapper
- ✅ `app/layout.tsx` - Added Providers wrapper
- ✅ `lib/auth.ts` - Auth helper functions
- ✅ `SUPABASE_NEXTAUTH_TABLES.sql` - SQL for Supabase

## After Setup

Once Google OAuth is configured:
- Users can sign up/sign in with Google
- Sessions stored in database
- Protected routes can use `getSession()` from `lib/auth.ts`


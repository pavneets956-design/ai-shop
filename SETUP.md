# Quick Setup Guide

Follow these steps to get your AI Shop up and running:

## 1. Install Dependencies

```bash
npm install
```

## 2. Set Up Database

### Option A: Local PostgreSQL

1. Install PostgreSQL on your machine
2. Create a database:
   ```sql
   CREATE DATABASE ai_shop;
   ```

### Option B: Cloud Database (Recommended for Quick Start)

Use a free cloud database service:
- **Supabase**: https://supabase.com (Free tier available)
- **Railway**: https://railway.app (Free tier available)
- **Neon**: https://neon.tech (Free tier available)

## 3. Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and add your database URL:
   ```
   DATABASE_URL="postgresql://user:password@host:5432/ai_shop"
   ```

3. Generate a secret for NextAuth (you can use any random string):
   ```bash
   openssl rand -base64 32
   ```
   Add it to `.env.local` as `NEXTAUTH_SECRET`

## 4. Initialize Database

```bash
# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push
```

## 5. Start Development Server

```bash
npm run dev
```

Visit http://localhost:3000 to see your AI Shop!

## 6. (Optional) Add Sample Data

To add sample products to your database, you can use Prisma Studio:

```bash
npx prisma studio
```

This opens a GUI where you can add users, products, and other data.

## Next Steps

1. **Set up Authentication**: Configure NextAuth.js with your preferred provider (Google, GitHub, Email, etc.)
2. **Add Payment Processing**: Set up Stripe account and add keys to `.env.local`
3. **Configure File Storage**: Set up AWS S3 or Cloudinary for storing AI system files
4. **Deploy**: Deploy to Vercel, Railway, or your preferred platform

## Troubleshooting

### Database Connection Issues

- Make sure PostgreSQL is running
- Check that your DATABASE_URL is correct
- Ensure your database user has proper permissions

### Port Already in Use

If port 3000 is busy, Next.js will automatically use the next available port.

### Prisma Errors

If you get Prisma errors:
```bash
# Reset the client
npx prisma generate
```

## Need Help?

Check the main README.md for more detailed information about the project structure and features.


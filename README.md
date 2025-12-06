# AI Shop - Automated Systems Marketplace

A modern marketplace platform for creating, selling, and purchasing AI automated systems. Build profitable AI businesses with tools like AI receptionists, content creators, customer support bots, and more.

## Features

- 🛍️ **Browse & Discover**: Explore hundreds of AI automation systems across multiple categories
- 🎨 **Create & Sell**: Easy-to-use interface for creators to build and monetize their AI systems
- 💰 **Monetization Ready**: Built-in payment processing and subscription management
- 📊 **Dashboard**: Track sales, revenue, and analytics for your AI systems
- 🔍 **Advanced Search**: Find the perfect AI system with category filters and search
- ⭐ **Reviews & Ratings**: Social proof system for all products
- 📱 **Responsive Design**: Beautiful, modern UI that works on all devices

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js (ready for integration)
- **Payments**: Stripe (ready for integration)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database (or use a cloud provider like Supabase, Railway, etc.)
- npm or yarn package manager

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   Create a `.env.local` file in the root directory:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/ai_shop"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here"
   STRIPE_SECRET_KEY="your-stripe-secret-key"
   STRIPE_PUBLIC_KEY="your-stripe-public-key"
   ```

3. **Set up the database**:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
ai-shop/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Homepage
│   ├── products/          # Product browsing
│   ├── create/            # Create new AI system
│   ├── dashboard/         # Creator dashboard
│   └── about/             # About page
├── components/            # Reusable React components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── ProductCard.tsx
│   └── ...
├── prisma/               # Database schema
│   └── schema.prisma
└── public/               # Static assets
```

## Key Features Explained

### For Buyers

- Browse AI systems by category (Communication, Content, Support, Marketing, etc.)
- Search and filter products
- View detailed product pages with features and descriptions
- Purchase and download AI systems
- Leave reviews and ratings

### For Creators

- Create and publish AI automation systems
- Set pricing and manage inventory
- Track sales and revenue in dashboard
- View analytics and performance metrics
- Manage product listings

## Example AI Systems

The platform supports various types of AI automation systems:

- **AI Receptionist**: 24/7 call handling and appointment scheduling
- **Content Creator AI**: Automated blog posts, social media content
- **Customer Support Bot**: Automated support ticket resolution
- **Email Marketing Automation**: Intelligent campaign management
- **Social Media Scheduler**: Optimal posting time optimization
- **Inventory Management AI**: Automated tracking and reordering

## Next Steps

1. **Set up authentication**: Implement NextAuth.js with your preferred provider
2. **Configure payments**: Add Stripe keys and set up payment processing
3. **Add file upload**: Implement storage for AI system files (AWS S3, Cloudinary, etc.)
4. **Set up email**: Configure email service for notifications
5. **Deploy**: Deploy to Vercel, Railway, or your preferred platform

## Contributing

This is a starting template. Feel free to customize and extend it for your needs!

## License

MIT License - feel free to use this project for your own purposes.

## Support

For questions or issues, please open an issue on the repository.

---

Built with ❤️ for creators and entrepreneurs who want to monetize AI automation.


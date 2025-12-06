import Link from "next/link";
import { Star, DollarSign, User, CheckCircle, ArrowLeft, ShoppingCart } from "lucide-react";
import { notFound } from "next/navigation";

// Mock product data - in production, this would come from a database
const products: Record<string, any> = {
  "1": {
    id: "1",
    title: "AI Receptionist Pro",
    description: "24/7 intelligent receptionist that handles calls, schedules appointments, and manages inquiries automatically. Perfect for small businesses, medical offices, and service providers.",
    longDescription: `Transform your business with our AI Receptionist Pro - a comprehensive solution that never sleeps. 

**Key Features:**
- 24/7 call handling with natural language processing
- Automatic appointment scheduling and calendar management
- Multi-language support (15+ languages)
- Customizable voice and personality
- Integration with major CRM platforms
- Detailed call analytics and reporting
- Voicemail transcription and email notifications

**Perfect For:**
- Medical and dental offices
- Law firms and consultants
- Service-based businesses
- Real estate agencies
- Educational institutions

**How It Works:**
Simply integrate our API into your phone system, customize the AI's responses and personality, and let it handle calls while you focus on growing your business. The system learns from each interaction to improve over time.

**Monetization:**
You can resell this system to clients, charge subscription fees, or offer it as a white-label solution. Complete source code and documentation included.`,
    price: 99,
    pricingType: "monthly" as const,
    category: "Communication",
    rating: 4.8,
    reviews: 342,
    creator: "TechSolutions AI",
    imageUrl: "https://images.unsplash.com/photo-1556155092-490a1ba16284?w=1200&h=800&fit=crop&auto=format",
    features: [
      "24/7 availability",
      "Multi-language support",
      "CRM integration",
      "Call analytics",
      "Customizable personality",
      "Voicemail transcription",
    ],
  },
  "2": {
    id: "2",
    title: "Content Creator AI",
    description: "Generate engaging blog posts, social media content, and marketing copy in seconds.",
    price: 149,
    pricingType: "monthly" as const,
    category: "Content",
    rating: 4.9,
    reviews: 521,
    creator: "ContentGen Studio",
    imageUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&h=800&fit=crop&auto=format",
    features: [
      "Blog post generation",
      "Social media content",
      "SEO optimization",
      "Multiple content formats",
      "Brand voice customization",
      "Content calendar",
    ],
  },
};

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = products[params.id];

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-12 pt-32">
      <div className="max-w-7xl mx-auto px-4">
        <Link
          href="/products"
          className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors font-light"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="card mb-6">
              <h1 className="text-5xl font-light text-white mb-4">{product.title}</h1>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 mr-1" />
                  <span className="font-semibold text-white">{product.rating}</span>
                  <span className="text-gray-400 ml-2">({product.reviews} reviews)</span>
                </div>
                <div className="flex items-center text-gray-400 font-light">
                  <User className="w-4 h-4 mr-1" />
                  <span>{product.creator}</span>
                </div>
              </div>

              <div className="relative w-full h-96 rounded-xl mb-6 overflow-hidden">
                <img
                  src={product.imageUrl || `https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=800&fit=crop&auto=format`}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>

              <div className="prose max-w-none prose-invert">
                <h2 className="text-2xl font-light text-white mb-4">Description</h2>
                <p className="text-gray-400 mb-4 font-light">{product.description}</p>
                <div className="whitespace-pre-wrap text-gray-400 font-light leading-relaxed">
                  {product.longDescription || product.description}
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="card">
              <h2 className="text-2xl font-light text-white mb-4">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.features.map((feature: string, index: number) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-400 font-light">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="card sticky top-24">
              <div className="mb-6">
                <div className="flex items-baseline mb-2">
                  <DollarSign className="w-6 h-6 text-white" />
                  <span className="text-4xl font-bold text-white ml-1">{product.price}</span>
                  <span className="text-gray-400 ml-2 text-lg">
                    {product.pricingType === "monthly" && "/month"}
                    {product.pricingType === "annual" && "/year"}
                    {product.pricingType === "one-time" && "one-time"}
                  </span>
                </div>
                {product.pricingType === "monthly" && (
                  <div className="text-sm text-gray-400 mb-2">
                    Billed monthly • Cancel anytime
                  </div>
                )}
                {product.pricingType === "annual" && (
                  <div className="text-sm text-gray-400 mb-2">
                    Billed annually • Save 20%
                  </div>
                )}
                {product.pricingType === "one-time" && (
                  <div className="text-sm text-gray-400 mb-2">
                    One-time purchase • Lifetime access
                  </div>
                )}
                <div className="text-sm text-gray-400">
                  {product.pricingType === "one-time" 
                    ? "Includes source code, documentation, and 1 year of updates"
                    : "Includes full access, updates, and support"}
                </div>
              </div>

              <div className="space-y-3">
                <button className="w-full btn-primary flex items-center justify-center gap-2 py-3">
                  <ShoppingCart className="w-5 h-5" />
                  Purchase Now
                </button>
                <button className="w-full btn-secondary">
                  Request Demo
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-white/10">
                <h3 className="font-light text-white mb-3">What's Included</h3>
                <ul className="space-y-2 text-sm text-gray-400 font-light">
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                    Complete source code
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                    Full documentation
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                    1 year of updates
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                    Email support
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                    Commercial license
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


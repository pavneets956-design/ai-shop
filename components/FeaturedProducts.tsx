import ProductCard from "./ProductCard";

const featuredProducts = [
  {
    id: "1",
    title: "AI Receptionist Pro",
    description: "24/7 intelligent receptionist that handles calls, schedules appointments, and manages inquiries automatically.",
    price: 99,
    pricingType: "monthly" as const,
    category: "Communication",
    rating: 4.8,
    reviews: 342,
    creator: "TechSolutions AI",
    imageUrl: "https://images.unsplash.com/photo-1556155092-490a1ba16284?w=800&h=600&fit=crop&auto=format",
  },
  {
    id: "2",
    title: "Content Creator AI",
    description: "Generate engaging blog posts, social media content, and marketing copy in seconds. Fully customizable templates.",
    price: 149,
    pricingType: "monthly" as const,
    category: "Content",
    rating: 4.9,
    reviews: 521,
    creator: "ContentGen Studio",
    imageUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=600&fit=crop&auto=format",
  },
  {
    id: "3",
    title: "Customer Support Bot",
    description: "Advanced chatbot that resolves customer issues, processes returns, and escalates complex cases seamlessly.",
    price: 199,
    pricingType: "monthly" as const,
    category: "Support",
    rating: 4.7,
    reviews: 289,
    creator: "SupportBot Inc",
    imageUrl: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop&auto=format",
  },
];

export default function FeaturedProducts() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {featuredProducts.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}

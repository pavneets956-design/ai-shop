"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { Search, Filter } from "lucide-react";

// Mock products - in production, this would come from a database
const allProducts = [
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
  {
    id: "4",
    title: "Email Marketing Automation",
    description: "Intelligent email campaigns that adapt to user behavior and maximize engagement rates.",
    price: 129,
    pricingType: "monthly" as const,
    category: "Marketing",
    rating: 4.6,
    reviews: 198,
    creator: "EmailPro AI",
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop&auto=format",
  },
  {
    id: "5",
    title: "Social Media Scheduler",
    description: "AI-powered content scheduling that finds optimal posting times and maximizes reach.",
    price: 79,
    pricingType: "monthly" as const,
    category: "Content",
    rating: 4.5,
    reviews: 312,
    creator: "SocialAI Tools",
    imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop&auto=format",
  },
  {
    id: "6",
    title: "Inventory Management AI",
    description: "Automated inventory tracking, reorder predictions, and supply chain optimization.",
    price: 249,
    pricingType: "monthly" as const,
    category: "E-commerce",
    rating: 4.9,
    reviews: 156,
    creator: "InventoryAI",
    imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop&auto=format",
  },
];

const categories = ["All", "Communication", "Content", "Support", "Marketing", "E-commerce"];

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-12 pt-32">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-16 text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-light text-white mb-4">Browse AI Systems</h1>
          <p className="text-lg text-gray-400 max-w-2xl font-light">
            Discover powerful AI automation tools to transform your business
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Search AI systems..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-transparent border border-white/10 rounded-lg focus:ring-1 focus:ring-white/20 focus:border-white/20 text-white placeholder-gray-500 font-light"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-light text-sm whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? "bg-white text-black"
                    : "border border-white/10 text-gray-400 hover:text-white hover:border-white/20"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <div className="mb-6 text-gray-400">
          Found <span className="text-cyan-400 font-semibold">{filteredProducts.length}</span> {filteredProducts.length === 1 ? "system" : "systems"}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-400">No products found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}


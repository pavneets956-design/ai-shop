import Link from "next/link";
import { Star, DollarSign, User } from "lucide-react";
import { productImages } from "@/lib/productImages";

interface ProductCardProps {
  id: string;
  title: string;
  description: string;
  price: number;
  pricingType?: "one-time" | "monthly" | "annual";
  category: string;
  rating: number;
  reviews: number;
  creator: string;
  imageUrl?: string;
}

export default function ProductCard({
  id,
  title,
  description,
  price,
  pricingType = "monthly",
  category,
  rating,
  reviews,
  creator,
  imageUrl,
}: ProductCardProps) {
  const finalImage = imageUrl || productImages[id] || "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop&auto=format";

  return (
    <Link href={`/products/${id}`}>
      <div className="group cursor-pointer h-full flex flex-col relative">
        {/* Product Image - Cosmos.so style */}
        <div className="relative w-full aspect-[4/3] mb-4 overflow-hidden rounded-lg">
          <img
            src={finalImage}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Product Info */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-500 uppercase tracking-wide">{category}</span>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-gray-400 fill-gray-400" />
              <span className="text-xs text-gray-400">{rating.toFixed(1)}</span>
            </div>
          </div>
          
          <h3 className="text-lg font-light text-white mb-2 group-hover:text-gray-300 transition-colors line-clamp-1">
            {title}
          </h3>
          
          <p className="text-sm text-gray-500 mb-4 line-clamp-2 flex-1 leading-relaxed">
            {description}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <div className="flex items-center text-xs text-gray-500">
              <User className="w-3 h-3 mr-1" />
              <span>{creator}</span>
            </div>
            <div className="text-right">
              <div className="flex items-center text-white font-light">
                <span className="text-lg">${price}</span>
                <span className="text-xs text-gray-500 ml-1">
                  {pricingType === "monthly" && "/mo"}
                  {pricingType === "annual" && "/yr"}
                  {pricingType === "one-time" && ""}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

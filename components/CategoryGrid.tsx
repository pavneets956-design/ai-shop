import Link from "next/link";
import { Phone, FileText, Headphones, ShoppingCart, Mail, BarChart3 } from "lucide-react";

const categories = [
  {
    name: "Communication",
    icon: Phone,
    description: "AI receptionists, call handlers, and communication assistants",
    count: 120,
  },
  {
    name: "Content Creation",
    icon: FileText,
    description: "Blog writers, social media managers, and content generators",
    count: 95,
  },
  {
    name: "Customer Support",
    icon: Headphones,
    description: "Support bots, helpdesk automation, and ticket systems",
    count: 78,
  },
  {
    name: "E-commerce",
    icon: ShoppingCart,
    description: "Product recommenders, inventory managers, and sales bots",
    count: 65,
  },
  {
    name: "Marketing",
    icon: Mail,
    description: "Email automation, lead generators, and campaign managers",
    count: 82,
  },
  {
    name: "Analytics",
    icon: BarChart3,
    description: "Data processors, report generators, and insights tools",
    count: 54,
  },
];

export default function CategoryGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {categories.map((category) => {
        const Icon = category.icon;
        return (
          <Link
            key={category.name}
            href={`/products?category=${category.name.toLowerCase()}`}
            className="group"
          >
            <div className="border border-white/10 rounded-lg p-6 hover:border-white/20 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <Icon className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
                <span className="text-xs text-gray-500">{category.count}</span>
              </div>
              <h3 className="text-xl font-light text-white mb-2 group-hover:text-gray-300 transition-colors">
                {category.name}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {category.description}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

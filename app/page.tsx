import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FeaturedProducts from "@/components/FeaturedProducts";
import CategoryGrid from "@/components/CategoryGrid";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Hero Section - Cosmos.so Style */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Floating Background Images - Cosmos.so style */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-[8%] left-[3%] w-48 h-64 opacity-20 rotate-12 animate-float">
            <img
              src="https://images.unsplash.com/photo-1556155092-490a1ba16284?w=400&h=500&fit=crop&auto=format"
              alt=""
              className="w-full h-full object-cover rounded-lg shadow-2xl"
            />
          </div>
          <div className="absolute top-[25%] right-[8%] w-56 h-72 opacity-15 -rotate-6 animate-float" style={{ animationDelay: '1s' }}>
            <img
              src="https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=500&fit=crop&auto=format"
              alt=""
              className="w-full h-full object-cover rounded-lg shadow-2xl"
            />
          </div>
          <div className="absolute bottom-[18%] left-[12%] w-52 h-[272px] opacity-18 rotate-[-12deg] animate-float" style={{ animationDelay: '2s' }}>
            <img
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=500&fit=crop&auto=format"
              alt=""
              className="w-full h-full object-cover rounded-lg shadow-2xl"
            />
          </div>
          <div className="absolute top-[55%] right-[18%] w-44 h-[240px] opacity-12 rotate-12 animate-float" style={{ animationDelay: '0.5s' }}>
            <img
              src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=500&fit=crop&auto=format"
              alt=""
              className="w-full h-full object-cover rounded-lg shadow-2xl"
            />
          </div>
          <div className="absolute bottom-[30%] right-[5%] w-[200px] h-[260px] opacity-16 -rotate-6 animate-float" style={{ animationDelay: '1.5s' }}>
            <img
              src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=500&fit=crop&auto=format"
              alt=""
              className="w-full h-full object-cover rounded-lg shadow-2xl"
            />
          </div>
          <div className="absolute top-[35%] left-[25%] w-40 h-[220px] opacity-14 rotate-8 animate-float" style={{ animationDelay: '0.8s' }}>
            <img
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=500&fit=crop&auto=format"
              alt=""
              className="w-full h-full object-cover rounded-lg shadow-2xl"
            />
          </div>
          <div className="absolute bottom-[40%] left-[35%] w-36 h-[200px] opacity-10 -rotate-10 animate-float" style={{ animationDelay: '2.5s' }}>
            <img
              src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=500&fit=crop&auto=format"
              alt=""
              className="w-full h-full object-cover rounded-lg shadow-2xl"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-8xl md:text-[120px] font-light tracking-tight text-white mb-4">
            AI SHOP
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto font-light">
            A marketplace for AI automated systems
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/products" className="btn-primary text-base flex items-center gap-2">
              Browse
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/create" className="btn-secondary text-base">
              Create System
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-gray-500 text-sm">
          <div className="flex flex-col items-center gap-2">
            <span>Scroll to explore</span>
            <div className="w-4 h-8 border border-gray-600 rounded-full flex justify-center p-1">
              <div className="w-1 h-2 bg-gray-500 rounded-full animate-bounce"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collections Section - Cosmos.so style */}
      <section className="relative py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-white mb-4">
              Featured Collections
            </h2>
            <p className="text-gray-400 text-lg">
              Curated AI systems ready to transform your business
            </p>
          </div>
          <FeaturedProducts />
        </div>
      </section>

      {/* Categories Section */}
      <section className="relative py-32 px-4 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-white mb-4">
              Explore by Category
            </h2>
            <p className="text-gray-400 text-lg">
              Find the perfect AI solution for your needs
            </p>
          </div>
          <CategoryGrid />
        </div>
      </section>

      {/* CTA Section - Cosmos.so style */}
      <section className="relative py-32 px-4 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
            Start your journey
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            We welcome you to join us.
          </p>
          <Link href="/create" className="btn-primary inline-flex items-center gap-2">
            Get Started
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

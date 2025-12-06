import Link from "next/link";
import { Bot, Target, Users, Zap } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] py-12 pt-32">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-light text-white mb-4">About AI Shop</h1>
          <p className="text-xl text-gray-400 font-light">
            Empowering creators to build and monetize AI automation systems
          </p>
        </div>

        <div className="border border-white/10 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-light text-white mb-6">Our Mission</h2>
          <p className="text-gray-400 mb-4 font-light leading-relaxed">
            AI Shop was created to democratize access to AI automation technology. We believe that 
            anyone with a great idea should be able to create, share, and monetize AI systems without 
            needing extensive technical knowledge or huge upfront investments.
          </p>
          <p className="text-gray-400 font-light leading-relaxed">
            Whether you're building an AI receptionist, content creator, customer support bot, or 
            any other automated system, AI Shop provides the platform, tools, and community you need 
            to turn your ideas into profitable businesses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="border border-white/10 rounded-lg p-6">
            <Bot className="w-8 h-8 text-gray-400 mb-4" />
            <h3 className="text-xl font-light text-white mb-2">Easy to Use</h3>
            <p className="text-gray-400 font-light leading-relaxed">
              Our platform makes it simple to create, customize, and deploy AI systems with 
              intuitive tools and comprehensive documentation.
            </p>
          </div>

          <div className="border border-white/10 rounded-lg p-6">
            <Target className="w-8 h-8 text-gray-400 mb-4" />
            <h3 className="text-xl font-light text-white mb-2">Focused on Success</h3>
            <p className="text-gray-400 font-light leading-relaxed">
              We provide everything you need to monetize your creations, from payment processing 
              to marketing tools and analytics.
            </p>
          </div>

          <div className="border border-white/10 rounded-lg p-6">
            <Users className="w-8 h-8 text-gray-400 mb-4" />
            <h3 className="text-xl font-light text-white mb-2">Growing Community</h3>
            <p className="text-gray-400 font-light leading-relaxed">
              Join thousands of creators who are already building profitable AI automation 
              businesses and sharing their knowledge.
            </p>
          </div>

          <div className="border border-white/10 rounded-lg p-6">
            <Zap className="w-8 h-8 text-gray-400 mb-4" />
            <h3 className="text-xl font-light text-white mb-2">Fast Deployment</h3>
            <p className="text-gray-400 font-light leading-relaxed">
              Get your AI systems up and running quickly with our pre-built templates and 
              one-click deployment options.
            </p>
          </div>
        </div>

        <div className="border border-white/10 rounded-lg p-8">
          <h2 className="text-2xl font-light text-white mb-4">Ready to Get Started?</h2>
          <p className="text-gray-400 mb-6 font-light leading-relaxed">
            Join us today and start building the AI automation systems that will transform your business.
          </p>
          <div className="flex gap-4">
            <Link href="/create" className="btn-primary">
              Create Your First System
            </Link>
            <Link href="/products" className="btn-secondary">
              Browse Systems
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

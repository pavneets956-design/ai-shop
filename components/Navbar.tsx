"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-xl font-light text-white">
            AI SHOP
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/products" className="text-gray-400 hover:text-white transition-colors font-light text-sm">
              Browse
            </Link>
            <Link href="/create" className="text-gray-400 hover:text-white transition-colors font-light text-sm">
              Create
            </Link>
            <Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors font-light text-sm">
              Dashboard
            </Link>
            <Link href="/agent" className="text-gray-400 hover:text-white transition-colors font-light text-sm">
              Agent
            </Link>
            <Link href="/about" className="text-gray-400 hover:text-white transition-colors font-light text-sm">
              About
            </Link>
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/login" className="text-gray-400 hover:text-white transition-colors font-light text-sm">
              Log In
            </Link>
            <Link href="/login" className="btn-secondary text-sm">
              Sign up
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0a0a] border-t border-white/10">
          <div className="px-4 pt-4 pb-6 space-y-3">
            <Link
              href="/products"
              className="block py-2 text-gray-400 hover:text-white transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Browse
            </Link>
            <Link
              href="/create"
              className="block py-2 text-gray-400 hover:text-white transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Create
            </Link>
            <Link
              href="/dashboard"
              className="block py-2 text-gray-400 hover:text-white transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              href="/agent"
              className="block py-2 text-gray-400 hover:text-white transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Agent
            </Link>
            <Link
              href="/about"
              className="block py-2 text-gray-400 hover:text-white transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <div className="border-t border-white/10 pt-4 space-y-3">
              <Link
                href="/login"
                className="block py-2 text-gray-400 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Log In
              </Link>
              <Link
                href="/login"
                className="block btn-secondary text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

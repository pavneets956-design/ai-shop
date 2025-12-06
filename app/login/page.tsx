"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-12">
          <Link href="/" className="inline-block mb-6">
            <span className="text-2xl font-light text-white">AI SHOP</span>
          </Link>
          <h1 className="text-4xl font-light text-white mb-3">
            {isLogin ? "Welcome back" : "Create an account"}
          </h1>
          <p className="text-gray-400 font-light">
            {isLogin
              ? "Sign in to manage your AI systems"
              : "Start building and selling AI automation systems"}
          </p>
        </div>

        <div className="border border-white/10 rounded-lg p-8">
          <form className="space-y-6">
            {!isLogin && (
              <div>
                <label className="block text-sm font-light text-gray-400 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-transparent border border-white/10 rounded-lg focus:ring-1 focus:ring-white/20 focus:border-white/20 text-white placeholder-gray-500 font-light"
                  placeholder="John Doe"
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-light text-gray-400 mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 bg-transparent border border-white/10 rounded-lg focus:ring-1 focus:ring-white/20 focus:border-white/20 text-white placeholder-gray-500 font-light"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-light text-gray-400 mb-2">
                Password
              </label>
              <input
                type="password"
                required
                className="w-full px-4 py-3 bg-transparent border border-white/10 rounded-lg focus:ring-1 focus:ring-white/20 focus:border-white/20 text-white placeholder-gray-500 font-light"
                placeholder="••••••••"
              />
            </div>
            {isLogin && (
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-white/10 bg-transparent text-white focus:ring-white/20" />
                  <span className="ml-2 text-sm text-gray-400 font-light">Remember me</span>
                </label>
                <Link href="/forgot-password" className="text-sm text-gray-400 hover:text-white transition-colors font-light">
                  Forgot password?
                </Link>
              </div>
            )}
            <button type="submit" className="w-full btn-primary py-3">
              {isLogin ? "Sign In" : "Create Account"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-gray-400 hover:text-white transition-colors font-light"
            >
              {isLogin
                ? "Don't have an account? Sign up"
                : "Already have an account? Sign in"}
            </button>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500 font-light">
          <p>
            By continuing, you agree to our{" "}
            <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

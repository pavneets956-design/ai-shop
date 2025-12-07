import Link from "next/link";
import Image from "next/image";
import { Twitter, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-[#0a0a0a] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Useful */}
          <div>
            <h3 className="text-sm font-light text-white mb-4">Useful</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/products" className="text-gray-500 hover:text-white transition-colors font-light">
                  Browse
                </Link>
              </li>
              <li>
                <Link href="/create" className="text-gray-500 hover:text-white transition-colors font-light">
                  Create
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-gray-500 hover:text-white transition-colors font-light">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-light text-white mb-4">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/privacy" className="text-gray-500 hover:text-white transition-colors font-light">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-500 hover:text-white transition-colors font-light">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Updates */}
          <div>
            <h3 className="text-sm font-light text-white mb-4">Updates</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="text-gray-500 hover:text-white transition-colors font-light flex items-center gap-2">
                  <Twitter className="w-4 h-4" />
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-500 hover:text-white transition-colors font-light flex items-center gap-2">
                  <Instagram className="w-4 h-4" />
                  Instagram
                </a>
              </li>
            </ul>
          </div>

          {/* Brand */}
          <div>
            <Link href="/" className="block mb-4">
              <Image
                src="/logo.png"
                alt="AI Tech Shop"
                width={100}
                height={40}
                className="h-auto w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
              />
            </Link>
            <p className="text-sm text-gray-500 font-light leading-relaxed">
              A marketplace for AI automated systems
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center">
          <p className="text-sm text-gray-500 font-light">
            &copy; {new Date().getFullYear()} AI Shop. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

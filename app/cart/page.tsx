import Link from "next/link";
import { ShoppingCart, ArrowLeft, Trash2 } from "lucide-react";
import { productImages } from "@/lib/productImages";

const cartItems = [
  {
    id: "1",
    title: "AI Receptionist Pro",
    price: 99,
  },
  {
    id: "2",
    title: "Content Creator AI",
    price: 149,
  },
];

export default function CartPage() {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-12 pt-32">
      <div className="max-w-5xl mx-auto px-4">
        <div className="mb-12">
          <Link
            href="/products"
            className="inline-flex items-center text-gray-400 hover:text-white mb-4 transition-colors font-light"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue Shopping
          </Link>
          <h1 className="text-5xl font-light text-white">Shopping Cart</h1>
        </div>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="border border-white/10 rounded-lg p-4 flex items-center gap-4 hover:border-white/20 transition-colors">
                  <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={productImages[item.id] || "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=200&h=200&fit=crop"}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <Link
                      href={`/products/${item.id}`}
                      className="text-lg font-light text-white hover:text-gray-300 mb-1 block transition-colors"
                    >
                      {item.title}
                    </Link>
                    <p className="text-white font-light">${item.price}/mo</p>
                  </div>
                  <button className="p-2 text-gray-400 hover:text-white transition-colors">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="border border-white/10 rounded-lg p-6 sticky top-24">
                <h2 className="text-2xl font-light text-white mb-6">Order Summary</h2>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-400 font-light">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-400 font-light">
                    <span>Tax (10%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-white/10 pt-4 flex justify-between">
                    <span className="text-lg font-light text-white">Total</span>
                    <span className="text-lg font-light text-white">${total.toFixed(2)}</span>
                  </div>
                </div>
                <button className="w-full btn-primary py-3 flex items-center justify-center gap-2">
                  <ShoppingCart className="w-4 h-4" />
                  Proceed to Checkout
                </button>
                <p className="text-xs text-gray-500 text-center mt-4 font-light">
                  Secure checkout powered by Stripe
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="border border-white/10 rounded-lg p-12 text-center">
            <ShoppingCart className="w-16 h-16 mx-auto text-gray-500 mb-4" />
            <h2 className="text-2xl font-light text-white mb-2">Your cart is empty</h2>
            <p className="text-gray-400 mb-6 font-light">Start adding AI systems to your cart!</p>
            <Link href="/products" className="btn-primary inline-block">
              Browse Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

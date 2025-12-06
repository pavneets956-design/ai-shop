"use client";

import { useState } from "react";
import { Plus, DollarSign, Eye, Edit, Trash2, TrendingUp, Package } from "lucide-react";
import Link from "next/link";

const myProducts = [
  {
    id: "1",
    title: "AI Receptionist Pro",
    price: 99,
    sales: 45,
    revenue: 4455,
    status: "active",
    views: 1234,
  },
  {
    id: "2",
    title: "Content Creator AI",
    price: 149,
    sales: 32,
    revenue: 4768,
    status: "active",
    views: 987,
  },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");

  const totalRevenue = myProducts.reduce((sum, product) => sum + product.revenue, 0);
  const totalSales = myProducts.reduce((sum, product) => sum + product.sales, 0);
  const totalViews = myProducts.reduce((sum, product) => sum + product.views, 0);

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-12 pt-32">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-12 flex justify-between items-center">
          <div>
            <h1 className="text-5xl font-light text-white mb-2">Dashboard</h1>
            <p className="text-lg text-gray-400 font-light">Manage your AI systems and track performance</p>
          </div>
          <Link href="/create" className="btn-primary flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Create New System
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="border border-white/10 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400 font-light">Total Revenue</span>
              <DollarSign className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-4xl font-light text-white mb-2">${totalRevenue.toLocaleString()}</div>
            <div className="text-sm text-gray-500 flex items-center font-light">
              <TrendingUp className="w-3 h-3 mr-1" />
              +12% from last month
            </div>
          </div>

          <div className="border border-white/10 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400 font-light">Total Sales</span>
              <Package className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-4xl font-light text-white mb-2">{totalSales}</div>
            <div className="text-sm text-gray-500 flex items-center font-light">
              <TrendingUp className="w-3 h-3 mr-1" />
              +8% from last month
            </div>
          </div>

          <div className="border border-white/10 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400 font-light">Total Views</span>
              <Eye className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-4xl font-light text-white mb-2">{totalViews.toLocaleString()}</div>
            <div className="text-sm text-gray-500 flex items-center font-light">
              <TrendingUp className="w-3 h-3 mr-1" />
              +15% from last month
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8 border-b border-white/10">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab("overview")}
              className={`py-4 px-1 border-b-2 font-light transition-colors ${
                activeTab === "overview"
                  ? "border-white text-white"
                  : "border-transparent text-gray-400 hover:text-white"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("products")}
              className={`py-4 px-1 border-b-2 font-light transition-colors ${
                activeTab === "products"
                  ? "border-white text-white"
                  : "border-transparent text-gray-400 hover:text-white"
              }`}
            >
              My Products
            </button>
            <button
              onClick={() => setActiveTab("analytics")}
              className={`py-4 px-1 border-b-2 font-light transition-colors ${
                activeTab === "analytics"
                  ? "border-white text-white"
                  : "border-transparent text-gray-400 hover:text-white"
              }`}
            >
              Analytics
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="border border-white/10 rounded-lg p-6">
              <h2 className="text-2xl font-light text-white mb-6">Recent Activity</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/5">
                  <div>
                    <p className="font-light text-white">New sale: AI Receptionist Pro</p>
                    <p className="text-sm text-gray-500 font-light">2 hours ago</p>
                  </div>
                  <span className="text-white font-light">+$99</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/5">
                  <div>
                    <p className="font-light text-white">New sale: Content Creator AI</p>
                    <p className="text-sm text-gray-500 font-light">5 hours ago</p>
                  </div>
                  <span className="text-white font-light">+$149</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "products" && (
          <div className="border border-white/10 rounded-lg p-6">
            <h2 className="text-2xl font-light text-white mb-6">My Products</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-4 px-4 font-light text-gray-400 text-sm">Product</th>
                    <th className="text-left py-4 px-4 font-light text-gray-400 text-sm">Price</th>
                    <th className="text-left py-4 px-4 font-light text-gray-400 text-sm">Sales</th>
                    <th className="text-left py-4 px-4 font-light text-gray-400 text-sm">Revenue</th>
                    <th className="text-left py-4 px-4 font-light text-gray-400 text-sm">Status</th>
                    <th className="text-left py-4 px-4 font-light text-gray-400 text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {myProducts.map((product) => (
                    <tr key={product.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-4 px-4">
                        <Link
                          href={`/products/${product.id}`}
                          className="font-light text-white hover:text-gray-300 transition-colors"
                        >
                          {product.title}
                        </Link>
                      </td>
                      <td className="py-4 px-4 text-gray-400 font-light">${product.price}</td>
                      <td className="py-4 px-4 text-gray-400 font-light">{product.sales}</td>
                      <td className="py-4 px-4 font-light text-white">
                        ${product.revenue.toLocaleString()}
                      </td>
                      <td className="py-4 px-4">
                        <span className="px-2 py-1 rounded-full text-xs font-light bg-white/10 text-white border border-white/10">
                          {product.status}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/products/${product.id}`}
                            className="p-2 text-gray-400 hover:text-white transition-colors"
                            title="View"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                          <button
                            className="p-2 text-gray-400 hover:text-white transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "analytics" && (
          <div className="border border-white/10 rounded-lg p-6">
            <h2 className="text-2xl font-light text-white mb-6">Analytics</h2>
            <p className="text-gray-400 font-light">Detailed analytics coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
}

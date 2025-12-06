"use client";

import { useState } from "react";
import { X, Save, Eye } from "lucide-react";
import Link from "next/link";

export default function CreatePage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    longDescription: "",
    price: "",
    category: "",
    imageUrl: "",
    demoUrl: "",
  });

  const [features, setFeatures] = useState<string[]>([]);
  const [newFeature, setNewFeature] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Creating product:", { ...formData, features });
    alert("Product created successfully! (Demo mode - not saved to database)");
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setFeatures([...features, newFeature.trim()]);
      setNewFeature("");
    }
  };

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const categories = [
    "Communication",
    "Content",
    "Support",
    "Marketing",
    "E-commerce",
    "Analytics",
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-12 pt-32">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-5xl font-light text-white mb-4">Create Your AI System</h1>
          <p className="text-lg text-gray-400 font-light">
            Share your AI automation system and start earning money
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Title */}
          <div>
            <label className="block text-sm font-light text-gray-400 mb-2">
              System Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., AI Receptionist Pro"
              className="w-full px-4 py-3 bg-transparent border border-white/10 rounded-lg focus:ring-1 focus:ring-white/20 focus:border-white/20 text-white placeholder-gray-500 font-light"
            />
          </div>

          {/* Short Description */}
          <div>
            <label className="block text-sm font-light text-gray-400 mb-2">
              Short Description *
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="A brief description that will appear in listings..."
              rows={3}
              className="w-full px-4 py-3 bg-transparent border border-white/10 rounded-lg focus:ring-1 focus:ring-white/20 focus:border-white/20 text-white placeholder-gray-500 font-light resize-none"
            />
          </div>

          {/* Long Description */}
          <div>
            <label className="block text-sm font-light text-gray-400 mb-2">
              Detailed Description *
            </label>
            <textarea
              required
              value={formData.longDescription}
              onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
              placeholder="Provide detailed information about your AI system, features, use cases, and how it works..."
              rows={8}
              className="w-full px-4 py-3 bg-transparent border border-white/10 rounded-lg focus:ring-1 focus:ring-white/20 focus:border-white/20 text-white placeholder-gray-500 font-light resize-none"
            />
          </div>

          {/* Price and Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-light text-gray-400 mb-2">
                Price (USD) *
              </label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="99.00"
                className="w-full px-4 py-3 bg-transparent border border-white/10 rounded-lg focus:ring-1 focus:ring-white/20 focus:border-white/20 text-white placeholder-gray-500 font-light"
              />
            </div>
            <div>
              <label className="block text-sm font-light text-gray-400 mb-2">
                Category *
              </label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 bg-transparent border border-white/10 rounded-lg focus:ring-1 focus:ring-white/20 focus:border-white/20 text-white font-light"
              >
                <option value="" className="bg-[#0a0a0a]">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat} className="bg-[#0a0a0a]">
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Features */}
          <div>
            <label className="block text-sm font-light text-gray-400 mb-2">
              Key Features
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())}
                placeholder="Add a feature..."
                className="flex-1 px-4 py-2 bg-transparent border border-white/10 rounded-lg focus:ring-1 focus:ring-white/20 focus:border-white/20 text-white placeholder-gray-500 font-light"
              />
              <button
                type="button"
                onClick={addFeature}
                className="btn-secondary text-sm"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {features.map((feature, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white px-3 py-1 rounded-lg text-sm font-light"
                >
                  {feature}
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="hover:text-gray-400 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* URLs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-light text-gray-400 mb-2">
                Image URL
              </label>
              <input
                type="url"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-3 bg-transparent border border-white/10 rounded-lg focus:ring-1 focus:ring-white/20 focus:border-white/20 text-white placeholder-gray-500 font-light"
              />
            </div>
            <div>
              <label className="block text-sm font-light text-gray-400 mb-2">
                Demo URL
              </label>
              <input
                type="url"
                value={formData.demoUrl}
                onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
                placeholder="https://demo.example.com"
                className="w-full px-4 py-3 bg-transparent border border-white/10 rounded-lg focus:ring-1 focus:ring-white/20 focus:border-white/20 text-white placeholder-gray-500 font-light"
              />
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 pt-4">
            <button type="submit" className="btn-primary flex items-center gap-2">
              <Save className="w-4 h-4" />
              Create System
            </button>
            <button
              type="button"
              className="btn-secondary flex items-center gap-2"
            >
              <Eye className="w-4 h-4" />
              Preview
            </button>
          </div>
        </form>

        <div className="mt-12 border border-white/10 rounded-lg p-6">
          <h3 className="font-light text-white mb-4">Tips for Success</h3>
          <ul className="text-sm text-gray-400 space-y-2 font-light">
            <li>• Provide clear, detailed descriptions of what your AI system does</li>
            <li>• Include real examples and use cases</li>
            <li>• Set a competitive price based on market research</li>
            <li>• Add high-quality images or screenshots</li>
            <li>• Offer a demo or free trial to build trust</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

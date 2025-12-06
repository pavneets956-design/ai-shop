"use client";

import { useState } from "react";
import { Save, Phone, MessageSquare, Volume2, DollarSign } from "lucide-react";
import Link from "next/link";
import PricingPlans from "@/components/PricingPlans";
import { type PricePlan } from "@/lib/agent/pricebook";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    agentName: "Sarah",
    agentVoice: "professional-female",
    callHours: { start: "9:00", end: "17:00" },
    maxCallsPerDay: 50,
    pitchStyle: "conversational",
    followUpEnabled: true,
    autoSchedule: true,
  });

  const handleSave = () => {
    // In production, this would save to database
    alert("Settings saved successfully!");
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-12 pt-32">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-12">
          <Link
            href="/agent"
            className="text-sm text-gray-400 hover:text-white mb-4 inline-block transition-colors font-light"
          >
            ← Back to Agent
          </Link>
          <h1 className="text-5xl font-light text-white mb-4">Agent Settings</h1>
          <p className="text-lg text-gray-400 font-light">Configure your AI sales agent</p>
        </div>

        <div className="space-y-8">
          {/* Agent Identity */}
          <div className="border border-white/10 rounded-lg p-6">
            <h2 className="text-xl font-light text-white mb-6">Agent Identity</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-light text-gray-400 mb-2">Agent Name</label>
                <input
                  type="text"
                  value={settings.agentName}
                  onChange={(e) => setSettings({ ...settings, agentName: e.target.value })}
                  className="w-full px-4 py-3 bg-transparent border border-white/10 rounded-lg focus:ring-1 focus:ring-white/20 focus:border-white/20 text-white font-light"
                />
                <p className="text-xs text-gray-500 mt-2 font-light">
                  The name your agent will use when introducing themselves
                </p>
              </div>
              <div>
                <label className="block text-sm font-light text-gray-400 mb-2">Voice Type</label>
                <select
                  value={settings.agentVoice}
                  onChange={(e) => setSettings({ ...settings, agentVoice: e.target.value })}
                  className="w-full px-4 py-3 bg-transparent border border-white/10 rounded-lg focus:ring-1 focus:ring-white/20 focus:border-white/20 text-white font-light"
                >
                  <option value="professional-female" className="bg-[#0a0a0a]">Professional Female</option>
                  <option value="professional-male" className="bg-[#0a0a0a]">Professional Male</option>
                  <option value="friendly-female" className="bg-[#0a0a0a]">Friendly Female</option>
                  <option value="friendly-male" className="bg-[#0a0a0a]">Friendly Male</option>
                </select>
              </div>
            </div>
          </div>

          {/* Call Settings */}
          <div className="border border-white/10 rounded-lg p-6">
            <h2 className="text-xl font-light text-white mb-6 flex items-center gap-2">
              <Phone className="w-5 h-5" />
              Call Settings
            </h2>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-light text-gray-400 mb-2">Call Hours Start</label>
                  <input
                    type="time"
                    value={settings.callHours.start}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        callHours: { ...settings.callHours, start: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 bg-transparent border border-white/10 rounded-lg focus:ring-1 focus:ring-white/20 focus:border-white/20 text-white font-light"
                  />
                </div>
                <div>
                  <label className="block text-sm font-light text-gray-400 mb-2">Call Hours End</label>
                  <input
                    type="time"
                    value={settings.callHours.end}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        callHours: { ...settings.callHours, end: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 bg-transparent border border-white/10 rounded-lg focus:ring-1 focus:ring-white/20 focus:border-white/20 text-white font-light"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-light text-gray-400 mb-2">Max Calls Per Day</label>
                <input
                  type="number"
                  min="1"
                  max="200"
                  value={settings.maxCallsPerDay}
                  onChange={(e) =>
                    setSettings({ ...settings, maxCallsPerDay: parseInt(e.target.value) })
                  }
                  className="w-full px-4 py-3 bg-transparent border border-white/10 rounded-lg focus:ring-1 focus:ring-white/20 focus:border-white/20 text-white font-light"
                />
              </div>
            </div>
          </div>

          {/* Pitch Configuration */}
          <div className="border border-white/10 rounded-lg p-6">
            <h2 className="text-xl font-light text-white mb-6 flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Pitch Configuration
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-light text-gray-400 mb-2">Pitch Style</label>
                <select
                  value={settings.pitchStyle}
                  onChange={(e) => setSettings({ ...settings, pitchStyle: e.target.value })}
                  className="w-full px-4 py-3 bg-transparent border border-white/10 rounded-lg focus:ring-1 focus:ring-white/20 focus:border-white/20 text-white font-light"
                >
                  <option value="conversational" className="bg-[#0a0a0a]">Conversational</option>
                  <option value="professional" className="bg-[#0a0a0a]">Professional</option>
                  <option value="friendly" className="bg-[#0a0a0a]">Friendly & Casual</option>
                  <option value="direct" className="bg-[#0a0a0a]">Direct & Efficient</option>
                </select>
                <p className="text-xs text-gray-500 mt-2 font-light">
                  How your agent will communicate with prospects
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-sm font-light text-white">Key Talking Points</h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="rounded border-white/10 bg-transparent text-white focus:ring-white/20"
                    />
                    <span className="text-sm text-gray-400 font-light">
                      Highlight 24/7 availability and cost savings
                    </span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="rounded border-white/10 bg-transparent text-white focus:ring-white/20"
                    />
                    <span className="text-sm text-gray-400 font-light">
                      Mention multi-language support
                    </span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="rounded border-white/10 bg-transparent text-white focus:ring-white/20"
                    />
                    <span className="text-sm text-gray-400 font-light">
                      Emphasize CRM integration capabilities
                    </span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="rounded border-white/10 bg-transparent text-white focus:ring-white/20"
                    />
                    <span className="text-sm text-gray-400 font-light">
                      Discuss ROI and time savings
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Plans */}
          <div className="border border-white/10 rounded-lg p-6">
            <h2 className="text-xl font-light text-white mb-6 flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Pricing Plans
            </h2>
            <p className="text-sm text-gray-400 font-light mb-6">
              These are the pricing plans your AI agent will discuss with prospects. Edit the pricebook in <code className="text-xs bg-white/5 px-2 py-1 rounded">lib/agent/pricebook.ts</code> to update pricing.
            </p>
            <PricingPlans compact={true} />
          </div>

          {/* Automation Settings */}
          <div className="border border-white/10 rounded-lg p-6">
            <h2 className="text-xl font-light text-white mb-6">Automation</h2>
            <div className="space-y-4">
              <label className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-light text-white">Enable Follow-up Calls</span>
                  <p className="text-xs text-gray-500 font-light mt-1">
                    Automatically schedule follow-up calls for interested leads
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.followUpEnabled}
                  onChange={(e) => setSettings({ ...settings, followUpEnabled: e.target.checked })}
                  className="rounded border-white/10 bg-transparent text-white focus:ring-white/20"
                />
              </label>
              <label className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-light text-white">Auto-Schedule Demos</span>
                  <p className="text-xs text-gray-500 font-light mt-1">
                    Automatically schedule demo calls when prospect shows interest
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.autoSchedule}
                  onChange={(e) => setSettings({ ...settings, autoSchedule: e.target.checked })}
                  className="rounded border-white/10 bg-transparent text-white focus:ring-white/20"
                />
              </label>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button onClick={handleSave} className="btn-primary flex items-center gap-2">
              <Save className="w-4 h-4" />
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


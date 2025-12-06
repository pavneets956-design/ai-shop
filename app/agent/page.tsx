"use client";

import { useState } from "react";
import { Phone, PhoneCall, Users, TrendingUp, Settings, Target } from "lucide-react";
import Link from "next/link";

export default function AgentPage() {
  const [isCalling, setIsCalling] = useState(false);
  const [activeCalls, setActiveCalls] = useState(0);

  const stats = [
    { label: "Total Calls", value: "1,247", change: "+12%" },
    { label: "Successful Pitches", value: "342", change: "+8%" },
    { label: "Interested Leads", value: "89", change: "+15%" },
    { label: "Conversion Rate", value: "27%", change: "+3%" },
  ];

  const recentCalls = [
    {
      company: "Tech Solutions Inc",
      contact: "John Smith",
      status: "interested",
      duration: "4:32",
      time: "2 hours ago",
    },
    {
      company: "Medical Practice Group",
      contact: "Sarah Johnson",
      status: "scheduled",
      duration: "3:15",
      time: "5 hours ago",
    },
    {
      company: "Law Firm Associates",
      contact: "Michael Brown",
      status: "not-interested",
      duration: "2:48",
      time: "1 day ago",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-12 pt-32">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-light text-white mb-4">AI Sales Agent</h1>
          <p className="text-lg text-gray-400 font-light">
            Your personal AI agent that calls businesses and pitches AI Receptionist Pro
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-12">
          <button
            onClick={() => setIsCalling(!isCalling)}
            className={`border border-white/10 rounded-lg p-8 text-left hover:border-white/20 transition-colors ${
              isCalling ? "border-white/30 bg-white/5" : ""
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <PhoneCall className={`w-8 h-8 ${isCalling ? "text-white" : "text-gray-400"}`} />
              {isCalling && (
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              )}
            </div>
            <h3 className="text-xl font-light text-white mb-2">
              {isCalling ? "Agent Active" : "Start Calling"}
            </h3>
            <p className="text-sm text-gray-400 font-light">
              {isCalling
                ? `${activeCalls} active call${activeCalls !== 1 ? "s" : ""}`
                : "Begin automated outreach campaign"}
            </p>
          </button>

          <Link
            href="/agent/contacts"
            className="border border-white/10 rounded-lg p-8 text-left hover:border-white/20 transition-colors"
          >
            <Users className="w-8 h-8 text-gray-400 mb-4" />
            <h3 className="text-xl font-light text-white mb-2">Manage Contacts</h3>
            <p className="text-sm text-gray-400 font-light">Add and organize target companies</p>
          </Link>

          <Link
            href="/agent/calls"
            className="border border-white/10 rounded-lg p-8 text-left hover:border-white/20 transition-colors"
          >
            <Phone className="w-8 h-8 text-gray-400 mb-4" />
            <h3 className="text-xl font-light text-white mb-2">Call History</h3>
            <p className="text-sm text-gray-400 font-light">View all calls and transcripts</p>
          </Link>

          <Link
            href="/agent/leads"
            className="border border-white/10 rounded-lg p-8 text-left hover:border-white/20 transition-colors"
          >
            <Target className="w-8 h-8 text-gray-400 mb-4" />
            <h3 className="text-xl font-light text-white mb-2">Leads</h3>
            <p className="text-sm text-gray-400 font-light">Track leads from AI agent</p>
          </Link>

          <Link
            href="/agent/campaigns"
            className="border border-white/10 rounded-lg p-8 text-left hover:border-white/20 transition-colors"
          >
            <Target className="w-8 h-8 text-gray-400 mb-4" />
            <h3 className="text-xl font-light text-white mb-2">Campaigns</h3>
            <p className="text-sm text-gray-400 font-light">Create and manage cold calling campaigns</p>
          </Link>

          <Link
            href="/agent/settings"
            className="border border-white/10 rounded-lg p-8 text-left hover:border-white/20 transition-colors"
          >
            <Settings className="w-8 h-8 text-gray-400 mb-4" />
            <h3 className="text-xl font-light text-white mb-2">Agent Settings</h3>
            <p className="text-sm text-gray-400 font-light">Configure pitch and call preferences</p>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="border border-white/10 rounded-lg p-6">
              <p className="text-sm text-gray-400 font-light mb-2">{stat.label}</p>
              <p className="text-3xl font-light text-white mb-1">{stat.value}</p>
              <p className="text-xs text-gray-500 font-light">{stat.change} from last week</p>
            </div>
          ))}
        </div>

        {/* Recent Calls */}
        <div className="border border-white/10 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-light text-white">Recent Calls</h2>
            <Link href="/agent/calls" className="text-sm text-gray-400 hover:text-white transition-colors font-light">
              View All →
            </Link>
          </div>
          <div className="space-y-4">
            {recentCalls.map((call, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/5"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-light text-white">{call.company}</h3>
                    <span
                      className={`px-2 py-1 rounded text-xs font-light ${
                        call.status === "interested"
                          ? "bg-green-500/20 text-green-400 border border-green-500/30"
                          : call.status === "scheduled"
                          ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                          : "bg-gray-500/20 text-gray-400 border border-gray-500/30"
                      }`}
                    >
                      {call.status === "interested"
                        ? "Interested"
                        : call.status === "scheduled"
                        ? "Scheduled"
                        : "Not Interested"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 font-light">
                    {call.contact} • {call.duration} • {call.time}
                  </p>
                </div>
                <button className="p-2 text-gray-400 hover:text-white transition-colors">
                  <Phone className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


"use client";

import { useState } from "react";
import { ArrowLeft, Phone, Mail, Calendar, Star, Clock, DollarSign, TrendingUp, MessageSquare } from "lucide-react";
import Link from "next/link";

// Mock lead data - in production, fetch from API
const mockLead = {
  id: "1",
  company: "Tech Solutions Inc",
  contact: "John Smith",
  phone: "+1 (555) 123-4567",
  email: "john@techsolutions.com",
  status: "demo-scheduled",
  score: 85,
  source: "AI Agent Call",
  industry: "Technology",
  createdAt: "2024-01-15",
  lastContact: "2 hours ago",
  nextFollowUp: "Tomorrow, 2:00 PM",
  calls: [
    {
      id: "1",
      date: "2024-01-15 14:30",
      duration: "4:32",
      outcome: "Demo Scheduled",
      transcript: `Agent: Hi John, this is Sarah from AI Shop. I'm calling because I believe your business could benefit from our AI Receptionist solution. Do you have a moment?

John: Sure, what is this about?

Agent: Great! I noticed you might be handling calls manually. Our AI Receptionist Pro works 24/7, never misses a call, and costs 97% less than hiring a full-time receptionist. Would you like to hear more?

John: That sounds interesting. How much does it cost?

Agent: It's $99 per month, and it handles everything - 24/7 call answering, automatic appointment scheduling, multi-language support, and CRM integration. Would you like to see a quick demo?

John: Yes, I'd be interested in seeing how it works.

Agent: Excellent! I'll send you a calendar link so you can pick a time that works best. What's the best email to send it to?

John: john@techsolutions.com

Agent: Perfect! You'll receive the calendar link shortly. Is there anything else you'd like to know?

John: No, that sounds good. Thanks!

Agent: My pleasure! Have a great day!`,
    },
  ],
  notes: [
    {
      id: "1",
      date: "2024-01-15 14:35",
      author: "System",
      content: "Lead created from AI agent call. High interest level. Demo scheduled.",
    },
  ],
  revenue: null,
};

export default function LeadDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState<"overview" | "calls" | "notes">("overview");
  const lead = mockLead; // In production, fetch by params.id

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "qualified":
        return "bg-cyan-500/20 text-cyan-400 border-cyan-500/30";
      case "demo-scheduled":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "follow-up":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "converted":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-12 pt-32">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/agent/leads"
            className="text-sm text-gray-400 hover:text-white mb-4 inline-flex items-center gap-2 transition-colors font-light"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Leads
          </Link>
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <h1 className="text-4xl font-light text-white">{lead.company}</h1>
                <span className={`px-3 py-1 rounded text-sm font-light border ${getStatusColor(lead.status)}`}>
                  {lead.status.charAt(0).toUpperCase() + lead.status.slice(1).replace("-", " ")}
                </span>
                <div className="flex items-center gap-1 text-yellow-400">
                  <Star className="w-5 h-5 fill-current" />
                  <span className="text-lg font-light">{lead.score}</span>
                </div>
              </div>
              <p className="text-gray-400 font-light">
                {lead.contact} • {lead.industry} • Lead from {lead.source}
              </p>
            </div>
            <div className="flex gap-3">
              <button className="btn-secondary flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Call
              </button>
              <button className="btn-secondary flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </button>
              <button className="btn-primary flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Schedule
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="border border-white/10 rounded-lg p-4">
            <p className="text-xs text-gray-400 font-light mb-1">Calls Made</p>
            <p className="text-2xl font-light text-white">{lead.calls.length}</p>
          </div>
          <div className="border border-white/10 rounded-lg p-4">
            <p className="text-xs text-gray-400 font-light mb-1">Last Contact</p>
            <p className="text-sm font-light text-white">{lead.lastContact}</p>
          </div>
          <div className="border border-white/10 rounded-lg p-4">
            <p className="text-xs text-gray-400 font-light mb-1">Next Follow-up</p>
            <p className="text-sm font-light text-white">{lead.nextFollowUp || "Not scheduled"}</p>
          </div>
          <div className="border border-white/10 rounded-lg p-4">
            <p className="text-xs text-gray-400 font-light mb-1">Lead Age</p>
            <p className="text-sm font-light text-white">3 days</p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="border border-white/10 rounded-lg p-6">
            <h2 className="text-xl font-light text-white mb-4">Contact Information</h2>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-400 font-light mb-1">Phone</p>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <a href={`tel:${lead.phone}`} className="text-white font-light hover:text-gray-300">
                    {lead.phone}
                  </a>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-light mb-1">Email</p>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <a href={`mailto:${lead.email}`} className="text-white font-light hover:text-gray-300">
                    {lead.email}
                  </a>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-light mb-1">Company</p>
                <p className="text-white font-light">{lead.company}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-light mb-1">Industry</p>
                <p className="text-white font-light">{lead.industry}</p>
              </div>
            </div>
          </div>

          <div className="border border-white/10 rounded-lg p-6">
            <h2 className="text-xl font-light text-white mb-4">Timeline</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <div className="w-px h-full bg-white/10 mt-2"></div>
                </div>
                <div className="flex-1 pb-4">
                  <p className="text-sm font-light text-white">Lead Created</p>
                  <p className="text-xs text-gray-400 font-light">{lead.createdAt}</p>
                  <p className="text-xs text-gray-500 font-light mt-1">From AI Agent Call</p>
                </div>
              </div>
              {lead.calls.map((call, index) => (
                <div key={call.id} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    {index < lead.calls.length - 1 && (
                      <div className="w-px h-full bg-white/10 mt-2"></div>
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <p className="text-sm font-light text-white">Call Made</p>
                    <p className="text-xs text-gray-400 font-light">{call.date}</p>
                    <p className="text-xs text-gray-500 font-light mt-1">
                      Duration: {call.duration} • {call.outcome}
                    </p>
                  </div>
                </div>
              ))}
              {lead.nextFollowUp && (
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-light text-white">Scheduled Follow-up</p>
                    <p className="text-xs text-gray-400 font-light">{lead.nextFollowUp}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-white/10 mb-6">
          <div className="flex gap-6">
            {[
              { id: "overview", label: "Overview", icon: TrendingUp },
              { id: "calls", label: "Calls", icon: Phone },
              { id: "notes", label: "Notes", icon: MessageSquare },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 pb-4 px-2 border-b-2 transition-colors font-light ${
                    activeTab === tab.id
                      ? "border-white text-white"
                      : "border-transparent text-gray-400 hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="border border-white/10 rounded-lg p-6">
              <h3 className="text-xl font-light text-white mb-4">Lead Summary</h3>
              <p className="text-gray-300 font-light leading-relaxed">
                High-quality lead generated from AI agent outreach. Expressed strong interest in AI Receptionist Pro
                during initial call. Demo scheduled for tomorrow. Shows excellent fit for the product with immediate
                need for 24/7 call handling.
              </p>
            </div>

            <div className="border border-white/10 rounded-lg p-6">
              <h3 className="text-xl font-light text-white mb-4">Next Steps</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2"></div>
                  <div>
                    <p className="text-white font-light">Demo scheduled for tomorrow at 2:00 PM</p>
                    <p className="text-xs text-gray-500 font-light">Calendar link sent to {lead.email}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2"></div>
                  <div>
                    <p className="text-white font-light">Prepare demo showing multi-language support</p>
                    <p className="text-xs text-gray-500 font-light">Mentioned international clients</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === "calls" && (
          <div className="space-y-6">
            {lead.calls.map((call) => (
              <div key={call.id} className="border border-white/10 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-light text-white mb-1">Call with {lead.contact}</h3>
                    <p className="text-sm text-gray-400 font-light">{call.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400 font-light">Duration: {call.duration}</p>
                    <p className="text-xs text-purple-400 font-light mt-1">{call.outcome}</p>
                  </div>
                </div>
                <div className="bg-white/5 rounded-lg p-4 mt-4">
                  <h4 className="text-sm font-light text-white mb-3">Transcript</h4>
                  <div className="space-y-3">
                    {call.transcript.split("\n\n").map((paragraph, index) => (
                      <p key={index} className="text-sm text-gray-300 font-light leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "notes" && (
          <div className="space-y-4">
            {lead.notes.map((note) => (
              <div key={note.id} className="border border-white/10 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-light text-white">{note.author}</p>
                  <p className="text-xs text-gray-500 font-light">{note.date}</p>
                </div>
                <p className="text-sm text-gray-300 font-light">{note.content}</p>
              </div>
            ))}
            <button className="w-full border border-white/10 rounded-lg p-4 text-left hover:border-white/20 transition-colors">
              <p className="text-sm text-gray-400 font-light">+ Add Note</p>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}


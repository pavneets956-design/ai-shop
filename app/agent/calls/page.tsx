"use client";

import { useState, useEffect } from "react";
import { Phone, Calendar, Filter, Download, RefreshCw } from "lucide-react";
import Link from "next/link";

interface CallRecord {
  id: string;
  callSid?: string;
  company: string;
  contact: string;
  phone: string;
  date: string;
  duration: string;
  status: "completed" | "no-answer" | "busy" | "failed" | "in-progress" | string;
  outcome: "interested" | "not-interested" | "scheduled" | "follow-up" | "unknown" | string;
  transcript?: string;
  conversationHistory?: any;
}

export default function CallsPage() {
  const [calls, setCalls] = useState<CallRecord[]>([]);
  const [selectedCall, setSelectedCall] = useState<CallRecord | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCalls();
  }, []);

  const fetchCalls = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/agent/calls");
      const data = await response.json();
      if (data.calls) {
        setCalls(data.calls);
      }
    } catch (error) {
      console.error("Error fetching calls:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCalls = calls.filter((call) => {
    if (filter === "all") return true;
    return call.outcome === filter;
  });

  const getStatusColor = (status: CallRecord["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "no-answer":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "busy":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getOutcomeColor = (outcome: CallRecord["outcome"]) => {
    switch (outcome) {
      case "interested":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "scheduled":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "follow-up":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-12 pt-32">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-12 flex justify-between items-center">
          <div>
            <Link
              href="/agent"
              className="text-sm text-gray-400 hover:text-white mb-4 inline-block transition-colors font-light"
            >
              ← Back to Agent
            </Link>
            <h1 className="text-5xl font-light text-white mb-4">Call History</h1>
            <p className="text-lg text-gray-400 font-light">View and manage all agent calls</p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={fetchCalls}
              className="btn-secondary flex items-center gap-2"
              disabled={loading}
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </button>
            <button className="btn-secondary flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8 flex gap-2 overflow-x-auto">
          {["all", "interested", "scheduled", "follow-up", "not-interested"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg font-light text-sm whitespace-nowrap transition-all ${
                filter === f
                  ? "bg-white text-black"
                  : "border border-white/10 text-gray-400 hover:text-white hover:border-white/20"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1).replace("-", " ")}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-400 font-light">Loading calls...</p>
          </div>
        ) : filteredCalls.length === 0 ? (
          <div className="border border-white/10 rounded-lg p-12 text-center">
            <Phone className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-light text-white mb-2">No calls yet</h3>
            <p className="text-gray-400 font-light">
              Calls will appear here once your agent starts making calls
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Calls List */}
            <div className="lg:col-span-2 space-y-4">
              {filteredCalls.map((call) => (
                <div
                  key={call.id}
                  onClick={() => setSelectedCall(call)}
                  className={`border rounded-lg p-6 cursor-pointer transition-colors ${
                    selectedCall?.id === call.id
                      ? "border-white/30 bg-white/5"
                      : "border-white/10 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-light text-white mb-1">{call.company}</h3>
                      <p className="text-sm text-gray-400 font-light">{call.contact}</p>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 font-light">
                      <Calendar className="w-3 h-3" />
                      {call.date}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`px-2 py-1 rounded text-xs font-light border ${getStatusColor(call.status)}`}>
                      {call.status}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-light border ${getOutcomeColor(call.outcome)}`}>
                      {call.outcome.replace("-", " ")}
                    </span>
                    <span className="text-xs text-gray-500 font-light">{call.duration}</span>
                  </div>
                  {call.transcript && (
                    <p className="text-sm text-gray-500 font-light line-clamp-2">{call.transcript}</p>
                  )}
                </div>
              ))}
            </div>

          {/* Call Details */}
          <div className="lg:col-span-1">
            {selectedCall ? (
              <div className="border border-white/10 rounded-lg p-6 sticky top-24">
                <h2 className="text-xl font-light text-white mb-6">Call Details</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-400 font-light mb-1">Company</p>
                    <p className="text-white font-light">{selectedCall.company}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 font-light mb-1">Contact</p>
                    <p className="text-white font-light">{selectedCall.contact}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 font-light mb-1">Phone</p>
                    <p className="text-white font-light">{selectedCall.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 font-light mb-1">Date & Time</p>
                    <p className="text-white font-light">{selectedCall.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 font-light mb-1">Duration</p>
                    <p className="text-white font-light">{selectedCall.duration}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 font-light mb-1">Outcome</p>
                    <span className={`inline-block px-2 py-1 rounded text-xs font-light border ${getOutcomeColor(selectedCall.outcome)}`}>
                      {selectedCall.outcome.replace("-", " ")}
                    </span>
                  </div>
                  {(selectedCall.transcript || selectedCall.conversationHistory) && (
                    <div>
                      <p className="text-sm text-gray-400 font-light mb-2">Conversation Transcript</p>
                      <div className="bg-white/5 rounded-lg p-4 max-h-96 overflow-y-auto">
                        <p className="text-sm text-gray-300 font-light whitespace-pre-wrap leading-relaxed">
                          {selectedCall.transcript || 
                            (selectedCall.conversationHistory && Array.isArray(selectedCall.conversationHistory)
                              ? selectedCall.conversationHistory
                                  .map((entry: any) => {
                                    const role = entry.role === "agent" ? "Agent" : "Prospect";
                                    const message = entry.message || entry.content || "";
                                    return `${role}: ${message}`;
                                  })
                                  .join("\n\n")
                              : "No transcript available")}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="border border-white/10 rounded-lg p-6 text-center">
                <Phone className="w-12 h-12 mx-auto text-gray-500 mb-4" />
                <p className="text-gray-400 font-light">Select a call to view details</p>
              </div>
            )}
          </div>
          </div>
        )}
      </div>
    </div>
  );
}


"use client";

import { useState } from "react";
import { Filter, Search, TrendingUp, Users, DollarSign, Calendar, Phone, Mail, Star, ChevronRight, Download } from "lucide-react";
import Link from "next/link";

interface Lead {
  id: string;
  company: string;
  contact: string;
  phone: string;
  email: string;
  status: "new" | "qualified" | "demo-scheduled" | "follow-up" | "converted" | "not-interested";
  score: number;
  source: string;
  lastContact: string;
  nextFollowUp?: string;
  revenue?: number;
  calls: number;
}

const mockLeads: Lead[] = [
  {
    id: "1",
    company: "Tech Solutions Inc",
    contact: "John Smith",
    phone: "+1 (555) 123-4567",
    email: "john@techsolutions.com",
    status: "demo-scheduled",
    score: 85,
    source: "AI Agent Call",
    lastContact: "2 hours ago",
    nextFollowUp: "Tomorrow, 2:00 PM",
    calls: 1,
  },
  {
    id: "2",
    company: "Medical Practice Group",
    contact: "Sarah Johnson",
    phone: "+1 (555) 234-5678",
    email: "sarah@medicalpractice.com",
    status: "qualified",
    score: 72,
    source: "AI Agent Call",
    lastContact: "5 hours ago",
    nextFollowUp: "Friday, 10:00 AM",
    calls: 1,
  },
  {
    id: "3",
    company: "Law Firm Associates",
    contact: "Michael Brown",
    phone: "+1 (555) 345-6789",
    email: "michael@lawfirm.com",
    status: "follow-up",
    score: 58,
    source: "AI Agent Call",
    lastContact: "1 day ago",
    nextFollowUp: "Next Monday",
    calls: 1,
  },
  {
    id: "4",
    company: "Dental Care Center",
    contact: "Emily Davis",
    phone: "+1 (555) 456-7890",
    email: "emily@dentalcare.com",
    status: "new",
    score: 45,
    source: "AI Agent Call",
    lastContact: "30 minutes ago",
    calls: 1,
  },
  {
    id: "5",
    company: "Real Estate Pro",
    contact: "David Wilson",
    phone: "+1 (555) 567-8901",
    email: "david@realestate.com",
    status: "converted",
    score: 95,
    source: "AI Agent Call",
    lastContact: "3 days ago",
    revenue: 99,
    calls: 2,
  },
];

export default function LeadsPage() {
  const [viewMode, setViewMode] = useState<"pipeline" | "list">("pipeline");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLeads = mockLeads.filter((lead) => {
    const matchesSearch =
      lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.contact.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || lead.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const leadsByStatus = {
    new: filteredLeads.filter((l) => l.status === "new").length,
    qualified: filteredLeads.filter((l) => l.status === "qualified").length,
    "demo-scheduled": filteredLeads.filter((l) => l.status === "demo-scheduled").length,
    "follow-up": filteredLeads.filter((l) => l.status === "follow-up").length,
    converted: filteredLeads.filter((l) => l.status === "converted").length,
    "not-interested": filteredLeads.filter((l) => l.status === "not-interested").length,
  };

  const totalLeads = mockLeads.length;
  const convertedLeads = mockLeads.filter((l) => l.status === "converted").length;
  const conversionRate = totalLeads > 0 ? ((convertedLeads / totalLeads) * 100).toFixed(1) : "0";
  const totalRevenue = mockLeads.filter((l) => l.revenue).reduce((sum, l) => sum + (l.revenue || 0), 0);
  const pipelineValue = mockLeads.filter((l) => l.status !== "converted" && l.status !== "not-interested").length * 99;

  const getStatusColor = (status: Lead["status"]) => {
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

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-400";
    if (score >= 60) return "text-yellow-400";
    return "text-gray-400";
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-12 pt-32">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12 flex justify-between items-start">
          <div>
            <Link
              href="/agent"
              className="text-sm text-gray-400 hover:text-white mb-4 inline-block transition-colors font-light"
            >
              ← Back to Agent
            </Link>
            <h1 className="text-5xl font-light text-white mb-4">Lead Tracking</h1>
            <p className="text-lg text-gray-400 font-light">Track and manage leads generated by your AI agent</p>
          </div>
          <div className="flex gap-3">
            <button className="btn-secondary flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button
              onClick={() => setViewMode(viewMode === "pipeline" ? "list" : "pipeline")}
              className="btn-secondary"
            >
              {viewMode === "pipeline" ? "List View" : "Pipeline View"}
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
          <div className="border border-white/10 rounded-lg p-4">
            <p className="text-xs text-gray-400 font-light mb-1">Total Leads</p>
            <p className="text-2xl font-light text-white">{totalLeads}</p>
          </div>
          <div className="border border-white/10 rounded-lg p-4">
            <p className="text-xs text-gray-400 font-light mb-1">This Month</p>
            <p className="text-2xl font-light text-white">+24</p>
          </div>
          <div className="border border-white/10 rounded-lg p-4">
            <p className="text-xs text-gray-400 font-light mb-1">Conversion</p>
            <p className="text-2xl font-light text-white">{conversionRate}%</p>
          </div>
          <div className="border border-white/10 rounded-lg p-4">
            <p className="text-xs text-gray-400 font-light mb-1">Revenue</p>
            <p className="text-2xl font-light text-white">${totalRevenue}</p>
          </div>
          <div className="border border-white/10 rounded-lg p-4">
            <p className="text-xs text-gray-400 font-light mb-1">Pipeline</p>
            <p className="text-2xl font-light text-white">${pipelineValue}</p>
          </div>
          <div className="border border-white/10 rounded-lg p-4">
            <p className="text-xs text-gray-400 font-light mb-1">Hot Leads</p>
            <p className="text-2xl font-light text-white">
              {filteredLeads.filter((l) => l.score >= 80 && l.status !== "converted").length}
            </p>
          </div>
        </div>

        {/* Conversion Funnel */}
        <div className="border border-white/10 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-light text-white mb-6">Conversion Funnel</h2>
          <div className="flex items-end justify-between gap-4">
            <div className="flex-1 text-center">
              <div className="bg-blue-500/20 h-32 rounded-t-lg mb-2 flex items-end justify-center">
                <span className="text-white font-light mb-2">{leadsByStatus.new}</span>
              </div>
              <p className="text-xs text-gray-400 font-light">New Leads</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-500 mb-8" />
            <div className="flex-1 text-center">
              <div className="bg-cyan-500/20 h-28 rounded-t-lg mb-2 flex items-end justify-center">
                <span className="text-white font-light mb-2">{leadsByStatus.qualified}</span>
              </div>
              <p className="text-xs text-gray-400 font-light">Qualified</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-500 mb-8" />
            <div className="flex-1 text-center">
              <div className="bg-purple-500/20 h-24 rounded-t-lg mb-2 flex items-end justify-center">
                <span className="text-white font-light mb-2">{leadsByStatus["demo-scheduled"]}</span>
              </div>
              <p className="text-xs text-gray-400 font-light">Demo Scheduled</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-500 mb-8" />
            <div className="flex-1 text-center">
              <div className="bg-green-500/20 h-20 rounded-t-lg mb-2 flex items-end justify-center">
                <span className="text-white font-light mb-2">{leadsByStatus.converted}</span>
              </div>
              <p className="text-xs text-gray-400 font-light">Converted</p>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Search leads..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-transparent border border-white/10 rounded-lg focus:ring-1 focus:ring-white/20 focus:border-white/20 text-white placeholder-gray-500 font-light"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {["all", "new", "qualified", "demo-scheduled", "follow-up", "converted", "not-interested"].map(
              (status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-4 py-2 rounded-lg font-light text-sm whitespace-nowrap transition-all ${
                    filterStatus === status
                      ? "bg-white text-black"
                      : "border border-white/10 text-gray-400 hover:text-white hover:border-white/20"
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ")}
                </button>
              )
            )}
          </div>
        </div>

        {/* Pipeline View */}
        {viewMode === "pipeline" ? (
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            {[
              { status: "new", label: "New", color: "blue" },
              { status: "qualified", label: "Qualified", color: "cyan" },
              { status: "demo-scheduled", label: "Demo Scheduled", color: "purple" },
              { status: "follow-up", label: "Follow Up", color: "yellow" },
              { status: "converted", label: "Converted", color: "green" },
              { status: "not-interested", label: "Not Interested", color: "gray" },
            ].map((column) => {
              const columnLeads = filteredLeads.filter((l) => l.status === column.status);
              return (
                <div key={column.status} className="border border-white/10 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-light text-white">{column.label}</h3>
                    <span className="text-xs text-gray-500 font-light">{columnLeads.length}</span>
                  </div>
                  <div className="space-y-3">
                    {columnLeads.map((lead) => (
                      <Link
                        key={lead.id}
                        href={`/agent/leads/${lead.id}`}
                        className="block border border-white/5 rounded-lg p-3 hover:border-white/20 transition-colors cursor-pointer"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h4 className="text-sm font-light text-white mb-1">{lead.company}</h4>
                            <p className="text-xs text-gray-400 font-light">{lead.contact}</p>
                          </div>
                          <div className={`flex items-center gap-1 ${getScoreColor(lead.score)}`}>
                            <Star className="w-3 h-3 fill-current" />
                            <span className="text-xs font-light">{lead.score}</span>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 font-light">{lead.lastContact}</p>
                        {lead.nextFollowUp && (
                          <div className="mt-2 pt-2 border-t border-white/5">
                            <p className="text-xs text-gray-500 font-light flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {lead.nextFollowUp}
                            </p>
                          </div>
                        )}
                      </Link>
                    ))}
                    {columnLeads.length === 0 && (
                      <p className="text-xs text-gray-500 font-light text-center py-4">No leads</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* List View */
          <div className="border border-white/10 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 px-6 font-light text-gray-400 text-sm">Company</th>
                  <th className="text-left py-4 px-6 font-light text-gray-400 text-sm">Contact</th>
                  <th className="text-left py-4 px-6 font-light text-gray-400 text-sm">Status</th>
                  <th className="text-left py-4 px-6 font-light text-gray-400 text-sm">Score</th>
                  <th className="text-left py-4 px-6 font-light text-gray-400 text-sm">Last Contact</th>
                  <th className="text-left py-4 px-6 font-light text-gray-400 text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <Link href={`/agent/leads/${lead.id}`} className="font-light text-white hover:text-gray-300">
                        {lead.company}
                      </Link>
                    </td>
                    <td className="py-4 px-6 text-gray-400 font-light">{lead.contact}</td>
                    <td className="py-4 px-6">
                      <span className={`px-2 py-1 rounded text-xs font-light border ${getStatusColor(lead.status)}`}>
                        {lead.status.charAt(0).toUpperCase() + lead.status.slice(1).replace("-", " ")}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className={`flex items-center gap-1 ${getScoreColor(lead.score)}`}>
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm font-light">{lead.score}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-400 font-light text-sm">{lead.lastContact}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-gray-400 hover:text-white transition-colors" title="Call">
                          <Phone className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-white transition-colors" title="Email">
                          <Mail className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}


"use client";

import { useState, useEffect } from "react";
import { Plus, Play, Pause, Square, Search, MapPin, Building, TrendingUp, Phone, Users, Target } from "lucide-react";
import Link from "next/link";

interface Campaign {
  id: string;
  name: string;
  status: "draft" | "active" | "paused" | "completed";
  targetBusinesses: any[];
  stats: {
    totalCalls: number;
    successfulCalls: number;
    interestedLeads: number;
    scheduledDemos: number;
    conversions: number;
  };
  createdAt: string;
}

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    name: "",
    location: "",
    industry: "",
    maxCallsPerDay: 50,
  });

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const response = await fetch("/api/agent/campaigns");
      const data = await response.json();
      setCampaigns(data.campaigns || []);
    } catch (error) {
      console.error("Error fetching campaigns:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCampaignAction = async (campaignId: string, action: "start" | "pause" | "stop") => {
    try {
      const response = await fetch("/api/agent/campaigns", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ campaignId, action }),
      });
      const data = await response.json();
      if (data.campaign) {
        fetchCampaigns();
      }
    } catch (error) {
      console.error("Error updating campaign:", error);
      alert("Failed to update campaign");
    }
  };

  const handleCreateCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);
    try {
      // First, search for businesses
      const searchResponse = await fetch("/api/agent/businesses/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          location: newCampaign.location,
          industry: newCampaign.industry || undefined,
          limit: 100,
        }),
      });
      
      if (!searchResponse.ok) {
        throw new Error("Failed to search businesses");
      }
      
      const searchData = await searchResponse.json();

      if (!searchData.businesses || searchData.businesses.length === 0) {
        alert(`No businesses found in "${newCampaign.location}". Please try a different location or industry.`);
        setIsCreating(false);
        return;
      }

      // Create campaign with found businesses
      const campaignResponse = await fetch("/api/agent/campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newCampaign.name,
          targetBusinesses: searchData.businesses,
          settings: {
            maxCallsPerDay: newCampaign.maxCallsPerDay,
          },
        }),
      });

      if (!campaignResponse.ok) {
        const errorData = await campaignResponse.json();
        throw new Error(errorData.error || "Failed to create campaign");
      }

      const campaignData = await campaignResponse.json();
      if (campaignData.campaign) {
        setShowCreateForm(false);
        setNewCampaign({ name: "", location: "", industry: "", maxCallsPerDay: 50 });
        fetchCampaigns();
        // Show success message
        alert(`Campaign created successfully! Found ${searchData.businesses.length} businesses.`);
      }
    } catch (error: any) {
      console.error("Error creating campaign:", error);
      alert(error.message || "Failed to create campaign. Please check your inputs and try again.");
    } finally {
      setIsCreating(false);
    }
  };

  const getStatusColor = (status: Campaign["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "paused":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "completed":
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
      default:
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    }
  };

  const getConversionRate = (campaign: Campaign) => {
    if (campaign.stats.totalCalls === 0) return "0%";
    return ((campaign.stats.interestedLeads / campaign.stats.totalCalls) * 100).toFixed(1) + "%";
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-12 pt-32">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12 flex justify-between items-center">
          <div>
            <Link
              href="/agent"
              className="text-sm text-gray-400 hover:text-white mb-4 inline-block transition-colors font-light"
            >
              ← Back to Agent
            </Link>
            <h1 className="text-5xl font-light text-white mb-4">Cold Calling Campaigns</h1>
            <p className="text-lg text-gray-400 font-light">
              Create and manage automated cold calling campaigns for local businesses
            </p>
          </div>
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            New Campaign
          </button>
        </div>

        {/* Create Campaign Form */}
        {showCreateForm && (
          <div className="border border-white/10 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-light text-white mb-6">Create New Campaign</h2>
            <form onSubmit={handleCreateCampaign} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-light text-gray-400 mb-2">Campaign Name *</label>
                  <input
                    type="text"
                    required
                    value={newCampaign.name}
                    onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
                    className="w-full px-4 py-3 bg-transparent border border-white/10 rounded-lg focus:ring-1 focus:ring-white/20 focus:border-white/20 text-white placeholder-gray-500 font-light"
                    placeholder="e.g., Local Restaurants - Downtown"
                  />
                </div>
                <div>
                  <label className="block text-sm font-light text-gray-400 mb-2">Location *</label>
                  <input
                    type="text"
                    required
                    value={newCampaign.location}
                    onChange={(e) => setNewCampaign({ ...newCampaign, location: e.target.value })}
                    className="w-full px-4 py-3 bg-transparent border border-white/10 rounded-lg focus:ring-1 focus:ring-white/20 focus:border-white/20 text-white placeholder-gray-500 font-light"
                    placeholder="e.g., New York, NY or 10001"
                  />
                </div>
                <div>
                  <label className="block text-sm font-light text-gray-400 mb-2">Industry (Optional)</label>
                  <input
                    type="text"
                    value={newCampaign.industry}
                    onChange={(e) => setNewCampaign({ ...newCampaign, industry: e.target.value })}
                    className="w-full px-4 py-3 bg-transparent border border-white/10 rounded-lg focus:ring-1 focus:ring-white/20 focus:border-white/20 text-white placeholder-gray-500 font-light"
                    placeholder="e.g., restaurant, dentist, plumber"
                  />
                </div>
                <div>
                  <label className="block text-sm font-light text-gray-400 mb-2">Max Calls Per Day</label>
                  <input
                    type="number"
                    min="1"
                    max="200"
                    value={newCampaign.maxCallsPerDay}
                    onChange={(e) =>
                      setNewCampaign({ ...newCampaign, maxCallsPerDay: parseInt(e.target.value) })
                    }
                    className="w-full px-4 py-3 bg-transparent border border-white/10 rounded-lg focus:ring-1 focus:ring-white/20 focus:border-white/20 text-white font-light"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <button 
                  type="submit" 
                  className="btn-primary"
                  disabled={isCreating}
                >
                  {isCreating ? "Creating..." : "Create Campaign"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="btn-secondary"
                  disabled={isCreating}
                >
                  Cancel
                </button>
              </div>
              {isCreating && (
                <p className="text-sm text-gray-400 font-light mt-2">
                  Searching for businesses in {newCampaign.location}...
                </p>
              )}
            </form>
          </div>
        )}

        {/* Campaigns List */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-400 font-light">Loading campaigns...</p>
          </div>
        ) : campaigns.length === 0 ? (
          <div className="border border-white/10 rounded-lg p-12 text-center">
            <Building className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-light text-white mb-2">No campaigns yet</h3>
            <p className="text-gray-400 font-light mb-6">
              Create your first cold calling campaign to start reaching local businesses
            </p>
            <button onClick={() => setShowCreateForm(true)} className="btn-primary">
              Create Campaign
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.map((campaign) => (
              <div
                key={campaign.id}
                className="border border-white/10 rounded-lg p-6 hover:border-white/20 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-light text-white mb-2">{campaign.name}</h3>
                    <span
                      className={`px-2 py-1 rounded text-xs font-light border ${getStatusColor(
                        campaign.status
                      )}`}
                    >
                      {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400 font-light">Target Businesses</span>
                    <span className="text-white font-light">{campaign.targetBusinesses.length}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400 font-light">Total Calls</span>
                    <span className="text-white font-light">{campaign.stats.totalCalls}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400 font-light">Interested Leads</span>
                    <span className="text-green-400 font-light">{campaign.stats.interestedLeads}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400 font-light">Conversion Rate</span>
                    <span className="text-white font-light">{getConversionRate(campaign)}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  {campaign.status === "draft" || campaign.status === "paused" ? (
                    <button
                      onClick={() => handleCampaignAction(campaign.id, "start")}
                      className="flex-1 btn-primary flex items-center justify-center gap-2 text-sm"
                    >
                      <Play className="w-4 h-4" />
                      Start
                    </button>
                  ) : campaign.status === "active" ? (
                    <button
                      onClick={() => handleCampaignAction(campaign.id, "pause")}
                      className="flex-1 btn-secondary flex items-center justify-center gap-2 text-sm"
                    >
                      <Pause className="w-4 h-4" />
                      Pause
                    </button>
                  ) : null}
                  {campaign.status === "active" && (
                    <button
                      onClick={() => handleCampaignAction(campaign.id, "stop")}
                      className="btn-secondary flex items-center justify-center gap-2 text-sm"
                    >
                      <Square className="w-4 h-4" />
                      Stop
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


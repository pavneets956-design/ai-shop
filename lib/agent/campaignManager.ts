// Campaign Manager - Handles automated cold calling campaigns for local businesses

import { ConversationEngine, BusinessContext } from "./conversationEngine";
import { CallManager, CallConfig, CallResult } from "./callManager";
import { LocalBusiness } from "./businessDiscovery";

export interface Campaign {
  id: string;
  name: string;
  status: "draft" | "active" | "paused" | "completed";
  targetBusinesses: LocalBusiness[];
  callSettings: {
    maxCallsPerDay: number;
    callHours: { start: string; end: string };
    timezone: string;
  };
  agentSettings: {
    agentName: string;
    agentVoice: string;
    pitchStyle: string;
  };
  filters: {
    industries?: string[];
    locations?: string[];
    excludeCalled?: boolean;
  };
  stats: {
    totalCalls: number;
    successfulCalls: number;
    interestedLeads: number;
    scheduledDemos: number;
    conversions: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface CampaignCall {
  id: string;
  campaignId: string;
  business: LocalBusiness;
  status: "pending" | "calling" | "completed" | "failed" | "no-answer" | "busy";
  callResult?: CallResult;
  scheduledTime?: Date;
  callTime?: Date;
  retryCount: number;
}

export class CampaignManager {
  private campaigns: Map<string, Campaign> = new Map();
  private activeCalls: Map<string, CampaignCall> = new Map();
  private callQueue: CampaignCall[] = [];
  private isRunning: boolean = false;

  constructor() {}

  /**
   * Create a new campaign
   */
  createCampaign(
    name: string,
    targetBusinesses: LocalBusiness[],
    settings: Partial<Campaign["callSettings"] & Campaign["agentSettings"] & Campaign["filters"]> = {}
  ): Campaign {
    const campaign: Campaign = {
      id: `campaign_${Date.now()}`,
      name,
      status: "draft",
      targetBusinesses,
      callSettings: {
        maxCallsPerDay: settings.maxCallsPerDay || 50,
        callHours: settings.callHours || { start: "09:00", end: "17:00" },
        timezone: settings.timezone || "America/New_York",
      },
      agentSettings: {
        agentName: settings.agentName || "Sarah",
        agentVoice: settings.agentVoice || "professional-female",
        pitchStyle: settings.pitchStyle || "conversational",
      },
      filters: {
        industries: settings.industries,
        locations: settings.locations,
        excludeCalled: settings.excludeCalled ?? true,
      },
      stats: {
        totalCalls: 0,
        successfulCalls: 0,
        interestedLeads: 0,
        scheduledDemos: 0,
        conversions: 0,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.campaigns.set(campaign.id, campaign);
    return campaign;
  }

  /**
   * Start a campaign
   */
  async startCampaign(campaignId: string): Promise<void> {
    const campaign = this.campaigns.get(campaignId);
    if (!campaign) {
      throw new Error(`Campaign ${campaignId} not found`);
    }

    campaign.status = "active";
    campaign.updatedAt = new Date();

    // Build call queue
    this.buildCallQueue(campaign);

    // Start processing calls
    if (!this.isRunning) {
      this.isRunning = true;
      this.processCallQueue();
    }
  }

  /**
   * Pause a campaign
   */
  pauseCampaign(campaignId: string): void {
    const campaign = this.campaigns.get(campaignId);
    if (campaign) {
      campaign.status = "paused";
      campaign.updatedAt = new Date();
    }
  }

  /**
   * Stop a campaign
   */
  stopCampaign(campaignId: string): void {
    const campaign = this.campaigns.get(campaignId);
    if (campaign) {
      campaign.status = "completed";
      campaign.updatedAt = new Date();
    }
  }

  /**
   * Build call queue for a campaign
   */
  private buildCallQueue(campaign: Campaign): void {
    const businesses = campaign.targetBusinesses.filter((business) => {
      // Apply filters
      if (campaign.filters.industries && campaign.filters.industries.length > 0) {
        if (!business.industry || !campaign.filters.industries.includes(business.industry)) {
          return false;
        }
      }

      if (campaign.filters.locations && campaign.filters.locations.length > 0) {
        const businessLocation = `${business.city}, ${business.state}`.toLowerCase();
        if (!campaign.filters.locations.some(loc => businessLocation.includes(loc.toLowerCase()))) {
          return false;
        }
      }

      return true;
    });

    // Create call objects
    businesses.forEach((business) => {
      const call: CampaignCall = {
        id: `call_${Date.now()}_${Math.random()}`,
        campaignId: campaign.id,
        business,
        status: "pending",
        retryCount: 0,
      };

      this.callQueue.push(call);
    });

    // Sort by priority (you could add priority logic here)
    this.callQueue.sort(() => Math.random() - 0.5); // Randomize for now
  }

  /**
   * Process the call queue
   */
  private async processCallQueue(): Promise<void> {
    while (this.isRunning && this.callQueue.length > 0) {
      const call = this.callQueue.shift();
      if (!call) continue;

      const campaign = this.campaigns.get(call.campaignId);
      if (!campaign || campaign.status !== "active") {
        continue;
      }

      // Check if we've hit daily limit
      if (campaign.stats.totalCalls >= campaign.callSettings.maxCallsPerDay) {
        console.log(`Daily call limit reached for campaign ${campaign.id}`);
        await this.waitUntilNextDay(campaign);
        continue;
      }

      // Check if within call hours
      if (!this.isWithinCallHours(campaign)) {
        await this.waitUntilCallHours(campaign);
        continue;
      }

      // Make the call
      await this.makeCall(call, campaign);

      // Wait between calls (respectful calling)
      await new Promise(resolve => setTimeout(resolve, 5000)); // 5 seconds between calls
    }

    this.isRunning = false;
  }

  /**
   * Make a call
   */
  private async makeCall(call: CampaignCall, campaign: Campaign): Promise<void> {
    call.status = "calling";
    call.callTime = new Date();
    this.activeCalls.set(call.id, call);

    campaign.stats.totalCalls++;

    try {
      // Create business context for conversation engine
      const businessContext: BusinessContext = {
        companyName: call.business.name,
        industry: call.business.industry,
        location: call.business.city ? `${call.business.city}, ${call.business.state}` : undefined,
        businessType: call.business.businessType,
      };

      // Initialize conversation engine with business context
      const engine = new ConversationEngine(businessContext);
      const callManager = new CallManager(engine);

      // Configure call
      const config: CallConfig = {
        fromNumber: process.env.TWILIO_PHONE_NUMBER || "",
        toNumber: call.business.phone,
        agentName: campaign.agentSettings.agentName,
        agentVoice: campaign.agentSettings.agentVoice,
        pitchStyle: campaign.agentSettings.pitchStyle,
        businessContext: businessContext,
      };

      // Initiate call
      const callId = await callManager.initiateCall(config);

      // In production, this would wait for the actual call to complete
      // For now, simulate a call result
      const result: CallResult = {
        callId,
        status: "completed",
        duration: Math.floor(Math.random() * 300) + 30, // 30-330 seconds
        transcript: "Mock transcript",
        outcome: this.simulateOutcome(),
        notes: "Call completed successfully",
      };

      call.callResult = result;
      call.status = result.status === "completed" ? "completed" : "failed";

      // Update campaign stats
      if (result.status === "completed") {
        campaign.stats.successfulCalls++;
      }
      if (result.outcome === "interested" || result.outcome === "scheduled") {
        campaign.stats.interestedLeads++;
      }
      if (result.outcome === "scheduled") {
        campaign.stats.scheduledDemos++;
      }
      if (result.outcome === "interested") {
        campaign.stats.conversions++;
      }

      campaign.updatedAt = new Date();
    } catch (error) {
      console.error(`Error making call to ${call.business.name}:`, error);
      call.status = "failed";
      call.retryCount++;

      // Retry if retry count is low
      if (call.retryCount < 3) {
        this.callQueue.push(call);
      }
    } finally {
      this.activeCalls.delete(call.id);
    }
  }

  /**
   * Simulate call outcome (for testing)
   */
  private simulateOutcome(): CallResult["outcome"] {
    const rand = Math.random();
    if (rand < 0.1) return "interested";
    if (rand < 0.2) return "scheduled";
    if (rand < 0.3) return "follow-up";
    return "not-interested";
  }

  /**
   * Check if current time is within call hours
   */
  private isWithinCallHours(campaign: Campaign): boolean {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

    const [startHour, startMin] = campaign.callSettings.callHours.start.split(':').map(Number);
    const [endHour, endMin] = campaign.callSettings.callHours.end.split(':').map(Number);

    const startTime = startHour * 60 + startMin;
    const endTime = endHour * 60 + endMin;
    const currentTimeMinutes = hours * 60 + minutes;

    return currentTimeMinutes >= startTime && currentTimeMinutes <= endTime;
  }

  /**
   * Wait until call hours
   */
  private async waitUntilCallHours(campaign: Campaign): Promise<void> {
    const [startHour] = campaign.callSettings.callHours.start.split(':').map(Number);
    const now = new Date();
    const waitUntil = new Date(now);
    waitUntil.setHours(startHour, 0, 0, 0);
    
    if (waitUntil <= now) {
      waitUntil.setDate(waitUntil.getDate() + 1);
    }

    const waitMs = waitUntil.getTime() - now.getTime();
    console.log(`Waiting ${Math.floor(waitMs / 1000 / 60)} minutes until call hours...`);
    await new Promise(resolve => setTimeout(resolve, Math.min(waitMs, 60000))); // Max 1 minute wait
  }

  /**
   * Wait until next day
   */
  private async waitUntilNextDay(campaign: Campaign): Promise<void> {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const waitMs = tomorrow.getTime() - now.getTime();
    console.log(`Daily limit reached. Waiting until tomorrow...`);
    // In production, you'd want to properly schedule this
    await new Promise(resolve => setTimeout(resolve, 60000)); // Wait 1 minute for demo
  }

  /**
   * Get campaign by ID
   */
  getCampaign(campaignId: string): Campaign | undefined {
    return this.campaigns.get(campaignId);
  }

  /**
   * Get all campaigns
   */
  getAllCampaigns(): Campaign[] {
    return Array.from(this.campaigns.values());
  }

  /**
   * Get active calls
   */
  getActiveCalls(): CampaignCall[] {
    return Array.from(this.activeCalls.values());
  }

  /**
   * Get call queue status
   */
  getQueueStatus(): { queued: number; active: number } {
    return {
      queued: this.callQueue.length,
      active: this.activeCalls.size,
    };
  }
}


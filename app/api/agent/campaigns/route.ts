import { NextRequest, NextResponse } from "next/server";
import { CampaignManager } from "@/lib/agent/campaignManager";
import { LocalBusiness } from "@/lib/agent/businessDiscovery";

// Singleton instance
const campaignManager = new CampaignManager();

// Get all campaigns
export async function GET(request: NextRequest) {
  try {
    const campaigns = campaignManager.getAllCampaigns();
    return NextResponse.json({ campaigns });
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    return NextResponse.json(
      { error: "Failed to fetch campaigns" },
      { status: 500 }
    );
  }
}

// Create a new campaign
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, targetBusinesses, settings } = body;

    if (!name || !targetBusinesses || !Array.isArray(targetBusinesses)) {
      return NextResponse.json(
        { error: "Missing required fields: name, targetBusinesses" },
        { status: 400 }
      );
    }

    const campaign = campaignManager.createCampaign(
      name,
      targetBusinesses as LocalBusiness[],
      settings
    );

    return NextResponse.json({ campaign });
  } catch (error) {
    console.error("Error creating campaign:", error);
    return NextResponse.json(
      { error: "Failed to create campaign" },
      { status: 500 }
    );
  }
}

// Update campaign (start, pause, stop)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { campaignId, action } = body;

    if (!campaignId || !action) {
      return NextResponse.json(
        { error: "Missing required fields: campaignId, action" },
        { status: 400 }
      );
    }

    switch (action) {
      case "start":
        await campaignManager.startCampaign(campaignId);
        break;
      case "pause":
        campaignManager.pauseCampaign(campaignId);
        break;
      case "stop":
        campaignManager.stopCampaign(campaignId);
        break;
      default:
        return NextResponse.json(
          { error: "Invalid action. Use: start, pause, or stop" },
          { status: 400 }
        );
    }

    const campaign = campaignManager.getCampaign(campaignId);
    return NextResponse.json({ campaign });
  } catch (error) {
    console.error("Error updating campaign:", error);
    return NextResponse.json(
      { error: "Failed to update campaign" },
      { status: 500 }
    );
  }
}


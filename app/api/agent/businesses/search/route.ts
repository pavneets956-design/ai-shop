import { NextRequest, NextResponse } from "next/server";
import { BusinessDiscovery, BusinessSearchParams } from "@/lib/agent/businessDiscovery";

const businessDiscovery = new BusinessDiscovery();

// Search for local businesses
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { location, industry, radius, limit } = body;

    if (!location) {
      return NextResponse.json(
        { error: "Location is required" },
        { status: 400 }
      );
    }

    const params: BusinessSearchParams = {
      location,
      industry,
      radius: radius || 10,
      limit: limit || 20,
    };

    const businesses = await businessDiscovery.searchBusinesses(params);

    // Enrich business data
    const enrichedBusinesses = await Promise.all(
      businesses.map(business => businessDiscovery.enrichBusinessData(business))
    );

    return NextResponse.json({ businesses: enrichedBusinesses });
  } catch (error) {
    console.error("Error searching businesses:", error);
    return NextResponse.json(
      { error: "Failed to search businesses" },
      { status: 500 }
    );
  }
}

// Import businesses from CSV
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { csvContent } = body;

    if (!csvContent) {
      return NextResponse.json(
        { error: "CSV content is required" },
        { status: 400 }
      );
    }

    const businesses = await businessDiscovery.importFromCSV(csvContent);

    return NextResponse.json({ businesses, count: businesses.length });
  } catch (error) {
    console.error("Error importing businesses:", error);
    return NextResponse.json(
      { error: "Failed to import businesses" },
      { status: 500 }
    );
  }
}


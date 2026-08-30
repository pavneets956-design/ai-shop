import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { guardAgentApi } from "@/lib/agent/guard";

// GET - Fetch all contacts
export async function GET() {
  // Owner-only + kill-switched. See lib/agent/guard.ts.
  const denied = await guardAgentApi();
  if (denied) return denied;

  try {
    const contacts = await prisma.contact.findMany({
      orderBy: { createdAt: "desc" },
    });
    
    return NextResponse.json(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return NextResponse.json(
      { error: "Failed to fetch contacts" },
      { status: 500 }
    );
  }
}

// POST - Create a new contact
export async function POST(request: NextRequest) {
  // Owner-only + kill-switched. See lib/agent/guard.ts.
  const denied = await guardAgentApi();
  if (denied) return denied;

  try {
    const body = await request.json();
    const { company, contactName, phone, email, industry } = body;

    // Validate required fields
    if (!company || !phone) {
      return NextResponse.json(
        { error: "Company and phone are required" },
        { status: 400 }
      );
    }

    const contact = await prisma.contact.create({
      data: {
        company,
        contactName: contactName || null,
        phone,
        email: email || null,
        industry: industry || null,
        status: "new",
      },
    });

    return NextResponse.json(contact, { status: 201 });
  } catch (error: any) {
    console.error("Error creating contact:", error);
    console.error("Error details:", {
      message: error?.message,
      code: error?.code,
      meta: error?.meta,
    });
    
    // The client gets a fixed string. This used to return `error.message`
    // straight from Prisma, which discloses column names, constraint names and
    // sometimes the conflicting VALUE to whoever made the request. The detail
    // is already in the server log above, where it belongs.
    return NextResponse.json(
      {
        error: "Failed to create contact",
        details: process.env.NODE_ENV === "development" ? error?.message : undefined,
      },
      { status: 500 }
    );
  }
}


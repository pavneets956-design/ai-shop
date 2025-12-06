import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET - Fetch all contacts
export async function GET() {
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
  } catch (error) {
    console.error("Error creating contact:", error);
    return NextResponse.json(
      { error: "Failed to create contact" },
      { status: 500 }
    );
  }
}


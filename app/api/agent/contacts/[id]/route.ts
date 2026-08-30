import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { guardAgentApi } from "@/lib/agent/guard";

// DELETE - Delete a contact
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Owner-only + kill-switched. See lib/agent/guard.ts.
  const denied = await guardAgentApi();
  if (denied) return denied;

  try {
    const { id } = params;

    await prisma.contact.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting contact:", error);
    return NextResponse.json(
      { error: "Failed to delete contact" },
      { status: 500 }
    );
  }
}

// PUT - Update a contact
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Owner-only + kill-switched. See lib/agent/guard.ts.
  const denied = await guardAgentApi();
  if (denied) return denied;

  try {
    const { id } = params;

    let body: Record<string, unknown>;
    try {
      body = (await request.json()) as Record<string, unknown>;
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    // Field allowlist. `data: body` used to go straight into prisma.update —
    // mass assignment: any caller could set any column on the row, including
    // ones the UI never exposes. Only these five are editable, each capped.
    const EDITABLE = ["company", "contactName", "phone", "email", "industry", "status"] as const;
    const data: Record<string, string | null> = {};
    for (const key of EDITABLE) {
      if (!(key in body)) continue;
      const value = body[key];
      if (value === null || value === "") {
        data[key] = null;
        continue;
      }
      if (typeof value !== "string") {
        return NextResponse.json({ error: `Field "${key}" must be a string` }, { status: 400 });
      }
      data[key] = value.slice(0, 300);
    }

    if (Object.keys(data).length === 0) {
      return NextResponse.json(
        { error: `No editable fields supplied. Editable: ${EDITABLE.join(", ")}.` },
        { status: 400 },
      );
    }

    const contact = await prisma.contact.update({
      where: { id },
      data,
    });

    return NextResponse.json(contact);
  } catch (error) {
    console.error("Error updating contact:", error);
    return NextResponse.json(
      { error: "Failed to update contact" },
      { status: 500 }
    );
  }
}


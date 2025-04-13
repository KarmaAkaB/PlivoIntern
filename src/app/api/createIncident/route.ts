import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/index";

export async function POST(req: NextRequest) {
  try {
    const { title, status, type, organizationId } = await req.json();

    if (!title || !status || !type || !organizationId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newIncident = await prisma.incident.create({
      data: {
        title,
        status,
        type,
        organizationId,
      },
    });

    return NextResponse.json(newIncident, { status: 201 });
  } catch (error) {
    console.error("Error creating incident:", error);
    return NextResponse.json(
      { error: "Failed to create incident" },
      { status: 500 }
    );
  }
}
    import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/index";

export async function GET() {
  try {
    const incidents = await prisma.incident.findMany();
    return NextResponse.json(incidents);
  } catch (error) {
    console.error("Error fetching incidents:", error);
    return NextResponse.json(
      { error: "Failed to fetch incidents" },
      { status: 500 }
    );
  }
}


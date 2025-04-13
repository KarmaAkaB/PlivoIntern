import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/index";

export async function GET(req: NextRequest) {
  try {
    // Fetch all organizations
    const organizations = await prisma.organization.findMany();
    return NextResponse.json(organizations);
  } catch (error) {
    console.error("Error fetching organizations: ", error);
    return NextResponse.json(
      { error: "Failed to fetch organizations" },
      { status: 500 }
    );
  }
}

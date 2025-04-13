import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/index";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Find user and their organizations
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        userOrgs: {
          include: {
            organization: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const organizations = user.userOrgs.map((uo) => uo.organization);

    return NextResponse.json({ organizations }, { status: 200 });
  } catch (error: any) {
    console.error("Failed to fetch organizations:", error.message);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
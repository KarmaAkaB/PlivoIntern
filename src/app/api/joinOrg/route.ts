import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/index";

export async function POST(req: NextRequest) {
  try {
    const { orgId, currentUserEmail } = await req.json();

    if (!orgId || typeof orgId !== "string") {
      return NextResponse.json(
        { error: "Invalid or missing 'orgId' field" },
        { status: 400 }
      );
    }

    if (!currentUserEmail || typeof currentUserEmail !== "string") {
      return NextResponse.json(
        { error: "No user logged in." },
        { status: 400 }
      );
    }

    // Fetch the user by email
    const user = await prisma.user.findUnique({
      where: { email: currentUserEmail },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if the organization exists
    const organization = await prisma.organization.findUnique({
      where: { id: orgId },
    });

    if (!organization) {
      return NextResponse.json(
        { error: "Organization not found" },
        { status: 404 }
      );
    }

    // Check if the user is already a member of the organization
    const existingMembership = await prisma.userOrg.findUnique({
      where: {
        userId_organizationId: {
          userId: user.id,
          organizationId: orgId,
        },
      },
    });

    if (existingMembership) {
      return NextResponse.json(
        { message: "User is already a member of this organization" },
        { status: 400 }
      );
    }

    // Add the user to the organization
    const membership = await prisma.userOrg.create({
      data: {
        userId: user.id,
        organizationId: orgId,
        role: "MEMBER",
      },
    });

    return NextResponse.json(
      { message: "Successfully joined the organization", membership },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error joining organization:", error.message, error.stack);
    return NextResponse.json(
      { error: "Failed to join organization" },
      { status: 500 }
    );
  }
}
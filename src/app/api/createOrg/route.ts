import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/index";

const generateSlug = (name: string) => {
  return name.toLowerCase().replace(/\s+/g, "-");
};

export async function POST(req: NextRequest) {
  try {
    const { name } = await req.json();

    if (!name || typeof name !== "string") {
      return NextResponse.json(
        { error: "Invalid or missing 'name' field" },
        { status: 400 }
      );
    }

    const existingOrg = await prisma.organization.findUnique({
      where: { name },
    });

    if (existingOrg) {
      return NextResponse.json(
        { message: "Organization already exists." },
        { status: 400 }
      );
    }

    const slug = generateSlug(name);

    const newOrg = await prisma.organization.create({
      data: { name, slug },
    });

    return NextResponse.json(newOrg, { status: 201 });
  } catch (error: any) {
    console.error("Error creating organization:", error.message, error.stack);
    return NextResponse.json(
      { error: "Failed to create organization" },
      { status: 500 }
    );
  }
}

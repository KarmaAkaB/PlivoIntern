// src/app/api/createUser/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/index";

export async function POST(req: NextRequest) {
  try {
    // Parse JSON request body
    const { email, name } = await req.json();

    console.log("HELOOOOO");

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists." },
        { status: 200 }
      );
    }

    // Create a new user if it doesn't exist
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
      },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Error creating user: ", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}

export const config = {
  api: {
    bodyParser: true, // Next.js automatically handles body parsing
  },
};

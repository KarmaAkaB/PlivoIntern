import { NextResponse } from "next/server";
import { auth0 } from "@/lib/auth0";

export async function GET() {
  try {
    // Fetch session from Auth0
    const session = await auth0.getSession();

    // Return session data or null if no session
    return NextResponse.json({ session });
  } catch (error) {
    console.error("Error fetching session:", error);
    return NextResponse.json({ session: null });
  }
}

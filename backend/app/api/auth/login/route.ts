import { NextRequest, NextResponse } from "next/server";
import { authenticateUser } from "@/lib/auth/users";
import { authenticateUser } from "../../../../lib/auth/users";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    const result = authenticateUser(email || "", password || "");

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error,
        },
        { status: result.statusCode || 401 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Authentication successful",
        user: result.user,
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Login route error:", err);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error during authentication",
      },
      { status: 500 }
    );
  }
}


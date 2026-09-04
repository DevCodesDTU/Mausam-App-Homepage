import { NextRequest, NextResponse } from "next/server";
import { createUser } from "@/lib/auth/users";
import { createUser } from "../../../../lib/auth/users";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    const result = createUser(name || "", email || "", password || "");

    if (!result.success) {
      const statusCode = result.error?.includes("already exists") ? 409 : 400;
      return NextResponse.json(
        {
          success: false,
          error: result.error,
        },
        { status: statusCode }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Account created successfully",
        user: result.user,
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("Registration route error:", err);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error during registration",
      },
      { status: 500 }
    );
  }
}


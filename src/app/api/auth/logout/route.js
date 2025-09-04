import { NextResponse } from "next/server";
import { signOut } from "@/utils/auth";

export async function POST() {
  try {
    signOut();

    return NextResponse.json({
      success: true,
      message: "Logout completed successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error logging out",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

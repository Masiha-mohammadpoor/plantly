import { connectDB } from "@/lib/db/connect";
import Product from "@/models/Product";
import Category from "@/models/Category";
import User from "@/models/User";
import { getToken } from "@/utils/auth";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await connectDB();

    const token = await getToken(request);
    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized access" },
        { status: 401 }
      );
    }

    const user = await User.findById(token.id)
      .select("-password")
      .populate({
        path: "likes",
        select: "name price images offPrice discount category",
        populate: {
          path: "category",
          select: "name englishTitle",
        },
      })
      .populate({
        path: "saved",
        select: "name price images offPrice discount category",
        populate: {
          path: "category",
          select: "name englishTitle",
        },
      })
      .populate({
        path: "cart.items.product",
        select: "name price images offPrice discount category",
        populate: {
          path: "category",
          select: "name englishTitle",
        },
      });
      
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    await user.calculateCartTotal();

    return NextResponse.json({
      success: true,
      user: user.toJSON(),
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Server error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
import { connectDB } from "@/lib/db/connect";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getToken } from "@/utils/auth";

// GET (nly Admin)
export async function GET(request) {
  try {
    await connectDB();

    const token = getToken(request);
    if (!token || token.role !== "ADMIN") {
      return NextResponse.json(
        { success: false, message: "Unauthorized access" },
        { status: 403 }
      );
    }

    const users = await User.find({}).select("-password -cart -likes -saved");
    return NextResponse.json({ success: true, data: users });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// POST (creat new user)
export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();

    // Validation
    if (!body.name || !body.email || !body.password) {
      return NextResponse.json(
        {
          success: false,
          message: "username, email and password are required",
        },
        { status: 400 }
      );
    }

    // Check for duplicate email
    const existingUser = await User.findOne({ email: body.email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "User with this email exists" },
        { status: 400 }
      );
    }

    // Password hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);

    const user = await User.create({
      name: body.name,
      email: body.email,
      password: hashedPassword,
      role: body.role || "USER",
      likes: [],
      saved: [],
      cart: {
        items: [],
        totalPrice: 0,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const userResponse = user.toObject();
    delete userResponse.password;

    return NextResponse.json(
      {
        success: true,
        data: userResponse,
        message: "Registration successful",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}

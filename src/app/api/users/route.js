import { connectDB } from "@/lib/db/connect";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getToken } from "@/utils/auth";

// GET همه کاربران (فقط ادمین)
export async function GET(request) {
  try {
    await connectDB();

    // بررسی احراز هویت و نقش ادمین
    const token = getToken(request);
    if (!token || token.role !== "ADMIN") {
      return NextResponse.json(
        { success: false, message: "دسترسی غیرمجاز" },
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

// POST ایجاد کاربر جدید
export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();

    // اعتبارسنجی
    if (!body.name || !body.email || !body.password) {
      return NextResponse.json(
        {
          success: false,
          message: "نام کاربری، ایمیل و رمز عبور الزامی هستند",
        },
        { status: 400 }
      );
    }

    // بررسی تکراری نبودن ایمیل
    const existingUser = await User.findOne({ email: body.email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "کاربر با این ایمیل وجود دارد" },
        { status: 400 }
      );
    }

    // هش کردن رمز عبور
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);

    // ایجاد کاربر جدید با مقادیر پیش‌فرض
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

    // حذف فیلدهای حساس قبل از ارسال پاسخ
    const userResponse = user.toObject();
    delete userResponse.password;

    return NextResponse.json(
      {
        success: true,
        data: userResponse,
        message: "ثبت نام با موفقیت انجام شد",
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

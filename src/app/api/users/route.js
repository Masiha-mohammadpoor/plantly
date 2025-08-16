import {connectDB} from '@/lib/db/connect';
import User from '@/models/User';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

// GET همه کاربران (فقط ادمین)
export async function GET() {
  try {
    await connectDB();
    const users = await User.find({}).select('-password -cart -likes -saved');
    return NextResponse.json({ success: true, data: users });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
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
        { success: false, error: 'نام کاربری، ایمیل و رمز عبور الزامی هستند' },
        { status: 400 }
      );
    }

    // بررسی تکراری نبودن
    const existingUser = await User.findOne({ $or: [{ email: body.email }, { name: body.name }] });
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'کاربر با این ایمیل یا نام کاربری وجود دارد' },
        { status: 400 }
      );
    }

    // هش کردن رمز عبور
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);

    // ایجاد کاربر
    const user = await User.create({
      ...body,
      password: hashedPassword
    });

    return NextResponse.json(
      { success: true, data: user.toJSON() },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
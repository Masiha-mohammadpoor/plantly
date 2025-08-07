import connectDB from '@/lib/db/connect';
import User from '@/models/User';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

// GET همه کاربران
export async function GET() {
  try {
    await connectDB();
    const users = await User.find({}).select('-password');
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

    // اعتبارسنجی فیلدهای ضروری
    if (!body.username || !body.email || !body.password) {
      return NextResponse.json(
        { success: false, error: 'نام کاربری، ایمیل و رمز عبور الزامی هستند' },
        { status: 400 }
      );
    }

    // بررسی تکراری نبودن ایمیل
    const existingUser = await User.findOne({ email: body.email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'این ایمیل قبلا ثبت شده است' },
        { status: 400 }
      );
    }

    // هش کردن رمز عبور
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);

    // ایجاد کاربر جدید
    const user = await User.create({
      username: body.username,
      email: body.email,
      password: hashedPassword,
      role: body.role || 'user'
    });

    // حذف رمز عبور از پاسخ
    const userResponse = user.toJSON();

    return NextResponse.json(
      { success: true, data: userResponse },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
import connectDB from '@/lib/db/connect';
import User from '@/models/User';
import { NextResponse } from 'next/server';


// GET کاربر خاص با ID
export async function GET(request, { params }) {
  try {
    await connectDB();
    const user = await User.findById(params.id).select('-password');
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'کاربر یافت نشد' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: user });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// PUT به روزرسانی کاربر
export async function PUT(request, { params }) {
  try {
    await connectDB();
    const body = await request.json();

    // پیدا کردن کاربر
    const user = await User.findById(params.id);
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'کاربر یافت نشد' },
        { status: 404 }
      );
    }

    // به روزرسانی فیلدها
    if (body.username) user.username = body.username;
    if (body.email) user.email = body.email;
    if (body.role) user.role = body.role;

    // اگر رمز عبور جدید ارسال شده، آن را هش کنید
    if (body.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(body.password, salt);
    }

    await user.save();

    // حذف رمز عبور از پاسخ
    const userResponse = user.toJSON();

    return NextResponse.json({ success: true, data: userResponse });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

// DELETE حذف کاربر
export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const user = await User.findByIdAndDelete(params.id);

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'کاربر یافت نشد' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: {message : "کاربر با موفقیت حذف شد"} });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

import {connectDB} from '@/lib/db/connect';
import Category from '@/models/Category';
import { NextResponse } from 'next/server';

// GET دسته‌بندی خاص
export async function GET(request, { params }) {
  try {
    await connectDB();
    
    const category = await Category.findById(params.id);
    
    if (!category) {
      return NextResponse.json(
        { success: false, error: 'دسته‌بندی یافت نشد' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: category });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// PUT به روزرسانی دسته‌بندی
export async function PUT(request, { params }) {
  try {
    await connectDB();
    const body = await request.json();
    
    // حذف فیلدهای غیرقابل به‌روزرسانی
    delete body._id;
    delete body.createdAt;
    
    const category = await Category.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true
    });
    
    if (!category) {
      return NextResponse.json(
        { success: false, error: 'دسته‌بندی یافت نشد' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: category });
  } catch (error) {
    if (error.code === 11000) {
      const field = error.message.includes('englishTitle') ? 'عنوان انگلیسی' : 'نام';
      return NextResponse.json(
        { success: false, error: `${field} تکراری است` },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

// DELETE حذف دسته‌بندی
export async function DELETE(request, { params }) {
  try {
    await connectDB();
    
    const category = await Category.findByIdAndDelete(params.id);
    
    if (!category) {
      return NextResponse.json(
        { success: false, error: 'دسته‌بندی یافت نشد' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
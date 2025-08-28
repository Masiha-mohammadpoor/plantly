import {connectDB} from '@/lib/db/connect';
import Product from '@/models/Product';
import User from '@/models/User';
import Category from '@/models/Category';
import { NextResponse } from 'next/server';

// GET محصول خاص
export async function GET(request, { params }) {
  try {
    await connectDB();
    
    const product = await Product.findById(params.id)
      .populate('category', 'name englishTitle');
    
    if (!product) {
      return NextResponse.json(
        { success: false, message: 'محصول یافت نشد' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}


// PUT به روزرسانی محصول
export async function PUT(request, { params }) {
  try {
    await connectDB();
    const body = await request.json();
    
    // حذف فیلدهای غیرقابل به‌روزرسانی
    delete body._id;
    delete body.createdAt;
    
    // اگر دسته‌بندی تغییر کرده، بررسی معتبر بودن
    if (body.category) {
      const categoryExists = await Category.exists({ _id: body.category });
      if (!categoryExists) {
        return NextResponse.json(
          { success: false, message: 'دسته‌بندی معتبر نیست' },
          { status: 400 }
        );
      }
    }
    
    const product = await Product.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true
    }).populate('category', 'name englishTitle');
    
    if (!product) {
      return NextResponse.json(
        { success: false, message: 'محصول یافت نشد' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, message: 'این نام محصول قبلا ثبت شده است' },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}

// DELETE حذف محصول
export async function DELETE(request, { params }) {
  try {
    await connectDB();
    
    const product = await Product.findByIdAndDelete(params.id);
    
    if (!product) {
      return NextResponse.json(
        { success: false, message: 'محصول یافت نشد' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
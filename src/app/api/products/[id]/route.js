import connectDB from '@/lib/db/connect';
import Product from '@/models/Product';
import { NextResponse } from 'next/server';


// GET محصول خاص با ID
export async function GET(request, { params }) {
  try {
    await connectDB();
    
    const product = await Product.findById(params.id);
    
    if (!product) {
      return NextResponse.json(
        { success: false, error: 'محصول یافت نشد' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// PUT به روزرسانی محصول
export async function PUT(request, { params }) {
  try {
    await connectDB();
    const body = await request.json();
    
    // پیدا کردن محصول
    let product = await Product.findById(params.id);
    
    if (!product) {
      return NextResponse.json(
        { success: false, error: 'محصول یافت نشد' },
        { status: 404 }
      );
    }
    
    // به روزرسانی فیلدها
    product = await Product.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true
    });
    
    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
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
        { success: false, error: 'محصول یافت نشد' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: {message : "محصول مورد نظر حذف شد"} });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
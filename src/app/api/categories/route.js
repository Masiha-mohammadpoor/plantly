import connectDB from '@/lib/db/connect';
import Category from '@/models/Category';
import { NextResponse } from 'next/server';

// GET همه دسته‌بندی‌ها
export async function GET(request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured');
    const parent = searchParams.get('parent');
    
    const query = {};
    
    if (featured === 'true') query.featured = true;
    if (parent === 'null') query.parent = null;
    
    const categories = await Category.find(query)
      .populate('parent', 'name slug')
      .sort({ name: 1 });
    
    return NextResponse.json({ 
      success: true, 
      count: categories.length,
      data: categories 
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST ایجاد دسته‌بندی جدید
export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    
    if (!body.name) {
      return NextResponse.json(
        { success: false, error: 'نام دسته‌بندی الزامی است' },
        { status: 400 }
      );
    }
    
    const category = await Category.create(body);
    
    return NextResponse.json(
      { success: true, data: category },
      { status: 201 }
    );
  } catch (error) {
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: 'این دسته‌بندی قبلا ثبت شده است' },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
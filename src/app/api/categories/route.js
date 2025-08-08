import connectDB from '@/lib/db/connect';
import Category from '@/models/Category';
import { NextResponse } from 'next/server';

// GET همه دسته‌بندی‌ها
export async function GET(request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured');
    
    const query = {};
    if (featured === 'true') query.featured = true;
    
    const categories = await Category.find(query).sort({ name: 1 });
    
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
    
    // اعتبارسنجی فیلدهای الزامی
    if (!body.name || !body.englishTitle) {
      return NextResponse.json(
        { success: false, error: 'نام و عنوان انگلیسی الزامی هستند' },
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
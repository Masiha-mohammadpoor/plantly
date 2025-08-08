import connectDB from '@/lib/db/connect';
import Product from '@/models/Product';
import { NextResponse } from 'next/server';

// GET همه محصولات
export async function GET(request) {
  try {
    await connectDB();
    
    // دریافت پارامترهای جستجو از URL
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const keyword = searchParams.get('keyword');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    
    // ساخت شرط‌های جستجو
    const query = {};
    
    if (category) query.category = category;
    if (keyword) query.name = { $regex: keyword, $options: 'i' };
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    
    const products = await Product.find(query);
    
    return NextResponse.json({ 
      success: true, 
      count: products.length,
      data: products 
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST ایجاد محصول جدید
export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    
    // اعتبارسنجی فیلدهای ضروری
    if (!body.name || !body.price || !body.description || !body.category) {
      return NextResponse.json(
        { success: false, error: 'نام، قیمت، توضیحات و دسته‌بندی الزامی هستند' },
        { status: 400 }
      );
    }
    
    // ایجاد محصول جدید
    const product = await Product.create(body);
    
    return NextResponse.json(
      { success: true, data: product },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
import {connectDB} from '@/lib/db/connect';
import Product from '@/models/Product';
import Category from '@/models/Category';
import { NextResponse } from 'next/server';

// GET همه محصولات
export async function GET(request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const search = searchParams.get('search');
    
    const query = {};
    
    if (category) query.category = category;
    if (featured === 'true') query.featured = true;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    const products = await Product.find(query)
      .populate('category', 'name englishTitle')
      .sort({ createdAt: -1 });
    
    return NextResponse.json({ 
      success: true, 
      count: products.length,
      data: products 
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// POST ایجاد محصول جدید
export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    
    // اعتبارسنجی فیلدهای الزامی
    if (!body.name || !body.price || !body.description || !body.category) {
      return NextResponse.json(
        { success: false, error: 'نام، قیمت، توضیحات و دسته‌بندی الزامی هستند' },
        { status: 400 }
      );
    }
    
    // بررسی وجود دسته‌بندی
    const categoryExists = await Category.exists({ _id: body.category });
    if (!categoryExists) {
      return NextResponse.json(
        { success: false, message: 'دسته‌بندی معتبر نیست' },
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
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: 'این محصول قبلا ثبت شده است' },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
import connectDB from '@/lib/db/connect';
import Payment from '@/models/Payment';
import User from '@/models/User';
import Product from '@/models/Product';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    await connectDB();
    
    const { userId, paymentMethod } = await request.json();
    
    // 1. دریافت کاربر و سبد خرید
    const user = await User.findById(userId)
      .populate('cart.items.product', 'name price');
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'کاربر یافت نشد' },
        { status: 404 }
      );
    }
    
    // 2. بررسی سبد خرید
    if (user.cart.items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'سبد خرید خالی است' },
        { status: 400 }
      );
    }
    
    // 3. آماده سازی آیتم‌های پرداخت
    const paymentItems = user.cart.items.map(item => ({
      product: item.product._id,
      quantity: item.quantity,
      price: item.product.price,
      name: item.product.name
    }));
    
    // 4. ایجاد پرداخت جدید
    const payment = await Payment.create({
      user: userId,
      items: paymentItems,
      paymentMethod,
      invoiceNumber: `INV-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      status: 'pending'
    });
    
    // 5. خالی کردن سبد خرید کاربر
    user.cart.items = [];
    user.cart.totalPrice = 0;
    await user.save();
    
    return NextResponse.json(
      { success: true, data: payment },
      { status: 201 }
    );
    
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
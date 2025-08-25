import {connectDB} from '@/lib/db/connect';
import Payment from '@/models/Payment';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const status = searchParams.get('status');
    
    // ایجاد فیلتر
    const filter = { user: params.userId };
    if (status) filter.status = status;
    
    // محاسبه pagination
    const skip = (page - 1) * limit;
    
    // دریافت پرداخت‌های کاربر
    const payments = await Payment.find(filter)
      .populate('user', 'name email')
      .populate('items.product', 'name price images offPrice')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    // شمارش کل پرداخت‌ها
    const total = await Payment.countDocuments(filter);
    
    if (!payments || payments.length === 0) {
      return NextResponse.json(
        { success: false, error: 'هیچ پرداختی برای این کاربر یافت نشد' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      success: true, 
      data: payments,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
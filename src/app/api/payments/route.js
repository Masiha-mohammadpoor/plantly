import { connectDB } from '@/lib/db/connect';
import Payment from '@/models/Payment';
import User from '@/models/User';
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function GET(request) {
  try {
    await connectDB();
    
    const token = await getToken({ req: request });
    
    if (!token) {
      return NextResponse.json(
        { success: false, message: 'دسترسی غیرمجاز' },
        { status: 401 }
      );
    }
    
    const user = await User.findById(token.userId);
    
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, message: 'شما دسترسی لازم را ندارید' },
        { status: 403 }
      );
    }
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const status = searchParams.get('status');
    const paymentMethod = searchParams.get('paymentMethod');
    
    const filter = {};
    if (status) filter.status = status;
    if (paymentMethod) filter.paymentMethod = paymentMethod;
    
    const skip = (page - 1) * limit;
    
    const payments = await Payment.find(filter)
      .populate('user', 'name email')
      .populate('items.product', 'name price images')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    const total = await Payment.countDocuments(filter);
    
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
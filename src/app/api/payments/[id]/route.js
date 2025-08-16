import {connectDB} from '@/lib/db/connect';
import Payment from '@/models/Payment';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    await connectDB();
    
    const payment = await Payment.findById(params.id)
      .populate('user', 'name email')
      .populate('items.product', 'name price images');
    
    if (!payment) {
      return NextResponse.json(
        { success: false, error: 'پرداخت یافت نشد' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: payment });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
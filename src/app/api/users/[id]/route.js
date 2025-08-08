import connectDB from '@/lib/db/connect';
import User from '@/models/User';
import { NextResponse } from 'next/server';

// GET اطلاعات کاربر خاص
export async function GET(request, { params }) {
  try {
    await connectDB();
    const user = await User.findById(params.id)
      .select('-password')
      .populate('likes', 'name price')
      .populate('saved', 'name price')
      .populate('cart.items.product', 'name price images');

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'کاربر یافت نشد' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: user });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

//به روز رسانی کاربر
export async function PUT(request, { params }) {
  try {
    await connectDB();
    const body = await request.json();
    const user = await User.findById(params.id);

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'کاربر یافت نشد' },
        { status: 404 }
      );
    }

    // فقط فیلدهایی که در بدنه درخواست ارسال شده‌اند را به‌روز می‌کنیم
    if (body.username) user.username = body.username;
    if (body.email) user.email = body.email;
    // سایر فیلدهای عمومی کاربر

    // مدیریت عملیات خاص
    if (body.action === 'like') {
      const index = user.likes.indexOf(body.productId);
      if (index === -1) {
        user.likes.push(body.productId);
      } else {
        user.likes.splice(index, 1);
      }
    }

    if (body.action === 'save') {
      const index = user.saved.indexOf(body.productId);
      if (index === -1) {
        user.saved.push(body.productId);
      } else {
        user.saved.splice(index, 1);
      }
    }

    if (body.action === 'addToCart') {
      const existingItem = user.cart.items.find(item => 
        item.product.toString() === body.productId
      );

      if (existingItem) {
        existingItem.quantity += body.quantity || 1;
      } else {
        user.cart.items.push({
          product: body.productId,
          quantity: body.quantity || 1
        });
      }
    }

    if (body.action === 'decreaseCartItem') {
      const existingItem = user.cart.items.find(item => 
        item.product.toString() === body.productId
      );

      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= body.quantity || 1;
        } else {
          user.cart.items = user.cart.items.filter(item => 
            item.product.toString() !== body.productId
          );
        }
      }
    }

    if (body.action === 'removeFromCart') {
      user.cart.items = user.cart.items.filter(item => 
        item.product.toString() !== body.productId
      );
    }

    await user.save();
    
    if (body.action?.includes('Cart')) {
      await user.calculateCartTotal();
    }

    return NextResponse.json({ 
      success: true, 
      data: await User.findById(params.id)
        .select('-password')
        .populate('likes', 'name price')
        .populate('saved', 'name price')
        .populate('cart.items.product', 'name price images')
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}


// DELETE حذف کاربر
export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const user = await User.findByIdAndDelete(params.id);

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'کاربر یافت نشد' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: {message : "کاربر با موفقیت حذف شد"} });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

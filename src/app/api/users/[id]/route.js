import { connectDB } from '@/lib/db/connect';
import User from '@/models/User';
import Product from '@/models/Product';
import { NextResponse } from 'next/server';
import { getToken } from '@/utils/auth';

// Helper functions
const handleLikeAction = (user, productId) => {
  const index = user.likes.indexOf(productId);
  if (index === -1) {
    user.likes.push(productId);
  } else {
    user.likes.splice(index, 1);
  }
};

const handleSaveAction = (user, productId) => {
  const index = user.saved.indexOf(productId);
  if (index === -1) {
    user.saved.push(productId);
  } else {
    user.saved.splice(index, 1);
  }
};

const handleAddToCart = (user, productId, quantity = 1) => {
  if (!user.cart.items) user.cart.items = [];
  
  const existingItem = user.cart.items.find(item => 
    item.product.toString() === productId
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    user.cart.items.push({
      product: productId,
      quantity,
      addedAt: new Date()
    });
  }
};

const handleDecreaseCartItem = (user, productId, quantity = 1) => {
  const existingItem = user.cart.items.find(item => 
    item.product.toString() === productId
  );

  if (existingItem) {
    if (existingItem.quantity > quantity) {
      existingItem.quantity -= quantity;
    } else {
      user.cart.items = user.cart.items.filter(item => 
        item.product.toString() !== productId
      );
    }
  }
};

const handleRemoveFromCart = (user, productId) => {
  user.cart.items = user.cart.items.filter(item => 
    item.product.toString() !== productId
  );
};

// GET User
export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = params;
    
    // Verify authentication
    const token = getToken(request);
    if (!token || (token.id !== id && token.role !== 'ADMIN')) {
      return NextResponse.json(
        { success: false, message: 'دسترسی غیرمجاز' },
        { status: 403 }
      );
    }
    
    const user = await User.findById(id)
      .select('-password')
      .populate('likes', 'name price images')
      .populate('saved', 'name price images')
      .populate('cart.items.product', 'name price images');

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'کاربر یافت نشد' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: user });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// UPDATE User
export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();
    
    // Verify authentication
    const token = getToken(request);
    if (!token || (token.id !== id && token.role !== 'ADMIN')) {
      return NextResponse.json(
        { success: false, message: 'دسترسی غیرمجاز' },
        { status: 403 }
      );
    }

    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'کاربر یافت نشد' },
        { status: 404 }
      );
    }

    // Update basic fields
    if (body.name) user.name = body.name;
    if (body.email) user.email = body.email;
    if (body.role && token.role === 'ADMIN') user.role = body.role;

    // Handle special actions
    if (body.action) {
      switch (body.action) {
        case 'like':
          handleLikeAction(user, body.productId);
          break;
        case 'save':
          handleSaveAction(user, body.productId);
          break;
        case 'addToCart':
          handleAddToCart(user, body.productId, body.quantity);
          break;
        case 'decreaseCartItem':
          handleDecreaseCartItem(user, body.productId, body.quantity);
          break;
        case 'removeFromCart':
          handleRemoveFromCart(user, body.productId);
          break;
      }
    }

    user.updatedAt = new Date();
    await user.save();
    
    if (body.action?.includes('Cart')) {
      await user.calculateCartTotal();
    }

    const updatedUser = await User.findById(id)
      .select('-password')
      .populate('likes', 'name price images')
      .populate('saved', 'name price images')
      .populate('cart.items.product', 'name price images');

    return NextResponse.json({ 
      success: true, 
      data: updatedUser,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}

// DELETE User
export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { id } = params;
    
    // Verify authentication
    const token = getToken(request);
    if (!token || (token.id !== id && token.role !== 'ADMIN')) {
      return NextResponse.json(
        { success: false, message: 'دسترسی غیرمجاز' },
        { status: 403 }
      );
    }

    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'کاربر یافت نشد' },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      data: { message: "کاربر با موفقیت حذف شد" } 
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
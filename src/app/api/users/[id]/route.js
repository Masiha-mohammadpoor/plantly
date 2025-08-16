import { connectDB } from '@/lib/db/connect';
import User from '@/models/User';
import Product from '@/models/Product';
import { NextResponse } from 'next/server';

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
      quantity
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
    
    const user = await User.findById(id)
      .select('-password')
      .populate('likes', 'name price images')
      .populate('saved', 'name price images')
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

// UPDATE User
export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const body = await request.json();
    const user = await User.findById(id);

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'کاربر یافت نشد' },
        { status: 404 }
      );
    }

    // Update basic fields
    if (body.name) user.name = body.name;
    if (body.email) user.email = body.email;

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
      data: updatedUser
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

// DELETE User
export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'کاربر یافت نشد' },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      data: { message: "کاربر با موفقیت حذف شد" } 
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
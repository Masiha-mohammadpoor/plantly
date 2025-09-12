import {connectDB} from '@/lib/db/connect';
import Category from '@/models/Category';
import { NextResponse } from 'next/server';

// GET (get a single category)
export async function GET(request, { params }) {
  try {
    await connectDB();
    
    const category = await Category.findById(params.id);
    
    if (!category) {
      return NextResponse.json(
        { success: false, message: 'Category not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: category });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

//PUT (update category)
export async function PUT(request, { params }) {
  try {
    await connectDB();
    const body = await request.json();
    
    delete body._id;
    delete body.createdAt;
    
    const category = await Category.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true
    });
    
    if (!category) {
      return NextResponse.json(
        { success: false, message: 'Category not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: category });
  } catch (error) {
    if (error.code === 11000) {
      const field = error.message.includes('englishTitle') ? 'englishTitle' : 'name';
      return NextResponse.json(
        { success: false, message: `The ${field} is repeated.` },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}

// DELETE
export async function DELETE(request, { params }) {
  try {
    await connectDB();
    
    const category = await Category.findByIdAndDelete(params.id);
    
    if (!category) {
      return NextResponse.json(
        { success: false, message: 'Category not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
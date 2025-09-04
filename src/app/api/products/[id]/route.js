import { connectDB } from "@/lib/db/connect";
import Product from "@/models/Product";
import User from "@/models/User";
import Category from "@/models/Category";
import { NextResponse } from "next/server";

// GET (by product id)
export async function GET(request, { params }) {
  try {
    await connectDB();

    const product = await Product.findById(params.id).populate(
      "category",
      "name englishTitle"
    );

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// PUT (update product)
export async function PUT(request, { params }) {
  try {
    await connectDB();
    const body = await request.json();

    delete body._id;
    delete body.createdAt;

    if (body.category) {
      const categoryExists = await Category.exists({ _id: body.category });
      if (!categoryExists) {
        return NextResponse.json(
          { success: false, message: "Category is not valid" },
          { status: 400 }
        );
      }
    }

    if (body.name) {
      const existingProduct = await Product.findOne({
        name: body.name,
        _id: { $ne: params.id },
      });

      if (existingProduct) {
        return NextResponse.json(
          {
            success: false,
            message: "This product name is already registered",
          },
          { status: 400 }
        );
      }
    }

    if (body.price !== undefined || body.offPrice !== undefined) {
      const currentProduct = await Product.findById(params.id);

      const finalPrice =
        body.price !== undefined ? body.price : currentProduct.price;
      const finalOffPrice =
        body.offPrice !== undefined ? body.offPrice : currentProduct.offPrice;

      if (
        finalOffPrice !== null &&
        finalOffPrice !== undefined &&
        finalOffPrice > finalPrice
      ) {
        return NextResponse.json(
          {
            success: false,
            message:
              "The discounted price must be less than or equal to the original price",
          },
          { status: 400 }
        );
      }

      if (finalOffPrice && finalOffPrice > 0 && finalPrice > 0) {
        body.discount = Math.round(
          ((finalPrice - finalOffPrice) / finalPrice) * 100
        );
      } else {
        body.discount = 0;
        if (body.offPrice === 0 || body.offPrice === null) {
          body.offPrice = null;
        }
      }
    }

    const product = await Product.findByIdAndUpdate(
      params.id,
      { ...body, updatedAt: new Date() },
      {
        new: true,
        runValidators: true,
      }
    ).populate("category", "name englishTitle");

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    console.error("Error updating product:", error);

    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return NextResponse.json(
        { success: false, message: errors.join(", ") },
        { status: 400 }
      );
    }

    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, message: "This product name is already registered" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}

// DELETE حذف محصول
export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const product = await Product.findByIdAndDelete(params.id);

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
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

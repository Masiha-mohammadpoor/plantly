import { connectDB } from "@/lib/db/connect";
import Product from "@/models/Product";
import Category from "@/models/Category";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

// GET همه محصولات
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const type = searchParams.get("type");
    const sort = searchParams.get("sort");
    const featured = searchParams.get("featured");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const search = searchParams.get("search");

    const query = {};

    const orConditions = [];

    if (category) {
      const categories = category
        .split(",")
        .map((cat) => cat.trim())
        .filter((cat) => cat);

      for (const cat of categories) {
        if (mongoose.Types.ObjectId.isValid(cat)) {
          orConditions.push({ category: cat });
        } else {
          const categoryDoc = await Category.findOne({
            $or: [
              { name: { $regex: cat, $options: "i" } },
              { englishTitle: { $regex: cat, $options: "i" } },
            ],
          });

          if (categoryDoc) {
            orConditions.push({ category: categoryDoc._id });
          }
        }
      }
    }

    if (orConditions.length > 0) {
      query.$or = orConditions;
    }

    if (type === "by-discount") {
      query.discount = { $ne: 0 };
    }

    if (featured === "true") query.featured = true;

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (search) {
      if (query.$or) {
        query.$and = [
          { $or: query.$or },
          {
            $or: [
              { name: { $regex: search, $options: "i" } },
              { description: { $regex: search, $options: "i" } },
            ],
          },
        ];
        delete query.$or;
      } else {
        query.$or = [
          { name: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
        ];
      }
    }

    let sortOptions = { createdAt: -1 };

    if (sort === "LTH") {
      sortOptions = { price: 1 };
    } else if (sort === "HTL") {
      sortOptions = { price: -1 };
    }

    const products = await Product.find(query)
      .populate("category", "name englishTitle")
      .sort(sortOptions);

    return NextResponse.json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();

    if (!body.name || !body.price || !body.description || !body.category) {
      return NextResponse.json(
        {
          success: false,
          error: "نام، قیمت، توضیحات و دسته‌بندی الزامی هستند",
        },
        { status: 400 }
      );
    }

    let categoryId = body.category;

    if (!mongoose.Types.ObjectId.isValid(body.category)) {
      const categoryDoc = await Category.findOne({
        $or: [
          { name: { $regex: body.category, $options: "i" } },
          { englishTitle: { $regex: body.category, $options: "i" } },
        ],
      });

      if (!categoryDoc) {
        return NextResponse.json(
          { success: false, message: "دسته‌بندی معتبر نیست" },
          { status: 400 }
        );
      }

      categoryId = categoryDoc._id;
    } else {
      const categoryExists = await Category.exists({ _id: body.category });
      if (!categoryExists) {
        return NextResponse.json(
          { success: false, message: "دسته‌بندی معتبر نیست" },
          { status: 400 }
        );
      }
    }

    const productData = { ...body, category: categoryId };
    const product = await Product.create(productData);

    return NextResponse.json({ success: true, data: product }, { status: 201 });
  } catch (error) {
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: "این محصول قبلا ثبت شده است" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

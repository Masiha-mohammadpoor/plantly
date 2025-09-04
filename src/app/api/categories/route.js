import { connectDB } from "@/lib/db/connect";
import Category from "@/models/Category";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const featured = searchParams.get("featured");

    const query = {};
    if (featured === "true") query.featured = true;

    const categories = await Category.find(query).sort({ name: 1 });

    return NextResponse.json({
      success: true,
      count: categories.length,
      data: categories,
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

    if (!body.name || !body.englishTitle) {
      return NextResponse.json(
        { success: false, message: "name and englishTitle are required" },
        { status: 400 }
      );
    }

    const processedEnglishTitle = body.englishTitle
      .toLowerCase()
      .replace(/\s+/g, "-");
    const category = await Category.create({
      ...body,
      englishTitle: processedEnglishTitle,
    });

    return NextResponse.json(
      { success: true, data: category },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}

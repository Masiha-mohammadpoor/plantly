import { connectDB } from "@/lib/db/connect";
import Payment from "@/models/Payment";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const status = searchParams.get("status");

    const filter = { user: params.userId };
    if (status) filter.status = status;

    const skip = (page - 1) * limit;

    const payments = await Payment.find(filter)
      .populate("user", "name email")
      .populate("items.product", "name price images offPrice")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Payment.countDocuments(filter);

    if (!payments || payments.length === 0) {
      return NextResponse.json(
        { success: false, message: "No payments found for this user" },
        { status: 404 }
      );
    }

    const allPayments = await Payment.find(filter).select("items");

    let totalProducts = 0;
    allPayments.forEach((payment) => {
      payment.items.forEach((item) => {
        totalProducts += item.quantity;
      });
    });

    return NextResponse.json({
      success: true,
      data: payments,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
        totalProducts,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

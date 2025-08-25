import { connectDB } from "@/lib/db/connect";
import Payment from "@/models/Payment";
import Product from "@/models/Product";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectDB();

    const { userId, paymentMethod } = await request.json();

    const user = await User.findById(userId).populate(
      "cart.items.product",
      "name price offPrice stock"
    );

    if (!user) {
      return NextResponse.json(
        { success: false, message: "کاربر یافت نشد" },
        { status: 404 }
      );
    }

    if (user.cart.items.length === 0) {
      return NextResponse.json(
        { success: false, message: "سبد خرید خالی است" },
        { status: 400 }
      );
    }

    for (const item of user.cart.items) {
      const product = await Product.findById(item.product._id);
      if (product.stock < item.quantity) {
        return NextResponse.json(
          {
            success: false,
            message: `موجودی محصول ${product.name} کافی نیست`,
          },
          { status: 400 }
        );
      }
    }

    let totalAmount = 0;
    const paymentItems = user.cart.items.map((item) => {
      const itemPrice = item.product.offPrice || item.product.price;
      const itemTotal = itemPrice * item.quantity;
      totalAmount += itemTotal;

      return {
        product: item.product._id,
        quantity: item.quantity,
        price: itemPrice,
        name: item.product.name,
      };
    });

    const payment = await Payment.create({
      user: userId,
      items: paymentItems,
      amount: totalAmount,
      paymentMethod,
      invoiceNumber: `INV-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      status: "pending",
    });

    for (const item of user.cart.items) {
      await Product.findByIdAndUpdate(item.product._id, {
        $inc: { stock: -item.quantity },
      });
    }

    user.cart.items = [];
    user.cart.totalPrice = 0;
    await user.save();

    return NextResponse.json({ success: true, data: payment }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}

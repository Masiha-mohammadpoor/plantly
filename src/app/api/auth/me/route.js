import { connectDB } from "@/lib/db/connect";
import Product from "@/models/Product";
import User from '@/models/User';
import { getToken } from '@/utils/auth';

export async function GET(request) {
  try {
    await connectDB();

    // دریافت توکن از کوکی
    const token = getToken(request);
    if (!token) {
      return new Response(
        JSON.stringify({ success: false, message: "دسترسی غیرمجاز" }), 
        { status: 401 }
      );
    }

    // یافتن کاربر با اطلاعات کامل
    const user = await User.findById(token.id)
      .select('-password') // فقط رمز عبور را حذف می‌کنیم
      .populate({
        path: 'likes',
        select: 'name price images'
      })
      .populate({
        path: 'saved',
        select: 'name price images'
      })
      .populate({
        path: 'cart.items.product',
        select: 'name price images'
      });

    if (!user) {
      return new Response(
        JSON.stringify({ success: false, message: "کاربر یافت نشد" }), 
        { status: 404 }
      );
    }

    // محاسبه قیمت کل سبد خرید با استفاده از متد مدل
    await user.calculateCartTotal();

    return new Response(
      JSON.stringify({ 
        success: true, 
        data: user.toJSON() // استفاده از متد toJSON مدل برای حذف فیلدهای حساس
      }), 
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching user data:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: "خطای سرور",
        error: error.message 
      }), 
      { status: 500 }
    );
  }
}
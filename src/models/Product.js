import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'نام محصول الزامی است'],
    trim: true,
    maxlength: [100, 'نام محصول نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد']
  },
  price: {
    type: Number,
    required: [true, 'قیمت محصول الزامی است'],
    min: [0, 'قیمت نمی‌تواند منفی باشد']
  },
  description: {
    type: String,
    required: [true, 'توضیحات محصول الزامی است'],
    maxlength: [1000, 'توضیحات نمی‌تواند بیشتر از ۱۰۰۰ کاراکتر باشد']
  },
  category: {
    type: String,
    required: [true, 'دسته‌بندی محصول الزامی است'],
    enum: {
      values: ['الکترونیک', 'پوشاک', 'کتاب', 'لوازم خانگی', 'غذا', 'سایر'],
      message: 'لطفا یک دسته‌بندی معتبر انتخاب کنید'
    }
  },
  stock: {
    type: Number,
    required: [true, 'تعداد موجودی الزامی است'],
    min: [0, 'تعداد موجودی نمی‌تواند منفی باشد'],
    default: 0
  },
  ratings: {
    type: Number,
    default: 0,
    min: [0, 'امتیاز نمی‌تواند کمتر از ۰ باشد'],
    max: [5, 'امتیاز نمی‌تواند بیشتر از ۵ باشد']
  },
  images: [
    {
      public_id: {
        type: String,
        required: true
      },
      url: {
        type: String,
        required: true
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  },
  // createdBy: {
  //   type: mongoose.Schema.ObjectId,
  //   ref: 'user',
  //   required: true
  // }
});

// Middleware برای محاسبه میانگین رتبه‌بندی
ProductSchema.methods.updateRatings = async function() {
  const reviews = await this.model('Review').find({ product: this._id });
  
  if (reviews.length === 0) {
    this.ratings = 0;
    return;
  }

  const sum = reviews.reduce((acc, item) => acc + item.rating, 0);
  this.ratings = sum / reviews.length;
  await this.save();
};

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
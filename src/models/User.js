import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'نام کاربری الزامی است'],
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  email: {
    type: String,
    required: [true, 'ایمیل الزامی است'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'لطفا ایمیل معتبر وارد کنید']
  },
  password: {
    type: String,
    required: [true, 'رمز عبور الزامی است'],
    minlength: 6,
    select: false
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    default: []
  }],
  saved: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    default: []
  }],
  cart: {
    items: [{
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1
      },
      addedAt: {
        type: Date,
        default: Date.now
      }
    }],
    totalPrice: {
      type: Number,
      default: 0
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware برای به‌روزرسانی تاریخ
UserSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// محاسبه خودکار قیمت کل سبد خرید
UserSchema.methods.calculateCartTotal = async function() {
  const populatedUser = await this.populate('cart.items.product');
  this.cart.totalPrice = populatedUser.cart.items.reduce((total, item) => {
    return total + (item.product.price * item.quantity);
  }, 0);
  return this.save();
};

// حذف فیلدهای حساس هنگام تبدیل به JSON
UserSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};

export default mongoose.models.User || mongoose.model('User', UserSchema);
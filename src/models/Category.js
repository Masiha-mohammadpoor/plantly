import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'نام دسته‌بندی الزامی است'],
    unique: true,
    trim: true,
    maxlength: [50, 'نام دسته‌بندی نمی‌تواند بیشتر از ۵۰ کاراکتر باشد']
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  parent: {
    type: mongoose.Schema.ObjectId,
    ref: 'Category',
    default: null
  },
  description: {
    type: String,
    maxlength: [500, 'توضیحات نمی‌تواند بیشتر از ۵۰۰ کاراکتر باشد']
  },
  icon: {
    type: String
  },
  featured: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// ایجاد slug خودکار قبل از ذخیره
CategorySchema.pre('save', function(next) {
  this.slug = this.name.replace(/\s+/g, '-').toLowerCase();
  next();
});

// رابطه مجازی برای زیردسته‌ها
CategorySchema.virtual('subcategories', {
  ref: 'Category',
  localField: '_id',
  foreignField: 'parent',
  justOne: false
});

export default mongoose.models.Category || mongoose.model('Category', CategorySchema);
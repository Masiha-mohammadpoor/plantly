import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'نام دسته‌بندی الزامی است'],
    trim: true,
    maxlength: [50, 'نام دسته‌بندی نمی‌تواند بیشتر از ۵۰ کاراکتر باشد']
  },
  englishTitle: {
    type: String,
    required: [true, 'عنوان انگلیسی الزامی است'],
    trim: true,
    lowercase: true,
    match: [/^[a-z0-9-]+$/, 'عنوان انگلیسی فقط می‌تواند شامل حروف انگلیسی، اعداد و خط تیره باشد']
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

// ایجاد slug خودکار از englishTitle
CategorySchema.pre('save', function(next) {
  this.englishTitle = this.englishTitle.toLowerCase().replace(/\s+/g, '-');
  next();
});

export default mongoose.models.Category || mongoose.model('Category', CategorySchema);
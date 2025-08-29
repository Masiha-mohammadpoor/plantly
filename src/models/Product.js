import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "نام محصول الزامی است"],
      trim: true,
      maxlength: [100, "نام محصول نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      required: [true, "توضیحات محصول الزامی است"],
      maxlength: [1000, "توضیحات نمی‌تواند بیشتر از ۱۰۰۰ کاراکتر باشد"],
    },
    price: {
      type: Number,
      required: [true, "قیمت محصول الزامی است"],
      min: [0, "قیمت نمی‌تواند منفی باشد"],
    },
    offPrice: {
      type: Number,
      min: [0, "قیمت تخفیف نمی‌تواند منفی باشد"],
      validate: {
        validator: function (value) {
          if (!this.price || value === null || value === undefined) return true;
          return value <= this.price;
        },
        message: "قیمت تخفیف باید کمتر یا مساوی قیمت اصلی باشد",
      },
    },
    discount: {
      type: Number,
      min: [0, "تخفیف نمی‌تواند منفی باشد"],
      max: [100, "تخفیف نمی‌تواند بیشتر از ۱۰۰٪ باشد"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "دسته‌بندی الزامی است"],
    },
    images: {
      type: String,
      required: [true, "عکس محصول الزامی است"],
    },
    stock: {
      type: Number,
      required: [true, "تعداد موجودی الزامی است"],
      min: [0, "تعداد موجودی نمی‌تواند منفی باشد"],
      default: 0,
    },
    likesCount: {
      type: Number,
      default: 0,
      min: [0, "تعداد لایک نمی‌تواند منفی باشد"],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

ProductSchema.pre("save", function (next) {
  if (!this.slug) {
    this.slug = this.name
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .toLowerCase();
  }
  next();
});

ProductSchema.pre("save", function (next) {
  if (this.offPrice && this.price) {
    this.discount = Math.round(
      ((this.price - this.offPrice) / this.price) * 100
    );
  } else {
    this.discount = 0;
  }
  next();
});

ProductSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();

  if (
    update.$set &&
    (update.$set.price !== undefined || update.$set.offPrice !== undefined)
  ) {
    const price =
      update.$set.price !== undefined
        ? update.$set.price
        : this._update.$set?.price;
    const offPrice =
      update.$set.offPrice !== undefined
        ? update.$set.offPrice
        : this._update.$set?.offPrice;

    if (price !== undefined && offPrice !== undefined && offPrice > 0) {
      const discount = Math.round(((price - offPrice) / price) * 100);
      this.setUpdate({
        ...update,
        $set: {
          ...update.$set,
          discount: discount,
        },
      });
    } else if (offPrice === 0 || offPrice === null || offPrice === undefined) {
      this.setUpdate({
        ...update,
        $set: {
          ...update.$set,
          discount: 0,
        },
      });
    }
  }

  this.setUpdate({
    ...update,
    $set: {
      ...update.$set,
      updatedAt: new Date(),
    },
  });

  next();
});

ProductSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);

import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxlength: [100, "Product name cannot be longer than 100 characters"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      maxlength: [1000, "Descriptions cannot exceed 1000 characters"],
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price cannot be negative"],
    },
    offPrice: {
      type: Number,
      min: [0, "Discount price cannot be negative"],
      validate: {
        validator: function (value) {
          if (!this.price || value === null || value === undefined) return true;
          return value <= this.price;
        },
        message:
          "The discounted price must be less than or equal to the original price",
      },
    },
    discount: {
      type: Number,
      min: [0, "Discount cannot be negative"],
      max: [100, "Discount cannot be more than 100%"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
    },
    images: {
      type: String,
      required: [true, "Product image is required"],
    },
    stock: {
      type: Number,
      required: [true, "Inventory quantity is required"],
      min: [0, "The inventory count cannot be negative"],
      default: 0,
    },
    likesCount: {
      type: Number,
      default: 0,
      min: [0, "The number of likes cannot be negative"],
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

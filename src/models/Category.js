import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
      maxlength: [50, "Category name cannot be longer than 50 characters"],
    },
    englishTitle: {
      type: String,
      required: [true, "English title required"],
      trim: true,
      lowercase: true,
      match: [
        /^[a-z0-9-]+$/,
        "The English title can only contain English letters, numbers, and hyphens",
      ],
    },
    description: {
      type: String,
      maxlength: [500, "Descriptions cannot exceed 500 characters"],
    },
    icon: {
      type: String,
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

// create slug
CategorySchema.pre("save", function (next) {
  this.englishTitle = this.englishTitle.toLowerCase().replace(/\s+/g, "-");
  next();
});

export default mongoose.models.Category ||
  mongoose.model("Category", CategorySchema);

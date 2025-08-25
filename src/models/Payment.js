import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
  {
    invoiceNumber: {
      type: String,
      required: true,
      unique: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
      },
    ],
    status: {
      type: String,
      enum: ["pending", "completed", "failed", "refunded"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: ["online", "cash", "bank-transfer", "wallet"],
      required: true,
    },
    paymentDate: {
      type: Date,
    },
    trackingCode: {
      type: String,
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

PaymentSchema.pre("save", function (next) {
  if (this.isModified("items")) {
    this.amount = this.items.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  }

  if (this.isModified("status") && this.status === "completed") {
    this.paymentDate = new Date();
  }

  this.updatedAt = new Date();
  next();
});

export default mongoose.models.Payment ||
  mongoose.model("Payment", PaymentSchema);

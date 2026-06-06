import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    quantity: {
      type: Number,
      default: 1,
    },

    amount: {
      type: Number,
      required: true,
    },

    paymentId: String,

    adminShare: {
      type: Number,
      default: 0,
    },

    sellerShare: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["placed", "shipped", "out_for_delivery", "delivered"],
      default: "placed",
    },
    sellerPaid: {
      type: Boolean,
      default: false,
    },

    sellerPaidAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Order", orderSchema);

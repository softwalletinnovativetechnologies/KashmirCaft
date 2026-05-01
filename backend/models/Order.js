import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    amount: Number,
    adminShare: Number,
    sellerShare: Number,

    paymentId: String,

    status: {
      type: String,
      enum: ["placed", "shipped", "out_for_delivery", "delivered"],
      default: "placed",
    },
  },
  { timestamps: true },
);

export default mongoose.model("Order", orderSchema);

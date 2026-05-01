import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    description: String,
    images: [String],
    category: String,
    stock: Number,

    // ✅ ADD THIS (VERY IMPORTANT)
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

export default mongoose.model("Product", productSchema);

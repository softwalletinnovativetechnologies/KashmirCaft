import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: String,
  price: Number,
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  status: {
    type: String,
    default: "pending",
  },
});

export default mongoose.model("Product", productSchema);

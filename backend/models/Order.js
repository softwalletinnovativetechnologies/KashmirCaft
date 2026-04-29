import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  total: Number,
  status: {
    type: String,
    default: "pending",
  },
});

export default mongoose.model("Order", orderSchema);

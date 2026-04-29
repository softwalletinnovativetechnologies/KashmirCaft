import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    role: {
      type: String,
      enum: ["buyer", "seller", "admin"], // ✅ FIX
      default: "buyer",
    },

    isPaid: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: ["pending", "approved", "blocked"],
      default: "approved",
    },
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);

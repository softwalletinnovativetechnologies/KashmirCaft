import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    description: String,
    images: [String],
    category: String,
    stock: Number,
    status: {
      type: String,
      default: "approved",
    },

    // Seller reference
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    // Product reviews
    reviews: [
      {
        user: {
          type: String,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
          min: 1,
          max: 5,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Product", productSchema);
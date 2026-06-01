import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // ================= BASIC =================

    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    role: {
      type: String,
      enum: ["buyer", "seller", "admin"],
      default: "buyer",
    },

    // ================= SELLER INFO =================

    phone: {
      type: String,
      default: "",
    },

    shopName: {
      type: String,
      default: "",
    },

    profileImage: {
      type: String,
      default: "",
    },

    // ================= DOCUMENTS =================

    aadhaarNumber: {
      type: String,
      default: "",
    },

    panNumber: {
      type: String,
      default: "",
    },

    gstNumber: {
      type: String,
      default: "",
    },

    aadhaarFront: {
      type: String,
      default: "",
    },

    aadhaarBack: {
      type: String,
      default: "",
    },

    panCardImage: {
      type: String,
      default: "",
    },

    // ================= PAYOUT DETAILS =================

    sellerDetails: {
      type: {
        accountHolderName: {
          type: String,
          default: "",
        },

        bankName: {
          type: String,
          default: "",
        },

        accountNumber: {
          type: String,
          default: "",
        },

        ifscCode: {
          type: String,
          default: "",
        },

        upiId: {
          type: String,
          default: "",
        },

        panNumber: {
          type: String,
          default: "",
        },
      },

      default: () => ({
        accountHolderName: "",
        bankName: "",
        accountNumber: "",
        ifscCode: "",
        upiId: "",
        panNumber: "",
      }),
    },

    // ================= ADMIN VERIFICATION =================

    isVerified: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "blocked"],
      default: "pending",
    },

    statusUpdatedAt: {
      type: Date,
      default: null,
    },

    statusUpdatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },

  {
    timestamps: true,
  },
);

export default mongoose.model("User", userSchema);

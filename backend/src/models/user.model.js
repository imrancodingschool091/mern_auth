import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    verifyOtp: {
      type: String,
      default: "",
    },
    verifyOtpExpireAt: {
      type: Boolean,
      default: 0,
    },

    isVerifiedAccount: {
      type: Boolean,
      default: false,
    },

    resetOpt: {
      type: String,
      default: "",
    },
    resetOtpExpireAt: {
      type: Boolean,
      default: 0,
    },
  },
  { timestamps: true }
);


export const User=mongoose.model("User",userSchema)
import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["email-verification", "password-reset"],
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
  used: {
    type: Boolean,
    default: false,
  },
});

otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

otpSchema.index({ email: 1, type: 1 });

export default mongoose.model("OTP", otpSchema);

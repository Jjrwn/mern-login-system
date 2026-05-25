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
  // Unified enum values used consistently across model, services, and email service
  type: {
    type: String,
    enum: ["email-verification", "password-reset"],
    required: true,
  },
  // Field name and TTL index are aligned — stores exact expiry datetime
  expiresAt: {
    type: Date,
    required: true,
  },
  used: {
    type: Boolean,
    default: false,
  },
});

// Correct Mongoose TTL index syntax: delete document when current time passes expiresAt
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Compound index for fast lookups during OTP verification
otpSchema.index({ email: 1, type: 1 });

export default mongoose.model("OTP", otpSchema);

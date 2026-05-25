import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import generateOTP from "../utils/otpGenerator.js";
import { sendOtpEmail } from "./emailService.js";
import User from "../models/User.js";
import OTP from "../models/OTP.js";
import logger from "../utils/logger.js";

// ─── Internal helpers ────────────────────────────────────────────────────────

const generateAndSendOTP = async (email, type) => {
  // Remove any existing unused OTPs for this email + type
  await OTP.deleteMany({ email, type });

  const code = generateOTP(6);

  await OTP.create({
    email,
    code,
    type,
    expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
    used: false,
  });

  await sendOtpEmail(email, code, type);
  logger.info(`OTP generated and sent to ${email} for ${type}`);
};

// ─── Exported service functions ───────────────────────────────────────────────

export const registerUser = async (username, email, password) => {
  const existingUser = await User.findOne({ $or: [{ email }, { username }] });
  if (existingUser) {
    const err = new Error("User already exists");
    err.status = 400;
    throw err;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username, // Fixed: was 'name', aligned with User model field
    email,
    password: hashedPassword, // Fixed: was 'hashedPassword' as field name
    isVerified: false,
  });

  await generateAndSendOTP(email, "email-verification");

  return {
    id: user._id,
    email: user.email,
    username: user.username,
  };
};

export const loginUser = async (email, password) => {
  const user = await User.findOne({ email });

  // Dummy hash prevents timing attacks by always running bcrypt.compare
  const dummyHash = "$2b$10$CwTycUXWue0Thq9StjUM0uJ8z5rG1/2iYF5oPqFhXj3T6a7kS"; // Fixed: was 'dummmyHash' typo

  const isMatch = await bcrypt.compare(
    password,
    user ? user.password : dummyHash,
  );

  if (!user || !isMatch) {
    const err = new Error("Invalid email or password");
    err.status = 401; // Fixed: was err.statusCode, normalized to err.status
    throw err;
  }

  if (!user.isVerified) {
    const err = new Error("Please verify your email before logging in");
    err.status = 403;
    throw err;
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  logger.info(`User logged in: ${email}`);

  return {
    id: user._id,
    email: user.email,
    username: user.username,
    token,
  };
};

export const verifyOTP = async (email, code, type) => {
  const otpRecord = await OTP.findOne({ email, code, type, used: false });

  if (!otpRecord) {
    const err = new Error("Invalid OTP");
    err.status = 400;
    throw err;
  }

  if (new Date() > otpRecord.expiresAt) {
    // Fixed: was otpRecord.expireAt (field name mismatch)
    const err = new Error("OTP has expired. Please request a new one.");
    err.status = 400;
    throw err;
  }

  otpRecord.used = true;
  await otpRecord.save();

  if (type === "email-verification") {
    await User.findOneAndUpdate({ email }, { isVerified: true });
    logger.info(`Email verified for ${email}`);
  }

  return true;
};

export const forgotPassword = async (email) => {
  const user = await User.findOne({ email });

  // Fixed: logic was inverted — only send OTP if user EXISTS
  if (user) {
    await generateAndSendOTP(email, "password-reset");
  }

  logger.info(`Password reset requested for ${email}`);

  // Always return the same message to prevent email enumeration
  return {
    message:
      "If an account with that email exists, a password reset OTP has been sent.",
  };
};

export const resetPassword = async (email, code, newPassword) => {
  await verifyOTP(email, code, "password-reset");

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await User.findOneAndUpdate({ email }, { password: hashedPassword }); // Fixed: field is 'password'

  logger.info(`Password reset for ${email}`);

  return { message: "Password reset successful" };
};

export const resendOTP = async (email, type) => {
  const user = await User.findOne({ email });

  if (!user) {
    const err = new Error("User not found");
    err.status = 404;
    throw err;
  }

  await generateAndSendOTP(email, type);

  return { message: "A new OTP has been sent to your email" };
};

export default {
  registerUser,
  loginUser,
  verifyOTP,
  forgotPassword,
  resetPassword,
  resendOTP,
  generateAndSendOTP,
};

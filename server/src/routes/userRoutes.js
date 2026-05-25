import express from "express";
import {
  registerUserController,
  loginUserController,
  verifyOtpController,
  resendOtpController,
  forgotPasswordController,
  resetPasswordController,
} from "../controllers/userController.js";
import {
  loginLimiter,
  registerLimiter,
  passwordResetLimiter,
  otpLimiter,
} from "../middleware/rateLimiter.js";

const router = express.Router();

router.post("/register", registerLimiter, registerUserController);
router.post("/login", loginLimiter, loginUserController);
router.post("/verify-otp", otpLimiter, verifyOtpController);
router.post("/resend-otp", otpLimiter, resendOtpController);
router.post("/forgot-password", passwordResetLimiter, forgotPasswordController);
router.post("/reset-password", passwordResetLimiter, resetPasswordController);

export default router;

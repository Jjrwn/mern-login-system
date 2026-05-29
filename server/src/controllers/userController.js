import {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  verifyOTP,
  resendOTP,
} from "../services/authServices.js";

export const registerUserController = async (req, res, next) => {
  try {
    let { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters" });
    }

    const result = await registerUser(
      username.trim(),
      email.trim().toLowerCase(),
      password,
    );
    res.status(201).json({
      message: "User registered successfully. Check your email for the OTP.",
      user: result,
    });
  } catch (error) {
    next(error);
  }
};

export const loginUserController = async (req, res, next) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const result = await loginUser(email.trim().toLowerCase(), password);
    res.json({ message: "Login successful", ...result });
  } catch (error) {
    next(error);
  }
};

export const verifyOtpController = async (req, res, next) => {
  try {
    const { email, code, type } = req.body;

    if (!email || !code || !type) {
      return res
        .status(400)
        .json({ message: "Email, code, and type are required" });
    }

    await verifyOTP(email, code, type);
    res.json({ message: "OTP verified successfully" });
  } catch (error) {
    next(error);
  }
};

export const resendOtpController = async (req, res, next) => {
  try {
    const { email, type } = req.body;

    if (!email || !type) {
      return res.status(400).json({ message: "Email and type are required" });
    }

    const result = await resendOTP(email, type);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const forgotPasswordController = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const result = await forgotPassword(email.trim().toLowerCase());
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const resetPasswordController = async (req, res, next) => {
  try {
    const { email, code, newPassword } = req.body;

    if (!email || !code || !newPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (newPassword.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters" });
    }

    const result = await resetPassword(
      email.trim().toLowerCase(),
      code,
      newPassword,
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
};

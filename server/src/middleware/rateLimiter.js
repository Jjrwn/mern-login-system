import rateLimit from "express-rate-limit";

export const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      message: "Too many login attempts. Please wait before trying again.",
      retryAfter: res.getHeader("Retry-After"),
    });
  },
});

export const registerLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      message:
        "Too many registration attempts. Please wait before trying again.",
      retryAfter: res.getHeader("Retry-After"),
    });
  },
});

export const passwordResetLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 3,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      message:
        "Too many password reset attempts. Please wait before trying again.",
      retryAfter: res.getHeader("Retry-After"),
    });
  },
});

export const otpLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      message: "Too many OTP requests. Please wait before trying again.",
      retryAfter: res.getHeader("Retry-After"),
    });
  },
});

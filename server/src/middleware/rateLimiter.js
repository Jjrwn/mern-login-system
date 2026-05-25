import rateLimit from "express-rate-limit";

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
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
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 15,
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
  windowMs: 15 * 60 * 1000, // Fixed: was 15 * 16 * 1000 (4 minutes), now correctly 15 minutes
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

// Added: OTP endpoints are the most abuse-prone — dedicated limiter
export const otpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
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

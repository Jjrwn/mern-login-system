import crypto from "crypto";

const generateOTP = (digits = 6) => {
  if (!Number.isInteger(digits) || digits < 4 || digits > 10) {
    throw new Error("OTP digits must be an integer between 4 and 10");
  }
  const max = Math.pow(10, digits);
  return crypto.randomInt(0, max).toString().padStart(digits, "0");
};

export default generateOTP;

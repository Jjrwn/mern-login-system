import { getTransporter } from "../config/mail.js";
import logger from "../utils/logger.js";

export const sendOtpEmail = async (to, otp, type) => {
  const subject =
    type === "email-verification"
      ? "Email Verification OTP"
      : "Password Reset OTP";

  try {
    const transporter = getTransporter();
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to,
      subject,
      html: `
        <p>Your OTP code is: <strong>${otp}</strong></p>
        <p>It will expire in <strong>10 minutes</strong>. Do not share it with anyone.</p>
      `,
    });
    logger.info(`OTP email sent to ${to} for ${type}`);
  } catch (error) {
    logger.error(`Failed to send OTP email to ${to}: ${error.message}`);
    throw error;
  }
};

export const sendExpiryNotification = async (to, daysLeft) => {
  try {
    const transporter = getTransporter();
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to,
      subject: "Subscription Expiry Notification",
      html: `
        <p>Your subscription will expire in <strong>${daysLeft} day(s)</strong>.</p>
        <p>Please renew to continue enjoying our services.</p>
      `,
    });
    logger.info(`Expiry notification sent to ${to} (${daysLeft} days left)`);
  } catch (error) {
    logger.error(
      `Failed to send expiry notification to ${to}: ${error.message}`,
    );
    throw error;
  }
};

export default { sendOtpEmail, sendExpiryNotification };

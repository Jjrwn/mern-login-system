import cron from "node-cron";
import OTP from "../models/OTP.js";
import logger from "../utils/logger.js";

// Runs every hour to clean up expired or used OTPs
// Note: MongoDB TTL index also handles this automatically,
// but this job catches 'used' OTPs that haven't expired yet.
const otpCleanupJob = cron.schedule(
  "0 * * * *",
  async () => {
    logger.info("Running OTP cleanup job...");
    try {
      const result = await OTP.deleteMany({
        $or: [
          { expiresAt: { $lt: new Date() } }, // expired OTPs
          { used: true }, // already used OTPs
        ],
      });
      logger.info(`OTP cleanup: removed ${result.deletedCount} record(s)`);
    } catch (error) {
      logger.error(`OTP cleanup job failed: ${error.message}`);
    }
  },
  { scheduled: false },
);

export default otpCleanupJob;

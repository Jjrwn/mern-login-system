import cron from "node-cron";
import OTP from "../models/OTP.js";
import logger from "../utils/logger.js";

const otpCleanupJob = cron.schedule(
  "0 * * * *",
  async () => {
    logger.info("Running OTP cleanup job...");
    try {
      const result = await OTP.deleteMany({
        $or: [{ expiresAt: { $lt: new Date() } }, { used: true }],
      });
      logger.info(`OTP cleanup: removed ${result.deletedCount} record(s)`);
    } catch (error) {
      logger.error(`OTP cleanup job failed: ${error.message}`);
    }
  },
  { scheduled: false },
);

export default otpCleanupJob;

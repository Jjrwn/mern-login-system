import expiryJob from "../jobs/expiryJob.js";
import otpCleanupJob from "../jobs/otpCleanupJob.js";

const initCrons = () => {
  expiryJob.start();
  otpCleanupJob.start();
  console.log("Cron jobs initialized");
};

export default initCrons;

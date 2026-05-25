import nodemailer from "nodemailer";

let transporter;

export const getTransporter = () => {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: process.env.SMTP_SERVICE,
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false, // false for port 587
      requireTLS: true, // Gmail requires STARTTLS
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  return transporter;
};

export const verifyTransporter = () => {
  getTransporter().verify((error) => {
    if (error) {
      console.error("SMTP connection failed:", error.message);
    } else {
      console.log("SMTP server is ready to send emails");
    }
  });
};

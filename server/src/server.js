import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import connectDB from "./config/db.js";
import { verifyTransporter } from "./config/mail.js";
import errorHandler from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.use("/api/users", userRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const init = async () => {
  await connectDB();
  verifyTransporter();
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

init();

import logger from "../utils/logger.js";

const errorHandler = (err, req, res, next) => {
  const status = err.status || err.statusCode || 500;

  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: Object.values(err.errors)
        .map((e) => e.message)
        .join(", "),
    });
  }
  if (err.code === 11000) {
    return res.status(400).json({
      message: `Duplicate value for: ${Object.keys(err.keyValue).join(", ")}`,
    });
  }

  logger.error(`${req.method} ${req.url} - ${err.message}`);

  res.status(status).json({
    message: err.message || "Internal server error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

export default errorHandler;

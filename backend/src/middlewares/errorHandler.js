// src/middlewares/errorHandler.js

/**
 * @desc Handles requests to non-existing routes (404)
 */
const notFound = (req, res, next) => {
  const error = new Error(`🔍 Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

/**
 * @desc Global Error Handler Middleware
 */
const errorHandler = (err, req, res, next) => {
  console.error("❌ Error Handler:", err);

  // Set status code
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  // Structured error response
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack, // Hide stack in production
    path: req.originalUrl,
    method: req.method,
  });
};

module.exports = { notFound, errorHandler };

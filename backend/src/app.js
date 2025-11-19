const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const compression = require("compression");
const rateLimit = require("express-rate-limit");

// Routes
const productsRoutes = require("./routes/products.routes");
const servicesRoutes = require("./routes/services.routes");
const contactRoutes = require("./routes/contact.routes");
const adminRoutes = require("./routes/admin.routes");
const orderRoutes = require("./routes/orderRoutes"); // Orders route
const newsletterRoutes = require("./routes/newsletter.routes"); // Newsletter route

// Error handlers
const { errorHandler, notFound } = require("./middlewares/errorHandler");

const app = express();

// ------------------------
// 🛡️ Security & Performance Middleware
// ------------------------
app.use(helmet()); // Adds secure HTTP headers
app.use(compression()); // Gzip compression for performance
app.use(morgan("dev")); // Request logging

// 🚦 Rate Limiting (optional for APIs)
app.use(
  "/api/",
  rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 500, // limit each IP to 500 requests per windowMs
    message: "Too many requests from this IP, please try again later.",
  })
);

// ------------------------
// 🌐 CORS Configuration
// ------------------------

// Read allowed origins from environment variable (comma-separated if multiple)
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",").map(origin => origin.trim())
  : [];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(
          new Error("Not allowed by CORS: " + origin),
          false
        );
      }
    },
    credentials: true,
  })
);

// ------------------------
// 🧠 Body Parsers
// ------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ------------------------
// 📦 Routes
// ------------------------
app.use("/api/admin", adminRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/services", servicesRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/orders", orderRoutes); // Orders route
app.use("/api/newsletter", newsletterRoutes); // Newsletter route

// 💚 Health Check
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "✅ Enervion API is running successfully!",
    timestamp: new Date().toISOString(),
  });
});

// ------------------------
// 🚫 404 Handler
// ------------------------
app.use(notFound);

// ------------------------
// ❌ Error Handler (must be last)
// ------------------------
app.use(errorHandler);

module.exports = app;

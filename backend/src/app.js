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
const orderRoutes = require("./routes/orderRoutes");
const newsletterRoutes = require("./routes/newsletter.routes");

// Error handlers
const { errorHandler, notFound } = require("./middlewares/errorHandler");

const app = express();

/* --------------------------------------------------------
   🛡 Security & Performance Middleware
--------------------------------------------------------- */
app.use(helmet());
app.use(compression());
app.use(morgan("dev"));

/* --------------------------------------------------------
   🚦 Rate Limiting
--------------------------------------------------------- */
app.use(
  "/api/",
  rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 500,
    message: "Too many requests from this IP, please try again later.",
  })
);

/* --------------------------------------------------------
   🌐 CORS Configuration (Fixed & Improved)
--------------------------------------------------------- */

// Normalize & read allowed origins
let allowedOrigins = [];

if (process.env.ALLOWED_ORIGINS) {
  allowedOrigins = process.env.ALLOWED_ORIGINS
    .split(",")
    .map((o) => o.trim().replace(/\/$/, "")); // remove trailing slashes
}

console.log("🟢 Allowed Origins:", allowedOrigins);

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow server-to-server and tools like Postman (no origin header)
      if (!origin) return callback(null, true);

      const cleanOrigin = origin.replace(/\/$/, "");

      if (allowedOrigins.includes(cleanOrigin)) {
        return callback(null, true);
      }

      console.warn("🚫 CORS blocked:", cleanOrigin);
      return callback(new Error("CORS: Origin not allowed"), false);
    },
    credentials: true,
  })
);

/* --------------------------------------------------------
   🧠 Body Parsers
--------------------------------------------------------- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* --------------------------------------------------------
   📦 Routes
--------------------------------------------------------- */
app.use("/api/admin", adminRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/services", servicesRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/newsletter", newsletterRoutes);

/* --------------------------------------------------------
   💚 Health Check
--------------------------------------------------------- */
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "✅ Enervion API is running successfully!",
    timestamp: new Date().toISOString(),
  });
});

/* --------------------------------------------------------
   🚫 404 Handler
--------------------------------------------------------- */
app.use(notFound);

/* --------------------------------------------------------
   ❌ Error Handler (must be last)
--------------------------------------------------------- */
app.use(errorHandler);

module.exports = app;

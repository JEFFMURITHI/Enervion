// server.js
require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/config/db");
const mongoose = require("mongoose");

// Load environment variables
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || "development";

(async () => {
  try {
    /* --------------------------------------------------------
       📦 Connect to MongoDB
    --------------------------------------------------------- */
    await connectDB();
    console.log("✅ MongoDB connected successfully.");

    /* --------------------------------------------------------
       🚀 Start Express Server
    --------------------------------------------------------- */
    const server = app.listen(PORT, () => {
      console.log(
        `🚀 Server running in ${NODE_ENV} mode on port ${PORT}`
      );
      console.log("🌐 API Base URL:", process.env.RENDER_EXTERNAL_URL || `http://localhost:${PORT}`);
    });

    /* --------------------------------------------------------
       🛑 Graceful Shutdown Handler
    --------------------------------------------------------- */
    const shutdown = (signal) => {
      console.log(`\n🛑 Received ${signal}. Shutting down gracefully...`);

      server.close(() => {
        console.log("🔌 HTTP server closed.");

        mongoose.connection.close(false, () => {
          console.log("📦 MongoDB connection closed.");
          console.log("👋 Exiting process.");
          process.exit(0);
        });
      });
    };

    process.on("SIGINT", shutdown);   // Ctrl + C
    process.on("SIGTERM", shutdown); // Render or cloud kills

  } catch (err) {
    console.error("❌ Failed to start server:", err.message);
    process.exit(1);
  }
})();

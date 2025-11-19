// server.js
require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/config/db");

// Load environment variables
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || "development";

(async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Start Express server
    const server = app.listen(PORT, () => {
      console.log(
        `🚀 Server running in ${NODE_ENV} mode on http://localhost:${PORT}`
      );
    });

    // ----------------------------
    // ✅ Graceful Shutdown Handler
    // ----------------------------
    const shutdown = (signal) => {
      console.log(`\n🛑 Received ${signal}. Closing server...`);

      server.close(() => {
        console.log("🔌 HTTP server closed.");

        // Close MongoDB connection
        const mongoose = require("mongoose");
        mongoose.connection.close(false, () => {
          console.log("📦 MongoDB connection closed. Exiting process.");
          process.exit(0);
        });
      });
    };

    process.on("SIGINT", shutdown); // Ctrl + C
    process.on("SIGTERM", shutdown); // Render/Heroku/GCP kills

  } catch (err) {
    console.error("❌ Failed to start server:", err.message);
    process.exit(1);
  }
})();

// src/scripts/seed.js
require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("../models/product.model");
const Service = require("../models/service.model");
const { products, services } = require("../utils/seedData");

const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("✅ MongoDB connected. Seeding data...");

    // Clear existing data
    await Product.deleteMany();
    await Service.deleteMany();

    // Insert sample products
    const createdProducts = await Product.insertMany(products);
    console.log(`✅ ${createdProducts.length} products seeded.`);

    // Insert sample services
    const createdServices = await Service.insertMany(services);
    console.log(`✅ ${createdServices.length} services seeded.`);

    mongoose.connection.close();
    console.log("🎉 Seeding completed and MongoDB connection closed.");
  })
  .catch((err) => {
    console.error("❌ Error connecting to MongoDB:", err);
  });

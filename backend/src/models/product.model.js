// src/models/Product.model.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Product category is required"],
      enum: ["electric-vehicle", "electric-motorbike", "renewable-system", "accessory", "other"],
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
    },
    images: {
      type: [String], // URLs to images
      default: [],
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
    },
    stock: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true } // createdAt and updatedAt
);

module.exports = mongoose.model("Product", productSchema);

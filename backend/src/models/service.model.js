// src/models/Service.model.js
const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Service title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Service description is required"],
    },
    image: {
      type: String, // URL of service image
      default: "",
    },
    category: {
      type: String,
      enum: ["battery-swapping", "repair-maintenance", "installation-consultation", "other"],
      default: "other",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);

// src/controllers/orderController.js
const Order = require("../models/Order");
const { v4: uuidv4 } = require("uuid");

exports.createOrder = async (req, res) => {
  try {
    const {
      customerName,
      customerEmail,
      customerPhone,
      customerAddress,
      items,
      totalPrice,
    } = req.body;

    // Basic validation
    if (!customerName || !customerEmail || !customerPhone || !customerAddress) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Cart cannot be empty" });
    }

    // Create new order
    const order = await Order.create({
      customerName,
      customerEmail,
      customerPhone,
      customerAddress,
      items,
      totalPrice,
      orderId: "ORD-" + uuidv4().split("-")[0].toUpperCase(),
    });

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.error("Order creation error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

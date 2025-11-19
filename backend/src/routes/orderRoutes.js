const express = require("express");
const Order = require("../models/Order");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();

// ===============================
// Create New Order
// ===============================
router.post("/", async (req, res) => {
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
      return res.status(400).json({
        success: false,
        message: "All customer information is required",
      });
    }

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Order must contain at least one item",
      });
    }

    // Auto-generate order ID
    const generatedOrderId = "ORD-" + uuidv4().split("-")[0].toUpperCase();

    const order = new Order({
      customerName,
      customerEmail,
      customerPhone,
      customerAddress,
      items,
      totalPrice,
      orderId: generatedOrderId,
    });

    await order.save();

    res.status(201).json({
      success: true,
      message: "Order saved successfully",
      order,
    });
  } catch (error) {
    console.error("Order save error:", error);
    res.status(500).json({ success: false, message: "Failed to save order" });
  }
});

// ===============================
// Get All Orders
// ===============================
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    console.error("Fetch orders error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch orders" });
  }
});

module.exports = router;

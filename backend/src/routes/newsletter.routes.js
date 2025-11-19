const express = require("express");
const router = express.Router();
const Newsletter = require("../models/Newsletter"); // we'll create this model next

// Subscribe endpoint
router.post("/", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: "Email is required" });

    // Save to database
    const subscriber = new Newsletter({ email });
    await subscriber.save();

    res.status(201).json({ success: true, message: "Subscribed successfully", subscriber });
  } catch (error) {
    console.error("Newsletter subscribe error:", error);
    res.status(500).json({ success: false, message: "Failed to subscribe" });
  }
});

module.exports = router;

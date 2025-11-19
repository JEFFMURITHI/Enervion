// src/controllers/contact.controller.js
const Contact = require("../models/contact.model");

// @desc    Submit a contact form
// @route   POST /api/contact
// @access  Public
const submitContactForm = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;
    const contact = new Contact({ name, email, message });
    const savedContact = await contact.save();
    res.status(201).json({ success: true, message: "Message sent successfully", contact: savedContact });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all contact submissions (admin only)
// @route   GET /api/contact
// @access  Admin
const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, contacts });
  } catch (error) {
    next(error);
  }
};

module.exports = { submitContactForm, getAllContacts };

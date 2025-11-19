// src/routes/contact.routes.js
const express = require("express");
const { body } = require("express-validator");
const { protectAdmin } = require("../middlewares/auth");
const validateRequest = require("../middlewares/validateRequest");

const router = express.Router();
const { submitContactForm, getAllContacts } = require("../controllers/contact.controller");

// Public route: submit contact form with validation
router.post(
  "/",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("message").notEmpty().withMessage("Message is required"),
  ],
  validateRequest,
  submitContactForm
);

// Admin route: get all contact submissions
router.get("/", protectAdmin, getAllContacts);

module.exports = router;

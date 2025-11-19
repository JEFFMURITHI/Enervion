// src/routes/services.routes.js
const express = require("express");
const { body } = require("express-validator");
const { protectAdmin } = require("../middlewares/auth");
const validateRequest = require("../middlewares/validateRequest");

const {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
} = require("../controllers/services.controller");

// ✅ Local fallback data
const sampleServices = require("../data/sampleServices");

const router = express.Router();

/**
 * @route   GET /api/services
 * @desc    Get all services (DB first, fallback to sample)
 * @access  Public
 */
router.get("/", async (req, res) => {
  try {
    await getServices(req, res, true); // pass `true` to let controller handle fallback
  } catch (err) {
    console.error("❌ Error fetching services:", err.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch services",
    });
  }
});

/**
 * @route   GET /api/services/sample
 * @desc    Get only sample fallback services
 * @access  Public
 */
router.get("/sample", (req, res) => {
  res.status(200).json({
    success: true,
    source: "sample",
    services: sampleServices,
  });
});

/**
 * @route   GET /api/services/:id
 * @desc    Get single service by ID
 * @access  Public
 */
router.get("/:id", getServiceById);

/**
 * @route   POST /api/services
 * @desc    Create a new service
 * @access  Admin
 */
router.post(
  "/",
  protectAdmin,
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("image").optional().isURL().withMessage("Image must be a valid URL"),
    body("category").notEmpty().withMessage("Category is required"),
  ],
  validateRequest,
  createService
);

/**
 * @route   PUT /api/services/:id
 * @desc    Update an existing service
 * @access  Admin
 */
router.put(
  "/:id",
  protectAdmin,
  [
    body("title").optional().notEmpty().withMessage("Title cannot be empty"),
    body("description").optional().notEmpty().withMessage("Description cannot be empty"),
    body("image").optional().isURL().withMessage("Image must be a valid URL"),
    body("category").optional().notEmpty().withMessage("Category cannot be empty"),
  ],
  validateRequest,
  updateService
);

/**
 * @route   DELETE /api/services/:id
 * @desc    Delete a service
 * @access  Admin
 */
router.delete("/:id", protectAdmin, deleteService);

module.exports = router;

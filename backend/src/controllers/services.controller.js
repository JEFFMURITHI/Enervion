// src/controllers/services.controller.js
const Service = require("../models/service.model");

// ✅ Sample fallback services
const sampleServices = require("../data/sampleServices");

/**
 * @desc    Get all services (DB first, fallback to sample)
 * @route   GET /api/services
 * @access  Public
 */
const getServices = async (req, res, fallbackOnly = false) => {
  try {
    let dbServices = [];
    if (!fallbackOnly) {
      try {
        dbServices = await Service.find().sort({ createdAt: -1 });
      } catch (err) {
        console.warn("⚠️ MongoDB not reachable, using sampleServices fallback.");
      }
    }

    // If DB empty or unreachable, use sample
    if (!dbServices || dbServices.length === 0) {
      return res.status(200).json({
        success: true,
        source: "sample",
        services: sampleServices,
      });
    }

    // Return DB services
    return res.status(200).json({
      success: true,
      source: "database",
      services: dbServices,
    });
  } catch (error) {
    console.error("❌ Error fetching services:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch services",
    });
  }
};

/**
 * @desc    Get single service by ID
 * @route   GET /api/services/:id
 * @access  Public
 */
const getServiceById = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      res.status(404);
      throw new Error("Service not found");
    }
    res.json({ success: true, service });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create new service
 * @route   POST /api/services
 * @access  Admin
 */
const createService = async (req, res, next) => {
  try {
    const { title, description, image, category } = req.body;
    const service = new Service({ title, description, image, category });
    const savedService = await service.save();
    res.status(201).json({ success: true, service: savedService });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update service
 * @route   PUT /api/services/:id
 * @access  Admin
 */
const updateService = async (req, res, next) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!service) {
      res.status(404);
      throw new Error("Service not found");
    }
    res.json({ success: true, service });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete service
 * @route   DELETE /api/services/:id
 * @access  Admin
 */
const deleteService = async (req, res, next) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      res.status(404);
      throw new Error("Service not found");
    }
    res.json({ success: true, message: "Service deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
};

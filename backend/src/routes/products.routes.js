// src/routes/products.routes.js
const express = require("express");
const { body } = require("express-validator");
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/products.controller");
const { protectAdmin } = require("../middlewares/auth");
const validateRequest = require("../middlewares/validateRequest");
const sampleProducts = require("../data/sampleProducts");

const router = express.Router();

/**
 * @route   GET /api/products
 * @desc    Get all products (merged from DB + sample, without duplicates)
 * @access  Public
 */
router.get("/", async (req, res) => {
  try {
    let dbProducts = [];
    try {
      dbProducts = await getProducts(req, res, true); // internal call
    } catch (err) {
      console.warn("⚠️ MongoDB fetch failed, using sampleProducts only.");
    }

    // ✅ Merge sample and DB products safely
    const allProducts = [...sampleProducts, ...(dbProducts || [])];

    // ✅ Remove duplicates based on product name
    const uniqueProducts = allProducts.reduce((acc, product) => {
      if (!acc.find((p) => p.name.toLowerCase() === product.name.toLowerCase())) {
        acc.push(product);
      }
      return acc;
    }, []);

    res.status(200).json({
      success: true,
      count: uniqueProducts.length,
      products: uniqueProducts,
    });
  } catch (err) {
    console.error("❌ Error fetching products:", err.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
});

/**
 * @route   GET /api/products/sample
 * @desc    Get only sample fallback products
 * @access  Public
 */
router.get("/sample", (req, res) => {
  res.status(200).json({
    success: true,
    source: "sample",
    products: sampleProducts,
  });
});

/**
 * @route   GET /api/products/:id
 * @desc    Get single product by ID
 * @access  Public
 */
router.get("/:id", getProductById);

/**
 * @route   POST /api/products
 * @desc    Create a new product
 * @access  Admin
 */
router.post(
  "/",
  protectAdmin,
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("category").notEmpty().withMessage("Category is required"),
    body("price").isNumeric().withMessage("Price must be a number"),
    body("description").notEmpty().withMessage("Description is required"),
    body("image").notEmpty().isString().withMessage("Image URL is required"),
    body("stock")
      .optional()
      .isInt({ min: 0 })
      .withMessage("Stock must be an integer ≥ 0"),
  ],
  validateRequest,
  createProduct
);

/**
 * @route   PUT /api/products/:id
 * @desc    Update an existing product
 * @access  Admin
 */
router.put(
  "/:id",
  protectAdmin,
  [
    body("name").optional().notEmpty().withMessage("Name cannot be empty"),
    body("category").optional().notEmpty().withMessage("Category cannot be empty"),
    body("price").optional().isNumeric().withMessage("Price must be a number"),
    body("description").optional().notEmpty().withMessage("Description cannot be empty"),
    body("image").optional().isString().withMessage("Image must be a URL"),
    body("stock").optional().isInt({ min: 0 }).withMessage("Stock must be an integer ≥ 0"),
  ],
  validateRequest,
  updateProduct
);

/**
 * @route   DELETE /api/products/:id
 * @desc    Delete a product
 * @access  Admin
 */
router.delete("/:id", protectAdmin, deleteProduct);

module.exports = router;

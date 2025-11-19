const Product = require("../models/product.model");
const sampleProducts = require("../data/sampleProducts");

/**
 * ✅ Normalize category for consistent comparison
 * Converts text to lowercase, removes extra spaces, and replaces "&" with "and"
 */
const normalizeCategory = (str) => {
  return str
    ? str.toLowerCase().replace(/\s+/g, " ").replace(/&/g, "and").trim()
    : "";
};

/**
 * ✅ Get all products (supports pagination, filtering, and search)
 * Includes both database and sample products
 */
const getProducts = async (req, res, returnOnly = false) => {
  try {
    const page = Math.max(1, parseInt(req.query.page)) || 1;
    const limit = Math.max(1, parseInt(req.query.limit)) || 10;
    const sortBy = req.query.sortBy || "createdAt";
    const order = req.query.order === "asc" ? 1 : -1;
    const category = req.query.category || null;
    const search = req.query.search || "";

    // Build filters dynamically
    const filter = {};
    if (category) filter.category = category;
    if (search) filter.name = { $regex: search, $options: "i" };

    // Fetch products from MongoDB
    const dbProducts = await Product.find(filter)
      .sort({ [sortBy]: order })
      .lean();

    // Combine DB + Sample products
    let combinedProducts = [...dbProducts, ...sampleProducts];

    // ✅ If category filter is applied, filter all products by normalized category
    if (category) {
      const normalizedCategory = normalizeCategory(category);
      combinedProducts = combinedProducts.filter(
        (p) =>
          p.category &&
          normalizeCategory(p.category) === normalizedCategory
      );
    }

    // ✅ If search query exists, filter by name (case-insensitive)
    if (search) {
      const normalizedSearch = search.toLowerCase();
      combinedProducts = combinedProducts.filter((p) =>
        p.name.toLowerCase().includes(normalizedSearch)
      );
    }

    // Apply pagination
    const total = combinedProducts.length;
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedProducts = combinedProducts.slice(start, end);

    if (returnOnly) {
      return paginatedProducts;
    }

    // Respond with combined data
    res.status(200).json({
      success: true,
      total,
      page,
      pages: Math.ceil(total / limit),
      products: paginatedProducts,
    });
  } catch (error) {
    console.error("❌ Error fetching products:", error.message);
    if (returnOnly) throw error;
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
};

/**
 * ✅ Get a single product by ID (search both DB and sample data)
 */
const getProductById = async (req, res, next) => {
  try {
    // Check in MongoDB
    const product = await Product.findById(req.params.id).lean();
    if (product) {
      return res.status(200).json({ success: true, product });
    }

    // Check in sampleProducts
    const sampleProduct = sampleProducts.find((p) => p._id === req.params.id);
    if (sampleProduct) {
      return res.status(200).json({ success: true, product: sampleProduct });
    }

    res.status(404).json({ success: false, message: "Product not found" });
  } catch (error) {
    next(error);
  }
};

/**
 * ✅ Create a new product (Admin only)
 */
const createProduct = async (req, res, next) => {
  try {
    const { name, category, price, image, description, stock } = req.body;

    if (!name || !price || !description) {
      return res.status(400).json({
        success: false,
        message: "Name, price, and description are required fields",
      });
    }

    const product = new Product({
      name,
      category,
      price,
      image: image || "",
      description,
      stock: stock ?? 0,
    });

    const savedProduct = await product.save();
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: savedProduct,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * ✅ Update a product (Admin only)
 */
const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    Object.assign(product, req.body);
    const updatedProduct = await product.save();

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * ✅ Delete a product (Admin only)
 */
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    await product.deleteOne();

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};

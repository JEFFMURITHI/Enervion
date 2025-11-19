// src/middlewares/auth.js
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin.model");

/**
 * @desc Protect admin-only routes using JWT authentication
 */
const protectAdmin = async (req, res, next) => {
  try {
    let token;

    // ✅ Check for Authorization header and Bearer token
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // ❌ No token found
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, token missing",
      });
    }

    // ✅ Verify token validity
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded.id) {
      return res.status(401).json({
        success: false,
        message: "Invalid token structure",
      });
    }

    // ✅ Find admin user in database
    const admin = await Admin.findById(decoded.id).select("-password");
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Admin not found, unauthorized",
      });
    }

    // ✅ Attach admin to request for route handlers
    req.admin = admin;
    next();
  } catch (error) {
    console.error("❌ Auth Error:", error.message);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired, please log in again",
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    // Catch-all
    res.status(500).json({
      success: false,
      message: "Authentication failed, please try again",
    });
  }
};

module.exports = { protectAdmin };

// src/routes/admin.routes.js
const express = require("express");
const router = express.Router();
const { adminLogin } = require("../controllers/admin.controller");

// Public route: login
router.post("/login", adminLogin);

module.exports = router;

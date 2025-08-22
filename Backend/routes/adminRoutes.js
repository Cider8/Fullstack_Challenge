const express = require("express");

const { dashboard, listUsers, listStores } = require("../controllers/adminController");
const { addStore } = require("../controllers/storeController");
const admin = require("../middleware/admin");

const router = express.Router();

// Admin Dashboard
router.get("/dashboard", admin, dashboard);

// Manage Users
router.get("/users", admin, listUsers);

// Manage Stores
router.get("/stores", adminMiddleware, listStores);
router.post("/stores", adminMiddleware, addStore);

module.exports = router;

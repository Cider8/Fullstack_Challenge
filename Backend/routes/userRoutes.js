const express = require("express");

const { viewStores, submitRating } = require("../controllers/userController");
const user = require("../middleware/user");

const router = express.Router();

// View all stores
router.get("/stores", user, viewStores);

// Submit or update rating
router.post("/ratings", user, submitRating);

module.exports = router;

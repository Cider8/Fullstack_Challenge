const express = require("express");

const { myStoreRatings } = require("../controllers/ownerController");
const owner = require("../middleware/owner");

const router = express.Router();

// View ratings for owner’s store
router.get("/stores/:storeId/ratings", owner, myStoreRatings);

module.exports = router;

const Store = require("../models/Store");
const Rating = require("../models/Rating");

exports.viewStores = async (req, res) => {
  try {
    const stores = await Store.getAll();
    res.json(stores);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.submitRating = async (req, res) => {
  try {
    const { storeId, rating } = req.body;
    const newRating = await Rating.addOrUpdate({ userId: req.user.id, storeId, rating });
    res.json(newRating);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

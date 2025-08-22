const Rating = require("../models/Rating");
const Store = require("../models/Store");

exports.myStoreRatings = async (req, res) => {
  try {
    const store = await Store.getById(req.params.storeId);
    if (!store || store.ownerid !== req.user.id) {
      return res.status(403).json({ message: "Not your store" });
    }

    const ratings = await Rating.getStoreRatings(store.id);
    res.json({
      store: store.name,
      avg_rating: ratings.length
        ? (ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length).toFixed(2)
        : 0,
      ratings,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

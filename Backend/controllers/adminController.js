const User = require("../models/User");
const Store = require("../models/Store");
const Rating = require("../models/Rating");
const pool = require("../config/db");

exports.dashboard = async (req, res) => {
  try {
    const totalUsers = await pool.query(`SELECT COUNT(*) FROM users`);
    const totalStores = await pool.query(`SELECT COUNT(*) FROM stores`);
    const totalRatings = await Rating.getTotalRatings();

    res.json({
      totalUsers: totalUsers.rows[0].count,
      totalStores: totalStores.rows[0].count,
      totalRatings: totalRatings.total,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.listUsers = async (req, res) => {
  try {
    const users = await User.getAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.listStores = async (req, res) => {
  try {
    const stores = await Store.getAll();
    res.json(stores);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

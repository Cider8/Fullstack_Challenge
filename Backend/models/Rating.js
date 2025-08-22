const pool = require("../config/db");

class Rating {
  static async addOrUpdate({ userId, storeId, rating }) {
    const [rows] = await pool.query(
      `INSERT INTO ratings (userId, storeId, rating)
       VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE rating = VALUES(rating)`,
      [userId, storeId, rating]
    );
    return rows;
  }

  static async getStoreRatings(storeId) {
    const [rows] = await pool.query(
      `SELECT u.name, r.rating
       FROM ratings r
       JOIN users u ON r.userId = u.id
       WHERE r.storeId = ?`,
      [storeId]
    );
    return rows;
  }

  static async getTotalRatings() {
    const [rows] = await pool.query(`SELECT COUNT(*) AS total FROM ratings`);
    return rows[0];
  }
}

module.exports = Rating;

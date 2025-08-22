const pool = require("../config/db");

class Store {
  static async create({ name, email, address, ownerId }) {
    const [result] = await pool.query(
      `INSERT INTO stores (name, email, address, ownerId)
       VALUES (?, ?, ?, ?)`,
      [name, email, address, ownerId]
    );
    return { id: result.insertId, name, email, address, ownerId };
  }

  static async getAll() {
    const [rows] = await pool.query(
      `SELECT s.*, COALESCE(AVG(r.rating), 0) AS avg_rating
       FROM stores s 
       LEFT JOIN ratings r ON s.id = r.storeId
       GROUP BY s.id`
    );
    return rows;
  }

  static async getById(storeId) {
    const [rows] = await pool.query(`SELECT * FROM stores WHERE id = ?`, [storeId]);
    return rows[0];
  }
}

module.exports = Store;

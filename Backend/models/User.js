const pool = require("../config/db");

class User {
  static async create({ name, email, password, address, role }) {
    const [result] = await pool.query(
      `INSERT INTO users (name, email, password, address, role)
       VALUES (?, ?, ?, ?, ?)`,
      [name, email, password, address, role]
    );
    return { id: result.insertId, name, email, address, role };
  }

  static async findByEmail(email) {
    const [rows] = await pool.query(`SELECT * FROM users WHERE email = ?`, [email]);
    return rows[0];
  }

  static async findById(id) {
    const [rows] = await pool.query(`SELECT * FROM users WHERE id = ?`, [id]);
    return rows[0];
  }

  static async getAll() {
    const [rows] = await pool.query(`SELECT id, name, email, address, role FROM users`);
    return rows;
  }
}

module.exports = User;

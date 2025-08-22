const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Import Routes
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const ownerRoutes = require("./routes/ownerRoutes");

// DB Connection (MySQL)
const pool = require("./config/db");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test DB connection when server starts
(async () => {
  try {
    const [rows] = await pool.query("SELECT 1 + 1 AS solution");
    console.log("✅ MySQL Connected, Test Query Result:", rows[0].solution);
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
  }
})();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api/owner", ownerRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("FullStack Intern Challenge API running with MySQL");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

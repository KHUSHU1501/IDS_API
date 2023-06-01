//src/routes/api/get.js

// Sample data - replace with your own database access code
const db = require("../../../db/db");

// Get all tasks
module.exports = async (req, res) => {
  try {
    const tasks = await db.getAllTasks();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve tasks" });
  }
};

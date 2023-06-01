//src/routes/api/post.js

// Sample data - replace with your own database access code
const db = require("../../../db/db");

module.exports = async (req, res) => {
  const newTask = req.body;
  try {
    const createdTask = await db.createTask(newTask);
    res.status(201).json(createdTask);
  } catch (error) {
    res.status(500).json({ error: "Failed to create task" });
  }
};

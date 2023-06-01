//src/routes/api/post.js

// Sample data - replace with your own database access code
const db = require("../../../db/db");

module.exports = async (req, res) => {
  const taskId = parseInt(req.params.taskId);
  try {
    const task = await db.getTaskById(taskId);
    if (!task) {
      res.status(404).json({ error: "Task not found" });
    } else {
      const result = await db.deleteTask(taskId);
      if (result) {
        res.json({ message: "Task deleted successfully" });
      } else {
        res.status(500).json({ error: "Failed to delete task" });
      }
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete task" });
  }
};

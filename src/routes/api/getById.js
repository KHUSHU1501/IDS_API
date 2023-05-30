//src/routes/api/getById.js

// Sample data - replace with your own database access code
const db = require('../../link-to-the-database'); //Replace it please

module.exports = async (req, res) => {
    const taskId = parseInt(req.params.taskId);
    try {
      const task = await db.getTaskById(taskId);
      if (!task) {
        res.status(404).json({ error: 'Task not found' });
      } else {
        res.json(task);
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve task' });
    }
};
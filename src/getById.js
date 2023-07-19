// getById.js
const express = require("express");
const router = express.Router();
const TaskDb = require("../db/taskDb");
const db = new TaskDb();

router.get("/:id", async (req, res) => {
  // Connect to Database
  await db.connectToDatabase(process.env.MONGODB_CONN_STRING);
  db.getTaskById(req.params.id)
    .then((task) => {
      res.json(task);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;

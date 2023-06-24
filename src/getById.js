// getById.js
const express = require("express");
const router = express.Router();
const TaskDb = require("../db/taskDb");
const db = new TaskDb();

// connect to the database
db.connectToDatabase(process.env.MONGODB_CONN_STRING);

router.get("/:id", (req, res) => {
  db.getTaskById(req.params.id)
    .then((task) => {
      res.json(task);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;

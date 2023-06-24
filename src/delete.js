// delete.js
const express = require("express");
const router = express.Router();
const TaskDb = require("../db/taskDb");
const db = new TaskDb();

// connect to the database
db.connectToDatabase(process.env.MONGODB_CONN_STRING);

router.delete("/:id", (req, res) => {
  db.deleteTaskById(req.params.id)
    .then(() => {
      res.status(201).json({ message: "Task Deleted!" });
    })
    .catch((err) => {
      res.status(500).json({ message: err + "Invalid ID!" });
    });
});

module.exports = router;

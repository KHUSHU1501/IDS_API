// delete.js
const express = require("express");
const router = express.Router();
const TaskDb = require("../db/taskDb");
const db = new TaskDb();

router.delete("/:id", async (req, res) => {
  // Connect to Database
  await db.connectToDatabase(process.env.MONGODB_CONN_STRING);
  db.deleteTaskById(req.params.id)
    .then(() => {
      res.status(201).json({ message: "Task Deleted!" });
    })
    .catch((err) => {
      res.status(500).json({ message: err + "Invalid ID!" });
    });
});

module.exports = router;

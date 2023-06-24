// put.js
const express = require("express");
const router = express.Router();
const TaskDb = require("../db/taskDb");
const db = new TaskDb();

// connect to the database
db.connectToDatabase(process.env.MONGODB_CONN_STRING);

router.put("/:id", async (req, res) => {
  try {
    await db.updateTaskById(req.body, req.params.id);
    res.json({ message: "Task Updated!" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;

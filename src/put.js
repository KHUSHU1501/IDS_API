// put.js
const express = require("express");
const router = express.Router();
const TaskDb = require("../db/taskDb");
const db = new TaskDb();

router.put("/:id", async (req, res) => {
  try {
    // Connect to Database
    await db.connectToDatabase(process.env.MONGODB_CONN_STRING);
    await db.updateTaskById(req.body, req.params.id);
    res.json({ message: "Task Updated!" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;

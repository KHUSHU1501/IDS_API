// get.js
const express = require("express");
const router = express.Router();
const TaskDb = require("../db/taskDb");
const db = new TaskDb();

// connect to the database
db.connectToDatabase(process.env.MONGODB_CONN_STRING);

router.get("/", (req, res) => {
  db.getAllTasks()
    .then((tasks) => {
      res.json(tasks);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;

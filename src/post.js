// post.js
const express = require("express");
const router = express.Router();
const TaskDb = require("../db/taskDb");
const db = new TaskDb();

// connect to the database
db.connectToDatabase(process.env.MONGODB_CONN_STRING);

router.post("/", (req, res) => {
  db.addNewTask(req.body)
    .then((newTask) => {
      res.status(201).json(newTask);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

module.exports = router;

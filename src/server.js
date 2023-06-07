const express = require("express");
const cors = require("cors");
const app = express();

const TaskDb = require("../db/taskDb");
const db = new TaskDb();

const HTTP_PORT = process.env.PORT || 8080;

app.use(cors());
require("dotenv").config();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API Listening!" });
});

// ADD NEW TASK
app.post("/api/tasks", (req, res) => {
  db.addNewTask(req.body)
    .then((newTask) => {
      res.status(201).json(newTask);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

// GET TASKS
app.get("/api/tasks", (req, res) => {
  db.getAllTasks()
    .then((tasks) => {
      res.json(tasks);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// GET TASK BY ID
app.get("/api/tasks/:id", (req, res) => {
  db.getTaskById(req.params.id)
    .then((task) => {
      res.json(task);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// DELETE TASK BY ID
app.delete("/api/tasks/:id", (req, res) => {
  db.deleteTaskById(req.params.id)
    .then(() => {
      res.status(201).json({ message: "Task Deleted!" });
    })
    .catch((err) => {
      res.status(500).json({ message: err + "Invalid ID!" });
    });
});

// UPDATE TASK BY ID
app.put("/api/tasks/:id", async (req, res) => {
  try {
    await db.updateTaskById(req.body, req.params.id);
    res.json({ message: "Task Updated!" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

// INITIALIZE
db.connectToDatabase(process.env.MONGODB_CONN_STRING)
  .then(() => {
    module.exports = app; // Export the app object
    app.listen(HTTP_PORT, () => {
      console.log(`server listening on: ${HTTP_PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

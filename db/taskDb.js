const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
    },
    requestor: {
      type: String,
      required: true,
    },
    patient: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    isolation: Boolean,
    notes: [String],
    status: {
      type: String,
      enum: ["active", "delay", "notAssigned", "complete"],
      default: "notAssigned",
    },
    transporter: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

module.exports = class TaskDb {
  constructor() {
    // No task until the connection is established
    this.Task = null;
  }

  connectToDatabase(connectionString) {
    return new Promise((resolve, reject) => {
      const db = mongoose.createConnection(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      db.once("error", (err) => {
        reject(err);
      });
      db.once("open", () => {
        this.Task = db.model("TransferTask", taskSchema, "TransferTask");
        resolve();
      });
    });
  }

  async addNewTask(data) {
    const newTask = new this.Task(data);
    await newTask.save();
    return newTask;
  }

  getAllTasks() {
    return this.Task.find({}).exec();
  }

  getTaskById(id) {
    return this.Task.findOne({ _id: id }).exec();
  }

  updateTaskById(data, id) {
    return this.Task.updateOne(
      { _id: id },
      { $set: data, $inc: { __v: 1 } },
      { runValidators: true }
    ).exec();
  }

  deleteTaskById(id) {
    return this.Task.deleteOne({ _id: id }).exec();
  }
};

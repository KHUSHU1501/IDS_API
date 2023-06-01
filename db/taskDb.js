const mongoose = require("mongoose");
const Schma = mongoose.Schema;

const taskSchema = new Schma({
  name: String,
  description: String,
  completed: Boolean,
  date: Date,
});

module.exports = class taskDb {
  constructor() {
    //no task until the connection is established
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
        this.Task = db.model("tasks", taskSchema);
        resolve();
      });
    });
  }
};

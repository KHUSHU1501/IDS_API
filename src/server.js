// src/server.js

// We want to gracefully shutdown our server
const stoppable = require("stoppable");

// Get our express app instance
const app = require("./app");

// Get the desired port from the process environment. Default to `8080`
const port = parseInt(process.env.PORT || 8080, 10);

const taskDb = require("../db/taskDb");
const db = new taskDb();

// Declare the server variable
let server;

// Connect to the database first
db.connectToDatabase(process.env.MONGODB_CONN_STRING)
  .then(() => {
    // Start a server listening on this port
    server = stoppable(
      app.listen(port, () => {
        // Log a message that the server has started, and which port it's using.
        console.log(`Server is running on port ${port}`);
      })
    );
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
    process.exit(1);
  });

module.exports = server;

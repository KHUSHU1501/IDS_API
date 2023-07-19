const express = require("express");
const cors = require("cors");
const app = express();
const { author, version, description } = require("../package.json");

// We want to gracefully shutdown our server
const stoppable = require("stoppable");

const HTTP_PORT = process.env.PORT || 8080;

app.use(cors);
require("dotenv").config();
app.use(express.json());

//#region Routes
app.get("/", (req, res) => {
  res.status(200).json({
    message: "API Listening!",
    author,
    version,
    description,
    status: "ok",
  });
});

const getRoute = require("./get");
app.use("/api/tasks", getRoute);

const getByIdRoute = require("./getById");
app.use("/api/tasks", getByIdRoute);

const postRoute = require("./post");
app.use("/api/tasks", postRoute);

const deleteRoute = require("./delete");
app.use("/api/tasks", deleteRoute);

const putRoute = require("./put");
app.use("/api/tasks", putRoute);
//#endregion

const server = stoppable(
  app.listen(HTTP_PORT, () => {
    // Log a message that the server has started, and which port it's using.
    console.log(`Server listening on port ${HTTP_PORT}`);
  })
);

module.exports = { app, server };

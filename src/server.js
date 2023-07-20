//#region Imports
const express = require("express");
const cors = require("cors");
const app = express();
const { author, version, description } = require("../package.json");

require("dotenv").config();

const jwt = require("jsonwebtoken");
const passport = require("passport");
const passportJWT = require("passport-jwt");
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
const jwtSecret = process.env.JWT_SECRET; // Set your own secret key

// We want to gracefully shutdown our server
const stoppable = require("stoppable");

const HTTP_PORT = process.env.PORT || 8080;

// Import your userDb module
const UserDb = require("../db/userDb");
//#endregion

//#region Passport Configuration
// JWT Strategy options
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
  secretOrKey: jwtSecret,
};

let strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
  console.log("payload received", jwt_payload);

  if (jwt_payload) {
    // The following will ensure that all routes using
    // passport.authenticate have a req.user._id, req.user.userName, req.user.fullName & req.user.role values
    // that matches the request payload data
    next(null, {
      userName: jwt_payload.userName,
    });
  } else {
    next(null, false);
  }
});

// tell passport to use our "strategy"
passport.use(strategy);

// Initialize Passport
app.use(passport.initialize());
//#endregion

app.use(cors());
app.use(express.json());

//#region taskDb Routes
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
app.use(
  "/api/tasks",
  passport.authenticate("jwt", { session: false }),
  getRoute
);

const getByIdRoute = require("./getById");
app.use(
  "/api/tasks",
  passport.authenticate("jwt", { session: false }),
  getByIdRoute
);

const postRoute = require("./post");
app.use(
  "/api/tasks",
  passport.authenticate("jwt", { session: false }),
  postRoute
);

const deleteRoute = require("./delete");
app.use(
  "/api/tasks",
  passport.authenticate("jwt", { session: false }),
  deleteRoute
);

const putRoute = require("./put");
app.use(
  "/api/tasks",
  passport.authenticate("jwt", { session: false }),
  putRoute
);
//#endregion

//#region userDb Routes

app.post("/api/login", async (req, res) => {
  try {
    const { userName, password } = req.body;

    // Check user credentials using UserDb.checkUser
    const user = await UserDb.checkUser({ userName, password });

    if (!user) {
      res.status(401).json({ message: "Authentication failed." });
    } else {
      // Generate a JWT token and send it back to the client
      const payload = { userName: user.userName };
      const token = jwt.sign(payload, jwtOptions.secretOrKey);
      res.json({ token });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/api/register", async (req, res) => {
  try {
    // Call the registerUser function from the userDb module
    UserDb.registerUser(req.body)
      .then((message) => {
        res.status(201).json({ message });
      })
      .catch((err) => {
        res.status(400).json({ message: err });
      });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//#endregion

// Connect to the MongoDB database before starting the server
UserDb.connect()
  .then(() => {
    // Start the server
    const server = stoppable(
      app.listen(HTTP_PORT, () => {
        // Log a message that the server has started, and which port it's using.
        console.log(`Server listening on port ${HTTP_PORT}`);
      })
    );
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

let mongoDBConnectionString = process.env.MONGODB_CONN_STRING;

let Schema = mongoose.Schema;

let userSchema = new Schema({
  userName: {
    type: String,
    unique: true,
  },
  password: String,
  role: String,
});

let User;

module.exports.connect = function () {
  return new Promise(function (resolve, reject) {
    let db = mongoose.createConnection(mongoDBConnectionString);

    db.on("error", (err) => {
      reject(err);
    });

    db.once("open", () => {
      User = db.model("users", userSchema);
      resolve();
    });
  });
};

module.exports.registerUser = async function (userData) {
  if (userData.password !== userData.password2) {
    throw "Passwords do not match";
  }

  try {
    const hash = await bcrypt.hash(userData.password, 10);
    userData.password = hash;

    let newUser = new User(userData);

    await newUser.save();
    return `User ${userData.userName} successfully registered`;
  } catch (err) {
    if (err.code === 11000) {
      throw "User Name already taken";
    } else {
      throw "There was an error creating the user: " + err;
    }
  }
};

module.exports.checkUser = function (userData) {
  return new Promise(function (resolve, reject) {
    User.findOne({ userName: userData.userName })
      .exec()
      .then((user) => {
        if (!user) {
          return reject("User not found");
        }
        bcrypt.compare(userData.password, user.password).then((res) => {
          if (res === true) {
            resolve(user);
          } else {
            reject("Incorrect password for user " + userData.userName);
          }
        });
      })
      .catch((err) => {
        reject("Unable to find user " + userData.userName);
      });
  });
};

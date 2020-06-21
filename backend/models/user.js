const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  role: String
});
let userModel = mongoose.model("users", userSchema);

module.exports = userModel;

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: String
});
let userModel = mongoose.model("users", userSchema);

module.exports = userModel;

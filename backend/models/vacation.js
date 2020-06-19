const mongoose = require("mongoose");
const User = require("../models/user");

const vacationSchema = new mongoose.Schema({
  startDate: Date,
  finishDate: Date,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  blocked: Boolean,
});
let vacationModel = mongoose.model("vacations", vacationSchema);

module.exports = vacationModel;

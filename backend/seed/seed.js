const bcrypt = require("bcrypt");
const saltRounds = 10;
const mongoose = require("mongoose");
mongoose.pluralize(null);
const User = require("../models/user");
const Vacation = require("../models/vacation");

function randomDate(param) {
  return Math.floor(Math.random() * param);
}

async function createBase() {
  await mongoose.connect("mongodb://localhost:27017/office", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.connection.on(
    "error",
    console.error.bind(console, "Ошибка соединения с MongoDB:")
  );

  for (let indexUser = 0; indexUser < 10; indexUser++) {
    let passwordHash = await bcrypt.hash(String(indexUser), saltRounds);
    let role = indexUser === 0 ? "admin" : "employee";
    let blocked = indexUser % 2 ? true : false;

    const newUser = await User.create({
      email: indexUser,
      password: passwordHash,
      role: role,
    });

    const randomMonth = randomDate(11);
    const randomDay = randomDate(23);

    await Vacation.create({
      startDate: new Date(2020, randomMonth, randomDay),
      finishDate: new Date(2020, randomMonth, randomDay + 7),
      userId: newUser._id,
      blocked: blocked,
    });
  }

  await mongoose.disconnect();
}

createBase();

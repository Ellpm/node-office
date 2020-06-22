const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/registration", async function (req, res) {
  console.log(req.body);
  const { firstName, lastName, email, password, role } = req.body;
  let user = await User.findOne({ email: email });
  if (!user) {
    User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: await bcrypt.hash(password, 10),
      role: role,
    });

    res.json({ registration: true });
  } else {
    res.json({ registration: false });
  }
});

router.post("/login", async function (req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({ login: true, user: user });
  } else {
    res.json({ login: false });
  }
});

module.exports = router;

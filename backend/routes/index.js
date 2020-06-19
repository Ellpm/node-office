const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/registration", async function (req, res) {
  console.log(req.body);
  
  let email = req.body.email;
  let password = req.body.password;
  let user = await User.findOne({ email: email });
  if (!user) {
    User.create({
      email: email,
      password: await bcrypt.hash(password, 10),
    });

    res.json({ registration: true });
  } else {
    res.json({ registration: false });
  }
});

router.post("/login", async function (req, res) {
  let email = req.body.email;
  let password = req.body.password;
  let user = await User.findOne({ email: email });
  if (user && (await bcrypt.compare(password, user.password))) {
    req.session.user = user;
    res.json({ login: true });
  } else {
    res.json({ login: false });
  }
});


module.exports = router;

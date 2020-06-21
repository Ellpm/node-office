const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
// const jsonwebtoken = require("jsonwebtoken");
// const jwt = require("express-jwt");
// const config = require("../config");

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
  const {email, password} = req.body
  const user = await User.findOne({ email: email });
  if (user && (await bcrypt.compare(password, user.password))) {
    // req.session.user = user;
    // console.log(req.session);
    // const token = jsonwebtoken.sign(
    //   {
    //     email: user.email,
    //   },
    //   config.token.secret,
    //   {
    //     // get secret from config
    //     expiresIn: config.token.expired, // expires in 1 day
    //   }
    // );




    res.json({ login: true, user: user});
  } else {
    res.json({ login: false });
  }
});


module.exports = router;

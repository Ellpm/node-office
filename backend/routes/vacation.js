const express = require("express");
const router = express.Router();
const Vacation = require("../models/vacation");
const User = require("../models/user");


router.post("/vacation", async function (req, res) {
  const user = await User.findOne({ email: req.body.email });
  const vacation = await Vacation.create({
    startDate: req.body.startDate,
    finishDate: req.body.finishDate,
    userId: user._id,
    blocked: false,
  });
  await vacation.save();
  res.json({ vacation });
});

router.get("/vacation", async function (req, res) {
  const user = await User.findOne({ email: req.query.user });
  const vacations = await Vacation.find();
  await res.json({ vacations: vacations });
});

router.put("/vacation", async function (req, res) {
  const user = await User.findOne({ email: req.body.email });
  const vacation = await Vacation.findOne({ _id: req.body.vacationId });
  if (!vacation.blocked) {
    await Vacation.updateOne(
      { _id: req.body.vacationId },
      {
        startDate: req.body.startDate,
        finishDate: req.body.finishDate,
      },
      async function (err, updatedVacantion) {
        if (err) return res.json({ error: "404" });
        const vacations = await Vacation.find({
          userId: user._id,
        });
        res.json({ vacations });
      }
    );
  } else {
    res.json({ error: 403 });
  }
});

router.delete("/vacation", async function (req, res) {
  const user = await User.findOne({ email: req.body.email });
  const vacation = await Vacation.findOne({ _id: req.body.vacationId });
  if (!vacation.blocked) {
    await Vacation.deleteOne({ _id: req.body.vacationId }, async function (
      err
    ) {
      if (err) return res.json({ error: "404" });
      const vacations = await Vacation.find({
        userId: user._id,
      });
      res.json({ vacations });
    });
  } else {
    res.json({ error: 403 });
  }
});

module.exports = router;

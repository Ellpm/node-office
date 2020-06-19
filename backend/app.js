const createError = require("http-errors");
const express = require("express");
const methodOverride = require("method-override");
const cors = require("cors");
const app = express();
console.log("start app");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      const method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);

app.use(function (req, res, next) {
  next(createError(404));
});


module.exports = app;

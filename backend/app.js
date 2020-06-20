const createError = require("http-errors");
const express = require("express");
const methodOverride = require("method-override");
const app = express();
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const cors = require("cors");
const mongoose = require("mongoose");
const indexRouter = require("./routes/index");
const vacationRouter = require('./routes/vacation')
mongoose.connect("mongodb://localhost:27017/office", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(
  session({
    store: new FileStore(),
    key: "user_sid",
    secret: "anything here",
    resave: false,
    saveUninitialized: true,
    cookie: {
      expires: 600000,
      httpOnly: false,
    },
  })
);

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

app.use(async function (req, res, next) {
  app.locals.user = await req.session.user;
  next();
  console.log(await app.locals.user);
  
});

app.use("/", indexRouter);
app.use("/vacation", vacationRouter);

app.use(function (req, res, next) {
  next(createError(404));
});


module.exports = app;

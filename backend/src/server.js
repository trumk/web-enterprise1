const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const authRouter = require("../routes/auth");
const userRouter = require("../routes/user");
const contributionRouter = require("../routes/contribution");

const bodyParser = require('body-parser');
const eventRouter = require("../routes/event");
const facultyRouter = require("../routes/faculty");

const session = require('express-session');

dotenv.config();

const app = express();

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
      return res.status(400).json({error: "Bad JSON"});
  }
  next(err);
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Could not connect to MongoDB", err));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(session({
  secret: "123456cat",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));


//routes
app.use("/", authRouter);
app.use("/event",eventRouter);
app.use("/user", userRouter);
app.use("/faculty", facultyRouter);
app.use("/contribution", contributionRouter);



const hostname = 'localhost'
const port = 5503

app.listen(5503, () => {
    console.log(`hello nxt, server http://${hostname}:${port}/`)
  })
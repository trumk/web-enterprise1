const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoute = require("../routes/auth");
const userRoute = require("../routes/user");
const bodyParser = require('body-parser');
const eventRouter = require("../routes/event");

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Could not connect to MongoDB", err));

app.use(bodyParser.json());
app.use(cors())
app.use(cookieParser())
app.use(express.json())

//routes
app.use("/", authRoute);
app.use("/event",eventRouter);
app.use("/", userRoute);

const hostname = 'localhost'
const port = 5503

app.listen(5503, () => {
    console.log(`hello nxt, server http://${hostname}:${port}/`)
  })
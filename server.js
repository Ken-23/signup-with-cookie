require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");

// importing the routes
const indexRouter = require("./src/routes/index");
// const authRouter = require("./routes/auth");

// 1. this is the port on which the server will run
const port = process.env.PORT || 8080;

// creating the express app
const app = express();

// 2. adding middleware to parse the cookies and more
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// 3. adding the routes
app.use("/", indexRouter);
// app.use("/auth", authRouter);

// 4. starting the server
app.listen(port, function () {
  console.log(`🚀 Listening on port ${port}`);
});

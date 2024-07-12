require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const indexRouter = require("./src/routes/index");
const authRouter = require("./src/routes/auth");

const port = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/auth", authRouter);

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("MongoDB connection is established successfully!");
});

app.listen(port, function () {
  console.log(`🚀 Listening on port ${port}`);
});

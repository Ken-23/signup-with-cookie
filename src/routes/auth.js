const express = require("express");
const router = express.Router();
const { hash } = require("bcrypt");
const User = require("./../../models/user");

router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user)
      return res.status(500).json({
        message: "User already exists! Try logging in.",
        type: "warning",
      });

    const passwordHash = await hash(password, 10);
    const newUser = new User({
      email: email,
      password: passwordHash,
    });

    await newUser.save();

    res.status(200).json({
      message: "User created successfully!",
      type: "success",
    });
  } catch (error) {
    res.status(500).json({
      type: "error",
      message: "Error creating user!",
      error,
    });
  }
});

module.exports = router;

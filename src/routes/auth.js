const express = require("express");
const router = express.Router();
const { hash, compare } = require("bcrypt");
const User = require("./../../models/user");

const {
  createAccessToken,
  createRefreshToken,
  sendAccessToken,
  sendRefreshToken,
} = require("../../utils/token");

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

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(500).json({
        messgae: "User Don't exist!",
      });
    }

    const isMatch = await compare(password, user.password);

    if (!isMatch) {
      return res.status(500).json({
        message: "Password is incorrect!",
      });
    }

    const accessToken = createAccessToken(user._id);
    const refressToken = createRefreshToken(user._id);

    user["refreshtoken"] = refressToken;

    await user.save();

    sendRefreshToken(res, refressToken);
    sendAccessToken(req, res, accessToken);
  } catch (error) {
    res.status(500).json({
      message: "Error Signing in!",
    });
  }
});

module.exports = router;

const { sign } = require("jsonwebtoken");

const access_token_secret_key = process.env.ACCESS_TOKEN_SECRET_KEY;
const refresh_token_secret_key = process.env.REFRESH_TOKEN_SECRET_KEY;

const options_for_access_token = {
  expiresIn: "14h",
};

const options_for_refresh_token = {
  expiresIn: "90d",
};

const createAccessToken = (id) =>
  sign({ id }, access_token_secret_key, options_for_access_token);

const createRefreshToken = (id) =>
  sign({ id }, refresh_token_secret_key, options_for_refresh_token);

const sendAccessToken = (_req, res, accessToken) =>
  res.json({ accessToken, message: "Sign in successful" });

const sendRefreshToken = (res, refressToken) =>
  res.cookie("refressToken", refressToken, { httpOnly: true });

module.exports = {
  createAccessToken,
  createRefreshToken,
  sendAccessToken,
  sendRefreshToken,
};

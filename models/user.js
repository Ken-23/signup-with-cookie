const { Schema, model } = require("mongoose");

// defining the user schema
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  refreshtoken: {
    type: String,
  },
});

module.exports = model("User", userSchema);

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
  },
  institution: {
    type: String,
  },
  email: {
    type: mongoose.Schema.Types.Mixed,
  },
  password: {
    type: mongoose.Schema.Types.Mixed,
  },
  googleId: {
    type: String,
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User;

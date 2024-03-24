const mongoose = require("mongoose");

const userScheema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    minLength: 4,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
    minLength: 6,
  },
});

const userModel = mongoose.model("userModel", userScheema);

module.exports = userModel;

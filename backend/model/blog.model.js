const mongoose = require("mongoose");
const { schema } = require("./user.model");
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  content: {
    type: String,
    require: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel",
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  createdat: {
    type: Date,
    default: Date.now,
  },
  ispublished: {
    type: Boolean,
    default: true,
  },
});

const blogModel = mongoose.model("blogModel", blogSchema);
module.exports = blogModel;

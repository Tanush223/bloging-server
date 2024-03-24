const express = require("express");
const route = express.Router();
const userRouter = require("./user.route");
const blogRouter = require("./blog.route");

route.use("/user", userRouter);
route.use("/blog", blogRouter);

module.exports = route;

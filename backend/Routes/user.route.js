const express = require("express");
const route = express.Router();
const zod = require("zod");
const jwt = require("jsonwebtoken");
const jwtsecreet = "password";
const userModel = require("../model/user.model");
const bcrypt = require("bcrypt");

const userSignUpSchema = zod.object({
  name: zod.string(),
  email: zod.string(),
  password: zod.string(),
});

const userSininSchema = zod.object({
  email: zod.string(),
  password: zod.string(),
});

route.get("/", (req, res) => {
  res.send("hiiiiiiiiiii");
});

route.post("/signup", async (req, res) => {
  const { success } = userSignUpSchema.safeParse(req.body);
  if (!success) {
    return res.status(411).json({ message: "invalied inputs of user" });
  }

  try {
    const existingUser = await userModel.findOne({
      email: req.body.email,
    });
    if (existingUser) {
      return res.status(411).json({
        message: "user already existed try to login ",
      });
    }
    const bcyptpassword = await bcrypt.hash(req.body.password, 10);
    const user = await userModel.create({
      name: req.body.name,
      email: req.body.email,
      password: bcyptpassword,
    });
    const userId = user._id;
    const token = jwt.sign({ userId: userId }, jwtsecreet);
    res.status(201).json({
      token: token,
      message: "user created",
    });
  } catch (error) {
    console.log("error wile signing up user", error);
    return res.status(500).json({
      message: "internal server error ",
    });
  }
});

route.post("/signin", async (req, res) => {
  const { success } = userSininSchema.safeParse(req.body);
  if (!success) {
    return res.status(400).json({
      message: "invalied inputs ",
    });
  }
  try {
    const user = await userModel.findOne({
      email: req.body.email,
    });
    if (!user) {
      return res.status(404).json({
        message: "user not found please try signup",
      });
    }
    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordMatch) {
      return res.status(401).json({
        message: "invaled creadentails",
      });
    }

    const userId = user._id;
    const token = jwt.sign({ userId }, jwtsecreet);
    res.status(200).json({
      token: token,
      message: "user signed in successfully",
    });
  } catch (error) {
    console.log("error wile trying to login");
  }
});

module.exports = route;

const express = require("express");
const route = express.Router();
const zod = require("zod");
const blogModel = require("../model/blog.model");

const createBlog = zod.object({
  title: zod.string(),
  content: zod.string(),
  category: zod.string(),
});

const updateBlog = zod.object({
  title: zod.string(),
  content: zod.string(),
  category: zod.string(),
});

route.post("/", async (req, res) => {
  const { success } = createBlog.safeParse(req.body);
  try {
    if (!success) {
      return res.status(411).json({
        message: "inavled inputs",
      });
    }
    const blog = await blogModel.create({
      title: req.body.title,
      content: req.body.content,
      category: req.body.content,
    });
    res.status(201).json({
      message: "blog was created",
      blog,
    });
  } catch (error) {}
});

route.put("/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res
      .status(401)
      .json({ messsage: "error wile updating body req:id" });
  }
  const { success } = updateBlog.safeParse(req.body);
  if (!success) {
    return res.status(401).json({
      message: "error wile updating body require:updated body ",
    });
  }
  try {
    const update = await blogModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          category: req.body.category,
        },
      },
      { new: true }
    );
    res.status(201).json({
      message: "blog was updated",
      update,
    });
  } catch (error) {
    console.log("error while updating blog", error);
  }
});

route.get("/", async (req, res) => {
  try {
    const blogs = await blogModel.find().sort({ createdAt: -1 }).limit(10);
    res.json(blogs);
  } catch (error) {
    console.log("error wihile retiving blogs", error);
    return res.status(401).json({
      message: "error while getting blogs",
    });
  }
});

route.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(401).json({ message: "error wile geting blog by id" });
  }
  try {
    const blog = await blogModel.findById(id);
    res.json(blog);
  } catch (error) {
    console.log("error while getting blog by id 2", error);
  }
});

module.exports = route;

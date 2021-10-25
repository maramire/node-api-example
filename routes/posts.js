const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const User = require("../models/user");

// GET all posts
router.get("/posts", async (req, res) => {
  const posts = await Post.findAll();
  res.status(200).send(posts);
});

// POST post
router.post("/posts", async (req, res) => {
  const userId = req.body.userId;
  // check if user exists
  const userExists = await User.findByPk(userId);
  if (userExists) {
    const newPost = await Post.create({
      caption: req.body.caption,
      userId: userId,
    });
    res
      .status(201)
      .send({ message: "Post created succesfully.", post: newPost });
  } else {
    res.status(409).send({ message: "User doesn't exists." });
  }
});

module.exports = router;

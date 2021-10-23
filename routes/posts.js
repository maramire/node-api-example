const express = require("express");
const router = express.Router();
const Post = require("../models/post");

router.get("/posts", (req, res, next) => {
  res.send({ message: "posts success" });
});

module.exports = router;

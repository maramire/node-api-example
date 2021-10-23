const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;

// GET all users
router.get("/users", async (req, res) => {
  const users = await User.findAll();
  res.send(users);
});

// POST user
router.post("/users", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // check if username is already used
  const usernameExists = await User.findOne({ where: { username } });
  if (usernameExists) {
    res.status(409).send({ message: "Username already used." });
  } else {
    // encrypt password
    bcrypt.hash(password, saltRounds, async (err, hash) => {
      // Store hash in your password DB.
      const newUser = await User.create({
        username,
        password: hash,
      });
      res
        .status(201)
        .send({ message: "User created succesfully.", user: newUser });
    });
  }
});

// DELETE user
router.delete("/users/:id", async (req, res) => {
  const userId = req.params.id;
  // check if user exists
  const userExists = await User.findOne({ where: { id: userId } });
  if (userExists) {
    await userExists.destroy();
    res.status(200).send({ message: "User deleted succesfully" });
  } else {
    res
      .status(400)
      .send({ message: "User has not found and can't be deleted." });
  }
});

module.exports = router;

// routes/userRoutes.js
const express = require("express");
const User = require("../models/user");

const router = express.Router();

// Route for user registration
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  console.log(username);
  console.log(email);
  console.log(password);
  const newUser = new User({ username, email, password });

  await newUser.save();

  res.status(201).json({
    message: "User registered successfully",
    user: { username, email },
  });
});

module.exports = router;

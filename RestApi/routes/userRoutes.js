// routes/userRoutes.js
const express = require("express");
const User = require("../models/user");
const bcrypt = require('bcryptjs');

const router = express.Router();

// Route for user registration
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  console.log(username);
  console.log(email);
  console.log(password);
  const newUser = new User({ username, email, password });

  await newUser.save();

  req.session.username = username;
  req.session.mail = email;

  
  res.status(201).json({
    message: "User registered successfully",
    user: { username, email },
  });
});

// Route for user registration
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Set session
    req.session.userId = user._id;
    req.session.email = user.email;
    res.status(200).json({ message: 'Login successful' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Destroy session (logout)
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
      if (err) {
          return res.status(500).json({ message: 'Failed to log out' });
      }
      res.clearCookie('connect.sid');  // Clear the session cookie
      res.json({ message: 'Logged out successfully' });
  });
});

module.exports = router;

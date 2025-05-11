const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, 'your-secret-key', {
      expiresIn: '1h',
    });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Google Auth routes
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login',
  }),
  async (req, res) => {
    const { id, displayName, emails } = req.user;
    let user = await User.findOne({ googleId: id });
    if (!user) {
      user = new User({
        googleId: id,
        name: displayName,
        email: emails[0].value,
      });
      await user.save();
    }
    const token = jwt.sign({ id: user._id, role: user.role }, 'your-secret-key', {
      expiresIn: '1h',
    });
    res.json({ token });
  }
);

module.exports = router;

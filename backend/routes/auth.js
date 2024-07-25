const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const validator = require('validator');
const router = express.Router();

const JWT_SECRET = 'myfirsttask'; // Change this to a secret key

const authenticate = (req, res, next) => {
  // Extract the token from the Authorization header
  const authHeader = req.headers['authorization'];
  //console.log('Authorization Header:', authHeader); // Log the entire Authorization header

  // Check if the token exists and split it to get the token value
  const token = authHeader?.split(' ')[1];
  if (!token) {
    console.log('No token provided');
    return res.status(401).send('Access denied: No token provided');
  }

  // Verify the token
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      console.log('Token verification error:', err.message); // Log the token verification error
      return res.status(403).send('Forbidden: Invalid token');
    }
    
    //console.log('Token verified successfully. User:', user); // Log the user data extracted from the token
    req.user = user;
    next();
  });
};

// Your routes
router.get('/profile', authenticate, async (req, res) => {
  //console.log('Fetching user profile for user ID:', req.user?.id); // Log the user ID for which the profile is being fetched

  try {
    // Find the user by ID and exclude the password field
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }
    
   // console.log('User profile found:', user); // Log the user profile data
    res.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error.message); // Log any error that occurs
    res.status(500).send('Server error');
  }
});
// Sign-up route
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  try {
    // Check if username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    
    res.status(201).send('User created');
  } catch (error) {
    res.status(500).send('Error creating user');
  }
});

// Sign-in route
  router.post('/signin', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
  
      res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });
// Update email
router.put('/update-email', authenticate, async (req, res) => {
  const { userId, newEmail } = req.body;
  try {
    if (req.user.id !== userId) return res.status(403).send('Forbidden');

    const user = await User.findById(userId);
    if (!user) return res.status(404).send('User not found');

    user.email = newEmail;
    await user.save();
    res.send('Email updated successfully');
  } catch (error) {
    res.status(500).send('Error updating email');
  }
});

// Update password route
router.put('/update-password', authenticate, async (req, res) => {
  const { userId, oldPassword, newPassword } = req.body;
  try {
    if (req.user.id !== userId) return res.status(403).send('Forbidden');

    const user = await User.findById(userId);
    if (!user) return res.status(404).send('User not found');

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return res.status(400).send('Incorrect old password');

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.send('Password updated successfully');
  } catch (error) {
    res.status(500).send('Error updating password');
  }
});
module.exports = router;

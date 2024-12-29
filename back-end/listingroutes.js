const express = require('express');
const Listing = require('../models/Listing');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(403).json({ error: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Get all listings
router.get('/', async (req, res) => {
  try {
    const listings = await Listing.find();
    res.status(200).json(listings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch listings' });
  }
});

// Create a listing
router.post('/', verifyToken, async (req, res) => {
  const { title, description, price } = req.body;

  try {
    const newListing = new Listing({ title, description, price, createdBy: req.userId });
    await newListing.save();
    res.status(201).json(newListing);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create listing' });
  }
});

module.exports = router;
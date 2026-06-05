const express = require('express');
const router = express.Router();
const Match = require('../models/Match');

// Get all matches
router.get('/', async (req, res) => {
  try {
    const matches = await Match.find()
      .populate('teamA')
      .populate('teamB')
      .populate('tournament')
      .sort({ date: 1, time: 1 });
    res.json(matches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create match
router.post('/', async (req, res) => {
  try {
    const newMatch = new Match(req.body);
    const savedMatch = await newMatch.save();
    res.status(201).json(savedMatch);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;

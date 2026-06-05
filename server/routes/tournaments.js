const express = require('express');
const router = express.Router();
const Tournament = require('../models/Tournament');

// Get all tournaments
router.get('/', async (req, res) => {
  try {
    const tournaments = await Tournament.find().populate('teams').sort({ createdAt: -1 });
    res.json(tournaments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create tournament
router.post('/', async (req, res) => {
  try {
    const newTournament = new Tournament(req.body);
    const savedTournament = await newTournament.save();
    res.status(201).json(savedTournament);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;

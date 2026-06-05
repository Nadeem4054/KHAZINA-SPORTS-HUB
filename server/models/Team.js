const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  village: String,
  captain: String,
  viceCaptain: String,
  phone: String,
  email: String,
  players: [{
    name: { type: String },
    role: {
      type: String,
      enum: ['batsman', 'bowler', 'allrounder', 'all-rounder', 'wicketkeeper', 'wicket-keeper', 'player'],
      default: 'player'
    },
    jerseyNumber: Number
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Team', teamSchema);

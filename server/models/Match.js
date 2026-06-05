const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  tournament: { type: mongoose.Schema.Types.ObjectId, ref: 'Tournament' },
  teamA: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  teamB: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  date: { type: Date },
  time: { type: String },
  venue: { type: String },
  matchType: { type: String },
  status: { type: String, enum: ['scheduled', 'live', 'completed', 'abandoned'], default: 'scheduled' },
  toss: {
    winner: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
    choice: { type: String, enum: ['bat', 'bowl'] }
  },
  result: {
    winner: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
    margin: { type: String },
    playerOfMatch: { type: String }
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Match', matchSchema);

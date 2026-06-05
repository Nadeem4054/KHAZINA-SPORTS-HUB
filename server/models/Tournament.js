const mongoose = require('mongoose');

const tournamentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  format: { type: String, enum: ['league', 'knockout', 'superleague'] },
  matchType: { type: String, enum: ['t20', 'odi', 'tapeball'] },
  startDate: { type: Date },
  endDate: { type: Date },
  teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }],
  venue: { type: String },
  prizeMoney: { type: Number },
  logo: { type: String },
  status: { type: String, enum: ['upcoming', 'live', 'completed'], default: 'upcoming' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Tournament', tournamentSchema);

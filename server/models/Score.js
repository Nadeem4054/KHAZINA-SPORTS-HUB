const mongoose = require('mongoose');

const ballSchema = new mongoose.Schema({
  over: Number,
  ball: Number,
  runs: Number,
  isWicket: Boolean,
  extras: String,
  batsman: String,
  bowler: String,
  commentary: String
});

const scoreSchema = new mongoose.Schema({
  match: { type: mongoose.Schema.Types.ObjectId, ref: 'Match' },
  innings: { type: Number, enum: [1, 2] },
  battingTeam: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  bowlingTeam: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  runs: { type: Number, default: 0 },
  wickets: { type: Number, default: 0 },
  overs: { type: Number, default: 0 },
  balls: [ballSchema],
  batsmen: [{
    name: String,
    runs: { type: Number, default: 0 },
    balls: { type: Number, default: 0 },
    fours: { type: Number, default: 0 },
    sixes: { type: Number, default: 0 },
    strikeRate: { type: Number, default: 0 }
  }],
  bowlers: [{
    name: String,
    overs: { type: Number, default: 0 },
    maidens: { type: Number, default: 0 },
    runs: { type: Number, default: 0 },
    wickets: { type: Number, default: 0 },
    economy: { type: Number, default: 0 }
  }]
});

module.exports = mongoose.model('Score', scoreSchema);

const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema({
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true },
  action: { type: String, required: true },
  details: { type: String },
  entity: { type: String }, // 'Team', 'Tournament', 'Match', 'Score', 'User'
  entityId: { type: mongoose.Schema.Types.ObjectId }
}, { timestamps: true });

module.exports = mongoose.model('ActivityLog', activityLogSchema);

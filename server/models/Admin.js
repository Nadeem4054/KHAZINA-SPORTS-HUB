const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
  name: String,
  role: { type: String, default: 'admin' },
  isActive: { type: Boolean, default: true }
});

module.exports = mongoose.model('Admin', adminSchema);

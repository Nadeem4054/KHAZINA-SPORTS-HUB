const express = require('express');
const router = express.Router();
const Admin = require('../../models/Admin');
const ActivityLog = require('../../models/ActivityLog');
const { authenticateAdmin, checkRole } = require('../../middleware/auth');
const logActivity = require('../../middleware/logger');
const bcrypt = require('bcrypt');

router.use(authenticateAdmin);

// Users CRUD (only super_admin)
router.get('/', checkRole(['super_admin']), async (req, res) => {
  try {
    const users = await Admin.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', checkRole(['super_admin']), async (req, res) => {
  try {
    const { username, email, password, name, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ username, email, password: hashedPassword, name, role });
    await newAdmin.save();
    await logActivity(req.admin.id, 'CREATE_USER', 'Admin', `Created user ${username}`, newAdmin._id);
    res.status(201).json(newAdmin);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', checkRole(['super_admin']), async (req, res) => {
    try {
        await Admin.findByIdAndDelete(req.params.id);
        await logActivity(req.admin.id, 'DELETE_USER', 'Admin', `Deleted user ${req.params.id}`, req.params.id);
        res.json({ message: 'User deleted' });
    } catch(err) {
        res.status(400).json({ message: err.message });
    }
});

// Logs
router.get('/logs', checkRole(['super_admin', 'admin']), async (req, res) => {
  try {
    const logs = await ActivityLog.find().populate('adminId', 'username role').sort({ createdAt: -1 }).limit(100);
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

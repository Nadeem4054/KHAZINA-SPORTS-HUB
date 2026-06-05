const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const { authenticateAdmin } = require('../middleware/auth');

// Initialize super admin if not exists
const initSuperAdmin = async () => {
  try {
    const adminExists = await Admin.findOne({ email: 'admin@khazinasports.com' });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('Admin@123', 10);
      const superAdmin = new Admin({
        username: 'admin',
        email: 'admin@khazinasports.com',
        password: hashedPassword,
        name: 'Super Admin',
        role: 'super_admin'
      });
      await superAdmin.save();
      console.log('Default super admin created');
    }
  } catch (err) {
    console.error('Error creating default admin:', err);
  }
};

initSuperAdmin();

router.post('/login', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Identify if input is email or username
    const isEmail = email || (username && username.includes('@'));
    const loginIdentifier = username || email;
    
    const query = isEmail ? { email: loginIdentifier } : { username: loginIdentifier };
    const admin = await Admin.findOne(query);
    
    if (!admin || !admin.isActive) {
      return res.status(400).json({ error: 'Invalid credentials or account inactive' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    admin.lastLogin = new Date();
    await admin.save();

    const token = jwt.sign(
      { id: admin._id, name: admin.name, role: admin.role },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '24h' }
    );

    res.json({
      token,
      admin: { id: admin._id, name: admin.name, role: admin.role }
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/me', authenticateAdmin, async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select('-password');
    res.json(admin);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

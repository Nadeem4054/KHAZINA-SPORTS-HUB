const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// Login Route
router.post('/api/admin/login', async (req, res) => {
  console.log('🔵 LOGIN REQUEST RECEIVED');
  console.log('Request body:', req.body);
  console.log('Request headers:', req.headers);
  
  try {
    const { email, password } = req.body;
    
    // Validation
    if (!email || !password) {
      console.log('❌ Missing credentials');
      return res.status(400).json({ 
        success: false,
        message: 'Email and password are required' 
      });
    }
    
    console.log(`🔍 Searching for admin with email/username: ${email}`);
    
    // Find admin by email or username
    const admin = await Admin.findOne({ 
      $or: [
        { email: email.toLowerCase() }, 
        { username: email }
      ] 
    });
    
    if (!admin) {
      console.log('❌ Admin not found in database');
      return res.status(400).json({ 
        success: false,
        message: 'Invalid credentials' 
      });
    }
    
    console.log('✅ Admin found:', admin.email);
    
    // Check if active
    if (!admin.isActive) {
      console.log('❌ Admin account is deactivated');
      return res.status(403).json({ 
        success: false,
        message: 'Account is deactivated' 
      });
    }
    
    // Compare password
    console.log('🔐 Comparing passwords...');
    const isMatch = await bcrypt.compare(password, admin.password);
    
    if (!isMatch) {
      console.log('❌ Password does not match');
      return res.status(400).json({ 
        success: false,
        message: 'Invalid credentials' 
      });
    }
    
    console.log('✅ Password matched!');
    
    // Generate JWT token
    const token = jwt.sign(
      { 
        id: admin._id, 
        email: admin.email, 
        role: admin.role 
      },
      process.env.JWT_SECRET || 'khazina-sports-secret-key-2024',
      { expiresIn: '24h' }
    );
    
    console.log('✅ JWT token generated');
    
    // Update last login
    admin.lastLogin = new Date();
    await admin.save();
    
    console.log('✅ LOGIN SUCCESSFUL!');
    
    // Send response
    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token: token,
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        name: admin.name,
        role: admin.role
      }
    });
    
  } catch (error) {
    console.error('❌ LOGIN ERROR:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Server error during login',
      error: error.message 
    });
  }
});

// Test route
router.get('/api/admin/test', (req, res) => {
  console.log('✅ Admin test route hit');
  res.json({ message: 'Admin routes working!' });
});

module.exports = router;

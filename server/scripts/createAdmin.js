const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
require('dotenv').config();

const createDefaultAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/khazina-sports', {
    });
    console.log('✅ Connected to MongoDB');
    
    // Check if admin exists
    const existingAdmin = await Admin.findOne({ email: 'admin@khazinasports.com' });
    
    if (existingAdmin) {
      console.log('⚠️  Admin already exists!');
      console.log('Email:', existingAdmin.email);
      console.log('Use password: Admin@123');
      process.exit(0);
    }
    
    // Hash password
    console.log('🔐 Hashing password...');
    const hashedPassword = await bcrypt.hash('Admin@123', 10);
    
    // Create admin
    const admin = new Admin({
      username: 'admin',
      email: 'admin@khazinasports.com',
      password: hashedPassword,
      name: 'Super Admin',
      role: 'super_admin',
      isActive: true
    });
    
    await admin.save();
    
    console.log('✅ DEFAULT ADMIN CREATED SUCCESSFULLY!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Email:    admin@khazinasports.com');
    console.log('Password: Admin@123');
    console.log('Role:     super_admin');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Error creating admin:', error);
    process.exit(1);
  }
};

createDefaultAdmin();

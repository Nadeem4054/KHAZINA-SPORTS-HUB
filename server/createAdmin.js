const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

mongoose.connect('mongodb://localhost:27017/khazina-sports');

const Admin = mongoose.model('Admin', new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  name: String,
  role: String,
  isActive: Boolean
}));

async function createAdmin() {
  try {
    console.log('🔍 Checking for existing admin...');
    
    // Delete existing admin if any
    await Admin.deleteMany({ email: 'admin@khazinasports.com' });
    console.log('🗑️  Cleared old admins');
    
    // Hash password
    console.log('🔐 Hashing password...');
    const hash = await bcrypt.hash('Admin@123', 10);
    console.log('Hash created:', hash.substring(0, 20) + '...');
    
    // Create new admin
    const admin = new Admin({
      username: 'admin',
      email: 'admin@khazinasports.com',
      password: hash,
      name: 'Super Admin',
      role: 'super_admin',
      isActive: true
    });
    
    await admin.save();
    
    console.log('');
    console.log('✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅');
    console.log('   ADMIN CREATED!');
    console.log('✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅');
    console.log('');
    console.log('Email:    admin@khazinasports.com');
    console.log('Password: Admin@123');
    console.log('Role:     super_admin');
    console.log('');
    
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err);
    process.exit(1);
  }
}

createAdmin();

const mongoose = require('mongoose');
const axios = require('axios');

async function validateBackend() {
  console.log('');
  console.log('========================================');
  console.log('   BACKEND VALIDATION TEST');
  console.log('========================================');
  console.log('');
  
  let results = {
    mongoDb: false,
    adminExists: false,
    serverRunning: false,
    loginWorks: false
  };
  
  try {
    // TEST 1: MongoDB Connection
    console.log('TEST 1: Checking MongoDB...');
    try {
      await mongoose.connect('mongodb://localhost:27017/khazina-sports', {
        serverSelectionTimeoutMS: 5000,
      });
      console.log('✅ MongoDB Connected');
      results.mongoDb = true;
      
      // TEST 2: Check Admin Exists
      console.log('TEST 2: Checking Admin User...');
      const Admin = mongoose.model('Admin', new mongoose.Schema({
        email: String,
        password: String
      }));
      
      const adminExists = await Admin.findOne({ email: 'admin@khazinasports.com' });
      if (adminExists) {
        console.log('✅ Admin User Found');
        results.adminExists = true;
      } else {
        console.log('❌ Admin User NOT Found');
        results.adminExists = false;
      }
      
      await mongoose.disconnect();
    } catch (err) {
      console.log('❌ MongoDB Connection Failed');
      console.log('   Error:', err.message);
      results.mongoDb = false;
    }
    
    // TEST 3: Server Running
    console.log('TEST 3: Checking Server...');
    try {
      const response = await axios.get('http://localhost:5000/api/test', {
        timeout: 5000
      });
      if (response.status === 200) {
        console.log('✅ Server Running on Port 5000');
        results.serverRunning = true;
      }
    } catch (err) {
      console.log('❌ Server Not Responding');
      console.log('   Error: Cannot reach http://localhost:5000');
      results.serverRunning = false;
    }
    
    // TEST 4: Login API Works
    console.log('TEST 4: Checking Login API...');
    try {
      const response = await axios.post('http://localhost:5000/api/admin/login', {
        email: 'admin@khazinasports.com',
        password: 'Admin@123'
      }, {
        timeout: 5000
      });
      
      if (response.data.token) {
        console.log('✅ Login API Works - Token Received');
        results.loginWorks = true;
      } else {
        console.log('❌ Login API Failed - No Token');
        results.loginWorks = false;
      }
    } catch (err) {
      console.log('❌ Login API Error');
      console.log('   Error:', err.response?.status, err.message);
      results.loginWorks = false;
    }
    
  } catch (error) {
    console.error('Validation Error:', error);
  }
  
  // FINAL RESULT
  console.log('');
  console.log('========================================');
  console.log('   VALIDATION RESULTS');
  console.log('========================================');
  console.log('');
  console.log('MongoDB Connection:', results.mongoDb ? '✅ YES' : '❌ NO');
  console.log('Admin User Exists:', results.adminExists ? '✅ YES' : '❌ NO');
  console.log('Server Running:', results.serverRunning ? '✅ YES' : '❌ NO');
  console.log('Login API Works:', results.loginWorks ? '✅ YES' : '❌ NO');
  console.log('');
  console.log('========================================');
  
  if (results.mongoDb && results.adminExists && results.serverRunning && results.loginWorks) {
    console.log('   ✅✅✅ BACKEND IS READY ✅✅✅');
    console.log('========================================');
    console.log('');
    console.log('🎉 Your backend is fully working!');
    console.log('You can now login with:');
    console.log('  Email: admin@khazinasports.com');
    console.log('  Password: Admin@123');
    console.log('');
    process.exit(0);
  } else {
    console.log('   ❌❌❌ BACKEND IS NOT READY ❌❌❌');
    console.log('========================================');
    console.log('');
    console.log('🔧 Fix the following issues:');
    if (!results.mongoDb) console.log('  1. Start MongoDB: sudo systemctl start mongodb');
    if (!results.adminExists) console.log('  2. Create admin: npm run create-admin');
    if (!results.serverRunning) console.log('  3. Start server: npm run dev');
    if (!results.loginWorks) console.log('  4. Check login route in server.js');
    console.log('');
    process.exit(1);
  }
}

validateBackend();

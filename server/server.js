const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();

// ============================================
// MIDDLEWARE - ORDER CRITICAL!
// ============================================

console.log('🔧 Setting up middleware...');

// 1. CORS - FIRST!
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
console.log('✅ CORS enabled');

// 2. Body Parser - SECOND!
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
console.log('✅ Body parser enabled');

// 3. Logger - THIRD!
app.use((req, res, next) => {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`📨 ${req.method} ${req.url}`);
  console.log('Body:', req.body);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━');
  next();
});
console.log('✅ Logger enabled');

// ============================================
// DATABASE
// ============================================

mongoose.connect('mongodb://localhost:27017/khazina-sports')
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Error:', err));

const Admin = require('./models/Admin');
const Team = require('./models/Team');
const Tournament = require('./models/Tournament');
const Match = require('./models/Match');
const Score = require('./models/Score');
const ActivityLog = require('./models/ActivityLog');

// ============================================
// ROUTES - DEFINED DIRECTLY HERE
// ============================================

// Test Route
app.get('/api/test', (req, res) => {
  console.log('✅ Test route hit');
  res.json({ message: 'Backend is working!' });
});

// Admin Login Route
app.post('/api/admin/login', async (req, res) => {
  console.log('');
  console.log('🟢🟢🟢 ADMIN LOGIN REQUEST 🟢🟢🟢');
  console.log('Request body:', req.body);
  
  try {
    const { email, password } = req.body;
    
    // Validation
    if (!email || !password) {
      console.log('❌ Missing email or password');
      return res.status(400).json({ 
        success: false,
        message: 'Email and password are required' 
      });
    }
    
    console.log('🔍 Searching for admin with email:', email);
    
    // Find admin
    const admin = await Admin.findOne({ 
      $or: [{ email: email }, { username: email }] 
    });
    
    if (!admin) {
      console.log('❌ Admin not found in database');
      return res.status(400).json({ 
        success: false,
        message: 'Invalid credentials' 
      });
    }
    
    console.log('✅ Admin found:', admin.email);
    
    // Compare password
    const isMatch = await bcrypt.compare(password, admin.password);
    
    if (!isMatch) {
      console.log('❌ Password does not match');
      return res.status(400).json({ 
        success: false,
        message: 'Invalid credentials' 
      });
    }
    
    console.log('✅ Password matched!');
    
    // Generate token
    const token = jwt.sign(
      { 
        id: admin._id, 
        email: admin.email, 
        role: admin.role 
      },
      'khazina-sports-secret-2024',
      { expiresIn: '24h' }
    );
    
    console.log('✅ JWT token generated');
    
    // Update last login
    admin.lastLogin = new Date();
    await admin.save();
    
    console.log('✅✅✅ LOGIN SUCCESSFUL! ✅✅✅');
    console.log('');
    
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
      message: 'Server error: ' + error.message 
    });
  }
});

// Admin Profile Route
app.get('/api/admin/profile', async (req, res) => {
  console.log('📨 GET /api/admin/profile');
  
  try {
    // Get token from header
    const authHeader = req.header('Authorization');
    console.log('Auth header:', authHeader ? 'Present' : 'Missing');
    
    if (!authHeader) {
      console.log('❌ No authorization header');
      return res.status(401).json({ message: 'No token' });
    }
    
    const token = authHeader.replace('Bearer ', '');
    console.log('Token:', token.substring(0, 20) + '...');
    
    // Verify token
    const decoded = jwt.verify(token, 'khazina-sports-secret-2024');
    console.log('Token verified. Admin ID:', decoded.id);
    
    // Get admin
    const admin = await Admin.findById(decoded.id);
    
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    
    console.log('✅ Profile sent:', admin.email);
    
    res.json({
      success: true,
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
        role: admin.role
      }
    });
    
  } catch (error) {
    console.error('Profile error:', error.message);
    return res.status(401).json({ message: 'Invalid token' });
  }
});

// Admin Me Route (Compatibility mapping)
app.get('/api/admin/me', async (req, res) => {
  console.log('📨 GET /api/admin/me');
  
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      return res.status(401).json({ message: 'No token' });
    }
    
    const token = authHeader.replace('Bearer ', '');
    const decoded = jwt.verify(token, 'khazina-sports-secret-2024');
    const admin = await Admin.findById(decoded.id);
    
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    
    res.json({
      id: admin._id,
      username: admin.username,
      email: admin.email,
      name: admin.name,
      role: admin.role
    });
    
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
});


// ============================================
// CAPTAIN LOGIN ROUTE
// ============================================
app.post('/api/captain/login', async (req, res) => {
  console.log('🔵 CAPTAIN LOGIN ATTEMPT');
  
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }
    
    // For now, return dummy captain (you can add Captain model later)
    console.log('⚠️ Captain login not yet implemented in database');
    
    // Dummy response for testing
    const token = jwt.sign(
      { id: 'captain-1', role: 'captain' },
      'khazina-sports-secret-2024',
      { expiresIn: '24h' }
    );
    
    res.json({
      success: true,
      token,
      captain: {
        id: 'captain-1',
        email: email,
        name: 'Captain',
        role: 'captain'
      }
    });
    
  } catch (error) {
    console.error('Captain login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// ============================================
// TEAMS ROUTES
// ============================================

app.get('/api/teams', async (req, res) => {
  console.log('📨 GET /api/teams');
  try {
    const teams = await Team.find();
    console.log('Teams fetched:', teams.length);
    res.json({ success: true, teams });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching teams' });
  }
});

app.post('/api/teams', async (req, res) => {
  console.log('📨 POST /api/teams');
  try {
    const newTeam = new Team(req.body);
    await newTeam.save();
    res.json({ success: true, message: 'Team registered', team: newTeam });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/api/teams/:id', async (req, res) => {
  console.log('📨 DELETE /api/teams/' + req.params.id);
  try {
    await Team.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Team deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting team' });
  }
});

app.get('/api/teams/:id', async (req, res) => {
  console.log('📨 GET /api/teams/' + req.params.id);
  try {
    const team = await Team.findById(req.params.id);
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }
    res.json({ success: true, team });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching team' });
  }
});


// ============================================
// TOURNAMENTS ROUTES
// ============================================

app.get('/api/tournaments', async (req, res) => {
  console.log('📨 GET /api/tournaments');
  try {
    const tournaments = await Tournament.find().populate('teams');
    res.json({
      success: true,
      tournaments
    });
  } catch (error) {
    console.error('Error fetching tournaments:', error);
    res.status(500).json({ message: 'Error fetching tournaments' });
  }
});

app.post('/api/tournaments', async (req, res) => {
  console.log('📨 POST /api/tournaments');
  try {
    const newTournament = new Tournament(req.body);
    await newTournament.save();
    res.json({ success: true, message: 'Tournament created', tournament: newTournament });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ============================================
// MATCHES ROUTES
// ============================================

app.get('/api/matches', async (req, res) => {
  console.log('📨 GET /api/matches');
  try {
    const matches = await Match.find()
      .populate('tournament')
      .populate('teamA')
      .populate('teamB')
      .populate('toss.winner')
      .populate('result.winner');
    res.json({
      success: true,
      matches
    });
  } catch (error) {
    console.error('Error fetching matches:', error);
    res.status(500).json({ message: 'Error fetching matches' });
  }
});


app.post('/api/matches', async (req, res) => {
  console.log('📨 POST /api/matches');
  try {
    const newMatch = new Match(req.body);
    await newMatch.save();
    res.json({ success: true, message: 'Match created', match: newMatch });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// ============================================
// SCORES ROUTES
// ============================================

app.get('/api/scores', async (req, res) => {
  console.log('📨 GET /api/scores');
  res.json({ success: true, scores: [] });
});

app.post('/api/scores', async (req, res) => {
  console.log('📨 POST /api/scores');
  res.json({ success: true, message: 'Score updated' });
});

// ============================================
// LEADERBOARD ROUTES
// ============================================

app.get('/api/leaderboard/:tournamentId', async (req, res) => {
  console.log('📨 GET /api/leaderboard/' + req.params.tournamentId);
  res.json({ success: true, leaderboard: [] });
});


// 404 Handler
app.use((req, res) => {
  console.log('❌ 404 Not Found:', req.method, req.url);
  res.status(404).json({ message: 'Route not found' });
});

// ============================================
// START SERVER
// ============================================

const PORT = 5000;
app.listen(PORT, () => {
  console.log('');
  console.log('🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀');
  console.log('     SERVER STARTED');
  console.log('🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀');
  console.log('');
  console.log('Port:', PORT);
  console.log('Test URL: http://localhost:5000/api/test');
  console.log('Login URL: http://localhost:5000/api/admin/login');
  console.log('');
  console.log('Waiting for requests...');
  console.log('');
});

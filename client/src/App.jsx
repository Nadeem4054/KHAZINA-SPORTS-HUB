import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AdminProvider } from './context/AdminContext';
import RootLayout from './layouts/RootLayout';
import AdminLayout from './layouts/AdminLayout';

import Home from './pages/Home';
import TeamRegistration from './pages/TeamRegistration';
import Tournaments from './pages/Tournaments';
import Schedule from './pages/Schedule';
import LiveScores from './pages/LiveScores';
import Leaderboard from './pages/Leaderboard';
import Contact from './pages/Contact';

import AdminLogin from './pages/AdminLogin';
import CaptainLogin from './pages/CaptainLogin';
import Dashboard from './pages/admin/Dashboard';
import AdminTeams from './pages/admin/AdminTeams';
import Scores from './pages/admin/Scores';
import AdminTournaments from './pages/admin/Tournaments';
import AdminMatches from './pages/admin/Matches';
import AdminLeaderboard from './pages/admin/Leaderboard';
import AdminReports from './pages/admin/Reports';
import AdminUsers from './pages/admin/Users';
import AdminSettings from './pages/admin/Settings';

function App() {
  return (
    <AppProvider>
      <AdminProvider>
        <Router>
          <Routes>
            <Route element={<RootLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/register-team" element={<TeamRegistration />} />
              <Route path="/tournaments" element={<Tournaments />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/live-scores" element={<LiveScores />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/contact" element={<Contact />} />
            </Route>

            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/captain/login" element={<CaptainLogin />} />

            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="teams" element={<AdminTeams />} />
              <Route path="tournaments" element={<AdminTournaments />} />
              <Route path="matches" element={<AdminMatches />} />
              <Route path="scores" element={<Scores />} />
              <Route path="leaderboard" element={<AdminLeaderboard />} />
              <Route path="reports" element={<AdminReports />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
          </Routes>
        </Router>
      </AdminProvider>

    </AppProvider>
  );
}

export default App;

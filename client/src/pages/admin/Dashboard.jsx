import React from 'react';
import { 
  Users, Trophy, Calendar, Activity, 
  TrendingUp, Star, MapPin 
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar
} from 'recharts';

import { useState, useEffect } from 'react';

const Dashboard = () => {
  const [statsData, setStatsData] = useState({
    totalTeams: 0,
    activeTournaments: 0,
    totalMatches: 0,
    activeUsers: 12
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const teamsRes = await fetch('http://localhost:5000/api/teams');
      const teamsData = await teamsRes.json();
      
      const tournamentsRes = await fetch('http://localhost:5000/api/tournaments');
      const tournamentsData = await tournamentsRes.json();
      
      const matchesRes = await fetch('http://localhost:5000/api/matches');
      const matchesData = await matchesRes.json();

      setStatsData({
        totalTeams: teamsData.teams?.length || 0,
        activeTournaments: tournamentsData.tournaments?.length || 0,
        totalMatches: matchesData.matches?.length || 0,
        activeUsers: 12
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const stats = [
    { title: 'Total Teams', value: statsData.totalTeams.toString(), trend: 'Live', icon: Users, color: 'bg-blue-500' },
    { title: 'Active Tournaments', value: statsData.activeTournaments.toString(), trend: '100% Active', icon: Trophy, color: 'bg-green-500' },
    { title: 'Total Matches', value: statsData.totalMatches.toString(), trend: 'Scheduled', icon: Calendar, color: 'bg-indigo-500' },
    { title: 'Active Users', value: statsData.activeUsers.toString(), trend: 'Active Now', icon: Activity, color: 'bg-orange-500' },
  ];


  const matchesData = [
    { name: 'Jan', matches: 12 }, { name: 'Feb', matches: 19 },
    { name: 'Mar', matches: 30 }, { name: 'Apr', matches: 25 },
    { name: 'May', matches: 42 }, { name: 'Jun', matches: 48 },
  ];

  const pieData = [
    { name: 'T20', value: 400 },
    { name: 'T10', value: 300 },
    { name: 'Test', value: 100 },
  ];
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  const teamsData = [
    { name: 'Village A', teams: 10 },
    { name: 'Village B', teams: 15 },
    { name: 'Village C', teams: 8 },
    { name: 'Village D', teams: 12 },
  ];

  return (
    <div className="space-y-6">
      {/* Quick Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 flex flex-col items-center sm:items-start text-center sm:text-left hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between w-full mb-4">
              <div className={`p-3 rounded-lg ${stat.color} text-white`}>
                <stat.icon size={24} />
              </div>
              <span className="text-sm font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                {stat.trend}
              </span>
            </div>
            <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
            <p className="text-3xl font-bold text-gray-800 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6 lg:col-span-2">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Matches Per Month</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={matchesData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6B7280'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280'}} />
                <RechartsTooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Line type="monotone" dataKey="matches" stroke="#10B981" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Highlights */}
        <div className="bg-white rounded-xl shadow-sm p-6 lg:col-span-1">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Highlights</h3>
          <div className="space-y-4">
            <div className="flex items-center p-3 bg-blue-50 rounded-lg">
              <Star className="text-blue-500 mr-3" size={20} />
              <div>
                <p className="text-xs text-blue-600 font-medium uppercase">Most Runs</p>
                <p className="font-bold text-gray-800">Babar Azam (450)</p>
              </div>
            </div>
            <div className="flex items-center p-3 bg-red-50 rounded-lg">
              <Trophy className="text-red-500 mr-3" size={20} />
              <div>
                <p className="text-xs text-red-600 font-medium uppercase">Most Wickets</p>
                <p className="font-bold text-gray-800">Shaheen Afridi (22)</p>
              </div>
            </div>
            <div className="flex items-center p-3 bg-green-50 rounded-lg">
              <Users className="text-green-500 mr-3" size={20} />
              <div>
                <p className="text-xs text-green-600 font-medium uppercase">Best Team</p>
                <p className="font-bold text-gray-800">Khazina Kings</p>
              </div>
            </div>
          </div>

          <h3 className="text-lg font-bold text-gray-800 mt-6 mb-4">System Health</h3>
          <div className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
            <span className="text-sm font-medium text-gray-600">Database Status</span>
            <span className="flex items-center text-sm font-bold text-green-600">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              Online
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Tournament Types</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center mt-4 space-x-6">
            {pieData.map((entry, index) => (
              <div key={index} className="flex items-center">
                <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                <span className="text-sm text-gray-600">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Teams by Village</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={teamsData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280'}} />
                <RechartsTooltip cursor={{fill: '#F3F4F6'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="teams" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

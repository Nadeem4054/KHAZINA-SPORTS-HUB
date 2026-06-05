import React, { useState } from 'react';
import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
import { 
  LayoutDashboard, 
  Users, 
  Trophy, 
  Calendar, 
  Activity, 
  Award, 
  BarChart2, 
  UserCog, 
  Settings, 
  LogOut,
  Menu,
  X,
  Bell
} from 'lucide-react';

const AdminLayout = () => {
  const { admin, loading, logout } = useAdmin();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen bg-gray-50"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div></div>;
  }

  if (!admin) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Teams', path: '/admin/teams', icon: Users },
    { name: 'Tournaments', path: '/admin/tournaments', icon: Trophy },
    { name: 'Matches', path: '/admin/matches', icon: Calendar },
    { name: 'Live Scores', path: '/admin/scores', icon: Activity },
    { name: 'Leaderboard', path: '/admin/leaderboard', icon: Award },
    { name: 'Statistics', path: '/admin/reports', icon: BarChart2 },
    { name: 'Users', path: '/admin/users', icon: UserCog },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="flex bg-gray-100 min-h-screen font-sans text-gray-900">
      {/* Sidebar Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-700 bg-slate-800">
          <span className="text-lg font-bold text-green-400">KHAZINA ADMIN</span>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-300 hover:text-white">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-4 flex items-center space-x-3 border-b border-slate-700">
          <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-xl uppercase">
            {admin.name.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-medium">{admin.name}</p>
            <p className="text-xs text-green-400">{admin.role.replace('_', ' ').toUpperCase()}</p>
          </div>
        </div>

        <nav className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-8rem)]">
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-green-600 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
              >
                <item.icon size={20} className={isActive ? 'text-white' : 'text-slate-400'} />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
          
          <button
            onClick={logout}
            className="w-full mt-8 flex items-center space-x-3 px-4 py-3 rounded-lg text-red-400 hover:bg-slate-800 hover:text-red-300 transition-colors"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        {/* Header */}
        <header className="h-16 bg-white shadow-sm flex items-center justify-between px-4 lg:px-8 z-30 sticky top-0">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 mr-4 rounded-md text-gray-500 hover:bg-gray-100 lg:hidden"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent capitalize">
              {location.pathname.split('/').pop().replace('-', ' ') || 'Dashboard'}
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 lg:p-8 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Trophy } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Teams', path: '/register-team' },
    { name: 'Tournaments', path: '/tournaments' },
    { name: 'Schedule', path: '/schedule' },
    { name: 'Live Scores', path: '/live-scores' },
    { name: 'Leaderboard', path: '/leaderboard' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="bg-cricketGreen text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <Trophy className="h-8 w-8 text-accentGold" />
              <div className="flex flex-col leading-tight">
                <span className="font-poppins font-bold text-xl tracking-wider uppercase text-white">Khazina</span>
                <span className="font-inter text-xs text-accentGold tracking-widest uppercase">Sports Hub</span>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'bg-cricketGreen-dark text-accentGold'
                    : 'text-gray-100 hover:bg-cricketGreen-light hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Admin Login Link */}
            <Link 
              to="/admin/login"
              className="px-3 py-2 rounded-lg bg-red-600 hover:bg-red-700 hover:scale-105 text-white font-semibold transition-all flex items-center gap-1.5 text-sm shadow-md"
            >
              <span>🔐</span>
              <span className="hidden lg:inline">Admin Login</span>
              <span className="inline lg:hidden">Admin</span>
            </Link>
            
            {/* Captain Login Link */}
            <Link 
              to="/captain/login"
              className="px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 hover:scale-105 text-white font-semibold transition-all flex items-center gap-1.5 text-sm shadow-md"
            >
              <span>👤</span>
              <span className="hidden lg:inline">Captain Login</span>
              <span className="inline lg:hidden">Captain</span>
            </Link>
          </div>

          {/* Mobile Buttons & Menu Button */}
          <div className="flex items-center md:hidden space-x-2">
            <Link 
              to="/admin/login"
              title="Admin Login"
              className="p-2 rounded-lg bg-red-600 hover:bg-red-700 hover:scale-105 text-white font-semibold transition-all flex items-center justify-center text-sm shadow-md"
            >
              <span>🔐</span>
            </Link>
            <Link 
              to="/captain/login"
              title="Captain Login"
              className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 hover:scale-105 text-white font-semibold transition-all flex items-center justify-center text-sm shadow-md"
            >
              <span>👤</span>
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-200 hover:text-white hover:bg-cricketGreen-dark focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-cricketGreen-dark border-t border-cricketGreen-light">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === link.path
                    ? 'bg-cricketGreen text-accentGold'
                    : 'text-gray-200 hover:bg-cricketGreen hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 pb-2 border-t border-cricketGreen-light space-y-2 px-3">
              <Link
                to="/admin/login"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition-all text-sm shadow-md"
              >
                🔐 Admin Login
              </Link>
              <Link
                to="/captain/login"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all text-sm shadow-md"
              >
                👤 Captain Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

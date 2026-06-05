import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Trophy, CalendarDays, Activity, Medal, History } from 'lucide-react';
import MatchCard from '../components/MatchCard';

const Home = () => {
  const stats = [
    { label: 'Registered Teams', value: '48', icon: Users },
    { label: 'Tournaments', value: '12', icon: Trophy },
    { label: 'Matches Played', value: '156', icon: Activity },
    { label: 'Total Players', value: '720+', icon: Medal },
  ];

  const features = [
    { title: 'Team Registration', desc: 'Register your village team easily', icon: Users, link: '/register-team' },
    { title: 'Tournament Creation', desc: 'Host and manage local tournaments', icon: Trophy, link: '/tournaments' },
    { title: 'Match Scheduling', desc: 'Automated fixtures and calendar', icon: CalendarDays, link: '/schedule' },
    { title: 'Live Scores', desc: 'Ball-by-ball live updates', icon: Activity, link: '/live-scores' },
    { title: 'Leaderboard', desc: 'Points table and NRR calculation', icon: Medal, link: '/leaderboard' },
    { title: 'Match History', desc: 'Detailed scorecards and stats', icon: History, link: '/schedule' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=2067&auto=format&fit=crop')] bg-cover bg-center opacity-40"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-cricketGreen-dark/70 to-gray-900/90"></div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-poppins font-bold mb-4 tracking-tight drop-shadow-lg"
          >
            KHAZINA SPORTS HUB
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl md:text-3xl font-urdu text-accentGold mb-8 drop-shadow-md"
          >
            Apne Gaon Ka Cricket Hub
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/register-team" className="px-8 py-3 rounded-full bg-accentGold text-cricketGreen-dark font-semibold text-lg hover:bg-accentGold-light transition shadow-soft hover:shadow-lg transform hover:-translate-y-1">
              Register Team
            </Link>
            <Link to="/live-scores" className="px-8 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/30 text-white font-semibold text-lg hover:bg-white/20 transition shadow-soft hover:shadow-lg transform hover:-translate-y-1">
              View Live Scores
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white shadow-soft relative z-20 -mt-10 mx-4 md:mx-12 rounded-2xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 px-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-cricketGreen-light/10 text-cricketGreen rounded-full flex items-center justify-center mb-3">
                <stat.icon className="h-6 w-6" />
              </div>
              <h3 className="text-3xl font-poppins font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-bglight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-gray-900 mb-4">Everything You Need</h2>
            <div className="w-24 h-1 bg-accentGold mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <Link key={idx} to={feature.link} className="block group">
                <div className="bg-white rounded-2xl p-8 shadow-soft hover:shadow-xl transition-all duration-300 border border-gray-100 h-full transform hover:-translate-y-2">
                  <div className="w-14 h-14 bg-bglight rounded-xl flex items-center justify-center mb-6 group-hover:bg-cricketGreen-light group-hover:text-white transition-colors text-cricketGreen">
                    <feature.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-500 font-inter">{feature.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

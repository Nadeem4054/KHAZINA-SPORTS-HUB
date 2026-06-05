import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Calendar, Users, Target } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Tournaments = () => {
  const { tournaments } = useAppContext();
  const [activeTab, setActiveTab] = useState('active');

  return (
    <div className="min-h-screen bg-bglight py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-poppins font-bold text-gray-900 mb-2">Tournaments</h1>
            <p className="text-gray-500">Discover and join the best cricket tournaments</p>
          </div>
          <button className="mt-4 md:mt-0 px-6 py-3 bg-cricketGreen text-white rounded-lg hover:bg-cricketGreen-dark transition font-semibold shadow-soft flex items-center gap-2">
            <Trophy className="h-5 w-5" /> Host Tournament
          </button>
        </div>

        <div className="flex space-x-4 mb-8 border-b border-gray-200">
          {['active', 'upcoming', 'completed'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 px-4 font-medium text-sm capitalize transition-colors border-b-2 ${
                activeTab === tab ? 'border-cricketGreen text-cricketGreen font-semibold' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab} Tournaments
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Placeholder for tournaments if empty */}
          {tournaments.length === 0 ? (
            <div className="col-span-full py-20 text-center text-gray-500">
              <Trophy className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <p className="text-xl">No tournaments found</p>
            </div>
          ) : (
            tournaments.map((tournament) => (
              <motion.div 
                key={tournament._id}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden"
              >
                <div className="h-32 bg-cricketGreen-light/10 relative">
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-xs font-semibold text-cricketGreen uppercase tracking-wider shadow-sm">
                    {tournament.status}
                  </div>
                </div>
                <div className="p-6 relative">
                  <div className="w-16 h-16 bg-white rounded-xl shadow-md absolute -top-8 left-6 flex items-center justify-center border border-gray-100">
                    <Trophy className="h-8 w-8 text-accentGold" />
                  </div>
                  <h3 className="text-xl font-poppins font-bold mt-4 mb-2">{tournament.name}</h3>
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-sm text-gray-500 gap-2">
                      <Target className="h-4 w-4" /> {tournament.matchType.toUpperCase()} - {tournament.format}
                    </div>
                    <div className="flex items-center text-sm text-gray-500 gap-2">
                      <Users className="h-4 w-4" /> {tournament.teams.length} Teams Registered
                    </div>
                  </div>
                  <button className="w-full py-2 border border-cricketGreen text-cricketGreen rounded-lg hover:bg-cricketGreen hover:text-white transition font-medium">
                    View Details
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Tournaments;

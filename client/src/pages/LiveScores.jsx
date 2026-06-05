import React from 'react';
import { Activity, Tv } from 'lucide-react';
import { motion } from 'framer-motion';

const LiveScores = () => {
  return (
    <div className="min-h-screen bg-bglight py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-4xl font-poppins font-bold text-gray-900 mb-2 flex items-center gap-3">
              <Activity className="text-cricketRed animate-pulse h-8 w-8" /> Live Scores
            </h1>
            <p className="text-gray-500">Ball-by-ball updates from the ground</p>
          </div>
          <div className="hidden sm:flex items-center gap-2 bg-cricketRed/10 text-cricketRed px-4 py-2 rounded-lg font-semibold text-sm">
            <Tv className="h-4 w-4" /> Live Now
          </div>
        </div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white rounded-2xl shadow-glass border border-gray-100 p-8 text-center"
        >
          <div className="flex justify-between items-center mb-8 border-b pb-8">
            <div className="flex-1">
              <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center font-bold text-2xl text-gray-400">R</div>
              <h2 className="font-poppins font-bold text-xl">Royal Strikers</h2>
              <p className="text-gray-500 text-sm">Yet to bat</p>
            </div>
            
            <div className="px-8">
              <div className="text-sm font-semibold text-gray-400 mb-2">T20 MATCH • INNINGS 1</div>
              <div className="text-5xl font-bold text-gray-900 mb-2 tracking-tight">
                142 <span className="text-3xl text-gray-400 font-normal">/4</span>
              </div>
              <div className="text-gray-600 font-medium">Overs: <span className="text-gray-900 font-bold">15.2</span> (20)</div>
              <div className="text-sm text-gray-500 mt-2">CRR: 9.26</div>
            </div>

            <div className="flex-1">
              <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center font-bold text-2xl text-gray-400">V</div>
              <h2 className="font-poppins font-bold text-xl">Village Kings</h2>
              <p className="text-gray-500 text-sm">Batting</p>
            </div>
          </div>
          
          <div className="text-left bg-gray-50 p-6 rounded-xl">
            <h3 className="font-semibold text-gray-800 mb-4 text-sm uppercase tracking-wider">Last 6 Balls</h3>
            <div className="flex gap-2">
              <span className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium">1</span>
              <span className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-bold">4</span>
              <span className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium">0</span>
              <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center text-sm font-bold">W</span>
              <span className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold">6</span>
              <span className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium">1</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LiveScores;

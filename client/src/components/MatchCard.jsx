import React from 'react';
import { format } from 'date-fns';

const MatchCard = ({ match }) => {
  // Placeholder structure, will adapt to actual Match model
  const { teamA, teamB, date, time, venue, matchType, status } = match || {
    teamA: { name: 'Team A', logo: 'A' },
    teamB: { name: 'Team B', logo: 'B' },
    date: new Date(),
    time: '14:00',
    venue: 'Main Ground',
    matchType: 'T20',
    status: 'scheduled'
  };

  return (
    <div className="bg-white rounded-xl shadow-soft border border-gray-100 p-5 hover:shadow-lg transition">
      <div className="flex justify-between items-center mb-4">
        <span className="text-xs font-semibold text-cricketRed-light bg-cricketRed-light/10 px-2 py-1 rounded-full uppercase tracking-wider">
          {matchType}
        </span>
        <span className={`text-xs font-semibold px-2 py-1 rounded-full uppercase tracking-wider ${status === 'live' ? 'text-green-600 bg-green-100 animate-pulse' : 'text-gray-500 bg-gray-100'}`}>
          {status}
        </span>
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-col items-center flex-1">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-2 overflow-hidden shadow-inner">
            {teamA?.logo && teamA.logo.length > 2 ? <img src={teamA.logo} alt={teamA.name} className="w-full h-full object-cover" /> : <span className="text-xl font-bold text-gray-400">{teamA?.name?.charAt(0) || 'A'}</span>}
          </div>
          <span className="font-poppins font-semibold text-gray-900 text-sm text-center">{teamA?.name || 'TBA'}</span>
        </div>
        
        <div className="mx-4 flex flex-col items-center">
          <span className="text-xs text-gray-400 font-bold mb-1">VS</span>
        </div>

        <div className="flex flex-col items-center flex-1">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-2 overflow-hidden shadow-inner">
            {teamB?.logo && teamB.logo.length > 2 ? <img src={teamB.logo} alt={teamB.name} className="w-full h-full object-cover" /> : <span className="text-xl font-bold text-gray-400">{teamB?.name?.charAt(0) || 'B'}</span>}
          </div>
          <span className="font-poppins font-semibold text-gray-900 text-sm text-center">{teamB?.name || 'TBA'}</span>
        </div>
      </div>
      
      <div className="border-t border-gray-100 pt-4 flex justify-between items-center text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <span>{date ? format(new Date(date), 'MMM d, yyyy') : 'TBA'}</span>
          <span>•</span>
          <span>{time}</span>
        </div>
        <div className="font-medium">{venue}</div>
      </div>
    </div>
  );
};

export default MatchCard;

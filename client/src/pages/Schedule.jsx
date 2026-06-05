import React from 'react';
import { Calendar as CalendarIcon, Clock, MapPin } from 'lucide-react';
import MatchCard from '../components/MatchCard';

const Schedule = () => {
  return (
    <div className="min-h-screen bg-bglight py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-poppins font-bold text-gray-900 mb-4">Match Schedule</h1>
          <p className="text-gray-500">Upcoming fixtures and past results</p>
        </div>

        <div className="bg-white rounded-2xl shadow-soft p-6 mb-8 border border-gray-100 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-4">
            <select className="px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-cricketGreen text-sm">
              <option>All Tournaments</option>
              <option>Summer League 2026</option>
            </select>
            <select className="px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-cricketGreen text-sm">
              <option>All Teams</option>
              <option>Royal Strikers</option>
            </select>
          </div>
          <div className="flex items-center gap-2 text-sm font-medium text-gray-500 bg-gray-50 px-4 py-2 rounded-lg">
            <CalendarIcon className="h-4 w-4" /> This Week
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <MatchCard match={{
            teamA: { name: 'Royal Strikers', logo: 'R' },
            teamB: { name: 'Village Kings', logo: 'V' },
            date: new Date(),
            time: '14:00 PM',
            venue: 'Khazina Main Ground',
            matchType: 'T20',
            status: 'upcoming'
          }} />
          <MatchCard match={{
            teamA: { name: 'Super Stars', logo: 'S' },
            teamB: { name: 'Golden Boys', logo: 'G' },
            date: new Date(),
            time: '09:00 AM',
            venue: 'Khazina Main Ground',
            matchType: 'ODI',
            status: 'upcoming'
          }} />
        </div>
      </div>
    </div>
  );
};

export default Schedule;

import React from 'react';

const Tournaments = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Tournaments Management</h2>
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          + Create Tournament
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((t) => (
          <div key={t} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full mb-2">Live</span>
                <h3 className="font-bold text-lg text-gray-800">Summer Cup 2026</h3>
              </div>
            </div>
            <div className="text-sm text-gray-600 space-y-2 mb-4">
              <p>Format: T20</p>
              <p>Teams: 8/10</p>
              <p>Duration: Jun 1 - Jun 30</p>
            </div>
            <div className="flex space-x-2">
              <button className="flex-1 border border-green-600 text-green-600 hover:bg-green-50 py-2 rounded-md text-sm font-medium">Manage</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tournaments;

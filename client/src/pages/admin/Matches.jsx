import React from 'react';

const Matches = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Matches Management</h2>
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          + Schedule Match
        </button>
      </div>
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Match</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tournament</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {[1,2,3].map(m => (
              <tr key={m}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2026-06-1{m}</td>
                <td className="px-6 py-4 whitespace-nowrap font-medium">Team A vs Team B</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Summer Cup</td>
                <td className="px-6 py-4 whitespace-nowrap">
                   <span className="px-2 py-1 text-xs inline-flex rounded-full bg-blue-100 text-blue-800">Scheduled</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                  <a href="#" className="text-indigo-600 hover:text-indigo-900">Edit</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Matches;

import React from 'react';
import { Medal, TrendingUp, TrendingDown, Minus } from 'lucide-react';

const Leaderboard = () => {
  const tableData = [
    { pos: 1, team: 'Royal Strikers', p: 5, w: 4, l: 1, t: 0, pts: 8, nrr: '+1.450', form: ['W', 'W', 'L', 'W', 'W'] },
    { pos: 2, team: 'Village Kings', p: 5, w: 3, l: 2, t: 0, pts: 6, nrr: '+0.850', form: ['L', 'W', 'W', 'L', 'W'] },
    { pos: 3, team: 'Super Stars', p: 5, w: 3, l: 2, t: 0, pts: 6, nrr: '-0.120', form: ['W', 'L', 'W', 'W', 'L'] },
    { pos: 4, team: 'Golden Boys', p: 5, w: 2, l: 3, t: 0, pts: 4, nrr: '-0.540', form: ['L', 'L', 'W', 'L', 'W'] },
    { pos: 5, team: 'Rising XI', p: 5, w: 0, l: 5, t: 0, pts: 0, nrr: '-1.890', form: ['L', 'L', 'L', 'L', 'L'] },
  ];

  return (
    <div className="min-h-screen bg-bglight py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-poppins font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
            <Medal className="text-accentGold h-10 w-10" /> Points Table
          </h1>
          <p className="text-gray-500">Standings for the ongoing tournaments</p>
        </div>

        <div className="bg-white rounded-2xl shadow-soft overflow-hidden border border-gray-100">
          <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
            <select className="px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-cricketGreen text-sm font-semibold text-gray-700 bg-white shadow-sm">
              <option>Summer League 2026</option>
              <option>Winter Cup 2025</option>
            </select>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-cricketGreen text-white text-sm font-semibold tracking-wide uppercase">
                  <th className="px-6 py-4">Pos</th>
                  <th className="px-6 py-4">Team</th>
                  <th className="px-4 py-4 text-center">P</th>
                  <th className="px-4 py-4 text-center">W</th>
                  <th className="px-4 py-4 text-center">L</th>
                  <th className="px-4 py-4 text-center">T</th>
                  <th className="px-6 py-4 text-center font-bold text-accentGold">Pts</th>
                  <th className="px-6 py-4 text-center">NRR</th>
                  <th className="px-6 py-4 text-center">Form</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {tableData.map((row, idx) => (
                  <tr key={idx} className={`hover:bg-gray-50 transition-colors ${idx < 4 ? 'bg-green-50/20' : ''}`}>
                    <td className="px-6 py-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        idx === 0 ? 'bg-yellow-100 text-yellow-700 border border-yellow-200' :
                        idx === 1 ? 'bg-gray-100 text-gray-700 border border-gray-200' :
                        idx === 2 ? 'bg-orange-100 text-orange-700 border border-orange-200' :
                        'text-gray-500 font-medium'
                      }`}>
                        {row.pos}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-poppins font-semibold text-gray-900 flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs text-gray-500">
                        {row.team.charAt(0)}
                      </div>
                      {row.team}
                    </td>
                    <td className="px-4 py-4 text-center text-gray-600">{row.p}</td>
                    <td className="px-4 py-4 text-center text-green-600 font-medium">{row.w}</td>
                    <td className="px-4 py-4 text-center text-red-600 font-medium">{row.l}</td>
                    <td className="px-4 py-4 text-center text-gray-500">{row.t}</td>
                    <td className="px-6 py-4 text-center font-bold text-lg text-gray-900">{row.pts}</td>
                    <td className={`px-6 py-4 text-center font-medium ${row.nrr.startsWith('+') ? 'text-green-600' : 'text-red-500'}`}>
                      {row.nrr}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center gap-1">
                        {row.form.map((f, i) => (
                          <span key={i} className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold text-white shadow-sm ${
                            f === 'W' ? 'bg-green-500' : f === 'L' ? 'bg-red-500' : 'bg-gray-400'
                          }`}>
                            {f}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 bg-gray-50 text-xs text-gray-500 border-t flex gap-4 justify-end">
            <span className="flex items-center gap-1"><div className="w-3 h-3 bg-green-50/20 shadow border border-gray-100"></div> Top 4 Qualify</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;

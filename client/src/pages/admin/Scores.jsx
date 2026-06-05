import React, { useState } from 'react';
import { RefreshCw, Play, Square, UserMinus, RotateCcw, AlertTriangle } from 'lucide-react';

const Scores = () => {
  const [matchState, setMatchState] = useState({
    teamA: 'Khazina Kings',
    teamB: 'Mardan Warriors',
    battingTeam: 'Khazina Kings',
    runs: 124,
    wickets: 4,
    overs: 15.2,
    striker: 'Babar Azam',
    strikerRuns: 45,
    strikerBalls: 30,
    nonStriker: 'Fakhar Zaman',
    nonStrikerRuns: 22,
    nonStrikerBalls: 15,
    bowler: 'Shaheen Afridi',
    bowlerOvers: 3.2,
    bowlerRuns: 24,
    bowlerWickets: 2,
    target: null,
    innings: 1
  });

  const runsButtons = [
    { label: '0', val: 0, color: 'bg-gray-200 hover:bg-gray-300 text-gray-800' },
    { label: '1', val: 1, color: 'bg-blue-100 hover:bg-blue-200 text-blue-800' },
    { label: '2', val: 2, color: 'bg-blue-100 hover:bg-blue-200 text-blue-800' },
    { label: '3', val: 3, color: 'bg-blue-100 hover:bg-blue-200 text-blue-800' },
    { label: '4', val: 4, color: 'bg-green-500 hover:bg-green-600 text-white font-bold' },
    { label: '6', val: 6, color: 'bg-purple-600 hover:bg-purple-700 text-white font-bold' },
  ];

  const extrasButtons = [
    { label: 'Wd', title: 'Wide', color: 'bg-orange-100 hover:bg-orange-200 text-orange-800' },
    { label: 'Nb', title: 'No Ball', color: 'bg-orange-100 hover:bg-orange-200 text-orange-800' },
    { label: 'B', title: 'Bye', color: 'bg-yellow-100 hover:bg-yellow-200 text-yellow-800' },
    { label: 'Lb', title: 'Leg Bye', color: 'bg-yellow-100 hover:bg-yellow-200 text-yellow-800' },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Live Scoreboard Display */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl shadow-lg p-6 text-white text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 bg-red-600 text-white px-3 py-1 rounded-bl-lg text-sm font-bold flex items-center">
          <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span> LIVE
        </div>
        
        <h2 className="text-xl font-bold text-gray-300 mb-2">{matchState.teamA} vs {matchState.teamB}</h2>
        <div className="text-sm text-green-400 font-semibold mb-4">Innings {matchState.innings} • Match 12</div>
        
        <div className="flex justify-center items-end space-x-4 mb-6">
          <div className="text-6xl font-black">{matchState.runs}/{matchState.wickets}</div>
          <div className="text-2xl text-gray-400 mb-1">({matchState.overs})</div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left border-t border-slate-700 pt-4">
          <div className="col-span-1">
            <p className="text-sm text-gray-400">Striker</p>
            <p className="font-bold">{matchState.striker}*</p>
            <p className="text-sm">{matchState.strikerRuns} ({matchState.strikerBalls})</p>
          </div>
          <div className="col-span-1">
            <p className="text-sm text-gray-400">Non-Striker</p>
            <p className="font-semibold text-gray-300">{matchState.nonStriker}</p>
            <p className="text-sm">{matchState.nonStrikerRuns} ({matchState.nonStrikerBalls})</p>
          </div>
          <div className="col-span-2 md:border-l md:border-slate-700 md:pl-4">
            <p className="text-sm text-gray-400">Bowler</p>
            <p className="font-bold">{matchState.bowler}</p>
            <p className="text-sm">{matchState.bowlerOvers} - {matchState.bowlerRuns} - {matchState.bowlerWickets}</p>
          </div>
        </div>
      </div>

      {/* Admin Control Panel */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h3 className="font-bold text-gray-800 text-lg flex items-center">
            <Activity className="mr-2 text-green-600" /> Scoring Control
          </h3>
          <button className="flex items-center text-sm text-blue-600 hover:text-blue-800">
            <RotateCcw size={16} className="mr-1" /> Undo Last Ball
          </button>
        </div>

        <div className="p-6">
          {/* Main Scoring Buttons */}
          <div className="mb-8">
            <h4 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">Runs</h4>
            <div className="grid grid-cols-6 gap-3">
              {runsButtons.map((btn) => (
                <button
                  key={btn.label}
                  className={`py-4 rounded-lg font-bold text-xl shadow-sm transition-transform active:scale-95 ${btn.color}`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
            {/* Extras */}
            <div>
              <h4 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">Extras</h4>
              <div className="grid grid-cols-4 gap-3">
                {extrasButtons.map((btn) => (
                  <button
                    key={btn.label}
                    className={`py-3 rounded-lg font-bold text-lg shadow-sm transition-transform active:scale-95 ${btn.color}`}
                    title={btn.title}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Wicket & Special */}
            <div>
              <h4 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">Action</h4>
              <div className="grid grid-cols-2 gap-3">
                <button className="py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold text-lg shadow-sm transition-transform active:scale-95 flex items-center justify-center">
                  <UserMinus size={20} className="mr-2" /> WICKET
                </button>
                <button className="py-3 bg-slate-800 hover:bg-slate-900 text-white rounded-lg font-bold text-lg shadow-sm transition-transform active:scale-95 flex items-center justify-center">
                  <RefreshCw size={20} className="mr-2" /> OVER END
                </button>
              </div>
            </div>
          </div>

          <hr className="my-6 border-gray-200" />

          {/* Match Controls */}
          <div>
            <h4 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">Match Controls</h4>
            <div className="flex flex-wrap gap-3">
              <button className="px-4 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded border border-blue-200 text-sm font-medium">
                Change Bowler
              </button>
              <button className="px-4 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded border border-blue-200 text-sm font-medium">
                Change Batsman
              </button>
              <button className="px-4 py-2 bg-purple-50 text-purple-700 hover:bg-purple-100 rounded border border-purple-200 text-sm font-medium flex items-center">
                <Square size={14} className="mr-1" /> End Innings
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded border border-gray-300 text-sm font-medium flex items-center">
                <AlertTriangle size={14} className="mr-1" /> Penalty Runs
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Scores;

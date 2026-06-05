import React, { useState, useEffect } from 'react';
import { Users, MapPin, User, Award } from 'lucide-react';

export default function TeamRegistration() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTeam, setSelectedTeam] = useState(null);

  // Fetch teams on component load
  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/teams');
      const data = await response.json();

      console.log('Teams fetched:', data);
      setTeams(data.teams || []);
    } catch (error) {
      console.error('Error fetching teams:', error);
      setTeams([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-900 to-green-700 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">⚡ Village Cricket Teams</h1>
          <p className="text-green-100 text-lg">Browse all registered teams and their players</p>
        </div>
      </div>

      {/* Teams Grid */}
      <div className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin">
              <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full"></div>
            </div>
            <p className="mt-4 text-gray-600">Loading teams...</p>
          </div>
        ) : teams.length === 0 ? (
          <div className="text-center py-12">
            <Users size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 text-lg">No teams registered yet</p>
            <p className="text-gray-500">Check back soon!</p>
          </div>
        ) : (
          <div>
            <div className="mb-8">
              <p className="text-gray-600">
                Showing <span className="font-bold text-green-600">{teams.length}</span> registered teams
              </p>
            </div>

            {/* Teams Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teams.map((team) => (
                <div
                  key={team._id}
                  className="bg-white rounded-lg shadow-lg hover:shadow-xl transition overflow-hidden border-t-4 border-green-600 cursor-pointer"
                  onClick={() => setSelectedTeam(selectedTeam?._id === team._id ? null : team)}
                >
                  {/* Team Header */}
                  <div className="bg-gradient-to-r from-green-600 to-green-500 text-white p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold">{team.name}</h3>
                        <div className="flex items-center gap-2 mt-2 text-green-100">
                          <MapPin size={16} />
                          <span>{team.village}</span>
                        </div>
                      </div>
                      <div className="bg-white/20 rounded-full p-3">
                        <Users size={24} />
                      </div>
                    </div>
                  </div>

                  {/* Team Info */}
                  <div className="p-6 space-y-4">
                    {/* Captain */}
                    <div className="flex items-center gap-3">
                      <div className="bg-yellow-100 rounded-full p-2">
                        <Award size={18} className="text-yellow-600" />
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">Captain</p>
                        <p className="font-semibold text-gray-800">{team.captain}</p>
                      </div>
                    </div>

                    {/* Vice Captain */}
                    {team.viceCaptain && (
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 rounded-full p-2">
                          <User size={18} className="text-blue-600" />
                        </div>
                        <div>
                          <p className="text-gray-600 text-sm">Vice Captain</p>
                          <p className="font-semibold text-gray-800">{team.viceCaptain}</p>
                        </div>
                      </div>
                    )}

                    {/* Contact */}
                    {team.phone && (
                      <div className="pt-4 border-t">
                        <p className="text-gray-600 text-sm">📱 {team.phone}</p>
                        {team.email && <p className="text-gray-600 text-sm">📧 {team.email}</p>}
                      </div>
                    )}

                    {/* Players Count */}
                    <div className="bg-green-50 rounded-lg p-3 mt-4">
                      <p className="text-green-700 font-semibold">
                        👥 {team.players?.length || 0} Players Registered
                      </p>
                    </div>

                    {/* Expand Button */}
                    <button
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition"
                    >
                      {selectedTeam?._id === team._id ? '▼ Hide Players' : '▶ View Players'}
                    </button>
                  </div>

                  {/* Expanded Players List */}
                  {selectedTeam?._id === team._id && team.players && team.players.length > 0 && (
                    <div className="border-t bg-gray-50 p-6">
                      <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <Users size={18} />
                        Team Roster
                      </h4>
                      <div className="space-y-2">
                        {team.players.map((player, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200"
                          >
                            <div className="flex items-center gap-3">
                              <div className="bg-green-100 rounded-full w-8 h-8 flex items-center justify-center font-bold text-green-700">
                                {idx + 1}
                              </div>
                              <div>
                                <p className="font-semibold text-gray-800">{player.name}</p>
                                <p className="text-sm text-gray-500">{player.role || 'Player'}</p>
                              </div>
                            </div>
                            {player.jerseyNumber && (
                              <span className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">
                                #{player.jerseyNumber}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedTeam?._id === team._id && (!team.players || team.players.length === 0) && (
                    <div className="border-t bg-gray-50 p-6 text-center text-gray-500">
                      No players added yet
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="bg-green-50 border-t border-green-200 py-8 mt-12">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-600">
            ✅ All teams are verified and managed by Khazina Sports Hub admin
          </p>
        </div>
      </div>
    </div>
  );
}

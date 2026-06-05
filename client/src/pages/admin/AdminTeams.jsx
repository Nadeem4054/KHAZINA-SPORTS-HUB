import React, { useState, useEffect } from 'react';
import { User, Users, MapPin, Plus, Edit2, Trash2, Eye, X } from 'lucide-react';

export default function AdminTeams() {
  const [teams, setTeams] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    village: '',
    captain: '',
    viceCaptain: '',
    phone: '',
    email: '',
    players: [
      { name: '', role: 'batsman', jerseyNumber: '' }
    ]
  });

  // Fetch teams
  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/teams');
      const data = await response.json();
      setTeams(data.teams || []);
    } catch (error) {
      console.error('Error fetching teams:', error);
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle player input changes
  const handlePlayerChange = (index, field, value) => {
    const updatedPlayers = [...formData.players];
    updatedPlayers[index][field] = value;
    setFormData(prev => ({
      ...prev,
      players: updatedPlayers
    }));
  };

  // Add new player field
  const addPlayer = () => {
    setFormData(prev => ({
      ...prev,
      players: [
        ...prev.players,
        { name: '', role: 'batsman', jerseyNumber: '' }
      ]
    }));
  };

  // Remove player field
  const removePlayer = (index) => {
    setFormData(prev => ({
      ...prev,
      players: prev.players.filter((_, i) => i !== index)
    }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validation
    if (!formData.name || !formData.village || !formData.captain) {
      alert('Please fill in all required fields');
      setLoading(false);
      return;
    }

    if (formData.players.length === 0 || !formData.players[0].name) {
      alert('Please add at least one player');
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('adminToken') || localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/teams', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: formData.name,
          village: formData.village,
          captain: formData.captain,
          viceCaptain: formData.viceCaptain,
          phone: formData.phone,
          email: formData.email,
          players: formData.players.filter(p => p.name.trim() !== '')
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert('✅ Team and players registered successfully!');
        setFormData({
          name: '',
          village: '',
          captain: '',
          viceCaptain: '',
          phone: '',
          email: '',
          players: [
            { name: '', role: 'batsman', jerseyNumber: '' }
          ]
        });
        setShowForm(false);
        fetchTeams();
      } else {
        alert('❌ Error: ' + data.message);
      }
    } catch (error) {
      console.error('Error registering team:', error);
      alert('Server error');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTeam = async (teamId) => {
    if (!window.confirm('Are you sure you want to delete this team?')) return;

    try {
      const token = localStorage.getItem('adminToken') || localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/teams/${teamId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        alert('✅ Team deleted successfully');
        fetchTeams();
      }
    } catch (error) {
      console.error('Error deleting team:', error);
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">👥 Teams Management</h1>
          <p className="text-gray-600 mt-2">Register teams with players</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition"
        >
          <Plus size={20} />
          Register New Team
        </button>
      </div>

      {/* Registration Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border-l-4 border-green-600 max-h-[90vh] overflow-y-auto">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Register New Team With Players</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Team Details Section */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-gray-800 mb-4">📋 Team Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Team Name */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Team Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g., Royal Strikers"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-green-500 outline-none"
                    required
                  />
                </div>

                {/* Village */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Village/Area *</label>
                  <input
                    type="text"
                    name="village"
                    value={formData.village}
                    onChange={handleInputChange}
                    placeholder="e.g., Peshawar"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-green-500 outline-none"
                    required
                  />
                </div>

                {/* Captain Name */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Captain Name *</label>
                  <input
                    type="text"
                    name="captain"
                    value={formData.captain}
                    onChange={handleInputChange}
                    placeholder="Captain's name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-green-500 outline-none"
                    required
                  />
                </div>

                {/* Vice Captain */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Vice Captain</label>
                  <input
                    type="text"
                    name="viceCaptain"
                    value={formData.viceCaptain}
                    onChange={handleInputChange}
                    placeholder="Vice captain's name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-green-500 outline-none"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Contact Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="03001234567"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-green-500 outline-none"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="team@khazina.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-green-500 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Players Section */}
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-800">🏏 Add Team Players</h3>
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {formData.players.length} Players
                </span>
              </div>

              <div className="space-y-4">
                {formData.players.map((player, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg border-2 border-blue-200">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-semibold text-gray-800">Player #{index + 1}</h4>
                      {formData.players.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removePlayer(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X size={20} />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Player Name */}
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">Player Name *</label>
                        <input
                          type="text"
                          value={player.name}
                          onChange={(e) => handlePlayerChange(index, 'name', e.target.value)}
                          placeholder="e.g., Ali Khan"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
                          required
                        />
                      </div>

                      {/* Player Role */}
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">Role *</label>
                        <select
                          value={player.role}
                          onChange={(e) => handlePlayerChange(index, 'role', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                          required
                        >
                          <option value="batsman">🏏 Batsman</option>
                          <option value="bowler">⚾ Bowler</option>
                          <option value="allrounder">⭐ All-rounder</option>
                          <option value="wicketkeeper">🧤 Wicket Keeper</option>
                        </select>
                      </div>

                      {/* Jersey Number */}
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">Jersey Number</label>
                        <input
                          type="number"
                          value={player.jerseyNumber}
                          onChange={(e) => handlePlayerChange(index, 'jerseyNumber', e.target.value)}
                          placeholder="e.g., 7"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
                          min="1"
                          max="99"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Player Button */}
              <button
                type="button"
                onClick={addPlayer}
                className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center justify-center gap-2 transition"
              >
                <Plus size={20} />
                Add Another Player
              </button>
            </div>

            {/* Form Actions */}
            <div className="flex gap-4 sticky bottom-0 bg-white p-4 rounded-lg shadow-md">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition disabled:opacity-50"
              >
                {loading ? '⏳ Registering...' : '✅ Register Team & Players'}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 bg-gray-400 hover:bg-gray-500 text-white px-8 py-3 rounded-lg font-semibold transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Teams List */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6">
          <h2 className="text-xl font-bold">Registered Teams ({teams.length})</h2>
        </div>

        {teams.length === 0 ? (
          <div className="p-12 text-center">
            <Users size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 text-lg">No teams registered yet</p>
            <button
              onClick={() => setShowForm(true)}
              className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition"
            >
              Register First Team
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-gray-700 font-semibold">Team Name</th>
                  <th className="px-6 py-3 text-left text-gray-700 font-semibold">Village</th>
                  <th className="px-6 py-3 text-left text-gray-700 font-semibold">Captain</th>
                  <th className="px-6 py-3 text-left text-gray-700 font-semibold">Players</th>
                  <th className="px-6 py-3 text-center text-gray-700 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {teams.map((team, idx) => (
                  <tr key={team._id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 font-semibold text-gray-800">{team.name}</td>
                    <td className="px-6 py-4 text-gray-700">{team.village}</td>
                    <td className="px-6 py-4 text-gray-700">{team.captain}</td>
                    <td className="px-6 py-4">
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold">
                        {team.players?.length || 0}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        title="Delete"
                        onClick={() => handleDeleteTeam(team._id)}
                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

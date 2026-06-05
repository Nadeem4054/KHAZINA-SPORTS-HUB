import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAdmin } from '../../context/AdminContext';
import { UserPlus, Shield, Activity, Trash2, ShieldAlert } from 'lucide-react';

const Users = () => {
  const { token, admin } = useAdmin();
  const [users, setUsers] = useState([]);
  const [logs, setLogs] = useState([]);
  const [activeTab, setActiveTab] = useState('users'); // 'users' or 'logs'

  // Form State
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    name: '',
    role: 'admin'
  });

  useEffect(() => {
    fetchUsersAndLogs();
  }, [token]);

  const fetchUsersAndLogs = async () => {
    try {
      if (admin.role === 'super_admin') {
        const usersRes = await axios.get('http://localhost:5000/api/admin/users');
        setUsers(usersRes.data);
      }
      const logsRes = await axios.get('http://localhost:5000/api/admin/users/logs');
      setLogs(logsRes.data);
    } catch (err) {
      console.error('Error fetching users or logs', err);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/admin/users', formData);
      setShowAddForm(false);
      setFormData({ username: '', email: '', password: '', name: '', role: 'admin' });
      fetchUsersAndLogs();
    } catch (err) {
      alert(err.response?.data?.message || 'Error creating user');
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this admin?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/admin/users/${id}`);
      fetchUsersAndLogs();
    } catch (err) {
      alert(err.response?.data?.message || 'Error deleting user');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-4 flex space-x-4 border-b border-gray-200">
        <button 
          onClick={() => setActiveTab('users')}
          className={`flex items-center px-4 py-2 font-medium rounded-lg transition-colors ${activeTab === 'users' ? 'bg-green-100 text-green-700' : 'text-gray-600 hover:bg-gray-100'}`}
        >
          <Shield className="mr-2" size={20} /> User Management
        </button>
        <button 
          onClick={() => setActiveTab('logs')}
          className={`flex items-center px-4 py-2 font-medium rounded-lg transition-colors ${activeTab === 'logs' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
        >
          <Activity className="mr-2" size={20} /> Activity Logs
        </button>
      </div>

      {activeTab === 'users' && (
        <div className="bg-white rounded-xl shadow-sm p-6 line-clamp-none">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Admin Users</h2>
            {admin.role === 'super_admin' && (
              <button 
                onClick={() => setShowAddForm(!showAddForm)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
              >
                <UserPlus size={18} className="mr-2" /> Add New Admin
              </button>
            )}
          </div>

          {admin.role !== 'super_admin' ? (
            <div className="bg-red-50 text-red-700 p-4 rounded-lg flex items-center">
              <ShieldAlert className="mr-3" />
              You do not have permission to manage users. Super Admin access required.
            </div>
          ) : (
            <>
              {showAddForm && (
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-8">
                  <h3 className="font-bold text-gray-700 mb-4">Create New Administrator</h3>
                  <form onSubmit={handleAddUser} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-2 border border-gray-300 rounded focus:ring-green-500 focus:border-green-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                      <input required type="text" value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})} className="w-full p-2 border border-gray-300 rounded focus:ring-green-500 focus:border-green-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full p-2 border border-gray-300 rounded focus:ring-green-500 focus:border-green-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                      <input required type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="w-full p-2 border border-gray-300 rounded focus:ring-green-500 focus:border-green-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                      <select value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full p-2 border border-gray-300 rounded focus:ring-green-500 focus:border-green-500">
                        <option value="admin">Admin</option>
                        <option value="moderator">Moderator</option>
                        <option value="super_admin">Super Admin</option>
                      </select>
                    </div>
                    <div className="flex items-end">
                      <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 font-medium">Save User</button>
                    </div>
                  </form>
                </div>
              )}

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold mr-3">
                              {user.name.charAt(0)}
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">{user.name}</div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.username}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            user.role === 'super_admin' ? 'bg-purple-100 text-purple-800' :
                            user.role === 'admin' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Active
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          {user.role !== 'super_admin' && (
                            <button onClick={() => handleDeleteUser(user._id)} className="text-red-600 hover:text-red-900 ml-4">
                              <Trash2 size={18} />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      )}

      {activeTab === 'logs' && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">System Activity Logs</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date/Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Admin</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entity</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {logs.length === 0 ? (
                  <tr><td colSpan="5" className="text-center py-4 text-gray-500">No activity logs found.</td></tr>
                ) : logs.map((log) => (
                  <tr key={log._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(log.createdAt).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-medium text-gray-900">{log.adminId?.username || 'Unknown'}</span>
                      <span className="text-xs text-gray-500 block">{log.adminId?.role || ''}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-lg font-medium border ${
                        log.action.includes('DELETE') ? 'bg-red-50 text-red-700 border-red-200' :
                        log.action.includes('CREATE') ? 'bg-green-50 text-green-700 border-green-200' :
                        'bg-blue-50 text-blue-700 border-blue-200'
                      }`}>
                        {log.action}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{log.details}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-medium">
                      {log.entity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;

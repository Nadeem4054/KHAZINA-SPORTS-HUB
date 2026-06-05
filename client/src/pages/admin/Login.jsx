import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAdmin } from '../../context/AdminContext';
import { User, Lock, Eye, EyeOff, Loader } from 'lucide-react';

const AdminLogin = () => {
  const [formData, setFormData] = useState({ identifier: '', password: '', rememberMe: false });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, admin } = useAdmin();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (admin) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [admin, navigate]);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Basic validation
      if (!formData.identifier || !formData.password) {
        throw new Error('Please fill in all fields');
      }

      const isEmail = formData.identifier.includes('@');
      const payload = {
        password: formData.password,
        ...(isEmail ? { email: formData.identifier } : { username: formData.identifier })
      };

      const response = await axios.post('http://localhost:5000/api/admin/login', payload);
      login(response.data.token, response.data.admin);
      
      const from = location.state?.from?.pathname || '/admin/dashboard';
      navigate(from, { replace: true });

    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-800 via-green-700 to-green-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Abstract Cricket Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[30rem] h-[30rem] bg-yellow-500/10 rounded-full blur-3xl"></div>
      
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden relative z-10 border border-white/20 backdrop-blur-sm">
        <div className="bg-gradient-to-r from-green-600 to-green-500 p-8 text-center text-white">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg border-4 border-green-200/30">
            <TrophyIcon className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">KHAZINA SPORTS</h1>
          <p className="text-green-100 mt-2 font-medium tracking-wide">Admin Control Panel</p>
        </div>

        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Sign In</h2>
          
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-md mb-6 animate-pulse">
              <p className="text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Username or Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <User size={20} />
                </div>
                <input
                  type="text"
                  name="identifier"
                  value={formData.identifier}
                  onChange={handleChange}
                  className="pl-10 w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all shadow-sm"
                  placeholder="admin or admin@khazina.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Lock size={20} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-10 pr-10 w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all shadow-sm"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-green-600 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded cursor-pointer"
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-sm font-medium text-green-600 hover:text-green-500 hover:underline">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-md text-sm font-bold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all disabled:opacity-70 transform hover:-translate-y-0.5"
            >
              {loading ? (
                <>
                  <Loader className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" />
                  Authenticating...
                </>
              ) : (
                'Secure Login'
              )}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              Protected by Khazina Sports Security. Unauthorized access is strictly prohibited.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Simple Trophy SVG icon for the logo
const TrophyIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M5.166 2.621C4.239 2.708 3.639 3.55 3.639 4.475V5.5c0 2.13 1.553 3.91 3.612 4.195 1.104 2.222 3.322 3.753 5.922 3.882 1.309.064 2.199 1.164 2.199 2.476v1.447H13.5a1.5 1.5 0 0 1-1.5 1.5H12v.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-.5h-1.5a1.5 1.5 0 0 1-1.5-1.5v-1.447c0-1.312.89-2.412 2.199-2.476 2.6-.129 4.818-1.66 5.922-3.882 2.059-.286 3.612-2.066 3.612-4.195V4.475c0-.925-.6-1.767-1.527-1.854A11.006 11.006 0 0 0 12 2a11.006 11.006 0 0 0-6.834.621ZM12 4a9.5 9.5 0 0 1 5.4 1.665c-.237 2.054-1.637 4.175-4.135 4.305-1.258.065-2.003 1.15-2.003 2.502v1.5a.5.5 0 0 0 .5.5h1.5v1H11v-1h1.5a.5.5 0 0 0 .5-.5v-1.5c0-1.352-.745-2.437-2.003-2.502-2.498-.13-3.898-2.251-4.135-4.305A9.5 9.5 0 0 1 12 4ZM5.139 4.475c0-.18.106-.355.283-.37A9.5 9.5 0 0 0 7.39 3.52c.11.83.35 1.761.801 2.766-.54.086-1.042.222-1.503.43A3.001 3.001 0 0 1 5.139 5.5v-1.025Zm13.722 0v1.025a3.001 3.001 0 0 1-1.549 1.217c-.461-.208-.963-.344-1.503-.43.45-1.005.691-1.936.801-2.766a9.5 9.5 0 0 0 1.968.583c.177.015.283.19.283.37Z" clipRule="evenodd" />
  </svg>
);

export default AdminLogin;

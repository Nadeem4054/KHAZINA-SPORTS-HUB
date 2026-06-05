import React, { useState } from 'react';

export default function CaptainLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/captain/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Login failed');
        setLoading(false);
        return;
      }

      // Store token
      localStorage.setItem('captainToken', data.token);
      localStorage.setItem('captain', JSON.stringify(data.captain));

      // Redirect to captain dashboard
      window.location.href = '/captain/dashboard';

    } catch (error) {
      console.error('Login error:', error);
      setError('Server error. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-700 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="bg-blue-800 rounded-t-3xl px-8 py-8 text-center border-b border-blue-900">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-4xl">👤</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-wider">KHAZINA SPORTS</h1>
          <p className="text-blue-100 mt-2 font-medium">Captain Portal</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-b-3xl px-8 py-8 shadow-2xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Sign In</h2>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 rounded">
              <p className="text-red-700 text-sm font-semibold">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email / Username Field */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Email or Username
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3.5 text-gray-400">✉️</span>
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="captain@khazina.com"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Password
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3.5 text-gray-400">🔐</span>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  required
                />
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer">
                <input type="checkbox" className="mr-2 cursor-pointer h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                <span className="text-gray-600 text-sm">Remember me</span>
              </label>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-700 hover:underline">
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-all disabled:opacity-50 hover:scale-[1.02] active:scale-[0.98] shadow-md"
            >
              {loading ? 'Logging in...' : 'Captain Login'}
            </button>
          </form>

          <p className="text-center text-gray-500 mt-6 text-xs">
            Protected by Khazina Sports Security. Unauthorized access is strictly prohibited.
          </p>
        </div>
      </div>
    </div>
  );
}

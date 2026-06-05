import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('admin@khazinasports.com');
  const [password, setPassword] = useState('Admin@123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    console.log('🔵 Attempting admin login...');
    console.log('Email:', email);
    console.log('Password:', password ? '***' : 'empty');

    try {
      // Step 1: Call login API
      console.log('📨 Calling login API...');
      const loginResponse = await fetch('http://localhost:5000/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      console.log('Login Response Status:', loginResponse.status);
      const loginData = await loginResponse.json();
      console.log('Login Response Data:', loginData);

      if (!loginResponse.ok) {
        console.error('❌ Login failed:', loginData.message);
        setError(loginData.message || 'Invalid credentials');
        setLoading(false);
        return;
      }

      // Step 2: Login successful - save token
      console.log('✅ Login successful!');
      console.log('Token received:', loginData.token.substring(0, 20) + '...');
      
      // Save both 'token' and 'adminToken' for compatibility across contexts
      localStorage.setItem('token', loginData.token);
      localStorage.setItem('adminToken', loginData.token);
      localStorage.setItem('admin', JSON.stringify(loginData.admin));
      
      console.log('✅ Token saved to localStorage');

      // Step 3: Redirect to dashboard
      console.log('🔄 Redirecting to dashboard...');
      window.location.href = '/admin/dashboard';

    } catch (error) {
      console.error('❌ Login error:', error);
      setError('Server error: ' + error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-900 to-green-700 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="bg-green-800 rounded-t-3xl px-8 py-8 text-center border-b border-green-950">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-4xl">🏏</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-wider">KHAZINA SPORTS</h1>
          <p className="text-green-100 mt-2 font-medium">Admin Control Panel</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-b-3xl px-8 py-8 shadow-2xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Sign In</h2>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 rounded">
              <p className="text-red-700 font-semibold">❌ {error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Username or Email
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3.5 text-gray-400">👤</span>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@khazinasports.com"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
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
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-gray-500 hover:text-green-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer">
                <input type="checkbox" className="mr-2 cursor-pointer h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded" />
                <span className="text-gray-600 text-sm">Remember me</span>
              </label>
              <a href="#" className="text-sm text-green-600 hover:text-green-700 hover:underline font-semibold">
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-all disabled:opacity-50 hover:scale-[1.02] active:scale-[0.98] shadow-md mt-6"
            >
              {loading ? '⏳ Logging in...' : '✅ Secure Login'}
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

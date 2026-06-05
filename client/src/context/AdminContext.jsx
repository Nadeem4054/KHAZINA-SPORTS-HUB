import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AdminContext = createContext();

export const useAdmin = () => useContext(AdminContext);

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('adminToken') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchAdminProfile();
    } else {
      setLoading(false);
    }
  }, [token]);

  const fetchAdminProfile = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/me');
      setAdmin(response.data);
    } catch (error) {
      console.error('Error fetching admin profile', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = (tokenData, adminData) => {
    setToken(tokenData);
    setAdmin(adminData);
    localStorage.setItem('adminToken', tokenData);
    axios.defaults.headers.common['Authorization'] = `Bearer ${tokenData}`;
  };

  const logout = () => {
    setToken(null);
    setAdmin(null);
    localStorage.removeItem('adminToken');
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AdminContext.Provider value={{ admin, token, loading, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
};

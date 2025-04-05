import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('token') ? true : false;
  });
  
  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('isAdmin') === 'true';
  });
  
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('token');
      const email = localStorage.getItem('email');

      if (token && email) {
        try {
          await fetchUserData(email);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Authentication error:', error);
          handleLogout();
          // Ensure toast is called after component is mounted
          setTimeout(() => {
            toast.error('Authentication failed. Please login again.');
          }, 100);
        }
      } else {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('isAdmin', isAdmin.toString());
    }
  }, [user, isAdmin]);

  const fetchUserData = async (email) => {
    try {
      const { data } = await api.get(`/auth/user?email=${email}`);
      
      if (data.success) {
        setUser(data.user);
        setIsAdmin(data.user.isAdmin || false);
      } else {
        handleLogout();
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      handleLogout();
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    setIsAdmin(false);
    setUser(null);
    setIsLoading(false);
  };

  const updateUserProfile = async (userData) => {
    try {
      const { data } = await api.put('/auth/update-profile', userData);
      if (data.success) {
        setUser(prev => ({
          ...prev,
          ...data.user
        }));
        return { success: true };
      }
      throw new Error(data.error || 'Failed to update profile');
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        isAdmin,
        setIsAdmin,
        user,
        setUser,
        updateUserProfile,
        isLoading,
        handleLogout
      }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api.jsx';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUserProfile();
      
      // Set a timeout to prevent infinite loading if API is unreachable
      const timeout = setTimeout(() => {
        console.warn('Auth check timed out after 10 seconds');
        setLoading(false);
      }, 10000);
      
      return () => clearTimeout(timeout);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserProfile = async () => {
    try {
      console.log('Fetching user profile with token:', api.defaults.headers.common['Authorization']);
      const response = await api.get('/auth/me');
      console.log('User profile response:', response.data);
      setUser(response.data);
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        console.log('Token appears to be invalid, clearing auth data');
        localStorage.removeItem('token');
        delete api.defaults.headers.common['Authorization'];
      }
    } finally {
      setLoading(false);
    }
  };

  const login = async (username, password) => {
    try {
      const response = await api.post('/auth/login', { username, password });
      console.log('Login response:', response.data);
      const { accessToken } = response.data;
      
      if (!accessToken) {
        throw new Error('No access token received from server');
      }
      
      localStorage.setItem('token', accessToken);
      api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      console.log('Token set in header:', `Bearer ${accessToken}`);
      
      await fetchUserProfile();
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      
      // Handle specific error cases
      let errorMessage = 'Login failed';
      
      if (error.response) {
        const status = error.response.status;
        const data = error.response.data;
        
        if (status === 401) {
          errorMessage = 'Invalid username or password. Please try again.';
        } else if (status === 403) {
          errorMessage = 'Access denied. Please contact support.';
        } else if (status === 404) {
          errorMessage = 'Account not found. Please check your username.';
        } else if (status === 500) {
          errorMessage = 'Server error. Please try again later.';
        } else if (data?.detail) {
          errorMessage = data.detail;
        } else if (data?.message) {
          errorMessage = data.message;
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      return {
        success: false,
        error: errorMessage
      };
    }
  };

  const register = async (userData) => {
    try {
      await api.post('/auth/register', userData);
      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      
      // Handle specific error cases
      let errorMessage = 'Registration failed';
      
      if (error.response) {
        const status = error.response.status;
        const data = error.response.data;
        
        if (status === 400) {
          errorMessage = data?.message || 'Invalid registration data. Please check your information.';
        } else if (status === 409) {
          errorMessage = 'Username or email already exists. Please try another.';
        } else if (status === 500) {
          errorMessage = 'Server error. Please try again later.';
        } else if (data?.detail) {
          errorMessage = data.detail;
        } else if (data?.message) {
          errorMessage = data.message;
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      return {
        success: false,
        error: errorMessage
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          fontSize: '1.5rem'
        }}>
          Loading...
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}
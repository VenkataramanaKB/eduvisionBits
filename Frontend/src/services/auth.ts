import axios from 'axios';

// const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Define user type
export interface User {
  _id: string;
  name: string;
  email: string;
  googleId?: string;
  avatar?: string;
}

// Check if user is authenticated
export const checkAuthStatus = async (): Promise<User | null> => {
  try {
    const response = await axios.get(`http://localhost:5000/auth/user`, {
      withCredentials: true
    });
    return response.data.user;
  } catch (error) {
    return null;
  }
};

// Start Google OAuth login
export const loginWithGoogle = () => {
  window.location.href = `http://localhost:5000/auth/google/callback`;
};

// Logout the user
export const logout = async (): Promise<void> => {
  try {
    await axios.get(`http://localhost:5000/auth/logout`, {
      withCredentials: true
    });
    window.location.href = '/landing';
  } catch (error) {
    console.error('Logout error:', error);
  }
}; 
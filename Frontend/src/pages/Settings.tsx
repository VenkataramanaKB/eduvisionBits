import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

// Theme context will be implemented at the app level later
// This is a placeholder for now
const useTheme = () => {
  const [isDark, setIsDark] = useState(true);
  
  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    // In a real implementation, this would trigger theme changes throughout the app
  };
  
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    }
  }, []);
  
  return { isDark, toggleTheme };
};

const SettingsCard: React.FC<{
  title: string;
  description: string;
  children: React.ReactNode;
}> = ({ title, description, children }) => {
  return (
    <div className="w-full bg-[#161830] rounded-lg p-6 border border-white/30 shadow-lg">
      <div className="flex flex-col md:flex-row justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
          <p className="text-white text-sm">{description}</p>
        </div>
        <div className="mt-4 md:mt-0">
          {children}
        </div>
      </div>
    </div>
  );
};

const ThemeToggle: React.FC<{isDark: boolean; onToggle: () => void}> = ({ isDark, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="relative inline-flex items-center px-4 py-2 rounded-md border border-white/40 focus:outline-none"
    >
      <span className={`absolute inset-0 rounded-md ${isDark ? 'bg-primary/40' : 'bg-yellow-500/40'}`}></span>
      <span className="relative flex items-center space-x-2">
        {isDark ? (
          <>
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
            <span className="text-white font-medium">Dark Mode</span>
          </>
        ) : (
          <>
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span className="text-white font-medium">Light Mode</span>
          </>
        )}
      </span>
    </button>
  );
};

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();
  const [notification, setNotification] = useState<string | null>(null);
  
  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };
  
  const handleLogout = () => {
    // Placeholder for logout functionality
    showNotification('Logged out successfully');
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };
  
  return (
    <div className="min-h-screen bg-[#0a0d1d]">
      <Navbar />
      
      {/* Main content */}
      <div className="max-w-4xl mx-auto pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        {/* Settings Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-3">Settings</h1>
          <p className="text-white">Manage your account preferences and application settings</p>
        </div>
        
        {/* Settings Cards */}
        <div className="space-y-6">
          {/* Appearance Section */}
          <SettingsCard 
            title="Appearance" 
            description="Customize how EduVision looks on your device"
          >
            <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
          </SettingsCard>
          
          {/* Account Section */}
          <SettingsCard 
            title="Account" 
            description="Manage your account information and security settings"
          >
            <button 
              onClick={() => showNotification('Profile updated successfully')}
              className="px-4 py-2 bg-primary text-white rounded-md text-sm font-bold mr-2 hover:bg-primary/90 transition-colors duration-200"
            >
              Update Profile
            </button>
            <button 
              onClick={handleLogout}
              className="px-4 py-2 bg-transparent text-white rounded-md text-sm font-bold border border-red-500/70 hover:bg-red-500/20 transition-colors duration-200"
            >
              Logout
            </button>
          </SettingsCard>
          
          {/* Notification Section */}
          <SettingsCard 
            title="Notifications" 
            description="Configure how and when you receive notifications"
          >
            <div className="flex items-center">
              <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="relative w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                <span className="ml-3 text-sm font-medium text-white">Email Notifications</span>
              </label>
            </div>
          </SettingsCard>
          
          {/* Privacy Section */}
          <SettingsCard 
            title="Privacy & Security" 
            description="Control your privacy settings and security preferences"
          >
            <button 
              onClick={() => showNotification('Security settings updated')}
              className="px-4 py-2 bg-transparent text-white rounded-md text-sm font-bold border border-white/50 hover:bg-white/10 transition-colors duration-200"
            >
              Change Password
            </button>
          </SettingsCard>
        </div>
        
        {/* Notification Toast */}
        {notification && (
          <div className="fixed bottom-4 right-4 bg-primary/90 text-white px-6 py-3 rounded-lg shadow-lg">
            {notification}
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;

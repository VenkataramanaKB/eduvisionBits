import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Community from './pages/Community';
import Projects from './pages/Projects';
import LandingPage from './pages/LandingPage';
import Recommendations from './pages/Recommendations';
import { AuthProvider, useAuth } from './context/AuthContext';

// Protected route component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f1428]">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  // Redirect to landing if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/landing" replace />;
  }
  
  return <>{children}</>;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="relative min-h-screen bg-[#0f1428] overflow-hidden">
          <Routes>
            {/* Public routes */}
            <Route path="/landing" element={<LandingPage />} />
            
            {/* Protected routes with navbar */}
            <Route path="/*" element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <main>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="profile" element={<Profile />} />
                      <Route path="profile/settings" element={<Settings />} />
                      <Route path="projects" element={<Projects />} />
                      <Route path="community" element={<Community />} />
                      <Route path="recommendations" element={<Recommendations />} />
                      <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                  </main>
                </>
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
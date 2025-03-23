import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import React from "react";
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Community from './pages/Community';
import Projects from './pages/Projects';
import LandingPage from './pages/LandingPage';
import Recommendations from './pages/Recommendations';

const App = () => {
  return (
    <Router>
      <div className="relative min-h-screen bg-[#0f1428] overflow-hidden">
        <Routes>
          {/* Landing page route without navbar */}
          <Route path="/landing" element={<LandingPage />} />
          
          {/* Routes with navbar */}
          <Route
            path="/*"
            element={
              <>
                <Navbar />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/profile/settings" element={<Settings />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/community" element={<Community />} />
                  <Route path="/recommendations" element={<Recommendations />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
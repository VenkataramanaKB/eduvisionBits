import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Community from './pages/Community';

const App = () => {
  return (
    <Router>
      <div className="relative min-h-screen bg-[#0f1428] overflow-hidden">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/profile/settings" element={<Settings/>} />
            <Route path="/community" element={<Community/>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
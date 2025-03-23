import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Simple login that just navigates to home page
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-background-dark">
      {/* Header */}
      <header className="py-6 px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-primary">EduVision</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-4">
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Hero Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Transform Your <span className="text-primary">Educational</span> Journey
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Connect with a community of learners, access cutting-edge resources, and unlock your full potential with EduVision.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                className="bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
                onClick={handleLogin}
              >
                Get Started
              </button>
            </div>
          </motion.div>
          
          {/* Right Column - Login Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-black/30 backdrop-blur-sm rounded-xl border border-gray-600 shadow-lg shadow-black/30 p-8"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Welcome to EduVision</h3>
            <p className="text-gray-300 mb-8">
              Your platform for educational growth and community learning. Join us today to explore a world of knowledge and collaboration.
            </p>
            
            <button
              onClick={handleLogin}
              className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
            >
              Enter Platform
            </button>
            
            <div className="mt-8 text-center">
              <p className="text-gray-400 text-sm">
                By continuing, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </motion.div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="py-8 px-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center text-gray-400 text-sm">
          <p>© 2023 EduVision. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}    
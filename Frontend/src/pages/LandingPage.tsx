import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { loginWithGoogle } from "../services/auth";

export default function LandingPage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Use Google OAuth for login
    loginWithGoogle();
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
                className="bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center gap-2"
                onClick={handleLogin}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032 s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2 C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
                </svg>
                Sign in with Google
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
              className="w-full bg-white hover:bg-gray-100 text-gray-900 font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032 s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2 C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
              </svg>
              Sign in with Google
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
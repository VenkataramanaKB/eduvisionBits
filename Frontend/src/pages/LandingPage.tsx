import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Simulating authentication
    try {
      // Here you would normally make an API call to authenticate
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, just navigate to dashboard
      localStorage.setItem("isLoggedIn", "true");
      navigate("/dashboard");
    } catch (err) {
      setError("Authentication failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
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
              >
                Learn More
              </button>
              <button 
                className="bg-transparent border border-gray-600 hover:border-primary text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Watch Demo
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
            <h3 className="text-2xl font-bold text-white mb-6">Welcome Back</h3>
            
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 text-red-300 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}
            
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  className="w-full bg-black/20 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div>
                <div className="flex justify-between">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                    Password
                  </label>
                  <a href="#" className="text-sm text-primary hover:text-primary-light">
                    Forgot password?
                  </a>
                </div>
                <input
                  type="password"
                  id="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  className="w-full bg-black/20 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter your password"
                  required
                />
              </div>
              
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Logging in...
                    </>
                  ) : (
                    "Log in"
                  )}
                </button>
              </div>
            </form>
            
            <div className="mt-8 text-center">
              <p className="text-gray-400">
                Don't have an account?{" "}
                <a href="#" className="text-primary hover:text-primary-light">
                  Sign up
                </a>
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
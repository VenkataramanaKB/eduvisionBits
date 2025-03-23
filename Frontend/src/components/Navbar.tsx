import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [activeItem, setActiveItem] = useState('Home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = ['Home', 'Projects', 'Community', 'Recommendations'];

  return (
    <nav className="fixed w-full z-50">
      {/* Glass morphism background with subtle gradient border */}
      <div className="absolute inset-0 bg-dark-deeper/60 backdrop-blur-xl border-b border-primary/20"></div>
      
      <div className="max-w-7xl mx-auto relative">
        <div className="flex items-center justify-between h-20 px-6 sm:px-8 lg:px-10">
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex-1"
          >
            <Link to="/" className="flex items-center">
              <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary via-primary-light to-secondary  bg-clip-text">
                EduVision
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation Items */}
          <div className="hidden md:flex items-center justify-center flex-1 space-x-10">
            {/* Home link explicitly pointing to / to load Homepage.tsx */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0, duration: 0.5 }}
            >
              <Link
                to="/"
                className="text-white text-sm font-medium relative group py-2"
                onClick={() => setActiveItem('Home')}
              >
                <span className={`${activeItem === 'Home' ? 'text-white' : 'hover:text-white'} transition-colors duration-300`}>
                  Home
                </span>
                <span className={`absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-primary to-secondary 
                               transition-all duration-300 rounded-full
                               ${activeItem === 'Home' ? 'w-full' : 'w-0 group-hover:w-full'}`}/>
              </Link>
            </motion.div>
            
            {/* Other navigation items */}
            {navItems.slice(1).map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (i + 1) * 0.1, duration: 0.5 }}
              >
                <Link
                  to={item.toLowerCase()}
                  className="text-white text-sm font-medium relative group py-2"
                  onClick={() => setActiveItem(item)}
                >
                  <span className={`${activeItem === item ? 'text-white' : 'hover:text-white'} transition-colors duration-300`}>
                    {item}
                  </span>
                  <span className={`absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-primary to-secondary 
                                   transition-all duration-300 rounded-full
                                   ${activeItem === item ? 'w-full' : 'w-0 group-hover:w-full'}`}/>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3 flex-1 justify-end">
            <div className="relative group">
              <motion.button
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: '0 0 20px rgba(138, 43, 226, 0.5)'
                }}
                whileTap={{ scale: 0.97 }}
                className="px-5 py-2.5 bg-gradient-to-r from-primary to-secondary rounded-lg text-sm font-medium text-white
                         shadow-lg shadow-primary/20 border-2 border-white/20 hover:border-white/40 
                         transition-all duration-300 relative overflow-hidden group flex items-center gap-2"
                onClick={() => window.location.href = "/profile"}
              >
                <span className="relative z-10">Profile</span>
                <svg className="w-5 h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 
                             group-hover:opacity-100 transition-opacity duration-500"></div>
              </motion.button>
              
              {/* Dropdown menu */}
              <div className="absolute right-0 mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                           transition-all duration-300 transform origin-top-right translate-y-2 group-hover:translate-y-0 z-50">
                <div className="py-1 rounded-md bg-dark-deeper/90 backdrop-blur-lg border border-white/20 shadow-xl">
                  {[
                    { name: "Settings", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" },
                    { name: "Logout", icon: "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" }
                  ].map((item, index) => (
                    <Link
                      key={index}
                      to={item.name === "Logout" ? "/logout" : `/profile/${item.name.toLowerCase()}`}
                      className="block px-4 py-2 text-sm text-white hover:bg-primary/20 transition-colors duration-200 flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                      </svg>
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleMobileMenu}
              className="text-white p-2 focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              {!isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="md:hidden absolute w-full bg-dark-deeper/90 backdrop-blur-xl border-b border-primary/10"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 py-5 space-y-3">
              {/* Home link explicitly pointing to / in mobile menu */}
              <Link
                to="/"
                className={`block py-2 px-3 text-base font-medium rounded-md ${
                  activeItem === 'Home'
                  ? 'bg-primary/10 text-white'
                  : 'text-white hover:bg-primary/5 hover:text-white'
                }`}
                onClick={() => {
                  setActiveItem('Home');
                  setIsMobileMenuOpen(false);
                }}
              >
                Home
              </Link>
              
              {/* Other mobile menu items */}
              {navItems.slice(1).map((item) => (
                <Link
                  key={item}
                  to={item.toLowerCase()}
                  className={`block py-2 px-3 text-base font-medium rounded-md ${
                    activeItem === item
                    ? 'bg-primary/10 text-white'
                    : 'text-white hover:bg-primary/5 hover:text-white'
                  }`}
                  onClick={() => {
                    setActiveItem(item);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {item}
                </Link>
              ))}
              
              <div className="pt-4 space-y-2">
                <Link to="/profile" className="w-full py-2.5 px-4 bg-gradient-to-r from-primary to-secondary rounded-md text-sm font-medium text-white shadow-lg flex items-center justify-center gap-2">
                  <span>Profile</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </Link>
                <Link to="/profile/settings" className="w-full py-2.5 px-4 text-white hover:text-white text-sm font-medium transition-all rounded-md hover:bg-white/10 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Settings
                </Link>
                <Link to="/logout" className="w-full py-2.5 px-4 text-white hover:text-white text-sm font-medium transition-all rounded-md hover:bg-white/5 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
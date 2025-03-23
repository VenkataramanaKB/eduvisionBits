import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import Navbar from '../components/Navbar';

const Home = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.from(containerRef.current, {
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });
  }, []);

  // Modern UI elements with proper type annotations
  const glowCircle = (color: string, size: string, position: string, blur: string): React.ReactElement => (
    <div 
      className={`absolute ${position} w-${size} h-${size} rounded-full bg-${color} filter blur-${blur} opacity-100 animate-pulse`} 
      style={{ animationDuration: '8s' }}
    />
  );

  return (
    <div className="min-h-screen bg-[#0a0d1d] overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-[#0a0d1d] overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-radial from-[#0a0d1d] via-[#1c1f3a]/70 to-[#0a0d1d]" />
        
        {/* Glow effects */}
        {glowCircle('primary/60', '1/3', 'top-1/4 -left-1/6', '3xl')}
        {glowCircle('secondary/50', '1/4', 'bottom-10 right-0', '3xl')}
        <div className="absolute top-1/2 left-1/2 w-1/2 h-1/2 bg-primary/30 rounded-full filter blur-[150px] transform -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Import Navbar Component */}
      {/* <Navbar /> */}

      {/* Main Content with Half-Visible Concentric Circles and Content */}
      <div className="relative z-[5] min-h-[90vh] flex items-center mt-30">
        {/* Concentric circles positioned to the right side of the screen */}
        <div ref={containerRef} className="absolute -right-[300px] top-1/2 -translate-y-1/2">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2 }}
            className="relative w-[800px] h-[800px] rounded-full border-4 border-primary/70"
          />
          <motion.div 
            initial={{ opacity: 0, rotate: 45, scale: 0.9 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            transition={{ duration: 2, delay: 0.3 }}
            className="absolute w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-secondary/70"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, delay: 0.6 }}
            className="absolute w-[400px] h-[400px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-primary-light/70"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1.2, type: "spring", stiffness: 200 }}
            className="absolute w-[200px] h-[200px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full 
                     bg-gradient-to-br from-primary/20 to-secondary/20 border-2 border-white/20 backdrop-blur-sm"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-full h-full absolute inset-0"
                >
                  <div className="w-3 h-3 absolute top-0 left-1/2 -translate-x-1/2 bg-primary rounded-full"></div>
                </motion.div>
                {/* <motion.p 
                  className="text-white font-bold text-lg pb-1"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  ELEVATE
                </motion.p>
                <motion.p 
                  className="text-primary-light/90 font-bold text-sm"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                >
                  YOUR VISION
                </motion.p> */}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Left content with catchy phrase */}
        <div className="container mx-auto px-8 md:px-16 z-10">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="mb-3"
            >
              <span className="bg-gradient-to-r from-primary to-secondary px-4 py-1 rounded-full text-white text-sm font-bold uppercase tracking-wide">
                Redefining Learning Path !
              </span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6"
            >
              <span className="text-white block mb-2">Building</span>
              <span className="bg-gradient-to-r from-primary via-primary-light to-secondary  bg-clip-text">
                Digital Presence
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-white/80 text-lg md:text-xl mb-8 max-w-lg"
            >
              Create a powerful online identity and reimagine educational experiences with our innovative platform designed for modern learners and educators.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 10px 25px -5px rgba(138, 43, 226, 0.4)' }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-gradient-to-r from-primary to-secondary rounded-lg font-bold text-white 
                         shadow-lg shadow-primary/30 transition-all duration-300 relative overflow-hidden group
                         border-2 border-white/20 hover:border-white/40"
              >
                <span className="relative z-10">Get Started Now</span>
                <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 
                             group-hover:opacity-100 transition-opacity duration-500"></div>
              </motion.button>
            </motion.div>
            
            {/* Dynamic Feature Highlights */}
            <div className="mt-16">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-6"
              >
                <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/20 blur-2xl"></div>
                <div className="absolute -left-20 -bottom-20 h-40 w-40 rounded-full bg-secondary/20 blur-2xl"></div>
                
                <h3 className="text-xl font-bold text-white mb-4">What Makes Us Different</h3>
                
                <div className="space-y-3">
                  {[
                    { icon: "✨", text: "Intuitive interface designed for creative minds" },
                    { icon: "🚀", text: "Blazing-fast performance with optimized architecture" },
                    { icon: "🔒", text: "Enterprise-grade security without compromises" }
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 1 + (index * 0.1) }}
                      className="flex items-center gap-3"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 text-white">
                        {item.icon}
                      </div>
                      <p className="text-white/80">{item.text}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Section with Cool UI Elements */}
      <div className="relative z-10 py-24 px-8 bg-gradient-to-b from-[#0a0d1d] to-[#121530]">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <span className="inline-block px-4 py-1 bg-white/10 backdrop-blur-sm rounded-full text-primary-light text-sm font-medium mb-4">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Features That <span className="text-primary-light">Set Us Apart</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-4 rounded-full"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Intuitive Design',
                description: 'Effortlessly navigate through our platform with an interface designed for optimal user experience.',
                icon: (
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
                  </svg>
                )
              },
              {
                title: 'Lightning Performance',
                description: 'Experience unmatched speed and efficiency with our optimized backend technology.',
                icon: (
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"></path>
                  </svg>
                )
              },
              {
                title: 'Smart Integration',
                description: 'Seamlessly connect with your favorite tools and platforms for a unified workflow.',
                icon: (
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
                  </svg>
                )
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 * index }}
                whileHover={{ y: -5, boxShadow: '0 10px 30px -5px rgba(138, 43, 226, 0.2)' }}
                className="p-8 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md rounded-2xl border border-white/10 
                         group transition-all duration-300"
              >
                <div className="w-16 h-16 flex items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 
                           text-primary-light mb-6 group-hover:bg-gradient-to-br group-hover:from-primary/30 group-hover:to-secondary/30 
                           transition-all duration-300 border border-white/5">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary-light transition-colors duration-300">{feature.title}</h3>
                <p className="text-white/70 group-hover:text-white/90 transition-colors duration-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Modern Footer */}
      <footer className="relative z-10 py-12 px-8 bg-[#0d0f1a] border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <h3 className="text-white font-bold text-xl mb-4">EduVision's Vision</h3>
            <p className="text-white/60 mb-6">Transforming the way you experience digital learning.</p>
            {/* <div className="flex space-x-4">
              {['facebook', 'twitter', 'instagram', 'linkedin'].map((social, index) => (
                <a key={index} href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 
                                hover:bg-primary/70 hover:text-white transition-colors duration-300">
                  <span className="sr-only">{social}</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10c0 4.237 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.182-.78 1.172-4.97 1.172-4.97s-.299-.6-.299-1.486c0-1.39.806-2.428 1.81-2.428.852 0 1.264.64 1.264 1.408 0 .858-.546 2.14-.828 3.33-.236.995.5 1.807 1.48 1.807 1.778 0 3.144-1.874 3.144-4.58 0-2.393-1.72-4.068-4.177-4.068-2.845 0-4.515 2.135-4.515 4.34 0 .859.331 1.781.745 2.281a.3.3 0 01.069.288l-.278 1.133c-.044.183-.145.223-.335.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.965-.525-2.291-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.522 0 10-4.477 10-10S15.522 0 10 0z" clipRule="evenodd"></path>
                  </svg>
                </a>
              ))}
            </div> */}
          </div>
          
          {/* {['Products', 'Company', 'Support'].map((column, colIndex) => (
            <div key={colIndex}>
              <h4 className="text-white font-semibold mb-4">{column}</h4>
              <ul className="space-y-2">
                {[1, 2, 3, 4].map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <a href="#" className="text-white/60 hover:text-primary-light transition-colors duration-200">
                      {column} Link {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))} */}
        </div>
        
        <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-white/10 text-center">
          <p className="text-white/40 text-sm">
            © 2025 EduVision. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
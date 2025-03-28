import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconContext } from "react-icons";
import { Link, useNavigate } from "react-router-dom";
import {
  FiSearch,
  FiStar,
  FiCheck,
  FiGlobe,
  FiLock,
  FiAward,
  FiList,
  FiArrowRight
} from "react-icons/fi";
import API from "../services/api";

interface RoadmapStep {
  step: string;
  difficulty: string;
}

interface Project {
  title: string;
  description: string;
  difficultyLevel: string;
  techStack: string[];
  roadmap: RoadmapStep[];
}

export default function Recommendations() {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");
  const [results, setResults] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedProjects, setSavedProjects] = useState(new Map());
  const [showSaveNotification, setShowSaveNotification] = useState(false);
  const [savedProjectTitle, setSavedProjectTitle] = useState("");

  const fetchRecommendations = async () => {
    if (!prompt.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await API.projects.generate(prompt);
      setResults(data);
    } catch (err: any) {
      console.error("Error fetching recommendations:", err);
      setError(err.message || "Failed to fetch recommendations. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const saveProject = async (project: Project) => {
    try {
      // Try to save to backend API
      try {
        const savedProject = await API.projects.save(project);
        console.log("Project saved to backend:", savedProject);
      } catch (apiError) {
        console.error("Backend save error (continuing with localStorage):", apiError);
        // Continue even if backend saving fails
      }
      
      // Mark project as saved in UI
      setSavedProjects(new Map(savedProjects).set(project.title, true));
      
      // Save to localStorage for Projects page
      const existingProjects = localStorage.getItem("eduVisionProjects");
      let projectsArray = existingProjects ? JSON.parse(existingProjects) : [];
      
      // Check if project already exists to avoid duplicates
      const projectExists = projectsArray.some((p: any) => p.title === project.title);
      
      if (!projectExists) {
        // Format project for Projects page
        const projectForStorage = {
          title: project.title,
          description: project.description,
          isPublic: true,
          techStack: project.techStack,
          difficultyLevel: project.difficultyLevel,
          roadmap: project.roadmap
        };
        
        // Add new project to array
        projectsArray.push(projectForStorage);
        
        // Save updated projects array to localStorage
        localStorage.setItem("eduVisionProjects", JSON.stringify(projectsArray));
        
        // Show save notification
        setSavedProjectTitle(project.title);
        setShowSaveNotification(true);
        
        // Auto-hide notification after 5 seconds
        setTimeout(() => {
          setShowSaveNotification(false);
        }, 5000);
      }
    } catch (err: any) {
      console.error("Error saving project:", err);
      setError("Failed to save project. Please try again.");
      
      // Auto-hide error after 3 seconds
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  // Navigate to Projects page
  const goToProjects = () => {
    setShowSaveNotification(false);
    navigate('/projects');
  };

  return (
    <IconContext.Provider value={{ className: "react-icons" }}>
      <div className="min-h-screen bg-gradient-to-b from-background to-background-dark text-white">
        <div className="container mx-auto px-6 pt-24 pb-16">
          {/* Header section */}
          <div className="mb-10">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="text-3xl font-bold">Recommendations</h1>
              <div className="w-32 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mt-2"></div>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-gray-400 mt-4 max-w-2xl"
            >
              Get personalized learning project recommendations based on your interests, goals, or skills you want to develop.
            </motion.p>
          </div>

          {/* Search Box */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto mb-12 bg-black/30 backdrop-blur-sm rounded-xl border border-gray-700 p-6"
          >
            <div className="space-y-4">
              <label htmlFor="prompt" className="block text-sm font-medium text-gray-300">
                What would you like to learn?
              </label>
              <div className="relative">
                <input
                  id="prompt"
                  type="text"
                  className="w-full p-4 text-base rounded-lg bg-black/20 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g., 'Full-stack web development with React and Node.js'"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl">
                  <FiSearch />
                </span>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={fetchRecommendations}
                className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 rounded-full border-2 border-t-transparent border-white animate-spin"></div>
                    <span>Generating Roadmap...</span>
                  </>
                ) : (
                  <>
                    <span className="w-5 h-5"><FiAward /></span>
                    <span>Generate Learning Roadmap</span>
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>

          {/* Error Message */}
          {error && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="max-w-3xl mx-auto mb-8 p-6 bg-black/30 backdrop-blur-sm rounded-xl border border-red-500/30 text-red-400"
            >
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{error}</span>
              </div>
            </motion.div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center py-12">
              <div className="w-16 h-16 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
            </div>
          )}

          {/* Results */}
          {!isLoading && results.length > 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8 mt-8 max-w-5xl mx-auto"
            >
              {results.map((project, index) => (
                <motion.div 
                  key={project.title} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-black/30 backdrop-blur-sm rounded-xl border ${
                    savedProjects.has(project.title) 
                      ? "border-primary/50" 
                      : "border-gray-700 hover:border-primary/30"
                  } overflow-hidden transition-all duration-300 shadow-lg`}
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-white">{project.title}</h3>
                      <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className={`p-2 transition-colors rounded-full ${
                          savedProjects.has(project.title)
                            ? "bg-primary/20 text-primary"
                            : "bg-black/20 text-gray-400 hover:text-primary"
                        }`}
                        onClick={() => saveProject(project)}
                        disabled={savedProjects.has(project.title)}
                        title={savedProjects.has(project.title) ? "Project saved" : "Save to my projects"}
                      >
                        {savedProjects.has(project.title) ? (
                          <span className="w-5 h-5 text-primary block"><FiCheck /></span>
                        ) : (
                          <span className="w-5 h-5 block"><FiStar /></span>
                        )}
                      </motion.button>
                    </div>
                    
                    <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mb-3"></div>
                    
                    <p className="text-gray-300 mb-6">{project.description}</p>

                    <div className="flex flex-col md:flex-row md:items-center gap-6 mb-6">
                      <div className="flex items-center gap-2">
                        <span className="text-primary"><FiAward /></span>
                        <span className="text-sm text-gray-300">
                          <span className="text-primary font-medium">Difficulty:</span> {project.difficultyLevel}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech, index) => (
                          <span 
                            key={index} 
                            className="px-3 py-1 bg-black/20 border border-gray-700 text-primary rounded-full text-xs font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-700/50">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-primary"><FiList /></span>
                        <h4 className="font-semibold text-white">Learning Roadmap</h4>
                      </div>
                      <div className="space-y-4">
                        {project.roadmap.map((step, index) => (
                          <div 
                            key={index} 
                            className="flex items-start gap-4 pl-6 relative"
                          >
                            <div className="absolute left-0 top-0 w-4 h-4 rounded-full bg-primary/20 border border-primary flex items-center justify-center">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                            </div>
                            {index < project.roadmap.length - 1 && (
                              <div className="absolute left-2 top-4 w-px h-full bg-primary/20"></div>
                            )}
                            <div className="flex-grow">
                              <p className="text-gray-300 text-sm">{step.step}</p>
                              <p className="text-xs text-primary mt-1">{step.difficulty}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-end mt-6">
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className={`px-4 py-2 ${
                          savedProjects.has(project.title)
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-primary hover:bg-primary-dark"
                        } text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2`}
                        onClick={() => {
                          if (!savedProjects.has(project.title)) {
                            saveProject(project);
                          } else {
                            goToProjects();
                          }
                        }}
                      >
                        {savedProjects.has(project.title) ? (
                          <>
                            <span className="w-4 h-4"><FiCheck /></span>
                            <span>View in Projects</span>
                          </>
                        ) : (
                          <>
                            <span className="w-4 h-4"><FiStar /></span>
                            <span>Save to My Projects</span>
                          </>
                        )}
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Save Success Notification */}
          <AnimatePresence>
            {showSaveNotification && (
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="fixed bottom-6 right-6 bg-green-600/90 backdrop-blur-sm text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 z-50 max-w-md"
              >
                <div className="bg-green-500 rounded-full p-2 flex-shrink-0">
                  <FiCheck className="w-5 h-5" />
                </div>
                <div className="flex-grow">
                  <p className="font-medium">Project Saved!</p>
                  <p className="text-sm opacity-90">"{savedProjectTitle}" added to your projects</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={goToProjects}
                  className="flex items-center gap-1 bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-md ml-3 text-sm font-medium transition-colors"
                >
                  <span>View</span>
                  <FiArrowRight className="w-3.5 h-3.5" />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </IconContext.Provider>
  );
}

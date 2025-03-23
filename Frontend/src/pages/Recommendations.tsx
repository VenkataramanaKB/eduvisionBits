import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiSearch,
  FiStar,
  FiCheck,
  FiGlobe,
  FiLock,
  FiAward,
  FiLayers,
  FiList
} from "react-icons/fi";

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
  const [prompt, setPrompt] = useState("");
  const [results, setResults] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedProjects, setSavedProjects] = useState(new Map());

  const fetchRecommendations = async () => {
    if (!prompt.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      // For demo purposes, using mock data until backend is ready
      // Replace with actual API call when backend is set up
      setTimeout(() => {
        const mockData = generateMockData(prompt);
        setResults(mockData);
        setIsLoading(false);
      }, 1500);
      
      // Uncomment when backend is ready:
      /*
      const response = await fetch("http://localhost:5000/api/projects/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch recommendations");
      }

      const data = await response.json();
      setResults(data);
      */
    } catch (err: any) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const saveProject = async (project: Project) => {
    try {
      // For demo purposes, just update the local state
      // Replace with actual API call when backend is ready
      setSavedProjects(new Map(savedProjects).set(project.title, true));
      
      // Uncomment when backend is ready:
      /*
      const response = await fetch("http://localhost:5000/api/projects/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
      });
      
      if (!response.ok) {
        throw new Error("Failed to save project");
      }
      
      const savedProject = await response.json();
      setSavedProjects(new Map(savedProjects).set(savedProject.title, true));
      */
    } catch (err) {
      console.error("Error saving project:", err);
    }
  };

  // Function to generate mock data based on the prompt
  const generateMockData = (prompt: string): Project[] => {
    const topics = prompt.toLowerCase().split(/[\s,]+/);
    
    const mockProjects: Project[] = [
      {
        title: `${topics[0].charAt(0).toUpperCase() + topics[0].slice(1)} Learning Path`,
        description: `A comprehensive learning journey focused on ${topics.join(", ")} to help you master essential concepts and practical applications.`,
        difficultyLevel: "Intermediate",
        techStack: topics.map(t => t.charAt(0).toUpperCase() + t.slice(1)).concat(["HTML", "CSS", "JavaScript"]),
        roadmap: [
          { step: "Fundamentals & Setup", difficulty: "Beginner" },
          { step: "Building Core Components", difficulty: "Intermediate" },
          { step: "Advanced Techniques", difficulty: "Advanced" },
          { step: "Integration & Deployment", difficulty: "Intermediate" }
        ]
      },
      {
        title: `Interactive ${topics[Math.min(topics.length - 1, 1)].charAt(0).toUpperCase() + topics[Math.min(topics.length - 1, 1)].slice(1)} Project`,
        description: `Create an engaging and interactive application that showcases your skills in ${topics.join(", ")}.`,
        difficultyLevel: "Advanced",
        techStack: topics.map(t => t.charAt(0).toUpperCase() + t.slice(1)).concat(["React", "TypeScript", "API Integration"]),
        roadmap: [
          { step: "Project Planning & Architecture", difficulty: "Intermediate" },
          { step: "UI/UX Design Implementation", difficulty: "Intermediate" },
          { step: "Backend Integration", difficulty: "Advanced" },
          { step: "Testing & Optimization", difficulty: "Advanced" },
          { step: "Deployment & Monitoring", difficulty: "Intermediate" }
        ]
      },
      {
        title: `${topics[Math.min(topics.length - 1, 2)].charAt(0).toUpperCase() + topics[Math.min(topics.length - 1, 2)].slice(1)} Portfolio Showcase`,
        description: `Build a portfolio project that demonstrates your expertise in ${topics.slice(0, 3).join(", ")}.`,
        difficultyLevel: "Beginner to Intermediate",
        techStack: topics.map(t => t.charAt(0).toUpperCase() + t.slice(1)).slice(0, 3).concat(["Git", "Responsive Design"]),
        roadmap: [
          { step: "Requirements Analysis", difficulty: "Beginner" },
          { step: "Basic Structure Implementation", difficulty: "Beginner" },
          { step: "Core Functionality Development", difficulty: "Intermediate" },
          { step: "Refinement & Polish", difficulty: "Intermediate" }
        ]
      }
    ];
    
    return mockProjects;
  };

  return (
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
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl">
                <FiSearch />
              </div>
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
                  <div className="w-5 h-5">
                    <FiAward />
                  </div>
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
                className="bg-black/30 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-primary/50 overflow-hidden transition-all duration-300 shadow-lg"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-white">{project.title}</h3>
                    <motion.button 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 text-gray-400 hover:text-primary transition-colors bg-black/20 rounded-full"
                      onClick={() => saveProject(project)}
                    >
                      {savedProjects.has(project.title) ? (
                        <div className="w-5 h-5 text-primary">
                          <FiCheck />
                        </div>
                      ) : (
                        <div className="w-5 h-5">
                          <FiStar />
                        </div>
                      )}
                    </motion.button>
                  </div>
                  
                  <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mb-3"></div>
                  
                  <p className="text-gray-300 mb-6">{project.description}</p>

                  <div className="flex flex-col md:flex-row md:items-center gap-6 mb-6">
                    <div className="flex items-center gap-2">
                      <div className="text-primary">
                        <FiAward />
                      </div>
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
                      <div className="text-primary">
                        <FiList />
                      </div>
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
                      className="px-4 py-2 bg-primary hover:bg-primary-dark text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
                      onClick={() => saveProject(project)}
                    >
                      {savedProjects.has(project.title) ? (
                        <>
                          <div className="w-4 h-4">
                            <FiCheck />
                          </div>
                          <span>Saved to Projects</span>
                        </>
                      ) : (
                        <>
                          <div className="w-4 h-4">
                            <FiStar />
                          </div>
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
      </div>
    </div>
  );
}

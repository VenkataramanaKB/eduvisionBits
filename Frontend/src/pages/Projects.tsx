import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ProjectCard from "../components/ProjectCard";

interface RoadmapStep {
  step: string;
  difficulty: string;
}

interface Project {
  title: string;
  description: string;
  isPublic: boolean;
  techStack?: string[];
  difficultyLevel?: string;
  roadmap?: RoadmapStep[];
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newProject, setNewProject] = useState({ title: "", description: "", isPublic: true });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch saved projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // For development, using localStorage as a temporary storage solution
        // In production, replace with actual API call
        const savedProjects = localStorage.getItem("eduVisionProjects");
        
        if (savedProjects) {
          setProjects(JSON.parse(savedProjects));
        } else {
          // Demo data if no projects exist
          const demoProjects = [
            {
              title: "Machine Learning Basics",
              description: "An introduction to fundamental ML concepts with practical examples",
              isPublic: true
            },
            {
              title: "Data Visualization",
              description: "Learning to create effective data visualizations using modern tools",
              isPublic: false
            },
            {
              title: "Web Development Portfolio",
              description: "A collection of web projects showcasing different technologies",
              isPublic: true
            }
          ];
          setProjects(demoProjects);
          localStorage.setItem("eduVisionProjects", JSON.stringify(demoProjects));
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Remove project from state and storage
  const handleRemove = (title: string) => {
    const updatedProjects = projects.filter(project => project.title !== title);
    setProjects(updatedProjects);
    localStorage.setItem("eduVisionProjects", JSON.stringify(updatedProjects));
  };

  // Toggle project visibility
  const handleToggleVisibility = (title: string) => {
    const updatedProjects = projects.map(project => 
      project.title === title 
        ? { ...project, isPublic: !project.isPublic } 
        : project
    );
    setProjects(updatedProjects);
    localStorage.setItem("eduVisionProjects", JSON.stringify(updatedProjects));
  };

  // Add new project
  const handleAddProject = () => {
    if (newProject.title.trim() === "" || newProject.description.trim() === "") {
      return;
    }
    
    const updatedProjects = [...projects, newProject];
    setProjects(updatedProjects);
    localStorage.setItem("eduVisionProjects", JSON.stringify(updatedProjects));
    setNewProject({ title: "", description: "", isPublic: true });
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background-dark text-white">
      <div className="container mx-auto px-6 pt-24 pb-16">
        {/* Header section */}
        <div className="mb-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex justify-between items-center"
          >
            <h1 className="text-3xl font-bold">Projects</h1>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
              onClick={() => setIsModalOpen(true)}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path 
                  fillRule="evenodd" 
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" 
                  clipRule="evenodd" 
                />
              </svg>
              New Project
            </motion.button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="w-32 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mt-2"></div>
            <p className="text-gray-400 mt-4 max-w-2xl">
              Create and manage your educational projects. Share your knowledge with the community or keep it private for personal use.
            </p>
          </motion.div>
        </div>

        {/* Projects content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-14 h-14 rounded-full border-2 border-t-transparent border-primary animate-spin mb-4"></div>
            <p className="text-gray-400">Loading your projects...</p>
          </div>
        ) : error ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-black/30 backdrop-blur-sm rounded-xl border border-red-500/30 p-6 text-center"
          >
            <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-medium text-red-400 mb-2">Error Loading Projects</h3>
            <p className="text-gray-400">{error}</p>
          </motion.div>
        ) : (
          <div className="mt-8">
            {projects.length > 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {projects.map((project, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <ProjectCard 
                      title={project.title} 
                      description={project.description} 
                      onRemove={handleRemove}
                      isPublic={project.isPublic}
                      onToggleVisibility={handleToggleVisibility}
                      techStack={project.techStack}
                      difficultyLevel={project.difficultyLevel}
                      roadmap={project.roadmap}
                    />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-black/30 backdrop-blur-sm rounded-xl border border-gray-700 p-12 text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-white mb-2">No Projects Yet</h3>
                <p className="text-gray-400 mb-6">Start by creating your first project to organize your educational content.</p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-5 py-2.5 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors duration-200"
                >
                  Create Your First Project
                </button>
              </motion.div>
            )}
          </div>
        )}
      </div>

      {/* Modal for creating new project */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-background-dark border border-gray-700 rounded-xl p-6 max-w-md w-full shadow-xl"
          >
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold text-white">Create New Project</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label htmlFor="projectTitle" className="block text-sm font-medium text-gray-300 mb-1">
                  Project Title
                </label>
                <input
                  type="text"
                  id="projectTitle"
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  className="w-full bg-black/20 border border-gray-700 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter project title"
                />
              </div>
              <div>
                <label htmlFor="projectDescription" className="block text-sm font-medium text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  id="projectDescription"
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  className="w-full bg-black/20 border border-gray-700 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter project description"
                  rows={3}
                />
              </div>
              <div className="flex items-center bg-black/10 p-3 rounded-lg">
                <input
                  type="checkbox"
                  id="isPublic"
                  checked={newProject.isPublic}
                  onChange={(e) => setNewProject({ ...newProject, isPublic: e.target.checked })}
                  className="w-4 h-4 text-primary bg-gray-700 border-gray-600 rounded focus:ring-primary focus:ring-2"
                />
                <label htmlFor="isPublic" className="ml-2 text-sm font-medium text-gray-300">
                  Make project public
                </label>
                <span className="ml-auto text-xs text-gray-400">Public projects can be seen by all users</span>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddProject}
                  className="bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Create Project
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
} 
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";

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

export default function ProjectDetails() {
  const { projectTitle } = useParams<{ projectTitle: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        // Get projects from localStorage
        const savedProjects = localStorage.getItem("eduVisionProjects");
        if (savedProjects) {
          const projects = JSON.parse(savedProjects);
          const projectFound = projects.find((p: Project) => p.title === decodeURIComponent(projectTitle || ""));
          
          if (projectFound) {
            setProject(projectFound);
          } else {
            setError("Project not found");
          }
        } else {
          setError("No projects found");
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectTitle]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background-dark text-white">
      <div className="container mx-auto px-6 pt-24 pb-16">
        {/* Header with back button */}
        <div className="mb-8">
          <Link to="/projects">
            <motion.button
              whileHover={{ x: -3 }}
              className="flex items-center text-gray-400 hover:text-primary mb-4"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Projects
            </motion.button>
          </Link>
        </div>

        {/* Project content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-14 h-14 rounded-full border-2 border-t-transparent border-primary animate-spin mb-4"></div>
            <p className="text-gray-400">Loading project details...</p>
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
            <h3 className="text-xl font-medium text-red-400 mb-2">Error Loading Project</h3>
            <p className="text-gray-400">{error}</p>
          </motion.div>
        ) : project ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="bg-black/30 backdrop-blur-sm rounded-xl border border-gray-700 p-8">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
                <div>
                  <motion.h1 
                    className="text-3xl font-bold mb-2"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {project.title}
                  </motion.h1>
                  <div className="w-32 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mb-4"></div>
                  <p className="text-gray-300 max-w-2xl">{project.description}</p>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  {project.isPublic && (
                    <span className="px-3 py-1 bg-green-600/30 border border-green-600/50 text-green-400 rounded-full text-sm">
                      Public
                    </span>
                  )}
                  {!project.isPublic && (
                    <span className="px-3 py-1 bg-gray-600/30 border border-gray-600/50 text-gray-400 rounded-full text-sm">
                      Private
                    </span>
                  )}
                  {project.difficultyLevel && (
                    <span className="px-3 py-1 bg-primary/20 border border-primary/50 text-primary rounded-full text-sm">
                      {project.difficultyLevel}
                    </span>
                  )}
                </div>
              </div>
              
              {/* Tech Stack */}
              {project.techStack && project.techStack.length > 0 && (
                <div className="mb-10">
                  <h2 className="text-xl font-semibold mb-4">Tech Stack</h2>
                  <div className="flex flex-wrap gap-3">
                    {project.techStack.map((tech, index) => (
                      <span 
                        key={index} 
                        className="px-4 py-2 bg-black/50 border border-gray-700 text-primary rounded-lg text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Roadmap */}
              {project.roadmap && project.roadmap.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">Learning Roadmap</h2>
                  <div className="space-y-6">
                    {project.roadmap.map((step, index) => (
                      <motion.div 
                        key={index} 
                        className="relative pl-8"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-primary/20 border border-primary flex items-center justify-center">
                          <span className="text-sm text-primary font-medium">{index + 1}</span>
                        </div>
                        {index < project.roadmap!.length - 1 && (
                          <div className="absolute left-3 top-6 w-px h-full bg-primary/20"></div>
                        )}
                        <div className="bg-black/20 border border-gray-700 rounded-lg p-4">
                          <h3 className="text-white font-medium mb-2">{step.step}</h3>
                          <div className={`inline-block px-2 py-1 rounded text-xs ${
                            step.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                            step.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-red-500/20 text-red-400'
                          }`}>
                            {step.difficulty}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* If no roadmap is available */}
              {(!project.roadmap || project.roadmap.length === 0) && (
                <div className="bg-black/20 border border-gray-700 rounded-lg p-8 text-center">
                  <svg className="w-12 h-12 text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <h3 className="text-xl font-medium text-white mb-2">No Roadmap Available</h3>
                  <p className="text-gray-400 mb-6">This project doesn't have a roadmap defined yet.</p>
                </div>
              )}
            </div>
          </motion.div>
        ) : null}
      </div>
    </div>
  );
}

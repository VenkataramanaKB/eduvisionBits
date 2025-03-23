import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

interface Project {
  id: string;
  name: string;
  description: string;
  items?: string[];
}

export default function Community() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProject, setNewProject] = useState({ name: "", description: "" });
  const [currentProject, setCurrentProject] = useState<string | null>(null);
  const [newItem, setNewItem] = useState("");
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);

  const handleAddProject = () => {
    if (newProject.name.trim() === "" || newProject.description.trim() === "") {
      return;
    }

    const project: Project = {
      id: Date.now().toString(),
      name: newProject.name,
      description: newProject.description,
      items: []
    };

    setProjects([...projects, project]);
    setNewProject({ name: "", description: "" });
    setIsModalOpen(false);
  };

  const handleDeleteProject = (id: string) => {
    setProjects(projects.filter(project => project.id !== id));
  };

  const handleAddItem = () => {
    if (!currentProject || newItem.trim() === "") return;
    
    setProjects(projects.map(project => {
      if (project.id === currentProject) {
        return {
          ...project,
          items: [...(project.items || []), newItem]
        };
      }
      return project;
    }));
    
    setNewItem("");
    setIsItemModalOpen(false);
    setCurrentProject(null);
  };

  const openAddItemModal = (projectId: string) => {
    setCurrentProject(projectId);
    setIsItemModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background-dark text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8 pt-20">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Community Projects</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
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
            Add Project
          </button>
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-black/30 backdrop-blur-sm rounded-xl border border-gray-600 shadow-lg shadow-black/30 p-6 flex flex-col"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-white">{project.name}</h3>
                <div className="flex gap-2">
                  <button 
                    onClick={() => openAddItemModal(project.id)}
                    className="p-1.5 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg transition-colors"
                    title="Add item"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                  <button 
                    onClick={() => handleDeleteProject(project.id)}
                    className="p-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
                    title="Delete project"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
              <p className="text-gray-300 mb-4">{project.description}</p>
              
              {/* Project items */}
              {project.items && project.items.length > 0 && (
                <div className="mt-2">
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Items:</h4>
                  <ul className="space-y-1.5">
                    {project.items.map((item, index) => (
                      <li key={index} className="bg-black/20 rounded p-2 text-sm text-gray-300">{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Empty state */}
        {projects.length === 0 && (
          <div className="text-center py-12 bg-black/20 backdrop-blur-sm rounded-xl border border-gray-600 shadow-lg shadow-black/30">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            <h3 className="mt-2 text-xl font-medium text-gray-200">No projects yet</h3>
            <p className="mt-1 text-gray-400">Get started by adding your first project</p>
          </div>
        )}

        {/* Modal for adding new project */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-background-dark border border-gray-700 rounded-xl p-6 max-w-md w-full mx-4 shadow-xl"
            >
              <h2 className="text-xl font-bold mb-4">Add New Project</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="projectName" className="block text-sm font-medium text-gray-300 mb-1">
                    Project Name
                  </label>
                  <input
                    type="text"
                    id="projectName"
                    value={newProject.name}
                    onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                    className="w-full bg-black/20 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter project name"
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
                    className="w-full bg-black/20 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter project description"
                    rows={3}
                  />
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
                    className="bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                  >
                    Add Project
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Modal for adding item to a project */}
        {isItemModalOpen && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-background-dark border border-gray-700 rounded-xl p-6 max-w-md w-full mx-4 shadow-xl"
            >
              <h2 className="text-xl font-bold mb-4">Add Item to Project</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="itemName" className="block text-sm font-medium text-gray-300 mb-1">
                    Item Name
                  </label>
                  <input
                    type="text"
                    id="itemName"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    className="w-full bg-black/20 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter item name"
                  />
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    onClick={() => {
                      setIsItemModalOpen(false);
                      setCurrentProject(null);
                    }}
                    className="px-4 py-2 text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddItem}
                    className="bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                  >
                    Add Item
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
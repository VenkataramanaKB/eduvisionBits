import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface RoadmapStep {
  step: string;
  difficulty: string;
}

interface ProjectCardProps {
  title: string;
  description: string;
  onRemove: (title: string) => void;
  isPublic: boolean;
  onToggleVisibility: (title: string) => void;
  techStack?: string[];
  difficultyLevel?: string;
  roadmap?: RoadmapStep[];
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  onRemove,
  isPublic,
  onToggleVisibility,
  techStack,
  difficultyLevel,
  roadmap
}) => {
  return (
    <motion.div
      className="bg-black/30 backdrop-blur-md rounded-xl border border-gray-700 hover:border-primary/50 shadow-lg overflow-hidden h-full w-full transition-all duration-300"
      whileHover={{ 
        boxShadow: "0 10px 25px -5px rgba(var(--color-primary-rgb), 0.2)",
        translateY: -5
      }}
    >
      <div className="p-6 flex flex-col h-full">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <div className="flex items-center gap-2">
            {difficultyLevel && (
              <span className="px-2 py-1 text-xs rounded-full bg-primary/80 text-white">
                {difficultyLevel}
              </span>
            )}
            <motion.button
              className={`px-2 py-1 text-xs rounded-full transition-colors ${
                isPublic
                  ? "bg-green-600/80 hover:bg-green-500"
                  : "bg-gray-600/80 hover:bg-gray-500"
              } text-white`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onToggleVisibility(title)}
            >
              {isPublic ? "Public" : "Private"}
            </motion.button>
          </div>
        </div>

        <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mb-3"></div>
        
        <p className="text-gray-300 text-sm mb-4 flex-grow">{description}</p>
        
        {/* Tech Stack */}
        {techStack && techStack.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2 mt-2">
              {techStack.map((tech, index) => (
                <span 
                  key={index} 
                  className="px-2 py-1 bg-black/30 border border-gray-700 text-primary rounded-full text-xs font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-3 mt-auto pt-4 border-t border-gray-700/50">
          {/* View More Button */}
          <Link to={`/projects/${encodeURIComponent(title)}`} className="flex-1">
            <motion.button
              className="w-full px-3 py-2 text-sm bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors shadow-sm shadow-primary/20"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                View Details
              </div>
            </motion.button>
          </Link>

          {/* Remove Button */}
          <motion.button
            className="flex-1 px-3 py-2 text-sm bg-transparent border border-red-500/50 hover:bg-red-500/10 text-red-400 font-medium rounded-lg transition-colors"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onRemove(title)}
          >
            <div className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Remove
            </div>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;

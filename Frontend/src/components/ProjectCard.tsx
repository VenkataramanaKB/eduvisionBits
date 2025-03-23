import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface ProjectCardProps {
  title: string;
  description: string;
  onRemove: (title: string) => void;
  isPublic: boolean;
  onToggleVisibility: (title: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  onRemove,
  isPublic,
  onToggleVisibility,
}) => {
  return (
    <div className="p-2">
      <motion.div
        className="relative bg-opacity-10 backdrop-blur-md shadow-xl rounded-2xl p-6 w-80 h-56 flex flex-col justify-between transition-transform duration-300 border border-cyan-400/30 hover:scale-[1.02] hover:shadow-cyan-500/50"
        whileHover={{ rotateY: 3, rotateX: 3 }}
      >
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-cyan-400 drop-shadow-lg">
            {title}
          </h3>
          <motion.button
            className={`px-2 py-1 text-xs rounded-full ${
              isPublic
                ? "bg-green-500 hover:bg-green-600"
                : "bg-gray-500 hover:bg-gray-600"
            } text-white`}
            whileHover={{ scale: 1.05 }}
            onClick={() => onToggleVisibility(title)}
          >
            {isPublic ? "Public" : "Private"}
          </motion.button>
        </div>
        <p className="text-gray-300 text-xs mt-2 flex-grow">{description}</p>

        <div className="flex gap-3 mt-4">
          {/* View More Button */}
          <Link to={`/projects/${encodeURIComponent(title)}`} className="w-1/2">
            <motion.button
              className="w-full px-3 py-2 text-sm bg-cyan-500 text-black font-medium rounded-md transition-all hover:shadow-lg hover:bg-cyan-400 focus:outline-none"
              whileHover={{ scale: 1.05 }}
            >
              View More
            </motion.button>
          </Link>

          {/* Remove Button */}
          <motion.button
            className="w-1/2 px-3 py-2 text-sm bg-red-600 text-black font-medium rounded-md transition-all hover:shadow-lg hover:bg-red-500 focus:outline-none"
            whileHover={{ scale: 1.05 }}
            onClick={() => onRemove(title)}
          >
            Remove
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectCard;

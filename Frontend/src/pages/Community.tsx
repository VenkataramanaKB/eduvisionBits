import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

// Define the Document interface to fix type errors
interface Document {
  id: string;
  title: string;
  description: string;
  author: string;
  tags: string[];
  createdAt: string;
  stars: number;
  forks: number;
  isStarred?: boolean;
  isForked?: boolean;
}

// DocumentsTable component
const DocumentsTable = ({ documents, onStarClick, onForkClick }: {
  documents: Document[];
  onStarClick: (docId: string) => void;
  onForkClick: (docId: string) => void;
}) => {
  return (
    <div className="overflow-x-auto bg-black/20 backdrop-blur-sm rounded-xl border border-gray-700">
      <table className="min-w-full divide-y divide-gray-700">
        <thead>
          <tr>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Project</th>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Author</th>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Tags</th>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Created</th>
            <th className="py-3 px-4 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {documents.map((doc) => (
            <tr key={doc.id} className="hover:bg-black/30 transition-colors duration-200">
              <td className="py-4 px-4">
                <div>
                  <div className="font-medium text-white">{doc.title}</div>
                  <div className="text-sm text-gray-400">{doc.description}</div>
                </div>
              </td>
              <td className="py-4 px-4 text-sm text-gray-300">{doc.author}</td>
              <td className="py-4 px-4">
                <div className="flex flex-wrap gap-1">
                  {doc.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary/20 text-primary-light"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </td>
              <td className="py-4 px-4 text-sm text-gray-300">{doc.createdAt}</td>
              <td className="py-4 px-4 text-sm text-gray-300 text-center">
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => onStarClick(doc.id)}
                    className="flex items-center gap-1 text-gray-400 hover:text-yellow-400 transition-colors duration-200"
                  >
                    <svg
                      className={`w-5 h-5 ${
                        doc.isStarred ? "text-yellow-400 fill-yellow-400" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                      />
                    </svg>
                    <span>{doc.stars}</span>
                  </button>
                  <button
                    onClick={() => onForkClick(doc.id)}
                    className="flex items-center gap-1 text-gray-400 hover:text-cyan-400 transition-colors duration-200"
                  >
                    <svg
                      className={`w-5 h-5 ${
                        doc.isForked ? "text-cyan-400" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                      />
                    </svg>
                    <span>{doc.forks}</span>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// FeaturedProject component
const FeaturedProject = ({ project }: { project: Document }) => {
  return (
    <div className="bg-black/20 backdrop-blur-sm rounded-xl border border-primary/30 p-6 flex flex-col h-full">
      <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
      <p className="text-gray-300 mb-3">{project.description}</p>
      <div className="flex flex-wrap gap-1 mb-4">
        {project.tags.map((tag, index) => (
          <span
            key={index}
            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary/20 text-primary-light"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="flex items-center text-sm text-gray-400 mt-auto">
        <span className="flex items-center mr-4">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
          {project.stars}
        </span>
        <span className="flex items-center mr-4">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
          </svg>
          {project.forks}
        </span>
        <span className="ml-auto text-gray-400">{project.author}</span>
      </div>
    </div>
  );
};

export default function Community() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [featuredProjects, setFeaturedProjects] = useState<Document[]>([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        // First try to fetch from the client/public folder
        const response = await fetch("/community.json");
        
        if (!response.ok) {
          console.error(`Failed fetch status: ${response.status} ${response.statusText}`);
          throw new Error(`Failed to fetch documents: ${response.status} ${response.statusText}`);
        }
        
        // Check if we got JSON or HTML (in case of server error pages)
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          console.error("Non-JSON response received:", contentType);
          const text = await response.text();
          console.error("Response content:", text.substring(0, 200) + "..."); // Log first 200 chars
          throw new Error("Invalid response format. Expected JSON but received HTML or other format.");
        }
        
        // Parse the JSON response
        let data;
        try {
          data = await response.json();
        } catch (parseError) {
          console.error("JSON parse error:", parseError);
          throw new Error("Failed to parse response as JSON");
        }
        
        // Ensure the expected data structure exists
        if (!data || !data.documents || !Array.isArray(data.documents)) {
          throw new Error("Invalid data format: missing documents array");
        }

        const savedStates = JSON.parse(
          localStorage.getItem("documentStates") || "{}"
        );

        // Create hardcoded data if fetch fails
        const documentsWithStates = data.documents.map((doc: Document) => ({
          ...doc,
          isStarred: savedStates[doc.id]?.isStarred || false,
          isForked: savedStates[doc.id]?.isForked || false,
          stars: savedStates[doc.id]?.stars || doc.stars || 0,
          forks: savedStates[doc.id]?.forks || doc.forks || 0,
        }));

        setDocuments(documentsWithStates);
        
        // Set featured projects (top 3 by stars)
        const featured = [...documentsWithStates]
          .sort((a, b) => b.stars - a.stars)
          .slice(0, 3);
        setFeaturedProjects(featured);
      } catch (err: any) {
        console.error("Error fetching community data:", err);
        setError(err.message);
        
        // Use hardcoded data as fallback
        const fallbackData = getFallbackData();
        setDocuments(fallbackData);
        
        // Set featured projects from fallback data
        const featured = [...fallbackData]
          .sort((a, b) => b.stars - a.stars)
          .slice(0, 3);
        setFeaturedProjects(featured);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);
  
  // Fallback data function in case JSON fetch fails
  const getFallbackData = (): Document[] => {
    return [
      {
        id: "comm1",
        title: "Virtual Study Groups",
        description: "Platform for forming and managing virtual study groups across different time zones",
        author: "Lisa Taylor",
        tags: ["Collaboration", "Remote Learning", "Study Groups"],
        createdAt: "2023-04-12",
        stars: 356,
        forks: 84,
        isStarred: false,
        isForked: false
      },
      {
        id: "comm2",
        title: "Teacher Resource Exchange",
        description: "Community-driven marketplace for teachers to share and trade educational resources",
        author: "Michael Rivera",
        tags: ["Teaching", "Resources", "Sharing Economy"],
        createdAt: "2023-05-28",
        stars: 412,
        forks: 97,
        isStarred: false,
        isForked: false
      },
      {
        id: "comm3",
        title: "Student Mentorship Network",
        description: "Connecting students with industry professionals for career guidance and mentorship",
        author: "Hannah Wong",
        tags: ["Mentorship", "Career Development", "Networking"],
        createdAt: "2023-06-15",
        stars: 289,
        forks: 43,
        isStarred: false,
        isForked: false
      },
      {
        id: "comm4",
        title: "Global Classroom Connect",
        description: "Platform for connecting classrooms globally for cultural exchange and collaborative projects",
        author: "Robert Johnson",
        tags: ["Cultural Exchange", "Global Education", "Collaboration"],
        createdAt: "2023-07-21",
        stars: 378,
        forks: 102,
        isStarred: false,
        isForked: false
      },
      {
        id: "comm5",
        title: "Academic Conference Hub",
        description: "Virtual conference platform specialized for academic gatherings and presentations",
        author: "Priya Sharma",
        tags: ["Conferences", "Academic", "Virtual Events"],
        createdAt: "2023-08-08",
        stars: 203,
        forks: 35,
        isStarred: false,
        isForked: false
      }
    ];
  };

  useEffect(() => {
    const states = documents.reduce(
      (acc, doc) => ({
        ...acc,
        [doc.id]: {
          isStarred: doc.isStarred,
          isForked: doc.isForked,
          stars: doc.stars,
          forks: doc.forks,
        },
      }),
      {}
    );

    localStorage.setItem("documentStates", JSON.stringify(states));
  }, [documents]);

  const filteredDocuments = documents.filter(
    (doc) =>
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const handleStarClick = async (docId: string) => {
    try {
      const updatedDocuments = documents.map((doc) =>
        doc.id === docId
          ? {
              ...doc,
              stars: doc.isStarred ? doc.stars - 1 : doc.stars + 1,
              isStarred: !doc.isStarred,
            }
          : doc
      );
      setDocuments(updatedDocuments);
      
      // Update featured projects when stars change
      const updated = [...updatedDocuments]
        .sort((a, b) => b.stars - a.stars)
        .slice(0, 3);
      setFeaturedProjects(updated);
    } catch (err) {
      console.error("Error updating stars:", err);
    }
  };

  const handleForkClick = async (docId: string) => {
    try {
      const updatedDocuments = documents.map((doc) =>
        doc.id === docId
          ? {
              ...doc,
              forks: doc.isForked ? doc.forks - 1 : doc.forks + 1,
              isForked: !doc.isForked,
            }
          : doc
      );
      setDocuments(updatedDocuments);
    } catch (err) {
      console.error("Error updating forks:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#0B1120] via-[#131B2E] to-[#0B1120]">
      <Navbar />
      
      <div className="max-w-7xl mx-auto pt-24 px-8 pb-12">
        <div className="mb-8">
          <motion.h1
            className="text-4xl font-bold bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Community Hub
          </motion.h1>
          <motion.p 
            className="text-gray-300 mb-8 max-w-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Join our thriving community of educators, learners, and innovators. Discover collaborative projects, 
            contribute your expertise, or start something new. Together, we're reshaping the future of education.
          </motion.p>
          
          {/* Featured Projects Section */}
          {!loading && !error && (
            <motion.div
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">Featured Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {featuredProjects.map((project) => (
                  <FeaturedProject key={project.id} project={project} />
                ))}
              </div>
            </motion.div>
          )}
          
          <div className="relative">
            <input
              type="text"
              placeholder="Search projects by title, description, author, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 bg-black/30 backdrop-blur-sm text-white rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder-gray-400
                       border border-gray-700"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <motion.div
              className="w-12 h-12 rounded-full border-2 border-cyan-400 border-t-transparent"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </div>
        ) : error ? (
          <motion.div className="text-red-400 text-center p-4 bg-red-400/10 rounded-lg border border-red-500/50">
            {error}
          </motion.div>
        ) : filteredDocuments.length > 0 ? (
          <>
            <motion.h2 
              className="text-2xl font-bold text-white mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              All Projects
            </motion.h2>
            <DocumentsTable
              documents={filteredDocuments}
              onStarClick={handleStarClick}
              onForkClick={handleForkClick}
            />
          </>
        ) : (
          <motion.div className="text-center text-gray-400 p-8 bg-gray-800/30 rounded-lg">
            No projects found matching your search criteria.
          </motion.div>
        )}
      </div>
    </div>
  );
}
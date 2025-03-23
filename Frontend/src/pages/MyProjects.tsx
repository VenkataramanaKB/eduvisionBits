import { useState, useEffect } from "react";
import ProjectCard from "../components/ProjectCard";

export default function MyProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [publicDocuments, setPublicDocuments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [projectsRes, docsRes] = await Promise.allSettled([
          fetch("http://localhost:5000/api/projects/saved"),
          fetch("/documents.json"),
        ]);

        const projectsData = projectsRes.status === "fulfilled" ? await projectsRes.value.json() : [];
        const documentsData = docsRes.status === "fulfilled" ? await docsRes.value.json() : { documents: [] };

        const publicTitles = new Set(documentsData.documents.map((doc) => doc.title));
        const projectsWithVisibility = projectsData.map((project) => ({
          ...project,
          isPublic: publicTitles.has(project.title),
        }));

        setProjects(projectsWithVisibility);
        setPublicDocuments(documentsData.documents);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleRemove = (title) => {
    setProjects((prev) => prev.filter((project) => project.title !== title));
  };

  const handleToggleVisibility = async (title) => {
    setProjects((prev) =>
      prev.map((p) => (p.title === title ? { ...p, isPublic: !p.isPublic } : p))
    );

    try {
      await fetch(`http://localhost:5000/api/projects/${title}/visibility`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublic: !projects.find((p) => p.title === title)?.isPublic }),
      });
    } catch (err) {
      console.error("Failed to update visibility:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900 p-10 flex flex-wrap gap-6 justify-center rounded-2xl">
      {loading ? (
        <p className="text-white text-xl">Loading saved projects...</p>
      ) : error ? (
        <p className="text-red-400 text-xl">{error}</p>
      ) : projects.length > 0 ? (
        projects.map((project, index) => (
          <ProjectCard
            key={index}
            title={project.title}
            description={project.description}
            isPublic={project.isPublic}
            onRemove={handleRemove}
            onToggleVisibility={handleToggleVisibility}
          />
        ))
      ) : (
        <p className="text-white text-xl">No saved projects yet.</p>
      )}
    </div>
  );
}
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Search, Filter, Grid, List, TrendingUp } from "lucide-react";
import ProjectCard from "../components/projects/ProjectCard";
import CategoryFilter from "../components/projects/CategoryFilter";
import { useProjects } from "../context/ProjectsContext";

const Projects = () => {
  const { projects: allProjects, getProjectsByCategory } = useProjects();
  const [projects, setProjects] = useState(allProjects);
  const [filteredProjects, setFilteredProjects] = useState(allProjects);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("trending");
  const [viewMode, setViewMode] = useState("grid");

  // Update when context projects change
  useEffect(() => {
    setProjects(allProjects);
    setFilteredProjects(allProjects);
  }, [allProjects]);

  // Filter and sort projects
  useEffect(() => {
    let filtered = projects;

    // Category filter
    if (selectedCategory !== "All") {
      filtered = getProjectsByCategory(selectedCategory);
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort
    switch (sortBy) {
      case "trending":
        filtered = [...filtered].sort((a, b) => b.donors - a.donors);
        break;
      case "newest":
        filtered = [...filtered].sort((a, b) => b.id - a.id);
        break;
      case "mostRaised":
        filtered = [...filtered].sort((a, b) => b.raised - a.raised);
        break;
      default:
        break;
    }

    setFilteredProjects(filtered);
  }, [projects, selectedCategory, searchTerm, sortBy]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-32 pb-20"
    >
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1
            style={{
              fontFamily: "Helvetica, Arial, sans-serif",
              fontWeight: "300",
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              letterSpacing: "-0.02em",
              lineHeight: "1.1",
            }}
            className="text-white mb-6 tracking-tight"
          >
            EXPLORE <span style={{ fontWeight: "400" }}>PROJECTS</span>
          </h1>
          <p
            style={{
              fontFamily: "Helvetica, Arial, sans-serif",
              fontWeight: "300",
              fontSize: "1rem",
              letterSpacing: "0.02em",
            }}
            className="text-gray-400 max-w-3xl mx-auto"
          >
            Discover amazing projects from changemakers around the world making
            real impact
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center space-x-8 mt-8">
            <div>
              <span className="text-3xl font-bold text-white">
                {filteredProjects.length}
              </span>
              <span className="text-gray-400 ml-2">Projects</span>
            </div>
            <div className="w-px h-8 bg-dark-700" />
            <div>
              <span className="text-3xl font-bold text-white">
                $
                {filteredProjects
                  .reduce((sum, p) => sum + p.raised, 0)
                  .toLocaleString()}
              </span>
              <span className="text-gray-400 ml-2">Raised</span>
            </div>
          </div>
        </motion.div>

        {/* Filters and Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          {/* Search Bar */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-12"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-6 py-4 bg-dark-800/50 border border-dark-700 rounded-xl text-gray-100 focus:outline-none focus:ring-2 focus:ring-white"
            >
              <option value="trending">Trending</option>
              <option value="newest">Newest</option>
              <option value="mostRaised">Most Raised</option>
            </select>

            <div className="flex gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-4 rounded-xl border transition-all ${
                  viewMode === "grid"
                    ? "bg-gray-600 border-gray-600 text-white"
                    : "bg-dark-800/50 border-dark-700 text-gray-400"
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-4 rounded-xl border transition-all ${
                  viewMode === "list"
                    ? "bg-gray-600 border-gray-600 text-white"
                    : "bg-dark-800/50 border-dark-700 text-gray-400"
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Category Filter */}
          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </motion.div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                : "space-y-6"
            }
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                viewMode={viewMode}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <TrendingUp className="w-20 h-20 text-gray-600 mx-auto mb-6" />
            <h3 className="text-2xl font-display font-semibold mb-4">
              No projects found
            </h3>
            <p className="text-gray-400 mb-8">
              Try adjusting your filters or search term
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}
              className="btn-primary"
            >
              Clear Filters
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Projects;

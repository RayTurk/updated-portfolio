import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Github, ExternalLink, Filter, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import useDocumentTitle from '../hooks/useDocumentTitle';
import SEO from './SEO';
import { generateBreadcrumbSchema, generateProjectSchema } from '../utils/schema';
import { getProjects } from "../services/wordpressApi";

const MacOsButtons = () => (
  <div className="flex gap-2 mb-4">
    <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors shadow-md" />
    <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors shadow-md" />
    <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors shadow-md" />
  </div>
);

const ProjectShowcase = () => {
  useDocumentTitle('Projects');
  const location = useLocation();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [technologies, setTechnologies] = useState([]);
  const [categories, setCategories] = useState([]);

  // Get filter params from URL
  const searchParams = new URLSearchParams(location.search);
  const [activeTech, setActiveTech] = useState(searchParams.get('tech') || null);
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || null);

  // Helper function to safely remove HTML tags
  const stripHTML = (html) => {
    if (!html) return "";
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };

  // Helper function to extract unique taxonomy terms
  const extractTaxonomyTerms = (projects, taxonomyIndex) => {
    const terms = new Map();

    projects.forEach(project => {
      const termList = project._embedded?.['wp:term']?.[taxonomyIndex] || [];
      termList.forEach(term => {
        // Store term with count
        if (terms.has(term.id)) {
          const existingTerm = terms.get(term.id);
          existingTerm.count += 1;
          terms.set(term.id, existingTerm);
        } else {
          terms.set(term.id, { ...term, count: 1 });
        }
      });
    });

    return Array.from(terms.values());
  };

  // Function to update URL with filters
  const updateFiltersInURL = (tech, category) => {
    const params = new URLSearchParams();

    if (tech) params.set('tech', tech);
    if (category) params.set('category', category);

    const newSearch = params.toString() ? `?${params.toString()}` : '';
    navigate(`/projects${newSearch}`, { replace: true });
  };

  // Function to apply filters
  const applyFilters = () => {
    if (!activeTech && !activeCategory) {
      setProjects(allProjects);
      return;
    }

    const filtered = allProjects.filter(project => {
      const projectTechs = project._embedded?.['wp:term']?.[1] || [];
      const projectCategories = project._embedded?.['wp:term']?.[0] || [];

      const matchesTech = !activeTech || projectTechs.some(tech => tech.id.toString() === activeTech);
      const matchesCategory = !activeCategory || projectCategories.some(cat => cat.id.toString() === activeCategory);

      return matchesTech && matchesCategory;
    });

    setProjects(filtered);
  };

  // Handle filter changes
  const handleTechFilter = (techId) => {
    const newTechId = techId === activeTech ? null : techId;
    setActiveTech(newTechId);
    updateFiltersInURL(newTechId, activeCategory);
  };

  const handleCategoryFilter = (categoryId) => {
    const newCategoryId = categoryId === activeCategory ? null : categoryId;
    setActiveCategory(newCategoryId);
    updateFiltersInURL(activeTech, newCategoryId);
  };

  const clearFilters = () => {
    setActiveTech(null);
    setActiveCategory(null);
    updateFiltersInURL(null, null);
  };

  // Fetch projects from WordPress
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const { projects: fetchedProjects } = await getProjects();
        console.log("Fetched projects:", fetchedProjects);

        // Filter out invalid projects
        const validProjects = Array.isArray(fetchedProjects) ?
          fetchedProjects.filter(p => p && p.title && p.title.rendered) : [];

        setAllProjects(validProjects);
        setProjects(validProjects);

        // Extract unique technologies and categories
        const techsList = extractTaxonomyTerms(validProjects, 1);
        const categoriesList = extractTaxonomyTerms(validProjects, 0);

        setTechnologies(techsList);
        setCategories(categoriesList);

        setError(null);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError("Failed to load projects. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Apply filters when filter state changes
  useEffect(() => {
    applyFilters();
  }, [activeTech, activeCategory, allProjects]);

  // Generate breadcrumb schema
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://rturk.me/' },
    { name: 'Projects', url: 'https://rturk.me/projects' }
  ]);

  // Generate schema for each project
  const projectSchemas = projects
    .filter(project => project && project.title && project.title.rendered)
    .map(project => {
      // Get project data
      const title = project.title.rendered;
      const description = project.acf?.project_excerpt ||
        (project.excerpt?.rendered ? stripHTML(project.excerpt.rendered) : "");
      const projectTags = project._embedded?.['wp:term']?.[0]?.map(term => term.name) || [];
      const projectTechs = project._embedded?.['wp:term']?.[1]?.map(term => term.name) || [];
      const allTags = [...projectTags, ...projectTechs];

      const links = {
        github: project.acf?.github_url || "",
        demo: project.acf?.project_url || "",
      };
      const image = project._embedded?.['wp:featuredmedia']?.[0]?.source_url || "";
      const featured = project.acf?.featured_status || false;

      return generateProjectSchema({
        title,
        description,
        tags: allTags,
        links,
        image,
        featured
      });
    })
    .filter(Boolean); // Remove any nulls

  // Combine all schemas
  const schemas = [breadcrumbSchema, ...projectSchemas];

  // If loading, show loading spinner
  if (loading) {
    return (
      <div className="pt-40 min-h-screen bg-gradient-to-b from-[#020617] via-[#0a0f1f] to-[#000D1A]/90 p-8 text-slate-100 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-cyan-500"></div>
      </div>
    );
  }

  // If error, show error message
  if (error) {
    return (
      <div className="pt-40 min-h-screen bg-gradient-to-b from-[#020617] via-[#0a0f1f] to-[#000D1A]/90 p-8 text-slate-100">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-red-400 text-lg">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            className="mt-4 bg-cyan-600 hover:bg-cyan-700"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title="Web Development Portfolio | Raymond Turk"
        keywords={['WordPress Projects', 'Web Development Portfolio', 'Custom Website Examples']}
        canonical="https://rturk.me/projects"
        schema={schemas}
        pageType="projects"
      />
      <div className="pt-40 min-h-screen bg-gradient-to-b from-[#020617] via-[#0a0f1f] to-[#000D1A]/90 p-8 text-slate-100">
        <div className="max-w-7xl mx-auto">
          {/* Filter section */}
          <div className="mb-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <h2 className="text-2xl font-bold">My Projects</h2>

              {(activeTech || activeCategory) && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearFilters}
                  className="flex items-center gap-1 border-gray-700 hover:bg-gray-800"
                >
                  <X className="w-4 h-4" />
                  <span>Clear Filters</span>
                </Button>
              )}
            </div>

            {/* Active filters indicators */}
            {(activeTech || activeCategory) && (
              <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-4 mb-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-gray-400">Filtering by:</span>

                  {activeTech && (
                    <Badge className="bg-emerald-500/20 text-emerald-300 flex items-center gap-1">
                      {technologies.find(t => t.id.toString() === activeTech)?.name}
                      <button
                        onClick={() => handleTechFilter(activeTech)}
                        className="ml-1 hover:text-white"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  )}

                  {activeCategory && (
                    <Badge className="bg-blue-500/20 text-blue-300 flex items-center gap-1">
                      #{categories.find(c => c.id.toString() === activeCategory)?.name}
                      <button
                        onClick={() => handleCategoryFilter(activeCategory)}
                        className="ml-1 hover:text-white"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  )}
                </div>
              </div>
            )}

            {/* Filter options */}
            <div className="grid grid-cols-1 gap-6 mb-8">
              {/* Technologies filter */}
              {technologies.length > 0 && (
                <Card className="bg-gray-900/80 border-gray-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Filter className="w-5 h-5 text-emerald-400" />
                      <span>Filter by Technology</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {technologies.map(tech => (
                        <Badge
                          key={tech.id}
                          className={`cursor-pointer ${activeTech === tech.id.toString()
                            ? "bg-emerald-500/30 text-emerald-300 border-emerald-500/50"
                            : "bg-gray-800 hover:bg-gray-700 text-gray-300"
                            }`}
                          onClick={() => handleTechFilter(tech.id.toString())}
                        >
                          {tech.name} ({tech.count})
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Categories filter */}
              {categories.length > 0 && (
                <Card className="bg-gray-900/80 border-gray-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Filter className="w-5 h-5 text-blue-400" />
                      <span>Filter by Tags</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {categories.map(category => (
                        <Badge
                          key={category.id}
                          className={`cursor-pointer ${activeCategory === category.id.toString()
                            ? "bg-blue-500/30 text-blue-300 border-blue-500/50"
                            : "bg-gray-800 hover:bg-gray-700 text-gray-300"
                            }`}
                          onClick={() => handleCategoryFilter(category.id.toString())}
                        >
                          {category.name} ({category.count})
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Projects display */}
          {projects.length === 0 ? (
            <div className="text-center py-12 bg-gray-800/50 rounded-lg border border-gray-700/50">
              <p className="text-gray-300 mb-4">No projects match the selected filters.</p>
              <Button
                onClick={clearFilters}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Show All Projects
              </Button>
            </div>
          ) : (
            <div className="space-y-12">
              {projects.map((project, index) => {
                if (!project || !project.title || !project.title.rendered) {
                  console.error("Invalid project data:", project);
                  return null;
                }

                // Extract project data
                const title = project.title.rendered;

                // Use the custom project_excerpt field if available, otherwise fall back to the regular excerpt
                let description = "";
                if (project.acf?.project_excerpt) {
                  description = project.acf.project_excerpt;
                } else if (project.excerpt?.rendered) {
                  description = stripHTML(project.excerpt.rendered);
                }

                const featuredImage = project._embedded?.['wp:featuredmedia']?.[0]?.source_url || "";
                const projectUrl = project.acf?.project_url || "";
                const githubUrl = project.acf?.github_url || "";
                const isFeatured = project.acf?.featured_status || false;
                const projectCategories = project._embedded?.['wp:term']?.[0] || [];
                const projectTechs = project._embedded?.['wp:term']?.[1] || [];
                const slug = project.slug;

                return (
                  <div
                    key={project.id || index}
                    className="flex flex-col md:flex-row items-center group rounded-lg p-[2px] bg-gradient-to-r from-cyan-500 via-purple-500 to-emerald-500 bg-[length:400%_400%] animate-gradient-xy hover:bg-[length:100%_100%] transition-all duration-700 shadow-lg"
                  >
                    {/* Image Section */}
                    <div className="md:w-1/2 overflow-hidden rounded-lg">
                      {featuredImage && (
                        <Link to={`/projects/${slug}`}>
                          <img
                            src={featuredImage}
                            alt={`Screenshot of ${title} project`}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </Link>
                      )}
                    </div>

                    {/* Text Section */}
                    <Card className="md:w-1/2 bg-gradient-to-br from-slate-800 to-gray-900 rounded-lg overflow-hidden shadow-md transition-transform duration-500 group-hover:scale-105 group-hover:shadow-2xl p-6">
                      <MacOsButtons />

                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            {isFeatured && (
                              <div className="text-emerald-400 text-sm font-mono mb-2 tracking-wide uppercase">
                                Featured Project
                              </div>
                            )}
                            <CardTitle className="text-slate-100 text-3xl font-bold">
                              <Link
                                to={`/projects/${slug}`}
                                className="hover:text-emerald-400 transition-colors"
                                dangerouslySetInnerHTML={{ __html: title }}
                              />
                            </CardTitle>
                          </div>
                          <div className="flex gap-4">
                            {githubUrl && (
                              <a
                                href={githubUrl}
                                className="text-slate-400 hover:text-emerald-400 transition-all duration-300 transform hover:scale-125"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Github size={22} />
                              </a>
                            )}
                            {projectUrl && (
                              <a
                                href={projectUrl}
                                className="text-slate-400 hover:text-emerald-400 transition-all duration-300 transform hover:scale-125"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <ExternalLink size={22} />
                              </a>
                            )}
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="mt-4">
                        {description && (
                          <p className="text-slate-300 mb-6 text-lg leading-relaxed">
                            {description}
                          </p>
                        )}

                        {/* Show technologies */}
                        <div className="flex flex-wrap gap-3 mb-4">
                          {projectTechs.map((tech) => (
                            <Badge
                              key={tech.id}
                              className="px-3 py-1 text-sm font-medium rounded-full bg-emerald-500/20 text-emerald-300 cursor-pointer hover:bg-emerald-500/30"
                              onClick={() => handleTechFilter(tech.id.toString())}
                            >
                              {tech.name}
                            </Badge>
                          ))}
                        </div>

                        {/* Show categories */}
                        {projectCategories.length > 0 && (
                          <div className="flex flex-wrap gap-3 mb-6">
                            {projectCategories.map((category) => (
                              <Badge
                                key={category.id}
                                className="text-sm rounded-full bg-blue-500/20 text-blue-300 cursor-pointer hover:bg-blue-500/30"
                                onClick={() => handleCategoryFilter(category.id.toString())}
                              >
                                #{category.name}
                              </Badge>
                            ))}
                          </div>
                        )}

                        {/* View Project Link */}
                        <div className="mt-6">
                          <Link
                            to={`/projects/${slug}`}
                            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium"
                          >
                            View Project Details
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProjectShowcase;
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getProject, getProjects } from "../services/wordpressApi";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Calendar, Briefcase, ExternalLink, Github, Clock } from "lucide-react";
import Meteors from "./ui/meteors";
import SEO from './SEO';
import { generateBreadcrumbSchema } from '../utils/schema';
import { motion } from "framer-motion";

// Component for related project cards
const RelatedProjectCard = ({ project }) => {
  // Add safeguards for undefined properties
  if (!project || !project.title || !project.title.rendered) {
    return null; // Don't render anything if data is missing
  }

  const title = project.title.rendered;
  const featuredImage = project._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;
  const slug = project.slug;

  return (
    <Link to={`/projects/${slug}`} className="block group">
      <Card className="overflow-hidden h-full bg-gray-900/50 border-gray-800 hover:border-blue-500/20 transition-all duration-300">
        {featuredImage && (
          <div className="relative h-32 overflow-hidden">
            <img
              src={featuredImage}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70"></div>
          </div>
        )}

        <div className="p-4">
          <h3
            className="text-white group-hover:text-blue-400 transition-colors text-sm font-medium line-clamp-2 mb-2"
            dangerouslySetInnerHTML={{ __html: title }}
          />
        </div>
      </Card>
    </Link>
  );
};

// Main SingleProject component
const SingleProject = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [relatedProjects, setRelatedProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch project data
  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        setLoading(true);

        // Reset scroll position
        window.scrollTo(0, 0);

        // Fetch project by slug
        const fetchedProject = await getProject(slug, true);

        if (!fetchedProject) {
          setError("Project not found");
          setLoading(false);
          return;
        }

        setProject(fetchedProject);

        // Set document title
        document.title = `${fetchedProject.title?.rendered || 'Project'} | Raymond Turk - Web Developer`;

        // Fetch related projects (can be based on tags/categories if available)
        const { projects } = await getProjects({
          perPage: 3,
          exclude: fetchedProject.id
        });

        // Filter out any invalid projects
        const validProjects = Array.isArray(projects) ?
          projects.filter(p => p && p.title && p.title.rendered) : [];

        setRelatedProjects(validProjects);
        setError(null);
      } catch (err) {
        console.error("Error fetching project:", err);
        setError("Failed to load the project. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjectData();

    // Cleanup function to reset document title
    return () => {
      document.title = "Raymond Turk | Web Developer";
    };
  }, [slug]);

  // Prepare data for SEO
  const getSEOData = () => {
    if (!project) return {};

    // Only try to access these properties if they exist
    if (!project.title || !project.title.rendered) {
      return {
        title: "Project - Case Study",
        description: "Project case study by Raymond Turk, Web Developer.",
        keywords: ['Case Study', 'Web Development', 'Portfolio'],
        canonical: `https://rturk.me/projects/${slug}`,
        schema: generateBreadcrumbSchema([
          { name: 'Home', url: 'https://rturk.me/' },
          { name: 'Projects', url: 'https://rturk.me/projects' },
          { name: 'Project', url: `https://rturk.me/projects/${slug}` }
        ]),
        pageType: "project"
      };
    }

    // Remove HTML tags for description
    const stripHTML = (html) => {
      if (!html) return "";
      const doc = new DOMParser().parseFromString(html, 'text/html');
      return doc.body.textContent || "";
    };

    const title = stripHTML(project.title.rendered);

    // First try to use custom project_excerpt field if available
    let description = "";
    if (project.acf?.project_excerpt) {
      description = project.acf.project_excerpt;
    }
    // Then try regular excerpt
    else if (project.excerpt && project.excerpt.rendered) {
      description = stripHTML(project.excerpt.rendered);
    }

    // If description is too short, enhance it with more details
    if (description.length < 120) {
      const clientName = project.acf?.client_name ? ` for ${project.acf.client_name}` : "";
      const projectType = project.acf?.project_type ?
        ` ${project.acf.project_type.replace('-', ' ')}` : "";
      description = `${description} This${projectType} web development project${clientName} showcases my technical skills and creativity in delivering custom digital solutions.`;
    }

    // Ensure the right length for meta description
    if (description.length > 160) {
      description = description.substring(0, 157) + "...";
    }

    // Extract keywords from tags and technologies
    const categories = project._embedded?.['wp:term']?.[0] || [];
    const technologies = project._embedded?.['wp:term']?.[1] || [];
    const allKeywords = [...categories, ...technologies].map(term => term.name);

    // Get featured image if available
    const featuredImage = project._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;

    // Generate breadcrumb schema
    const breadcrumbSchema = generateBreadcrumbSchema([
      { name: 'Home', url: 'https://rturk.me/' },
      { name: 'Projects', url: 'https://rturk.me/projects' },
      { name: stripHTML(project.title.rendered), url: `https://rturk.me/projects/${slug}` }
    ]);

    return {
      title: `${title} - Project Case Study`,
      description,
      keywords: [...allKeywords, 'Case Study', 'Web Development', 'Portfolio'],
      ogImage: featuredImage,
      canonical: `https://rturk.me/projects/${slug}`,
      schema: breadcrumbSchema,
      pageType: "project"
    };
  };

  // If loading, show loading spinner
  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-gradient-to-b from-[#020617] via-[#0a0f1f] to-[#000D1A]/90 text-white flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  // If error or no project found, show error message
  if (error || !project) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-gradient-to-b from-[#020617] via-[#0a0f1f] to-[#000D1A]/90 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center py-12 bg-red-500/10 rounded-lg border border-red-500/20 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold text-white mb-4">
              {error || "Project not found"}
            </h1>
            <p className="text-gray-300 mb-6">
              The project you're looking for might have been removed or doesn't exist.
            </p>
            <Button
              onClick={() => navigate('/projects')}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Add safeguards against missing properties
  if (!project.title || !project.title.rendered) {
    console.error("Project data is missing title.rendered property:", project);
    return (
      <div className="min-h-screen pt-32 pb-20 bg-gradient-to-b from-[#020617] via-[#0a0f1f] to-[#000D1A]/90 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center py-12 bg-red-500/10 rounded-lg border border-red-500/20 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold text-white mb-4">
              Invalid Project Data
            </h1>
            <p className="text-gray-300 mb-6">
              The project data is incomplete or invalid. Please try again later.
            </p>
            <Button
              onClick={() => navigate('/projects')}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Extract all needed data from the project (with safeguards)
  const title = project.title.rendered;
  const content = project.content?.rendered || "";
  const featuredImage = project._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;

  // Get taxonomies (with safeguards)
  const categories = project._embedded?.['wp:term']?.[0] || []; // Categories (post_tag)
  const technologies = project._embedded?.['wp:term']?.[1] || []; // Technologies taxonomy

  // Get ACF fields (with safeguards)
  const {
    project_url,
    github_url,
    featured_status,
    completion_date,
    client_name,
    logo,
    color_scheme,
    'challenges_&_solutions': challenges_solutions = '', // Note the corrected field name with ampersand
    project_type,
    project_scope = '',
    project_excerpt = '',
    role
  } = project.acf || {};

  // Primary and secondary colors for gradients
  const primaryColor = color_scheme?.primary_color || "#0ea5e9";
  const secondaryColor = color_scheme?.secondary_color || "#10b981";

  // Calculate estimated time to complete based on content length
  const wordCount = (content + (challenges_solutions || '') + (project_scope || ''))
    .replace(/<[^>]*>/g, '')
    .split(' ')
    .filter(word => word.trim() !== '')
    .length;
  const readingTime = Math.ceil(wordCount / 200); // Assuming 200 words per minute reading speed

  const seoData = getSEOData();

  return (
    <>
      <SEO {...seoData} />

      <main className="min-h-screen pt-32 pb-20 bg-gradient-to-b from-[#020617] via-[#0a0f1f] to-[#000D1A]/90 text-white relative">
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse delay-1000"></div>

          {/* Meteors effect */}
          <div className="absolute inset-0 overflow-hidden">
            <Meteors number={3} />
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Navigation */}
          <div className="mb-8">
            <Button
              variant="outline"
              onClick={() => navigate('/projects')}
              className="border-gray-700 hover:bg-gray-800"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content area */}
            <div className="lg:col-span-2">
              {/* Featured image */}
              {featuredImage && (
                <div className="mb-8 rounded-xl overflow-hidden">
                  <img src={featuredImage} alt={title} className="w-full h-auto" />
                </div>
              )}

              {/* Project header */}
              <div className="mb-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  {/* Project tags/categories */}
                  {categories && categories.length > 0 && categories.map(category => (
                    <Badge
                      key={category.id}
                      className="bg-blue-500/20 text-blue-300 hover:bg-blue-500/30"
                    >
                      {category.name}
                    </Badge>
                  ))}

                  {/* Project technologies */}
                  {technologies && technologies.length > 0 && technologies.map(tech => (
                    <Badge
                      key={tech.id}
                      className="bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30"
                    >
                      {tech.name}
                    </Badge>
                  ))}

                  {/* Project type */}
                  {project_type && (
                    <Badge
                      className="bg-purple-500/20 text-purple-300 hover:bg-purple-500/30"
                    >
                      {project_type.replace('-', ' ').charAt(0).toUpperCase() + project_type.replace('-', ' ').slice(1)}
                    </Badge>
                  )}
                </div>

                <h1
                  className="text-3xl md:text-4xl font-bold mb-4 text-white leading-tight"
                  dangerouslySetInnerHTML={{ __html: title }}
                />

                <div className="flex flex-wrap items-center text-sm text-gray-400 gap-4 mb-4">
                  {client_name && (
                    <div className="flex items-center gap-1">
                      <Briefcase className="w-4 h-4" />
                      <span>{client_name}</span>
                    </div>
                  )}

                  {completion_date && (
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{completion_date}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{readingTime} min read</span>
                  </div>
                </div>

                <div className="border-t border-gray-800 pt-4 flex items-center gap-4 flex-wrap">
                  {project_url && (
                    <a
                      href={project_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>View Live Site</span>
                    </a>
                  )}

                  {github_url && (
                    <a
                      href={github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-gray-700"
                    >
                      <Github className="w-4 h-4" />
                      <span>Source Code</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Project content */}
              <article className="prose prose-invert prose-lg max-w-none mb-12">
                <div
                  className="wp-content"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              </article>

              {/* Project details sections */}
              <div className="space-y-8 mb-12">
                {/* Project scope section (if available) */}
                {project_scope && (
                  <div className="rounded-lg bg-gray-800/50 border border-gray-700/50 p-6">
                    <h2 className="text-xl font-bold mb-4 text-cyan-400">Project Scope</h2>
                    <div
                      id="project-scope-container"
                      className="text-gray-300 prose prose-invert"
                      dangerouslySetInnerHTML={{ __html: project_scope }}
                    />
                  </div>
                )}

                {/* Challenges and solutions section (if available) */}
                {challenges_solutions && (
                  <div className="rounded-lg bg-gray-800/50 border border-gray-700/50 p-6">
                    <h2 className="text-xl font-bold mb-4 text-purple-400">Challenges & Solutions</h2>
                    <div
                      id="project-solutions-container"
                      className="text-gray-300 prose prose-invert"
                      dangerouslySetInnerHTML={{ __html: challenges_solutions }}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Project logo */}
              {logo && logo.url && (
                <Card className="mb-8 border-gray-800 bg-gray-900/50 overflow-hidden p-6 flex justify-center items-center">
                  <img
                    src={logo.url}
                    alt={`${title} logo`}
                    className="max-w-full max-h-32 object-contain"
                  />
                </Card>
              )}

              {/* Project details */}
              <Card className="mb-8 border-gray-800 bg-gray-900/50">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-white">Project Details</h3>

                  <div className="space-y-4">
                    {client_name && (
                      <div>
                        <h4 className="text-sm text-gray-400 mb-1">Client</h4>
                        <p className="text-white">{client_name}</p>
                      </div>
                    )}

                    {completion_date && (
                      <div>
                        <h4 className="text-sm text-gray-400 mb-1">Completed</h4>
                        <p className="text-white">{completion_date}</p>
                      </div>
                    )}

                    {project_type && (
                      <div>
                        <h4 className="text-sm text-gray-400 mb-1">Project Type</h4>
                        <p className="text-white capitalize">{project_type.replace('-', ' ')}</p>
                      </div>
                    )}

                    {role && (
                      <div>
                        <h4 className="text-sm text-gray-400 mb-1">My Role</h4>
                        <p className="text-white">{role}</p>
                      </div>
                    )}

                    {categories && categories.length > 0 && (
                      <div>
                        <h4 className="text-sm text-gray-400 mb-1">Tags</h4>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {categories.map(category => (
                            <Badge
                              key={category.id}
                              variant="outline"
                              className="border-gray-700 hover:border-gray-600"
                            >
                              {category.name}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Technologies Used */}
                    {technologies && technologies.length > 0 && (
                      <div>
                        <h4 className="text-sm text-gray-400 mb-1">Technologies Used</h4>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {technologies.map(tech => (
                            <Badge
                              key={tech.id}
                              variant="outline"
                              className="border-blue-700/50 bg-blue-900/20 hover:bg-blue-900/30"
                            >
                              {tech.name}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Related projects */}
              {relatedProjects.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4 text-white">More Projects</h3>
                  <div className="space-y-4">
                    {relatedProjects.map(relatedProject => (
                      <RelatedProjectCard
                        key={relatedProject.id || relatedProject.slug}
                        project={relatedProject}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Call to action */}
              <motion.div
                className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 p-6 rounded-xl border border-cyan-500/20 backdrop-blur-sm text-center relative overflow-hidden"
                whileHover={{
                  borderColor: "rgba(6, 182, 212, 0.3)",
                  boxShadow: "0 0 30px rgba(6, 182, 212, 0.2)"
                }}
              >
                <motion.h2
                  className="text-xl font-bold mb-3"
                  animate={{
                    color: ["#fff", "#38bdf8", "#34d399", "#fff"],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  Need a Similar Project?
                </motion.h2>
                <p className="text-gray-300 mb-4 text-sm">
                  Let's discuss how we can create a custom web solution that perfectly aligns with your business goals.
                </p>
                <motion.a
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 w-full justify-center"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 20px rgba(6, 182, 212, 0.5)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Let's Talk</span>
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{
                      repeat: Infinity,
                      repeatType: "loop",
                      duration: 1.5,
                      ease: "easeInOut"
                    }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.span>
                </motion.a>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default SingleProject;
import React from "react";
import { Github, ExternalLink } from "lucide-react";
import petitti from "../assets/images/petitti.png";
import geauga from "../assets/images/geauga.png";
import radair from "../assets/images/radair.png";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useDocumentTitle from '../hooks/useDocumentTitle';
import SEO from './SEO';
import { generateBreadcrumbSchema, generateProjectSchema } from '../utils/schema';


const MacOsButtons = () => (
  <div className="flex gap-2 mb-4">
    <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors shadow-md" />
    <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors shadow-md" />
    <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors shadow-md" />
  </div>
);

const ProjectShowcase = () => {
  useDocumentTitle('Projects');

  const projects = [
    {
      title: "Petitti Garden Center",
      description:
        "Full site redesign including an online gateway for digital giftcards, seasonal product highlights, and integrated store locator.",
      tags: ["WordPress", "Digital Giftcards", "Custom Plugins", "API Integration"],
      links: {
        github: "",
        demo: "https://www.petittigardencenter.com/",
      },
      image: petitti,
      featured: true,
    },
    {
      title: "Geauga County's Government Multisite",
      description:
        "Multisite platform unifying 25+ department websites with centralized content management and custom functionality.",
      tags: ["WordPress Multisite", "Custom Theme", "User Permissions", "Event Calendar"],
      links: {
        github: "",
        demo: "https://geauga.oh.gov/",
      },
      image: geauga,
      featured: false,
    },
    {
      title: "RadAir Car Care",
      description:
        "Modern automotive service platform featuring online appointment booking and service history tracking.",
      tags: ["WordPress", "Appointment Booking", "Custom Development"],
      links: {
        github: "",
        demo: "https://radair.com",
      },
      image: radair,
      featured: false,
    }
  ];

  // Generate breadcrumb schema
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://rturk.me/' },
    { name: 'Projects', url: 'https://rturk.me/projects' }
  ]);

  // Generate schema for each project
  const projectSchemas = projects.map(project => generateProjectSchema(project));

  // Combine all schemas
  const schemas = [breadcrumbSchema, ...projectSchemas];

  return (
    <>
      <SEO
        title="Web Development Portfolio | Raymond Turk"
        description="Explore my web development projects including custom WordPress sites, Shopify stores, and business solutions. See how I've helped clients achieve their digital goals."
        keywords={['WordPress Projects', 'Web Development Portfolio', 'Custom Website Examples', 'Shopify Stores', 'Cleveland Developer']}
        canonical="https://rturk.me/projects"
        schema={schemas}
      />
      <div
        className="pt-40 min-h-screen bg-gradient-to-b from-[#020617] via-[#0a0f1f] to-[#000D1A]/90
 p-8 text-slate-100"
      >
        <div className="max-w-7xl mx-auto space-y-12">
          {projects.map((project, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-center group rounded-lg p-[2px] bg-gradient-to-r from-cyan-500 via-purple-500 to-emerald-500 bg-[length:400%_400%] animate-gradient-xy hover:bg-[length:100%_100%] transition-all duration-700 shadow-lg"
            >
              {/* Image Section */}
              <div className="md:w-1/2 overflow-hidden rounded-lg">
                <img
                  src={project.image}
                  alt={`Screenshot of ${project.title} project showing ${project.description.substring(0, 50)}...`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Text Section */}
              <Card className="md:w-1/2 bg-gradient-to-br from-slate-800 to-gray-900 rounded-lg overflow-hidden shadow-md transition-transform duration-500 group-hover:scale-105 group-hover:shadow-2xl p-6">
                <MacOsButtons />

                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-emerald-400 text-sm font-mono mb-2 tracking-wide uppercase">
                        Featured Project
                      </div>
                      <CardTitle className="text-slate-100 text-3xl font-bold">
                        {project.title}
                      </CardTitle>
                    </div>
                    <div className="flex gap-4">
                      {/* <a
                      href={project.links.github}
                      className="text-slate-400 hover:text-emerald-400 transition-all duration-300 transform hover:scale-125"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github size={22} />
                    </a> */}
                      <a
                        href={project.links.demo}
                        className="text-slate-400 hover:text-emerald-400 transition-all duration-300 transform hover:scale-125"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink size={22} />
                      </a>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="mt-4">
                  <p className="text-slate-300 mb-6 text-lg leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 text-sm font-medium rounded-full bg-gradient-to-r from-emerald-400 to-cyan-500 text-gray-900 shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProjectShowcase;

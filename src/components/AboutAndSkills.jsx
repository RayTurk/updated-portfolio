import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Code,
  Monitor,
  Calendar,
  MapPin,
  ThumbsUp,
  Award,
  X,
  ArrowRight,
  Database,
  Layout,
  Cpu,
  Cloud,
  Paintbrush
} from "lucide-react";
import {
  FaReact,
  FaWordpress,
  FaNodeJs,
  FaPython,
  FaDocker,
  FaGitAlt,
  FaLinux,
  FaFigma,
  FaAws,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiPostgresql,
  SiMongodb,
  SiGraphql,
  SiJest,
  SiWebpack,
  SiRedux,
  SiFirebase,
  SiVercel,
  SiVite,
  SiSass,
  SiShopify,
  SiPhp,
  SiAdobexd
} from "react-icons/si";
import { TbBrandVscode } from "react-icons/tb";
import { BsFileEarmarkCode, BsGrid1X2 } from "react-icons/bs";
import { MdAnimation } from "react-icons/md";
import { FcWorkflow } from "react-icons/fc";
import profileImage from "../assets/images/profile.png";
import SparklesText from "./ui/sparkles-text";
import { FlipWords } from "./ui/flip-words";
import useDocumentTitle from '../hooks/useDocumentTitle';
import SEO from './SEO';
import { generatePersonSchema, generateBreadcrumbSchema } from '../utils/schema';
import Meteors from "./ui/meteors";
import IconCloudDemo from "./globe";

// Skills tag component
const SkillTag = ({ children }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.span
      className={`inline-block bg-blue-500/20 text-blue-300 rounded-full px-3 py-1 text-sm font-medium mr-2 mb-2 border border-transparent transition-all duration-75 ${isHovered ? 'border-blue-500/50 bg-blue-500/30 shadow-lg shadow-blue-500/20' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        scale: isHovered ? 1.05 : 1,
        y: isHovered ? -3 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 600,
        damping: 15
      }}
    >
      {children}
    </motion.span>
  );
};

// Skill Card component
const SkillCard = ({ icon: Icon, title, skills, color }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5 }}
    className="group relative overflow-hidden bg-gray-900/80 border-gray-700 hover:scale-[1.02] transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20 rounded-xl"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(100,100,255,0.1)] to-transparent group-hover:via-[rgba(100,100,255,0.2)] animate-shimmer"></div>
    <div className="p-6 relative z-10">
      <div className="flex items-center gap-4 mb-6">
        <div
          className={`p-3 rounded-xl bg-gray-800/50 ${color} group-hover:scale-110 transition-transform duration-300`}
        >
          <Icon className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
          {title}
        </h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="group/badge relative bg-gray-800/50 hover:bg-gray-700/80 text-gray-100 border-gray-600 flex items-center gap-2 py-2 px-3 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20 rounded-lg"
          >
            <span className="transform group-hover/badge:scale-110 transition-transform duration-300">
              {skill.icon}
            </span>
            <span className="font-medium">{skill.name}</span>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);

// Not ideal client component
const NotIdealClient = ({ title, description, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: delay * 0.05, duration: 0.2 }}
    className="flex items-start gap-3 text-sharp hover:bg-red-500/5 p-3 rounded-lg transition-all duration-75"
    whileHover={{
      x: 5,
      backgroundColor: "rgba(239, 68, 68, 0.1)",
      transition: { duration: 0.1 }
    }}
  >
    <motion.div
      className="p-1 rounded-full bg-red-500/10 mt-1"
      whileHover={{
        rotate: [0, -5, 5, 0],
        transition: { duration: 0.1 }
      }}
    >
      <X className="h-5 w-5 text-red-400" />
    </motion.div>
    <div>
      <h3 className="text-base font-semibold text-white">{title}</h3>
      <p className="text-gray-300 text-sm">{description}</p>
    </div>
  </motion.div>
);

// Perfect fit component with faster animations
const PerfectFit = ({ title, description, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: delay * 0.05, duration: 0.2 }}
    className="flex items-start gap-3 text-sharp hover:bg-green-500/5 p-3 rounded-lg transition-all duration-75"
    whileHover={{
      x: -5,
      backgroundColor: "rgba(34, 197, 94, 0.1)",
      transition: { duration: 0.1 }
    }}
  >
    <motion.div
      className="p-1 rounded-full bg-green-500/10 mt-1"
      whileHover={{
        scale: 1.2,
        transition: { duration: 0.1 }
      }}
    >
      <ThumbsUp className="h-5 w-5 text-green-400" />
    </motion.div>
    <div>
      <h3 className="text-base font-semibold text-white">{title}</h3>
      <p className="text-gray-300 text-sm">{description}</p>
    </div>
  </motion.div>
);

// Combined About and Skills component
const AboutAndSkills = () => {
  useDocumentTitle('About & Skills');

  // Generate breadcrumb schema
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://rturk.me/' },
    { name: 'About & Skills', url: 'https://rturk.me/about' }
  ]);

  // Combine person and breadcrumb schema
  const pageSchema = [
    generatePersonSchema(),
    breadcrumbSchema
  ];

  // Define skill categories for the Skills section
  const skillCategories = [
    {
      icon: Code,
      title: "Frontend Development",
      color: "text-blue-400",
      skills: [
        {
          name: "WordPress",
          icon: <FaWordpress className="w-4 h-4 text-[#1572b6]" />
        },
        {
          name: "Shopify",
          icon: <SiShopify className="w-4 h-4 text-[#96bf48]" />
        },
        { name: "React", icon: <FaReact className="w-4 h-4 text-[#61DAFB]" /> },
        {
          name: "SaSS",
          icon: <SiSass className="w-4 h-4 text-white" />,
        },
        {
          name: "TypeScript",
          icon: <SiTypescript className="w-4 h-4 text-[#3178C6]" />,
        },
        {
          name: "Tailwind CSS",
          icon: <SiTailwindcss className="w-4 h-4 text-[#38B2AC]" />,
        }
      ],
    },
    {
      icon: Database,
      title: "Backend Development",
      color: "text-green-400",
      skills: [
        {
          name: "PHP",
          icon: <SiPhp className="w-4 h-4 text-[#474A8A]" />,
        },
        {
          name: "Node.js",
          icon: <FaNodeJs className="w-4 h-4 text-[#339933]" />,
        },
        {
          name: "Python",
          icon: <FaPython className="w-4 h-4 text-[#3776AB]" />,
        },
        {
          name: "PostgreSQL",
          icon: <SiPostgresql className="w-4 h-4 text-[#336791]" />,
        }
      ],
    },
    {
      icon: Layout,
      title: "UI/UX Design",
      color: "text-purple-400",
      skills: [
        { name: "Figma", icon: <FaFigma className="w-4 h-4 text-[#F24E1E]" /> },
        { name: "AdobeXD", icon: <SiAdobexd className="w-4 h-4 text-[#F24E1E]" /> },
        {
          name: "Responsive Design",
          icon: <Layout className="w-4 h-4 text-[#38B2AC]" />,
        }
      ],
    },
    {
      icon: Cloud,
      title: "DevOps & Cloud",
      color: "text-orange-400",
      skills: [
        { name: "Git", icon: <FaGitAlt className="w-4 h-4 text-[#F05032]" /> },
        { name: "Linux", icon: <FaLinux className="w-4 h-4 text-[#FCC624]" /> },
        { name: "Docker", icon: <FaDocker className="w-4 h-4 text-[#2496ED]" /> },
        { name: "AWS", icon: <FaAws className="w-4 h-4 text-[#FF9900]" /> }
      ],
    }
  ];

  return (
    <>
      <SEO
        title="About Raymond Turk | Full-Stack Developer"
        description="Full-Stack Web Developer with 5+ years of experience specializing in WordPress, Shopify, and custom web development. Learn about my skills, approach, and who I work with."
        keywords={['WordPress Expert', 'Full-Stack Developer', 'Cleveland Web Developer', 'Shopify Developer', 'Web Development Skills']}
        canonical="https://rturk.me/about"
        schema={pageSchema}
      />
      <main className="min-h-screen pt-32 pb-20 text-white relative overflow-hidden text-sharp">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse delay-1000"></div>

          {/* Meteors effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <Meteors number={5} />
          </div>
        </div>

        {/* Personal Information Section */}
        <section className="container mx-auto px-4 mb-16 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative w-full max-w-md"
            >
              <motion.div
                className="w-full aspect-square overflow-hidden rounded-2xl border-4 border-gray-800 relative"
                whileHover={{
                  borderColor: "rgba(56, 189, 248, 0.5)",
                  boxShadow: "0 0 30px rgba(56, 189, 248, 0.3)"
                }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={profileImage}
                  alt="Raymond Turk"
                  className="w-full h-full object-cover"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"
                  initial={{ opacity: 0.7 }}
                  whileHover={{ opacity: 0.4 }}
                  transition={{ duration: 0.5 }}
                ></motion.div>
              </motion.div>

              {/* Floating badges with animated motion */}
              <motion.div
                initial={{ opacity: 0, y: 20, x: 20 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="absolute top-5 right-0 transform translate-x-1/4 bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-2 rounded-lg shadow-lg"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 5px 15px rgba(56, 189, 248, 0.4)"
                }}
                drag
                dragConstraints={{
                  top: -5,
                  left: -5,
                  right: 5,
                  bottom: 5
                }}
              >
                <span className="flex items-center gap-2 text-white font-medium">
                  <Calendar className="w-4 h-4" />
                  <span>5+ Years Experience</span>
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20, x: -20 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="absolute bottom-5 left-0 transform -translate-x-1/4 bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 rounded-lg shadow-lg"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 5px 15px rgba(168, 85, 247, 0.4)"
                }}
                drag
                dragConstraints={{
                  top: -5,
                  left: -5,
                  right: 5,
                  bottom: 5
                }}
              >
                <span className="flex items-center gap-2 text-white font-medium">
                  <MapPin className="w-4 h-4" />
                  <span>Cleveland, Ohio</span>
                </span>
              </motion.div>
            </motion.div>

            {/* Text content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-1"
            >
              <div className="mb-4">
                <SparklesText text="About Me" />
              </div>

              <div className="space-y-4 text-gray-300">
                <p className="text-lg">
                  I'm a <span className="text-blue-400 font-medium">Full-Stack Web Developer</span> specializing in WordPress and custom solutions, from small business websites to enterprise-level solutions. With over 5 years of experience in custom theme and plugin development, I create efficient, scalable web solutions that bring ideas to life.
                </p>

                <p>
                  Born and raised in Cleveland, Ohio, I've built a career transforming digital visions into reality. When I'm not busy developing, you'll likely find me playing with my dogs, deep into the latest RPG, or cooking something delicious!
                </p>

                <div className="mt-6">
                  <FlipWords
                    className="text-xl font-medium text-blue-400 mb-3 block"
                    words={["WordPress Expert", "Problem Solver", "Solution Architect", "Code Craftsman"]}
                    duration={2500}
                  />
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  <SkillTag>WordPress</SkillTag>
                  <SkillTag>PHP</SkillTag>
                  <SkillTag>JavaScript</SkillTag>
                  <SkillTag>React</SkillTag>
                  <SkillTag>Shopify</SkillTag>
                  <SkillTag>Custom Themes</SkillTag>
                  <SkillTag>API Integration</SkillTag>
                </div>

                <div className="mt-8">
                  <motion.a
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 group"
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 0 20px rgba(6, 182, 212, 0.5)"
                    }}
                  >
                    <span>Get in Touch</span>
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
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Who I Work With Section */}
        <section className="container mx-auto px-4 mb-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <SparklesText text="Who I Work With" colors={{ first: "#38bdf8", second: "#34d399" }} />
            <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
              I specialize in helping businesses that value direct communication, fast implementation, and quality results
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Not Ideal Column */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold mb-6 text-red-400">Not My Ideal Client</h3>
              <div className="space-y-6">
                <NotIdealClient
                  title="Enterprise Corporations"
                  description="Large companies with complex approval processes and multiple layers of decision-makers can slow down development."
                  delay={1}
                />

                <NotIdealClient
                  title="One-Time Projects Only"
                  description="Clients looking for just a quick build with no ongoing relationship or maintenance plan."
                  delay={2}
                />

                <NotIdealClient
                  title="Agencies Reselling My Services"
                  description="I prefer to work directly with end clients to ensure the best communication and results."
                  delay={3}
                />

                <NotIdealClient
                  title="Unrealistic Timelines"
                  description="Projects requiring immediate delivery without adequate planning and development time."
                  delay={4}
                />
              </div>
            </motion.div>

            {/* Perfect Fit Column */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold mb-6 text-green-400">We're a Perfect Fit If You Need</h3>
              <div className="space-y-6">
                <PerfectFit
                  title="Direct Communication"
                  description="No account managers or middlemen. You'll work directly with me for quicker results and better solutions."
                  delay={1}
                />

                <PerfectFit
                  title="Quick Implementation"
                  description="Fast turnaround on website changes, updates, and new features without bureaucratic delays."
                  delay={2}
                />

                <PerfectFit
                  title="Technical Partner"
                  description="A developer who understands your business goals and can translate them into effective technical solutions."
                  delay={3}
                />

                <PerfectFit
                  title="Full-Stack Expertise"
                  description="Specialized knowledge in WordPress and Shopify platforms for optimal performance, security, and functionality."
                  delay={4}
                />

                <PerfectFit
                  title="Ongoing Support & Growth"
                  description="Long-term partnership focused on continuously improving your website to support your business growth."
                  delay={5}
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="container mx-auto px-4 mb-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <SparklesText text="My Skills" colors={{ first: "#38bdf8", second: "#34d399" }} />
            <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
              A comprehensive toolkit that allows me to deliver high-quality web solutions
            </p>
          </motion.div>

          {/* Skills Cloud */}
          <div className="flex justify-center items-center mb-12">
            <IconCloudDemo />
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {skillCategories.map((category, index) => (
              <SkillCard
                key={index}
                icon={category.icon}
                title={category.title}
                skills={category.skills}
                color={category.color}
              />
            ))}
          </div>
        </section>



        {/* Call to Action */}
        <section className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="max-w-3xl mx-auto bg-gradient-to-r from-cyan-900/30 to-blue-900/30 p-8 md:p-12 rounded-xl border border-cyan-500/20 backdrop-blur-sm text-center relative"
            whileHover={{
              borderColor: "rgba(6, 182, 212, 0.3)",
              boxShadow: "0 0 30px rgba(6, 182, 212, 0.2)"
            }}
          >
            <motion.h2
              className="text-2xl md:text-3xl font-bold mb-4"
              animate={{
                color: ["#fff", "#38bdf8", "#34d399", "#fff"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Sound Like Your Business?
            </motion.h2>
            <p className="text-gray-300 mb-8">
              If this description matches your needs, I'd love to talk about how we can work together to achieve your web goals.
            </p>
            <motion.a
              href="/contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 group"
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
        </section>
      </main>
    </>
  );
};

export default AboutAndSkills;
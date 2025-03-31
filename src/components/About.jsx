import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Handshake,
  Rocket,
  Zap,
  BarChart3,
  Wrench,
  ArrowRight,
  User,
  Code,
  Monitor,
  Calendar,
  MapPin,
  ThumbsUp,
  Award,
  X
} from "lucide-react";
import profileImage from "../assets/images/profile.png";
import SparklesText from "./ui/sparkles-text";
import { FlipWords } from "./ui/flip-words";
import useDocumentTitle from '../hooks/useDocumentTitle';
import SEO from './SEO';
import { generatePersonSchema, generateBreadcrumbSchema } from '../utils/schema';


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

// Client card component
const ClientCard = ({ icon: Icon, title, description }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative overflow-hidden rounded-xl p-6 border border-gray-800 shadow-lg bg-gray-900/50 backdrop-blur-sm transition-all duration-75 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.3 }}
      whileHover={{
        borderColor: "rgba(6, 182, 212, 0.3)",
        y: -5,
        boxShadow: "0 15px 30px -10px rgba(6, 182, 212, 0.1)"
      }}
    >
      <div className="relative z-10 text-sharp">
        <motion.div
          className="mb-4 p-3 rounded-lg bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 inline-block"
          animate={{
            rotate: isHovered ? [0, -3, 3, 0] : 0,
            scale: isHovered ? 1.1 : 1
          }}
          transition={{
            duration: 0.1,
            ease: "easeOut"
          }}
        >
          <Icon className="w-6 h-6 text-cyan-400" />
        </motion.div>
        <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-300 text-sm">{description}</p>
      </div>
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-100"></div>
    </motion.div>
  );
};
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

const About = () => {
  useDocumentTitle('About Me');

  // Generate breadcrumb schema
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://rturk.me/' },
    { name: 'About Me', url: 'https://rturk.me/about' }
  ]);

  // Combine person and breadcrumb schema
  const aboutSchema = [
    generatePersonSchema(),
    breadcrumbSchema
  ];

  return (
    <>
      <SEO
        title="About Raymond Turk | Cleveland Web Developer"
        keywords={['WordPress Expert', 'Cleveland Developer', 'Full-Stack Developer']}
        canonical="https://rturk.me/about"
        schema={aboutSchema}
        pageType="about"
      />
      <main className="min-h-screen pt-32 pb-20 text-white relative overflow-hidden text-sharp">
        {/* Hero Section */}
        <section className="container mx-auto px-4 mb-16">
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

        {/* Ideal Clients Section */}
        <section className="container mx-auto px-4 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <div className="mb-4">
              <SparklesText text="Who I Work With" colors={{ first: "#38bdf8", second: "#34d399" }} />
            </div>
            <p className="text-gray-300">
              I specialize in helping businesses that value direct communication, fast implementation, and quality results.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ClientCard
              icon={Building2}
              title="Small to Medium Businesses"
              description="I work best with businesses that need direct access to their developer and quick turnaround times."
            />

            <ClientCard
              icon={Wrench}
              title="Website Maintenance"
              description="Businesses with existing WordPress or Shopify sites that need ongoing maintenance and improvements."
            />

            <ClientCard
              icon={Rocket}
              title="Fresh Site Builds & Updates"
              description="Companies ready to launch a new web presence, completely redesign their existing site, or update their current website with modern features."
            />

            <ClientCard
              icon={Zap}
              title="Quick Decision Makers"
              description="Clients who value speed and can provide feedback without long chains of command."
            />

            <ClientCard
              icon={BarChart3}
              title="Growth-Focused Businesses"
              description="Businesses looking to use their website as a tool for growth and data-driven improvements."
            />

            <ClientCard
              icon={Handshake}
              title="Long-Term Partnerships"
              description="I prefer building lasting relationships rather than one-off projects, becoming your trusted technical partner."
            />
          </div>
        </section>

        {/* Perfect Fit Section */}
        <section className="container mx-auto px-4 mb-20">
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
                  description="Specialized knowledge in these platforms for optimal performance, security, and functionality."
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

export default About;
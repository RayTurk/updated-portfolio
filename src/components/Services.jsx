import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  Code,
  ShoppingCart,
  Server,
  Paintbrush,
  Briefcase,
  ArrowRight,
  CheckCircle,
  Clock,
  Trophy,
  Zap,
  ShieldCheck
} from "lucide-react";
import SparklesText from "./ui/sparkles-text";
import useDocumentTitle from '../hooks/useDocumentTitle';
import SEO from './SEO';
import { generateBreadcrumbSchema } from '../utils/schema';
import Meteors from "./ui/meteors";

// Service Card component with enhanced animations
const ServiceCard = ({ icon: Icon, title, description, featured = false, delay = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      className={`relative overflow-visible
 rounded-xl bg-gray-900/50 backdrop-blur-sm border ${featured
          ? "border-blue-500/20 shadow-lg shadow-blue-500/10"
          : "border-gray-800 hover:border-blue-500/20 hover:shadow-lg hover:shadow-blue-500/10"
        } p-6 flex flex-col h-full transition-all duration-300`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{
        y: -10,
        transition: { duration: 0.3 }
      }}
    >
      {/* Background gradient effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5"
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Animated dots in background when hovered */}
      {isHovered && (
        <motion.div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-blue-400/20 rounded-full"
              initial={{
                x: Math.random() * 100 + "%",
                y: Math.random() * 100 + "%",
                opacity: 0
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                repeatType: "loop"
              }}
            />
          ))}
        </motion.div>
      )}

      {/* Featured indicator with animation */}
      {featured && (
        <motion.div
          className="absolute -top-3 -right-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-bold py-1 px-3 rounded-bl-lg rounded-tr-xl shadow-lg "
          initial={{ rotate: 12, scale: 0.9 }}
          animate={{ rotate: [12, 8, 12], scale: [0.9, 1, 0.9] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        >
          Popular
        </motion.div>
      )}

      {/* Icon with motion effects */}
      <motion.div
        className={`mb-4 p-3 rounded-lg ${featured
          ? "bg-gradient-to-tr from-blue-500/20 to-cyan-500/20"
          : "bg-blue-500/10 group-hover:bg-gradient-to-tr group-hover:from-blue-500/20 group-hover:to-cyan-500/20"
          } inline-block transition-all duration-300`}
        animate={{
          rotate: isHovered ? [0, -5, 5, 0] : 0,
          scale: isHovered ? 1.1 : 1
        }}
        transition={{
          duration: 0.5,
          ease: "easeOut"
        }}
      >
        <Icon className="w-6 h-6 text-cyan-400" />
      </motion.div>

      {/* Content with animated hover effect */}
      <motion.h3
        className="text-xl font-bold mb-3"
        animate={{
          color: isHovered ? "#38bdf8" : "#ffffff",
        }}
        transition={{ duration: 0.3 }}
      >
        {title}
      </motion.h3>

      <p className="text-gray-300 text-sm mb-4 flex-grow">{description}</p>

      {/* Learn more link with animation */}
      <motion.div
        className="inline-flex items-center gap-1 text-cyan-400 text-sm font-medium"
        whileHover={{ x: 5 }}
        animate={{
          opacity: isHovered ? 1 : 0.8,
        }}
      >
        <span>Learn more</span>
        <motion.span
          animate={{ x: isHovered ? [0, 5, 0] : 0 }}
          transition={{
            repeat: isHovered ? Infinity : 0,
            repeatType: "loop",
            duration: 1.5,
            ease: "easeInOut"
          }}
        >
          <ArrowRight className="w-4 h-4" />
        </motion.span>
      </motion.div>
    </motion.div>
  );
};

// Benefits Item component
const BenefitItem = ({ icon: Icon, title, description, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: delay * 0.1, duration: 0.5 }}
    className="flex items-start gap-4 hover:bg-blue-500/5 p-4 rounded-xl transition-all duration-350"
    whileHover={{ x: 10, backgroundColor: "rgba(59, 130, 246, 0.05)" }}
  >
    <motion.div
      className="p-2 rounded-full bg-blue-500/10 mt-1"
      whileHover={{
        rotate: [0, -10, 10, 0],
        transition: { duration: 0.5 }
      }}
    >
      <Icon className="h-5 w-5 text-blue-400" />
    </motion.div>
    <div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="text-gray-300 text-sm">{description}</p>
    </div>
  </motion.div>
);

// Process Step component
const ProcessStep = ({ number, title, description, index }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="flex gap-6"
  >
    <div className="relative">
      <motion.div
        className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-500/20 text-blue-400 font-bold"
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {number}
      </motion.div>
      {index < 3 && (
        <motion.div
          className="absolute top-12 bottom-0 left-1/2 transform -translate-x-1/2 w-0.5 h-14 bg-gradient-to-b from-blue-500/50 to-transparent"
          initial={{ height: 0 }}
          whileInView={{ height: "56px" }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
        />
      )}
    </div>
    <div className="flex-1">
      <motion.h3
        className="text-xl font-bold text-white mb-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
      >
        {title}
      </motion.h3>
      <motion.p
        className="text-gray-300"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
      >
        {description}
      </motion.p>
    </div>
  </motion.div>
);

const Services = () => {
  useDocumentTitle('Services');

  // Generate breadcrumb schema
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://rturk.me/' },
    { name: 'Services', url: 'https://rturk.me/services' }
  ]);

  return (
    <>
      <SEO
        title="Services"
        description="Professional web development services offered by Raymond Turk, including WordPress development, Shopify customization, and full-stack solutions."
        keywords={['WordPress Development', 'Shopify Customization', 'Web Development Services', 'Custom Themes', 'E-commerce Solutions', 'Performance Optimization']}
        canonical="https://rturk.me/services"
        schema={breadcrumbSchema}
      />
      <main className="pt-32 pb-20 bg-gradient-to-b from-[#020617] via-[#0a0f1f] to-[#000D1A]/90 text-white min-h-screen relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse delay-1000"></div>

          {/* Meteors effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <Meteors number={5} />
          </div>
        </div>

        {/* Hero Section with enhanced animations */}
        <section className="container mx-auto px-4 mb-16 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Animated welcome badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 mb-6"
            >
              <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
              <span className="text-gray-300 text-sm font-medium">
                Tailored web development solutions
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-6"
            >
              <SparklesText text="My Services" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-6"
            >

            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-xl text-gray-300 mb-8"
            >
              Creating efficient, scalable web solutions that bring ideas to life
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap justify-center gap-3 mb-12"
            >
              {["WordPress", "Shopify", "Custom Themes", "E-commerce", "Responsive Design", "Performance"].map((tag, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(59, 130, 246, 0.3)" }}
                  className="bg-blue-500/20 text-blue-300 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300"
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Services Grid with staggered animations */}
        <section className="container mx-auto px-4 mb-20 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ServiceCard
              icon={Globe}
              title="WordPress Development"
              description="Custom WordPress themes and plugins tailored to your specific needs. I build high-performing, secure, and scalable WordPress solutions that make content management a breeze."
              featured={true}
              delay={0}
            />
            <ServiceCard
              icon={Server}
              title="Website Maintenance"
              description="Ongoing support to keep your site secure and up-to-date. I handle regular backups, updates, security monitoring, and performance optimization to keep your website running smoothly."
              featured={true}
              delay={3}
            />
            <ServiceCard
              icon={ShoppingCart}
              title="Shopify Customization"
              description="Professional Shopify store setup and theme customization. I help you create a seamless shopping experience with custom product pages, checkout flows, and payment integrations."
              delay={1}
            />
            <ServiceCard
              icon={Code}
              title="Custom Theme Development"
              description="Unique, brand-aligned themes built from scratch. I develop custom themes that perfectly match your brand identity while ensuring optimal performance and user experience."
              delay={2}
            />
            <ServiceCard
              icon={Paintbrush}
              title="UI/UX Improvements"
              description="Enhance user experience and interface design. I analyze and improve your website's usability, accessibility, and visual appeal to increase engagement and conversions."
              delay={4}
            />
            <ServiceCard
              icon={Briefcase}
              title="Business Solutions"
              description="Integrations and automations for business efficiency. I connect your website with CRMs, email marketing tools, and other business systems to streamline your operations."
              delay={5}
            />
          </div>
        </section>

        {/* Benefits Section (NEW) */}
        <section className="container mx-auto px-4 mb-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <SparklesText text="Why Choose Me" colors={{ first: "#38bdf8", second: "#34d399" }} />
            <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
              Experience a partnership focused on quality, communication, and results
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <BenefitItem
              icon={Zap}
              title="Fast & Efficient"
              description="Quick turnaround times without sacrificing quality. I pride myself on delivering projects on schedule."
              delay={0}
            />
            <BenefitItem
              icon={CheckCircle}
              title="Quality Focused"
              description="Clean, well-documented code that's built to last. No shortcuts or quick fixes that cause problems later."
              delay={1}
            />
            <BenefitItem
              icon={ShieldCheck}
              title="Security First"
              description="Industry best practices for site security. I build with protection against common vulnerabilities."
              delay={2}
            />
            <BenefitItem
              icon={Clock}
              title="Responsive Support"
              description="Quick response to your questions and concerns. You'll never be left wondering about your project status."
              delay={3}
            />
            <BenefitItem
              icon={Trophy}
              title="Results Driven"
              description="Focus on business goals, not just technical specs. Your success is my success."
              delay={4}
            />
          </div>
        </section>

        {/* Process Section with animated timeline */}
        <section className="container mx-auto px-4 mb-16 relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <SparklesText text="My Process" colors={{ first: "#38bdf8", second: "#34d399" }} />
              <p className="text-gray-300 mt-4">How we'll work together to bring your project to life</p>
            </motion.div>

            <div className="space-y-12">
              {[
                {
                  number: "01",
                  title: "Discovery & Planning",
                  description: "We'll start with a detailed discussion about your business goals, target audience, and project requirements to establish a clear roadmap."
                },
                {
                  number: "02",
                  title: "Design & Development",
                  description: "Based on our planning, I'll create wireframes and mockups before developing your custom solution with regular updates and feedback sessions."
                },
                {
                  number: "03",
                  title: "Testing & Launch",
                  description: "Thorough testing across devices and browsers ensures everything works perfectly before we launch your project to the world."
                },
                {
                  number: "04",
                  title: "Support & Growth",
                  description: "Our relationship doesn't end at launch. I provide ongoing support and strategic guidance to help your digital presence grow."
                }
              ].map((step, index) => (
                <ProcessStep
                  key={index}
                  number={step.number}
                  title={step.title}
                  description={step.description}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action with enhanced animations */}
        <section className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto bg-gradient-to-r from-blue-900/30 to-cyan-900/30 p-8 md:p-12 rounded-xl border border-blue-500/20 backdrop-blur-sm text-center relative overflow-hidden"
            whileHover={{
              borderColor: "rgba(6, 182, 212, 0.3)",
              boxShadow: "0 0 30px rgba(6, 182, 212, 0.2)"
            }}
          >
            {/* Animated background elements */}
            <motion.div
              className="absolute top-0 left-0 w-full h-full"
              style={{ opacity: 0.1 }}
            >
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute bg-blue-400 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    height: `${Math.random() * 40 + 10}px`,
                    width: `${Math.random() * 40 + 10}px`,
                  }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </motion.div>

            <motion.h2
              className="text-2xl md:text-3xl font-bold mb-4 relative z-10"
              animate={{
                color: ["#fff", "#38bdf8", "#34d399", "#fff"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Ready to Discuss Your Project?
            </motion.h2>
            <p className="text-gray-300 mb-8 relative z-10">
              Let's collaborate to create a web solution that perfectly aligns with your business goals and delivers exceptional results.
            </p>
            <motion.a
              href="/contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 relative z-10"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 20px rgba(6, 182, 212, 0.5)"
              }}
              whileTap={{ scale: 0.95 }}
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
          </motion.div>
        </section>
      </main>
    </>
  );
};

export default Services;
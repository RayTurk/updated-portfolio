import React from "react";
import { motion } from "framer-motion";
import { Clock, Calendar, Layers, Zap, PenTool, Code, Monitor, Settings, FileCheck, ArrowRight, CheckCircle } from "lucide-react";
import SparklesText from "./ui/sparkles-text";

const ProjectTypeCard = ({ icon: Icon, title, description, hours, price, features }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden h-full hover:border-blue-500/20 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300"
      whileHover={{ y: -5 }}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 rounded-lg bg-blue-500/10">
            <Icon className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">{title}</h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-300 mb-6">{description}</p>

        {/* Estimate */}
        <div className="flex items-center justify-between mb-6 bg-gray-800/50 rounded-lg p-4">
          <div>
            <div className="text-gray-400 text-sm">Typical timeframe</div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-400" />
              <span className="text-white font-medium">{hours}</span>
            </div>
          </div>
          <div>
            <div className="text-gray-400 text-sm">Hourly rate starting at</div>
            <div className="text-white font-bold text-2xl">${price}</div>
          </div>
        </div>

        {/* Features */}
        <div className="mb-6">
          <h4 className="text-sm uppercase text-gray-400 mb-3">What's included</h4>
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-1" />
                <span className="text-gray-300 text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <a
          href="/contact"
          className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 font-medium text-sm group"
        >
          <span>Request a quote</span>
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" />
        </a>
      </div>
    </motion.div>
  );
};

const HourlyServices = () => {
  const projectTypes = [
    {
      icon: PenTool,
      title: "Website Design & Refresh",
      description: "Revitalize your existing website with modern design updates, improved user experience, and optimization for current standards.",
      hours: "20-40 hours",
      price: "85",
      features: [
        "Modern design update",
        "Mobile responsiveness review",
        "UX improvements",
        "Performance optimization",
        "Content restructuring"
      ]
    },
    {
      icon: Code,
      title: "Custom WordPress Development",
      description: "Get a tailor-made WordPress website built from scratch or extensively customized to perfectly match your business needs.",
      hours: "40-80 hours",
      price: "90",
      features: [
        "Custom theme development",
        "Plugin customization",
        "Advanced functionality",
        "API integrations",
        "Performance optimization"
      ]
    },
    {
      icon: Monitor,
      title: "Shopify Store Creation",
      description: "Launch a professional e-commerce store on Shopify with custom design, product setup, and integrated payment solutions.",
      hours: "30-60 hours",
      price: "90",
      features: [
        "Custom store design",
        "Product catalog setup",
        "Payment integration",
        "Shipping configuration",
        "Inventory management"
      ]
    },
    {
      icon: Settings,
      title: "Website Audit & Optimization",
      description: "Comprehensive audit of your website's performance, security, and SEO with implementation of recommended improvements.",
      hours: "15-25 hours",
      price: "75",
      features: [
        "Performance analysis",
        "SEO audit",
        "Security assessment",
        "Content review",
        "Competitor analysis"
      ]
    }
  ];

  const benefits = [
    {
      icon: Layers,
      title: "Transparent Process",
      description: "Detailed proposals with clear scope, regular updates, and itemized billing so you always know what you're paying for."
    },
    {
      icon: Calendar,
      title: "Flexible Scheduling",
      description: "Project milestones adapted to your business needs with realistic timelines and prioritized deliverables."
    },
    {
      icon: Zap,
      title: "Efficient Implementation",
      description: "Years of experience means faster execution, fewer revisions, and a streamlined process from concept to completion."
    },
    {
      icon: FileCheck,
      title: "Quality Assurance",
      description: "Rigorous testing across devices and browsers to ensure your project works flawlessly for all users."
    }
  ];

  return (
    <section className="py-16">
      <div className="text-center mb-16">
        <SparklesText text="Project-Based Services" />
        <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
          Custom web development projects billed at competitive hourly rates with transparent pricing and detailed proposals
        </p>
      </div>

      {/* Project types grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {projectTypes.map((project, index) => (
          <ProjectTypeCard key={index} {...project} />
        ))}
      </div>

      {/* Process explanation */}
      <div className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 rounded-2xl p-8 border border-blue-500/10 mb-16">
        <h3 className="text-2xl font-bold text-center mb-8">How Project Billing Works</h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
            <h4 className="font-semibold mb-2">Discovery</h4>
            <p className="text-gray-400 text-sm">Initial consultation to understand your requirements and goals</p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
            <h4 className="font-semibold mb-2">Proposal</h4>
            <p className="text-gray-400 text-sm">Detailed quote with estimated hours, timeline, and deliverables</p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
            <h4 className="font-semibold mb-2">Development</h4>
            <p className="text-gray-400 text-sm">Transparent progress updates with weekly hour reports</p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center mx-auto mb-4 text-xl font-bold">4</div>
            <h4 className="font-semibold mb-2">Launch</h4>
            <p className="text-gray-400 text-sm">Final review, approval, and deployment to your servers</p>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-300 italic">
            "Projects typically require a 50% deposit to begin, with the remaining balance due upon completion."
          </p>
        </div>
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {benefits.map((benefit, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-gray-900/30 rounded-xl p-6 border border-gray-800"
          >
            <div className="p-3 rounded-lg bg-blue-500/10 inline-block mb-4">
              <benefit.icon className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
            <p className="text-gray-400 text-sm">{benefit.description}</p>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center mt-16">
        <motion.a
          href="/contact"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300"
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 20px rgba(6, 182, 212, 0.5)"
          }}
          whileTap={{ scale: 0.95 }}
        >
          <span>Discuss Your Project</span>
          <ArrowRight className="w-5 h-5" />
        </motion.a>
      </div>
    </section>
  );
};

export default HourlyServices;
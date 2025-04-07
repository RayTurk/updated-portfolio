import React, { useState } from "react";
import { motion } from "framer-motion";
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
  ShieldCheck,
  Star,
  X
} from "lucide-react";
import SparklesText from "./ui/sparkles-text";
import useDocumentTitle from '../hooks/useDocumentTitle';
import SEO from './SEO';
import { generateBreadcrumbSchema } from '../utils/schema';
import Meteors from "./ui/meteors";

// Import our components
import ServiceCard from "./ServiceCard";
import ServiceModal from "./ServiceModal";

// Benefits Item component
const BenefitItem = ({ icon: Icon, title, description, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: delay * 0.05, duration: 0.2 }}
    className="flex items-start gap-4 hover:bg-blue-500/5 p-4 rounded-xl transition-all duration-75"
    whileHover={{
      x: 10,
      backgroundColor: "rgba(59, 130, 246, 0.05)",
      transition: { duration: 0.1 }
    }}
  >
    <motion.div
      className="p-2 rounded-full bg-blue-500/10 mt-1"
      whileHover={{
        rotate: [0, -10, 10, 0],
        transition: { duration: 0.2 }
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

// Pricing Tier component
const PricingTier = ({
  title,
  price,
  period,
  description,
  features,
  highlighted = false,
  cta = "Get Started",
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      className={`relative rounded-2xl h-full ${highlighted
        ? "bg-gradient-to-b from-blue-900/40 to-cyan-900/40 border-2 border-cyan-500/30"
        : "bg-gray-900/40 border border-gray-800"
        } overflow-hidden`}
    >
      {/* Popular badge */}
      {highlighted && (
        <div className="absolute top-0 right-0">
          <div className="relative">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rotate-45 transform translate-x-10 -translate-y-10"></div>
            <div className="relative">
              <Star className="absolute top-2 right-2 w-4 h-4 text-white" />
            </div>
          </div>

        </div>
      )}

      <div className="p-6 md:p-8 flex flex-col h-full">
        {/* Header */}
        <div className="text-center mb-6">
          <h3 className={`text-xl font-bold mb-2 ${highlighted ? "text-cyan-300" : "text-white"}`}>
            {title}
          </h3>
          <div className="flex items-center justify-center">
            <span className="text-3xl md:text-4xl font-bold">
              ${price}
            </span>
            <span className="text-gray-400 ml-2">/{period}</span>
          </div>
          <p className="text-gray-400 mt-2 text-sm">{description}</p>
        </div>

        {/* Features list */}
        <ul className="space-y-3 mb-8 flex-grow">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              {feature.included ? (
                <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              ) : (
                <X className="w-5 h-5 text-gray-500 shrink-0 mt-0.5" />
              )}
              <span className={`text-sm ${feature.included ? "text-gray-200" : "text-gray-500 line-through"}`}>
                {feature.text}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <a
          href="/contact"
          className={`block text-center py-3 px-4 rounded-lg font-medium transition-all ${highlighted
            ? "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
            : "bg-gray-800 hover:bg-gray-700 text-white"
            }`}
        >
          {cta}
        </a>
      </div>
    </motion.div>
  );
};

// Project type card component
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
      <div className="p-6 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 rounded-lg bg-blue-500/10">
            <Icon className="w-6 h-6 text-blue-400" />
          </div>
          <h3 className="text-xl font-bold text-white">{title}</h3>
        </div>

        {/* Description */}
        <p className="text-gray-300 mb-6">{description}</p>

        {/* Estimate */}
        <div className="flex flex-col gap-2 justify-between mb-6 bg-gray-800/50 rounded-lg p-4">
          <div>
            <div className="text-gray-400 text-sm">Typical timeframe</div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-400" />
              <span className="text-white font-medium">{hours}</span>
            </div>
          </div>
          <div>
            <div className="text-gray-400 text-sm">Hourly rate from</div>
            <div className="text-white font-bold text-2xl">${price}</div>
          </div>
        </div>

        {/* Features */}
        <div className="mb-6 flex-grow">
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

const Services = () => {
  useDocumentTitle('Services');

  // State for service modal
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle opening service modal
  const handleOpenServiceModal = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Generate breadcrumb schema
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://rturk.me/' },
    { name: 'Services', url: 'https://rturk.me/services' }
  ]);

  // Define service data with expanded details for modals
  const services = [
    {
      icon: Globe,
      title: "WordPress Development",
      description: "Custom WordPress solutions built with scalability and security in mind, tailored to your business needs.",
      featured: true,
      delay: 0,
      features: [
        "Custom theme development",
        "Plugin customization and development",
        "E-commerce integration with WooCommerce",
        "Multi-language support",
        "Performance optimization",
        "Security hardening"
      ],
      timeframe: "4-8 weeks",
      benefits: [
        "Complete control over site appearance and functionality",
        "SEO-friendly structure built into the core",
        "User-friendly content management system",
        "Scalable for future growth and expansion"
      ],
      limitations: [
        "Requires regular updates and maintenance",
        "More complex projects may take 8+ weeks to complete",
        "Custom functionality may require additional development time"
      ]
    },
    {
      icon: Server,
      title: "Website Maintenance",
      description: "Keep your site secure and performing optimally with regular updates, backups, and monitoring.",
      featured: true,
      delay: 1,
      features: [
        "Regular WordPress core, theme, and plugin updates",
        "Security monitoring and malware scanning",
        "Daily/weekly backups with secure off-site storage",
        "Uptime monitoring (99.9% guaranteed)",
        "Monthly performance optimization",
        "Technical support via email and phone"
      ],
      timeframe: "Ongoing monthly service",
      benefits: [
        "Proactive approach prevents most issues before they occur",
        "Regular optimization keeps your site running fast",
        "Peace of mind knowing your site is secure and backed up",
        "More time to focus on your business instead of website maintenance"
      ],
      limitations: [
        "Does not include major design changes or new feature development",
        "Emergency support response times vary by plan level",
        "Content updates may be limited depending on plan"
      ]
    },
    {
      icon: ShoppingCart,
      title: "Shopify Customization",
      description: "Create a professional e-commerce store with custom design, product setup, and payment integrations.",
      delay: 2,
      features: [
        "Theme customization and development",
        "Custom product page layouts",
        "Checkout optimization",
        "Payment gateway integration",
        "Shipping and tax configuration",
        "Third-party app integration"
      ],
      timeframe: "2-4 weeks",
      benefits: [
        "Professional e-commerce presence without enterprise costs",
        "Optimized for conversion and sales",
        "Mobile-friendly shopping experience",
        "Integration with your existing business systems"
      ],
      limitations: [
        "Monthly Shopify subscription fees apply",
        "Transaction fees may apply for some payment methods",
        "Advanced customizations may require ongoing development"
      ]
    },
    {
      icon: Code,
      title: "Custom Theme Development",
      description: "Unique, brand-aligned themes that improve site performance and create a memorable user experience.",
      delay: 3,
      features: [
        "Custom design implementation",
        "Responsive layouts for all devices",
        "Performance-optimized code",
        "Cross-browser compatibility",
        "Custom post types and taxonomies",
        "Advanced custom fields integration"
      ],
      timeframe: "3-6 weeks",
      benefits: [
        "Completely unique design that stands out from templates",
        "Performance built-in from the ground up",
        "No unnecessary bloat or code",
        "Tailored exactly to your brand and business needs"
      ],
      limitations: [
        "Requires more development time than pre-made themes",
        "Higher upfront investment",
        "Design approval process required before development"
      ]
    },
    {
      icon: Paintbrush,
      title: "UI/UX Improvements",
      description: "Enhance user experience with data-driven design improvements that boost engagement and conversions.",
      delay: 4,
      features: [
        "UX audit and analysis",
        "Wireframing and prototyping",
        "Conversion rate optimization",
        "Accessibility improvements (WCAG compliance)",
        "Mobile experience enhancement",
        "User flow optimization"
      ],
      timeframe: "2-4 weeks",
      benefits: [
        "Improved conversion rates and user satisfaction",
        "Reduced bounce rates and increased time on site",
        "Better accessibility for all users",
        "Data-driven design decisions"
      ],
      limitations: [
        "May require additional user testing for best results",
        "Some recommendations may require larger site restructuring",
        "Ongoing optimization is recommended for best results"
      ]
    },
    {
      icon: Briefcase,
      title: "Business Solutions",
      description: "Streamline operations by integrating your website with CRMs, email marketing, and other business tools.",
      delay: 5,
      features: [
        "CRM integration (HubSpot, Salesforce, etc.)",
        "Email marketing platform connection",
        "Automation workflow setup",
        "Payment system integration",
        "Form and lead capture optimization",
        "Custom reporting and dashboards"
      ],
      timeframe: "2-6 weeks",
      benefits: [
        "Streamlined business operations",
        "Reduced manual data entry and errors",
        "Improved customer data management",
        "Better marketing and sales alignment"
      ],
      limitations: [
        "May require ongoing subscriptions to third-party services",
        "Complex integrations may require maintenance",
        "Some systems have limited API capabilities"
      ]
    },
  ];

  // Define pricing tiers
  const pricingTiers = [
    {
      title: "Basic",
      price: "99",
      period: "month",
      description: "Essential website maintenance for small business sites",
      features: [
        { text: "Monthly WordPress Updates", included: true },
        { text: "Security Monitoring", included: true },
        { text: "Weekly Backups", included: true },
        { text: "Performance Check", included: true },
        { text: "Same-Day Support", included: false },
        { text: "Monthly Analytics Report", included: false },
        { text: "Content Updates (1/month)", included: false },
        { text: "24/7 Emergency Support", included: false },
      ],
      highlighted: false,
      cta: "Get Started",
      delay: 0,
    },
    {
      title: "Professional",
      price: "199",
      period: "month",
      description: "Complete care for business-critical websites",
      features: [
        { text: "Weekly WordPress Updates", included: true },
        { text: "Advanced Security Monitoring", included: true },
        { text: "Daily Backups", included: true },
        { text: "Monthly Performance Optimization", included: true },
        { text: "Same-Day Support", included: true },
        { text: "Monthly Analytics Report", included: true },
        { text: "Content Updates (4/month)", included: true },
        { text: "24/7 Emergency Support", included: false },
      ],
      highlighted: true,
      cta: "Most Popular",
      delay: 0.1,
    },
    {
      title: "Premium",
      price: "349",
      period: "month",
      description: "Enterprise-grade support and proactive management",
      features: [
        { text: "Priority WordPress Updates", included: true },
        { text: "Advanced Security Monitoring & Firewall", included: true },
        { text: "Real-Time Backups", included: true },
        { text: "Weekly Performance Optimization", included: true },
        { text: "Priority Support (4hr Response)", included: true },
        { text: "Weekly Analytics Reports", included: true },
        { text: "Unlimited Content Updates", included: true },
        { text: "24/7 Emergency Support", included: true },
      ],
      highlighted: false,
      cta: "Contact Me",
      delay: 0.2,
    },
  ];

  // Define project types for hourly services
  const projectTypes = [
    {
      icon: Paintbrush,
      title: "Website Design & Refresh",
      description: "Revitalize your existing website with modern design updates and improved user experience.",
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
      description: "Get a tailor-made WordPress website built from scratch or extensively customized.",
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
      icon: ShoppingCart,
      title: "Shopify Store Creation",
      description: "Launch a professional e-commerce store on Shopify with custom design and product setup.",
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
      icon: Server,
      title: "Website Audit & Optimization",
      description: "Comprehensive audit of your website's performance, security, and SEO with implemented improvements.",
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

  return (
    <>
      <SEO
        title="Web Development Services | Raymond Turk"
        keywords={['WordPress Development', 'Shopify Customization', 'Website Maintenance']}
        canonical="https://rturk.me/services"
        schema={breadcrumbSchema}
        pageType="services"
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
        <section className="container mx-auto px-4 mb-12 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            {/* Animated welcome badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 mb-4"
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
              className="mb-4"
            >
              <SparklesText text="My Services" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-lg text-gray-300 mb-6"
            >
              Creating efficient, scalable web solutions that bring ideas to life
            </motion.p>

            {/* Service category tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
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
            </div>
          </div>
        </section>

        {/* Services Grid with staggered animations and modal functionality */}
        <section className="container mx-auto px-4 mb-16 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
                featured={service.featured}
                delay={service.delay}
                onLearnMore={() => handleOpenServiceModal(service)}
                fullService={service}
              />
            ))}
          </div>
        </section>

        {/* Service modal */}
        <ServiceModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          service={selectedService}
        />

        {/* Pricing Tiers Section */}
        <section className="container mx-auto px-4 mb-16 relative z-10">
          <div className="text-center mb-8">
            <SparklesText text="Maintenance Plans" />
            <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
              Keep your website secure, up-to-date, and performing optimally with these maintenance plans
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <PricingTier key={index} {...tier} />
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-400 mb-2">
              All plans include a 14-day free trial. No credit card required.
            </p>
            <motion.a
              href="/contact"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
              whileHover={{ x: 5 }}
            >
              <span>Need a custom plan? Let's talk</span>
              <ArrowRight className="w-4 h-4" />
            </motion.a>
          </div>
        </section>

        {/* Hourly Services Section */}
        <section className="container mx-auto px-4 mb-16 relative z-10">
          <div className="text-center mb-8">
            <SparklesText text="Project-Based Services" />
            <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
              Custom web development projects billed at competitive hourly rates with transparent pricing
            </p>
          </div>

          {/* Project types grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {projectTypes.map((project, index) => (
              <ProjectTypeCard key={index} {...project} />
            ))}
          </div>

          {/* Process explanation */}
          <div className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 rounded-2xl p-6 border border-blue-500/10 mb-12">
            <h3 className="text-2xl font-bold text-center mb-8">How Project Billing Works</h3>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center mx-auto mb-3 text-xl font-bold">1</div>
                <h4 className="font-semibold mb-2">Discovery</h4>
                <p className="text-gray-400 text-sm">Initial consultation to understand your requirements</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center mx-auto mb-3 text-xl font-bold">2</div>
                <h4 className="font-semibold mb-2">Proposal</h4>
                <p className="text-gray-400 text-sm">Detailed quote with estimated hours and timeline</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center mx-auto mb-3 text-xl font-bold">3</div>
                <h4 className="font-semibold mb-2">Development</h4>
                <p className="text-gray-400 text-sm">Transparent progress with weekly hour reports</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center mx-auto mb-3 text-xl font-bold">4</div>
                <h4 className="font-semibold mb-2">Launch</h4>
                <p className="text-gray-400 text-sm">Final review and deployment to your servers</p>
              </div>
            </div>

            <div className="text-center mt-6">
              <p className="text-gray-300 italic text-sm">
                "Projects typically require a 50% deposit to begin, with the remaining balance due upon completion."
              </p>
            </div>
          </div>
        </section>

        {/* Why Choose Me Section - Condensed and focused */}
        <section className="container mx-auto px-4 mb-16 relative z-10">
          <div className="text-center mb-8">
            <SparklesText text="Why Choose Me" colors={{ first: "#38bdf8", second: "#34d399" }} />
            <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
              Quality, communication, and results are at the core of my services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
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
              className="text-center mb-8"
            >
              <SparklesText text="My Process" colors={{ first: "#38bdf8", second: "#34d399" }} />
              <p className="text-gray-300 mt-4">How we'll work together to bring your project to life</p>
            </motion.div>

            <div className="space-y-10">
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
            className="max-w-3xl mx-auto bg-gradient-to-r from-blue-900/30 to-cyan-900/30 p-8 rounded-xl border border-blue-500/20 backdrop-blur-sm text-center relative overflow-hidden"
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
              Let's collaborate to create a web solution that perfectly aligns with your business goals.
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
import React from "react";
import { motion } from "framer-motion";
import { Check, X, Star, ArrowRight } from "lucide-react";
import SparklesText from "./ui/sparkles-text";

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
      className={`relative rounded-2xl ${highlighted
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
          <div className="text-xs font-bold py-1 px-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
            POPULAR
          </div>
        </div>
      )}

      <div className="p-6 md:p-8">
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
        <ul className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              {feature.included ? (
                <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
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

const PricingTiers = () => {
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

  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <SparklesText text="Maintenance Plans" />
        <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
          Keep your website secure, up-to-date, and performing optimally with these comprehensive maintenance plans
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {pricingTiers.map((tier, index) => (
          <PricingTier key={index} {...tier} />
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-gray-400 mb-4">
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
  );
};

export default PricingTiers;
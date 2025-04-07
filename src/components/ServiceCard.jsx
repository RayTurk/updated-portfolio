import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

// Service Card component with modal functionality
const ServiceCard = ({
  icon: Icon,
  title,
  description,
  featured = false,
  delay = 0,
  onLearnMore,
  fullService // Pass the complete service data
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      className={`relative overflow-visible rounded-xl bg-gray-900/50 backdrop-blur-sm border ${featured
          ? "border-blue-500/20 shadow-lg shadow-blue-500/10"
          : "border-gray-800 hover:border-blue-500/20 hover:shadow-lg hover:shadow-blue-500/10"
        } p-6 flex flex-col h-full transition-all duration-75`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{
        y: -10,
        transition: { duration: 0.2 }
      }}
    >
      {/* Background gradient effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5"
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Featured indicator with animation */}
      {featured && (
        <motion.div
          className="absolute -top-3 -right-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-bold py-1 px-3 rounded-bl-lg rounded-tr-xl shadow-lg"
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
          } inline-block transition-all duration-75`}
        animate={{
          rotate: isHovered ? [0, -5, 5, 0] : 0,
          scale: isHovered ? 1.1 : 1
        }}
        transition={{
          duration: 0.3,
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
        transition={{ duration: 0.2 }}
      >
        {title}
      </motion.h3>

      <p className="text-gray-300 text-sm mb-4 flex-grow">{description}</p>

      {/* Learn more link with animation */}
      <motion.button
        className="inline-flex items-center gap-1 text-cyan-400 text-sm font-medium"
        whileHover={{ x: 5 }}
        animate={{
          opacity: isHovered ? 1 : 0.8,
        }}
        onClick={() => onLearnMore(fullService)}
        aria-label={`Learn more about ${title}`}
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
      </motion.button>
    </motion.div>
  );
};

export default ServiceCard;
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaEnvelope,
  FaCode,
  FaHeart
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();

  // Helper function to determine if a link is active
  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <footer className="relative bg-gray-900 border-t border-gray-800 pt-12 pb-8 text-gray-300">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-80"></div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
              Raymond Turk
            </h2>
            <p className="text-gray-300 mb-4 max-w-md">
              Full-Stack Developer specializing in WordPress and modern web technologies.
              Building creative solutions for the digital world.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4 mb-6">
              <a
                href="https://github.com/RayTurk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-blue-400 transition-colors"
              >
                <FaGithub size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/raymond-turk-625097137/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-blue-400 transition-colors"
              >
                <FaLinkedin size={20} />
              </a>
              <a
                href="mailto:rturk.me@gmail.com"
                className="text-gray-300 hover:text-blue-400 transition-colors"
              >
                <FaEnvelope size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className={`transition-colors ${isActive("/") && location.pathname === "/"
                    ? "text-blue-400 font-medium"
                    : "text-gray-300 hover:text-blue-400"
                    }`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className={`transition-colors ${isActive("/about")
                    ? "text-blue-400 font-medium"
                    : "text-gray-300 hover:text-blue-400"
                    }`}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/skills"
                  className={`transition-colors ${isActive("/skills")
                    ? "text-blue-400 font-medium"
                    : "text-gray-300 hover:text-blue-400"
                    }`}
                >
                  Skills
                </Link>
              </li>
              <li>
                <Link
                  to="/experience"
                  className={`transition-colors ${isActive("/experience")
                    ? "text-blue-400 font-medium"
                    : "text-gray-300 hover:text-blue-400"
                    }`}
                >
                  Experience
                </Link>
              </li>
              <li>
                <Link
                  to="/projects"
                  className={`transition-colors ${isActive("/projects")
                    ? "text-blue-400 font-medium"
                    : "text-gray-300 hover:text-blue-400"
                    }`}
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className={`transition-colors ${isActive("/contact")
                    ? "text-blue-400 font-medium"
                    : "text-gray-300 hover:text-blue-400"
                    }`}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-gray-300">
                <FaEnvelope size={16} />
                <a
                  href="mailto:rturk.me@gmail.com"
                  className="hover:text-blue-400 transition-colors"
                >
                  rturk.me@gmail.com
                </a>
              </li>
              <li className="text-gray-300">
                Cleveland, Ohio
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent my-6"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {currentYear} Raymond Turk. All rights reserved.
          </p>

          <p className="text-gray-500 text-sm flex items-center gap-1">
            <span>Made with</span>
            <FaHeart className="text-red-500" size={14} />
            <span>and</span>
            <FaCode className="text-blue-400" size={14} />
          </p>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500"></div>
    </footer>
  );
};

export default Footer;
import React, { useState, useEffect, useRef } from "react";
import {
  FaHome,
  FaLaptopCode,
  FaUser,
  FaBriefcase,
  FaGraduationCap,
  FaCode,
  FaEnvelope,
  FaBars,
  FaTimes,
  FaWordpress,
  FaShopify
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(() => {
    const path = location.pathname.substring(1) || "home";
    return path;
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuClosing, setIsMenuClosing] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const closeTimeoutRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close mobile menu when window resizes to desktop size
  useEffect(() => {
    if (windowWidth >= 768 && isMenuOpen) {
      handleMenuClose();
    }
  }, [windowWidth, isMenuOpen]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const handleMenuClose = () => {
    setIsMenuClosing(true);
    closeTimeoutRef.current = setTimeout(() => {
      setIsMenuOpen(false);
      setIsMenuClosing(false);
    }, 300); // Match this to your animation duration
  };

  const toggleMenu = () => {
    if (isMenuOpen) {
      handleMenuClose();
    } else {
      setIsMenuOpen(true);
    }
  };

  const handleLinkClick = (id) => {
    setActiveLink(id);
    handleMenuClose();
  };

  const navLinks = [
    { id: "home", icon: FaHome, text: "Home", path: "/" },
    { id: "skills", icon: FaCode, text: "Skills", path: "/skills" },
    {
      id: "experience",
      icon: FaBriefcase,
      text: "Experience",
      path: "/experience",
    },
    { id: "projects", icon: FaLaptopCode, text: "Projects", path: "/projects" },
    { id: "contact", icon: FaEnvelope, text: "Contact", path: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gray-800/95 backdrop-blur-md md:bg-transparent md:backdrop-blur-none">
      <div className="md:fixed md:top-4 md:left-1/2 md:transform md:-translate-x-1/2 w-full md:w-auto">
        <div className="bg-gradient-to-r from-emerald-400 via-cyan-500 to-indigo-500 md:p-[2px] md:rounded-full animate-gradient-x">
          <nav className="bg-gray-800/90 backdrop-blur-md md:rounded-full px-4 md:px-6 py-2.5">
            {/* Mobile Menu Button */}
            <div className="flex justify-between items-center md:hidden px-2">
              <Link to="/" className="text-white font-bold">Portfolio</Link>
              <button
                onClick={toggleMenu}
                className="text-white p-2 relative z-20"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMenuOpen ? (
                  <FaTimes className="animate-spin-once" />
                ) : (
                  <FaBars className="animate-bounce-subtle" />
                )}
              </button>
            </div>

            {/* Navigation Links - Desktop view always visible, mobile animated */}
            <div
              className={`
                ${isMenuOpen && !isMenuClosing ? 'flex mobile-menu-open' : ''}
                ${isMenuClosing ? 'flex mobile-menu-closing' : ''}
                ${!isMenuOpen && !isMenuClosing ? 'hidden' : ''}
                md:flex
              `}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-1 lg:gap-2 py-1 md:py-0">
                {navLinks.map(({ id, icon: Icon, text, path }, index) => (
                  <Link
                    key={id}
                    to={path}
                    onClick={() => handleLinkClick(id)}
                    className={`px-3 py-3 md:py-1.5 rounded-lg md:rounded-full text-sm font-medium
                      transition-all duration-300 flex items-center gap-3
                      hover:bg-gray-700/70
                      ${activeLink === id
                        ? "bg-gray-700/80 text-white"
                        : "text-gray-300 hover:text-white"
                      }
                      mobile-menu-item
                    `}
                    style={{
                      animationDelay: isMenuClosing ? `${(navLinks.length - 1 - index) * 0.05}s` : `${index * 0.1}s`
                    }}
                  >
                    <Icon
                      className={`text-lg ${activeLink === id ? "scale-110 text-blue-400" : ""}`}
                    />
                    <span className="inline">{text}</span>
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </div>
      </div>

      {/* Overlay for mobile menu */}
      {(isMenuOpen || isMenuClosing) && (
        <div
          className={`fixed inset-0 bg-black/50 backdrop-blur-sm md:hidden ${isMenuClosing ? 'mobile-overlay-closing' : 'mobile-overlay'}`}
          onClick={handleMenuClose}
        />
      )}

      <style>{`
        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient-x {
          animation: gradient-x 3s linear infinite;
          background-size: 200% 200%;
        }

        @keyframes spin-once {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-once {
          animation: spin-once 0.5s ease-out;
        }

        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 1s infinite;
        }

        /* Mobile menu opening animation */
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Mobile menu closing animation */
        @keyframes slideUp {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(-10px); }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }

        .mobile-overlay {
          animation: fadeIn 0.3s ease-out forwards;
        }

        .mobile-overlay-closing {
          animation: fadeOut 0.3s ease-out forwards;
        }

        .mobile-menu-open {
          display: flex;
          flex-direction: column;
          animation: slideDown 0.3s ease-out forwards;
        }

        .mobile-menu-closing {
          display: flex;
          flex-direction: column;
          animation: slideUp 0.3s ease-out forwards;
        }

        .mobile-menu-open .mobile-menu-item {
          opacity: 0;
          animation: slideDown 0.5s ease-out forwards;
        }

        .mobile-menu-closing .mobile-menu-item {
          animation: slideUp 0.3s ease-out forwards;
        }

        @media (max-width: 767px) {
          .mobile-menu-open, .mobile-menu-closing {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background-color: rgba(31, 41, 55, 0.95); /* matches gray-800 */
            backdrop-filter: blur(8px);
            padding: 0.5rem;
            border-radius: 0 0 0.75rem 0.75rem;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
          }
        }
      `}</style>
    </header>
  );
}
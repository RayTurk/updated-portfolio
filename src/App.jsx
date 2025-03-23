import React, { useState, useEffect } from "react";
import Hero from "./components/Hero";
import "./assets/css/index.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Projects from "./components/Projects";
import About from "./components/About";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import AnimatedPage from "./components/AnimatedPage";
import { HelmetProvider } from 'react-helmet-async';
import SEO from './components/SEO';
import { generateWebsiteSchema, generatePersonSchema } from './utils/schema';

// Add a background component to separate visual effects from content
const BackgroundEffects = () => (
  <>
    {/* Full-page dark gradient background */}
    <div className="fixed inset-0 bg-gradient-to-b from-[#020617] via-[#0a0f1f] to-[#000D1A]/90 -z-10" aria-hidden="true"></div>

    {/* Optional: decorative elements */}
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-5" aria-hidden="true">
      {/* Add any global background effects here */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-500/10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl"></div>
    </div>
  </>
);

export default function App() {
  const [isOnePage, setIsOnePage] = useState(false); // Toggle state
  const location = useLocation();

  useEffect(() => {
    // Push page view to dataLayer when route changes
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'pageview',
        page: {
          path: location.pathname,
          title: document.title
        }
      });
    }
  }, [location]);

  // Combine website and person schema for the homepage
  const homeSchema = [
    generateWebsiteSchema(),
    generatePersonSchema()
  ];

  return (
    <HelmetProvider>
      <div className="max-w-[100vw] overflow-x-hidden min-h-screen">
        {/* Global SEO component with website schema */}
        <SEO schema={homeSchema} canonical="https://rturk.me" />

        {/* Skip to content link - visible only when focused */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-blue-600 text-white px-4 py-2 rounded focus:outline-none"
        >
          Skip to content
        </a>

        {/* Static background effects */}
        <BackgroundEffects />

        {/* App content - separated from backdrop effects */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <Header />
          <main id="main-content" className="flex-grow" role="main">
            {/* Conditional Rendering */}
            {isOnePage ? (
              // One-Page Mode: Render all components together
              <>
                <section aria-labelledby="hero-heading">
                  <h1 id="hero-heading" className="sr-only">Home</h1>
                  <Hero />
                </section>
                <section aria-labelledby="skills-heading">
                  <h2 id="skills-heading" className="sr-only">Skills</h2>
                  <Skills />
                </section>
                <section aria-labelledby="experience-heading">
                  <h2 id="experience-heading" className="sr-only">Experience</h2>
                  <Experience />
                </section>
                <section aria-labelledby="contact-heading">
                  <h2 id="contact-heading" className="sr-only">Contact</h2>
                  <Contact />
                </section>
              </>
            ) : (
              // Router Mode: Use routes for navigation with AnimatePresence for transitions
              <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                  <Route path="/" element={
                    <AnimatedPage>
                      <Hero />
                    </AnimatedPage>
                  } />
                  <Route path="/skills" element={
                    <AnimatedPage>
                      <Skills />
                    </AnimatedPage>
                  } />
                  <Route path="/experience" element={
                    <AnimatedPage>
                      <Experience />
                    </AnimatedPage>
                  } />
                  <Route path="/contact" element={
                    <AnimatedPage>
                      <Contact />
                    </AnimatedPage>
                  } />
                  <Route path="/projects" element={
                    <AnimatedPage>
                      <Projects />
                    </AnimatedPage>
                  } />
                  <Route path="/about" element={
                    <AnimatedPage>
                      <About />
                    </AnimatedPage>
                  } />
                </Routes>
              </AnimatePresence>
            )}
          </main>
          <Footer />
        </div>
      </div>
    </HelmetProvider>
  );
}
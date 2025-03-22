import React, { useState } from "react";
import Hero from "./components/Hero";
import "./assets/css/index.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Projects from "./components/Projects";
import About from "./components/About";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import AnimatedPage from "./components/AnimatedPage";

// Add a background component to separate visual effects from content
const BackgroundEffects = () => (
  <>
    {/* Full-page dark gradient background */}
    <div className="fixed inset-0 bg-gradient-to-b from-[#020617] via-[#0a0f1f] to-[#000D1A]/90 -z-10"></div>

    {/* Optional: decorative elements */}
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-5">
      {/* Add any global background effects here */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-500/10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl"></div>
    </div>
  </>
);

export default function App() {
  const [isOnePage, setIsOnePage] = useState(false); // Toggle state
  const location = useLocation();

  return (
    <div className="max-w-[100vw] overflow-x-hidden min-h-screen">
      {/* Static background effects */}
      <BackgroundEffects />

      {/* App content - separated from backdrop effects */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow">
          {/* Conditional Rendering */}
          {isOnePage ? (
            // One-Page Mode: Render all components together
            <>
              <Hero />
              <Skills />
              <Experience />
              <Education />
              <Contact />
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
                <Route path="/education" element={
                  <AnimatedPage>
                    <Education />
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
        </div>
        <Footer />
      </div>
    </div>
  );
}
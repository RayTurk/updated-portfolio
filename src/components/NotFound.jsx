import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, Search, AlertTriangle } from "lucide-react";
import SparklesText from "./ui/sparkles-text";
import Meteors from "./ui/meteors";
import SEO from './SEO';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <SEO
        title="Page Not Found | 404 Error"
        description="Sorry, the page you are looking for could not be found. Navigate back to Raymond Turk's portfolio homepage."
        keywords={['404', 'Not Found', 'Missing Page']}
        canonical="https://rturk.me/404"
        noIndex={true}
        pageType="error"
      />

      <main className="min-h-screen pt-32 pb-20 bg-gradient-to-b from-[#020617] via-[#0a0f1f] to-[#000D1A]/90 text-white relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-red-500/10 rounded-full filter blur-3xl animate-pulse delay-1000"></div>

          {/* Meteors effect */}
          <div className="absolute inset-0 overflow-hidden">
            <Meteors number={7} />
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            {/* 404 Text with animation */}
            <div className="mb-8 relative">
              <div className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-purple-600">
                404
              </div>

              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-2 border-red-500/20 rounded-full animate-ping opacity-20"></div>

              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-purple-500/30 rounded-full animate-ping opacity-20 animation-delay-1000"></div>
            </div>

            <div className="mb-6">
              <SparklesText text="Page Not Found" colors={{ first: "#f87171", second: "#c084fc" }} />
            </div>

            <div className="p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 mb-8">
              <div className="flex items-center justify-center mb-4 text-amber-400">
                <AlertTriangle className="w-6 h-6 mr-2" />
                <h2 className="text-xl font-semibold">Oops! You've ventured too far</h2>
              </div>

              <p className="text-gray-300 mb-4">
                The page you're looking for doesn't exist or has been moved.
              </p>

              <p className="text-gray-400 text-sm">
                Don't worry, you can navigate back to safety using the options below.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                onClick={() => navigate(-1)}
                className="bg-gray-800 hover:bg-gray-700 flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Go Back</span>
              </Button>

              <Link to="/">
                <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  <span>Back to Home</span>
                </Button>
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap justify-center gap-4">
              <h3 className="w-full text-lg font-medium mb-2 text-gray-300">Popular Pages</h3>
              <Link to="/about" className="text-blue-400 hover:text-blue-300 hover:underline">About</Link>
              <Link to="/projects" className="text-blue-400 hover:text-blue-300 hover:underline">Projects</Link>
              <Link to="/services" className="text-blue-400 hover:text-blue-300 hover:underline">Services</Link>
              <Link to="/blog" className="text-blue-400 hover:text-blue-300 hover:underline">Blog</Link>
              <Link to="/contact" className="text-blue-400 hover:text-blue-300 hover:underline">Contact</Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default NotFound;
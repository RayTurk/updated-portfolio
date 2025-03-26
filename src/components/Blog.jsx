// src/components/Blog.jsx - Updated with left sidebar layout
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getPosts, getCategories } from "../services/wordpressApi";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import useDocumentTitle from '../hooks/useDocumentTitle';
import SparklesText from "./ui/sparkles-text";
import Meteors from "./ui/meteors";
import { CalendarDays, Clock, ArrowRight, Tag, Search, Filter, X } from "lucide-react";
import SEO from './SEO';
import { generateBreadcrumbSchema } from '../utils/schema';
import { motion } from "framer-motion";

// Blog Card component for displaying post previews
const BlogCard = ({ post }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Extract data from WordPress post
  const title = post.title.rendered;
  const excerpt = post.excerpt.rendered;
  const date = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const readingTime = Math.ceil(post.content.rendered.replace(/<[^>]*>/g, '').split(' ').length / 200);
  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;
  const categories = post._embedded?.['wp:term']?.[0] || [];
  const slug = post.slug;

  return (
    <Card
      className="h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 border border-gray-800 bg-gray-900/80"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {featuredImage && (
        <div className="relative w-full h-48 overflow-hidden">
          <img
            src={featuredImage}
            alt={title}
            className={`w-full h-full object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70"></div>
        </div>
      )}

      <CardHeader className="pb-2">
        <div className="flex flex-wrap gap-2 mb-2">
          {categories.map(category => (
            <Badge key={category.id} variant="secondary" className="bg-blue-500/20 text-blue-300 hover:bg-blue-500/30">
              {category.name}
            </Badge>
          ))}
        </div>
        <CardTitle
          className="text-xl text-white hover:text-blue-400 transition-colors line-clamp-2"
          dangerouslySetInnerHTML={{ __html: title }}
        />
      </CardHeader>

      <CardContent className="pb-2">
        <div
          className="text-gray-300 mb-4 line-clamp-3 text-sm"
          dangerouslySetInnerHTML={{ __html: excerpt }}
        />

        <div className="flex items-center text-sm text-gray-400 gap-4">
          <div className="flex items-center gap-1">
            <CalendarDays className="w-4 h-4" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{readingTime} min read</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-2">
        <Link
          to={`/blog/${slug}`}
          className="text-blue-400 hover:text-blue-300 flex items-center gap-1 text-sm font-medium transition-all duration-300 group"
        >
          <span>Read Article</span>
          <ArrowRight className={`w-4 h-4 transform transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
        </Link>
      </CardFooter>
    </Card>
  );
};

// Blog page component with left sidebar layout
const Blog = () => {
  useDocumentTitle('Blog');
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Generate breadcrumb schema
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://rturk.me/' },
    { name: 'Blog', url: 'https://rturk.me/blog' }
  ]);

  // Fetch posts and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Prepare query parameters
        const queryParams = {
          page: currentPage,
          perPage: 9,
        };

        if (activeCategory) {
          queryParams.categories = activeCategory;
        }

        if (searchQuery) {
          queryParams.search = searchQuery;
        }

        // Fetch posts
        const { posts: fetchedPosts, totalPages: fetchedTotalPages } = await getPosts(queryParams);
        setPosts(fetchedPosts);
        setTotalPages(fetchedTotalPages);

        // Fetch categories if not already loaded
        if (categories.length === 0) {
          const fetchedCategories = await getCategories();
          setCategories(fetchedCategories);
        }

        setError(null);
      } catch (err) {
        console.error("Error fetching blog data:", err);
        setError("Failed to load blog posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, activeCategory, searchQuery]);

  // Handle category filter change
  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId === activeCategory ? null : categoryId);
    setCurrentPage(1); // Reset to first page when changing filters
  };

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const query = formData.get("searchQuery");
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Handle search input clear
  const clearSearch = () => {
    if (searchQuery) {
      setSearchQuery("");
      setCurrentPage(1);
    }
  };

  return (
    <>
      <SEO
        title="Blog | Web Development Insights"
        description="Read the latest articles about WordPress development, Shopify customization, web optimization, and more from Raymond Turk's professional experiences."
        keywords={['WordPress Blog', 'Web Development Articles', 'Shopify Tips', 'Cleveland Developer Blog', 'Raymond Turk Web Development']}
        canonical="https://rturk.me/blog"
        schema={breadcrumbSchema}
      />

      <main className="min-h-screen pt-32 pb-20 bg-gradient-to-b from-[#020617] via-[#0a0f1f] to-[#000D1A]/90 text-white relative">
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse delay-1000"></div>

          {/* Meteors effect */}
          <div className="absolute inset-0 overflow-hidden">
            <Meteors number={5} />
          </div>
        </div>

        {/* Page content */}
        <div className="container mx-auto px-4 relative z-10">
          {/* Header section */}
          <div className="text-center mb-12">
            <SparklesText text="My Blog" />
            <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
              Thoughts, insights, and tutorials about WordPress, Shopify, and web development
            </p>
          </div>

          {/* Two-column layout with sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left sidebar */}
            <div className="lg:col-span-1">
              {/* Search bar */}
              <div className="mb-6">
                <form onSubmit={handleSearch} className="w-full">
                  <div className="relative">
                    <input
                      type="text"
                      name="searchQuery"
                      placeholder="Search articles..."
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                      defaultValue={searchQuery}
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={clearSearch}
                        className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white p-1"
                        aria-label="Clear search"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      type="submit"
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-400 p-1"
                      aria-label="Search"
                    >
                      <Search className="w-5 h-5" />
                    </button>
                  </div>
                </form>
              </div>

              {/* Categories section */}
              <div className="mb-6">
                <Card className="border-gray-800 bg-gray-900/50 overflow-hidden">
                  <div className="p-4">
                    <h3 className="text-lg font-medium mb-3 flex items-center gap-2 text-white">
                      <Filter className="w-5 h-5 text-blue-400" />
                      <span>Categories</span>
                    </h3>
                    <div className="flex flex-col gap-2">
                      {categories.map(category => (
                        <button
                          key={category.id}
                          onClick={() => handleCategoryChange(category.id)}
                          className={`text-left px-3 py-2 rounded-md flex justify-between items-center transition-colors ${activeCategory === category.id
                              ? "bg-blue-500/20 text-blue-300"
                              : "text-gray-300 hover:bg-gray-800/70 hover:text-white"
                            }`}
                        >
                          <span>{category.name}</span>
                          <Badge variant="outline" className="bg-gray-800/50 text-gray-400 border-gray-700">
                            {category.count || 0}
                          </Badge>
                        </button>
                      ))}
                    </div>
                  </div>
                </Card>
              </div>

              {/* Call to action - styled like the About page CTA */}
              <div className="hidden lg:block">
                <motion.div
                  className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 p-6 rounded-xl border border-cyan-500/20 backdrop-blur-sm text-center relative overflow-hidden"
                  whileHover={{
                    borderColor: "rgba(6, 182, 212, 0.3)",
                    boxShadow: "0 0 30px rgba(6, 182, 212, 0.2)"
                  }}
                >
                  <motion.h2
                    className="text-xl font-bold mb-3"
                    animate={{
                      color: ["#fff", "#38bdf8", "#34d399", "#fff"],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    Ready for a Custom Website?
                  </motion.h2>
                  <p className="text-gray-300 mb-4 text-sm">
                    Let's collaborate to create a web solution that perfectly aligns with your business goals.
                  </p>
                  <motion.a
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 w-full justify-center"
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 0 20px rgba(6, 182, 212, 0.5)"
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>Let's Talk</span>
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
              </div>
            </div>

            {/* Main content area - blog posts */}
            <div className="lg:col-span-3">
              {/* Search results indicator */}
              {searchQuery && (
                <div className="mb-6 bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                  <p className="text-gray-300 flex items-center justify-between">
                    <span>
                      {posts.length} {posts.length === 1 ? 'result' : 'results'} found for "{searchQuery}"
                    </span>
                    <button
                      onClick={clearSearch}
                      className="text-blue-400 hover:text-blue-300 underline flex items-center gap-1"
                    >
                      <X className="w-4 h-4" /> Clear search
                    </button>
                  </p>
                </div>
              )}

              {/* Active category indicator */}
              {activeCategory && (
                <div className="mb-6 bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                  <p className="text-gray-300 flex items-center justify-between">
                    <span>
                      Filtering by: {categories.find(c => c.id === activeCategory)?.name}
                    </span>
                    <button
                      onClick={() => setActiveCategory(null)}
                      className="text-blue-400 hover:text-blue-300 underline flex items-center gap-1"
                    >
                      <X className="w-4 h-4" /> Clear filter
                    </button>
                  </p>
                </div>
              )}

              {/* Content display states */}
              {loading ? (
                // Loading state
                <div className="flex justify-center items-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
                </div>
              ) : error ? (
                // Error state
                <div className="text-center py-12 bg-red-500/10 rounded-lg border border-red-500/20">
                  <p className="text-red-400">{error}</p>
                  <Button
                    onClick={() => window.location.reload()}
                    className="mt-4 bg-red-500 hover:bg-red-600"
                  >
                    Try Again
                  </Button>
                </div>
              ) : posts.length === 0 ? (
                // Empty state
                <div className="text-center py-12 bg-gray-800/50 rounded-lg border border-gray-700/50">
                  <p className="text-gray-300">No posts found. Try changing your search criteria.</p>
                  {(searchQuery || activeCategory) && (
                    <Button
                      onClick={() => {
                        setSearchQuery("");
                        setActiveCategory(null);
                      }}
                      className="mt-4 bg-blue-500 hover:bg-blue-600"
                    >
                      Clear Filters
                    </Button>
                  )}
                </div>
              ) : (
                // Posts grid
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {posts.map(post => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                  <Button
                    disabled={currentPage <= 1}
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    variant="outline"
                    className="border-gray-700 text-gray-300 hover:bg-gray-800"
                  >
                    Previous
                  </Button>

                  <div className="flex gap-2">
                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                      // Show first page, last page, current page, and pages around current
                      let pageToShow;

                      if (totalPages <= 5) {
                        // If 5 or fewer pages, show all
                        pageToShow = i + 1;
                      } else if (currentPage <= 3) {
                        // Near start
                        pageToShow = i + 1;
                        if (i === 4) pageToShow = totalPages;
                      } else if (currentPage >= totalPages - 2) {
                        // Near end
                        pageToShow = i === 0 ? 1 : totalPages - 4 + i;
                      } else {
                        // Middle
                        pageToShow = currentPage - 2 + i;
                        if (i === 0) pageToShow = 1;
                        if (i === 4) pageToShow = totalPages;
                      }

                      return (
                        <Button
                          key={pageToShow}
                          onClick={() => setCurrentPage(pageToShow)}
                          variant={currentPage === pageToShow ? "default" : "outline"}
                          className={currentPage === pageToShow
                            ? "bg-blue-600 hover:bg-blue-700"
                            : "border-gray-700 text-gray-300 hover:bg-gray-800"
                          }
                        >
                          {pageToShow}
                        </Button>
                      );
                    })}
                  </div>

                  <Button
                    disabled={currentPage >= totalPages}
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    variant="outline"
                    className="border-gray-700 text-gray-300 hover:bg-gray-800"
                  >
                    Next
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile CTA - only visible on smaller screens - matched to About page */}
          <div className="block lg:hidden mt-8">
            <motion.div
              className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 p-6 rounded-xl border border-cyan-500/20 backdrop-blur-sm text-center relative overflow-hidden"
              whileHover={{
                borderColor: "rgba(6, 182, 212, 0.3)",
                boxShadow: "0 0 30px rgba(6, 182, 212, 0.2)"
              }}
            >
              <motion.h2
                className="text-xl font-bold mb-3"
                animate={{
                  color: ["#fff", "#38bdf8", "#34d399", "#fff"],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                Ready for a Custom Website?
              </motion.h2>
              <p className="text-gray-300 mb-4 text-sm">
                Let's collaborate to create a web solution that perfectly aligns with your business goals.
              </p>
              <motion.a
                href="/contact"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 w-full justify-center"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 20px rgba(6, 182, 212, 0.5)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Let's Talk</span>
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
          </div>
        </div>
      </main>
    </>
  );
};

export default Blog;
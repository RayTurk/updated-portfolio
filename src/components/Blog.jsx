import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, Tag, ChevronRight, Search } from "lucide-react";
import SparklesText from "./ui/sparkles-text";
import useDocumentTitle from '../hooks/useDocumentTitle';
import SEO from './SEO';
import { generateBreadcrumbSchema, generateBlogPostSchema } from '../utils/schema';
import Meteors from "./ui/meteors";

// BlogPost preview card with hover effects
const BlogPostCard = ({ post, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative overflow-hidden rounded-xl bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:border-blue-500/20 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{
        y: -5,
        transition: { duration: 0.2 }
      }}
    >
      {/* Featured image with overlay */}
      <div className="relative w-full h-48 overflow-hidden">
        <motion.img
          src={post.featuredImage}
          alt={post.title}
          className="w-full h-full object-cover"
          animate={{
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ duration: 0.3 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent"></div>

        {/* Category badge */}
        <div className="absolute top-4 left-4 bg-blue-500/80 text-white text-xs font-bold py-1 px-3 rounded-full">
          {post.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Post meta */}
        <div className="flex items-center gap-4 text-gray-400 text-sm mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{post.readTime} min read</span>
          </div>
        </div>

        {/* Title */}
        <motion.h3
          className="text-xl font-bold mb-3 line-clamp-2"
          animate={{
            color: isHovered ? "#38bdf8" : "#ffffff",
          }}
          transition={{ duration: 0.2 }}
        >
          {post.title}
        </motion.h3>

        {/* Excerpt */}
        <p className="text-gray-300 text-sm mb-4 line-clamp-3">
          {post.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag, i) => (
            <span
              key={i}
              className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Read more link */}
        <motion.div
          className="inline-flex items-center gap-1 text-cyan-400 text-sm font-medium"
          whileHover={{ x: 5 }}
          animate={{
            opacity: isHovered ? 1 : 0.8,
          }}
        >
          <span>Read article</span>
          <motion.span
            animate={{ x: isHovered ? [0, 5, 0] : 0 }}
            transition={{
              repeat: isHovered ? Infinity : 0,
              repeatType: "loop",
              duration: 1.5,
              ease: "easeInOut"
            }}
          >
            <ChevronRight className="w-4 h-4" />
          </motion.span>
        </motion.div>
      </div>

      {/* Link wrapper */}
      <Link
        to={`/blog/${post.slug}`}
        className="absolute inset-0 z-10"
        aria-label={`Read more about ${post.title}`}
      />
    </motion.div>
  );
};

// Filter sidebar component
const FilterSidebar = ({ categories, tags, activeCategory, activeTag, onCategoryChange, onTagChange, onSearch }) => (
  <div className="w-full lg:w-1/4 space-y-6">
    {/* Search */}
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-4">
      <h3 className="text-lg font-bold mb-3">Search</h3>
      <div className="relative">
        <input
          type="text"
          placeholder="Search articles..."
          className="w-full bg-gray-800/50 text-white border border-gray-700 rounded-lg py-2 pl-4 pr-10 focus:outline-none focus:border-blue-500 transition-colors"
          onChange={(e) => onSearch(e.target.value)}
        />
        <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
      </div>
    </div>

    {/* Categories */}
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-4">
      <h3 className="text-lg font-bold mb-3">Categories</h3>
      <div className="space-y-2">
        <button
          className={`block w-full text-left py-1.5 px-3 rounded-lg transition-colors ${activeCategory === 'all' ? 'bg-blue-500/20 text-blue-400' : 'text-gray-300 hover:bg-gray-800/50'
            }`}
          onClick={() => onCategoryChange('all')}
        >
          All Categories
        </button>
        {categories.map((category, index) => (
          <button
            key={index}
            className={`block w-full text-left py-1.5 px-3 rounded-lg transition-colors ${activeCategory === category ? 'bg-blue-500/20 text-blue-400' : 'text-gray-300 hover:bg-gray-800/50'
              }`}
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>

    {/* Tags */}
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-4">
      <h3 className="text-lg font-bold mb-3">Popular Tags</h3>
      <div className="flex flex-wrap gap-2">
        <button
          className={`text-sm px-3 py-1 rounded-full ${activeTag === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          onClick={() => onTagChange('all')}
        >
          All
        </button>
        {tags.map((tag, index) => (
          <button
            key={index}
            className={`text-sm px-3 py-1 rounded-full ${activeTag === tag ? 'bg-blue-500 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            onClick={() => onTagChange(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  </div>
);

// Main Blog component
const Blog = () => {
  useDocumentTitle('Blog');

  // Demo blog post data (will be replaced by actual data later)
  const blogPosts = [
    {
      id: 1,
      title: "5 Essential WordPress Security Tips for Small Businesses",
      slug: "wordpress-security-tips-small-businesses",
      excerpt: "Protect your WordPress site from hackers with these essential security measures that every small business owner should implement.",
      content: "",
      date: "March 20, 2025",
      readTime: 5,
      author: "Raymond Turk",
      featuredImage: "/placeholder.svg?height=480&width=640",
      category: "WordPress",
      tags: ["security", "wordpress", "small-business"]
    },
    {
      id: 2,
      title: "How to Speed Up Your WordPress Site in 2025",
      slug: "speed-up-wordpress-site-2025",
      excerpt: "Learn the latest techniques to optimize your WordPress site's performance and provide a better user experience.",
      content: "",
      date: "March 15, 2025",
      readTime: 8,
      author: "Raymond Turk",
      featuredImage: "/placeholder.svg?height=480&width=640",
      category: "Performance",
      tags: ["performance", "wordpress", "optimization"]
    },
    {
      id: 3,
      title: "Building Custom Shopify Themes: A Developer's Guide",
      slug: "custom-shopify-themes-developer-guide",
      excerpt: "A comprehensive guide to creating custom Shopify themes that stand out from the crowd and deliver exceptional user experiences.",
      content: "",
      date: "March 10, 2025",
      readTime: 12,
      author: "Raymond Turk",
      featuredImage: "/placeholder.svg?height=480&width=640",
      category: "Shopify",
      tags: ["shopify", "themes", "development"]
    },
    {
      id: 4,
      title: "Integrating Payment Gateways with WordPress and WooCommerce",
      slug: "payment-gateways-wordpress-woocommerce",
      excerpt: "A step-by-step guide to adding popular payment gateways to your WordPress e-commerce store and optimizing the checkout experience.",
      content: "",
      date: "March 5, 2025",
      readTime: 6,
      author: "Raymond Turk",
      featuredImage: "/placeholder.svg?height=480&width=640",
      category: "E-commerce",
      tags: ["wordpress", "woocommerce", "payments"]
    },
    {
      id: 5,
      title: "The Future of Web Development: Trends to Watch in 2025",
      slug: "web-development-trends-2025",
      excerpt: "Explore the emerging technologies and methodologies that are shaping the future of web development this year and beyond.",
      content: "",
      date: "February 28, 2025",
      readTime: 7,
      author: "Raymond Turk",
      featuredImage: "/placeholder.svg?height=480&width=640",
      category: "Trends",
      tags: ["trends", "future", "technology"]
    },
    {
      id: 6,
      title: "Creating Accessible WordPress Websites: Best Practices",
      slug: "accessible-wordpress-websites-best-practices",
      excerpt: "Learn how to build WordPress websites that everyone can use, regardless of their abilities or disabilities.",
      content: "",
      date: "February 20, 2025",
      readTime: 9,
      author: "Raymond Turk",
      featuredImage: "/placeholder.svg?height=480&width=640",
      category: "Accessibility",
      tags: ["accessibility", "wordpress", "inclusive-design"]
    }
  ];

  // Extract unique categories and tags
  const categories = [...new Set(blogPosts.map(post => post.category))];
  const tags = [...new Set(blogPosts.flatMap(post => post.tags))];

  // State for filtering and search
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeTag, setActiveTag] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter posts based on active filters and search query
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
    const matchesTag = activeTag === 'all' || post.tags.includes(activeTag);
    const matchesSearch = searchQuery === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesTag && matchesSearch;
  });

  // Generate breadcrumb schema
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://rturk.me/' },
    { name: 'Blog', url: 'https://rturk.me/blog' }
  ]);

  // Generate blog schema for each post
  const blogSchemas = blogPosts.map(post => generateBlogPostSchema({
    title: post.title,
    excerpt: post.excerpt,
    slug: post.slug,
    datePublished: post.date,
    author: post.author,
    image: post.featuredImage
  }));

  // Combine schemas
  const schemas = [breadcrumbSchema, ...blogSchemas];

  return (
    <>
      <SEO
        title="Web Development Blog | WordPress & Shopify Tips"
        description="Explore insights, tutorials, and best practices for WordPress, Shopify, and web development. Stay up-to-date with the latest trends in the digital space."
        keywords={['WordPress Tips', 'Shopify Development', 'Web Development Blog', 'E-commerce Tutorials', 'Cleveland Developer Blog']}
        canonical="https://rturk.me/blog"
        schema={schemas}
      />
      <main className="pt-32 pb-20 bg-gradient-to-b from-[#020617] via-[#0a0f1f] to-[#000D1A]/90 text-white min-h-screen relative">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse delay-1000"></div>

          {/* Meteors effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <Meteors number={5} />
          </div>
        </div>

        {/* Hero Section */}
        <section className="container mx-auto px-4 mb-16 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Animated welcome badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 mb-6"
            >
              <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
              <span className="text-gray-300 text-sm font-medium">
                Insights & Tutorials
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-6"
            >
              <SparklesText text="Blog & Resources" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-xl text-gray-300 mb-8"
            >
              Sharing knowledge on WordPress, Shopify, and web development best practices
            </motion.p>
          </div>
        </section>

        {/* Blog Content Section */}
        <section className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <FilterSidebar
              categories={categories}
              tags={tags}
              activeCategory={activeCategory}
              activeTag={activeTag}
              onCategoryChange={setActiveCategory}
              onTagChange={setActiveTag}
              onSearch={setSearchQuery}
            />

            {/* Blog posts grid */}
            <div className="w-full lg:w-3/4">
              {filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredPosts.map((post, index) => (
                    <BlogPostCard key={post.id} post={post} index={index} />
                  ))}
                </div>
              ) : (
                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-8 text-center">
                  <h3 className="text-xl font-bold mb-3">No posts found</h3>
                  <p className="text-gray-300">Try adjusting your filters or search query</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Blog;
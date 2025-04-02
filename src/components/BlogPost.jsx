// src/components/BlogPost.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getPost, getPosts } from "../services/wordpressApi";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Calendar, Clock, Share2, Tag, ThumbsUp, User, ArrowRight } from "lucide-react";
import Meteors from "./ui/meteors";
import SEO from './SEO';
import { generateBreadcrumbSchema } from '../utils/schema';
import profileImage from "../assets/images/profile.png";
import { motion } from "framer-motion";

// Share button component
const ShareButton = ({ url, title }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: title,
        url: url,
      }).catch(err => {
        console.error('Error sharing:', err);
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(url).then(() => {
        setShowTooltip(true);
        setTimeout(() => setShowTooltip(false), 2000);
      }).catch(err => {
        console.error('Error copying to clipboard:', err);
      });
    }
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        className="border-gray-700 hover:bg-gray-800"
        onClick={handleShare}
      >
        <Share2 className="mr-2 h-4 w-4" />
        Share
      </Button>

      {showTooltip && (
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-blue-900 text-white px-3 py-1 rounded text-sm whitespace-nowrap">
          Copied to clipboard!
        </div>
      )}
    </div>
  );
};

// Related post card component
const RelatedPostCard = ({ post }) => {
  // Extract data from WordPress post
  const title = post.title.rendered;
  const date = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;
  const slug = post.slug;

  return (
    <Link to={`/blog/${slug}`} className="block group">
      <Card className="overflow-hidden h-full bg-gray-900/50 border-gray-800 hover:border-blue-500/20 transition-all duration-300">
        {featuredImage && (
          <div className="relative h-32 overflow-hidden">
            <img
              src={featuredImage}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70"></div>
          </div>
        )}

        <div className="p-4">
          <h3
            className="text-white group-hover:text-blue-400 transition-colors text-sm font-medium line-clamp-2 mb-2"
            dangerouslySetInnerHTML={{ __html: title }}
          />

          <div className="text-xs text-gray-400">
            {date}
          </div>
        </div>
      </Card>
    </Link>
  );
};

// BlogPost component for individual post pages
const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch post data
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        setLoading(true);

        // Reset scroll position
        window.scrollTo(0, 0);

        // Fetch post by slug
        const fetchedPost = await getPost(slug, true);

        if (!fetchedPost) {
          setError("Post not found");
          setLoading(false);
          return;
        }

        setPost(fetchedPost);

        // Set document title
        document.title = `${fetchedPost.title.rendered} | Raymond Turk - Web Developer`;

        // Fetch related posts from the same category
        if (fetchedPost._embedded?.['wp:term']?.[0]?.length > 0) {
          const categoryId = fetchedPost._embedded['wp:term'][0][0].id;
          const { posts } = await getPosts({
            categories: categoryId,
            perPage: 3,
            exclude: fetchedPost.id
          });

          setRelatedPosts(posts);
        }

        setError(null);
      } catch (err) {
        console.error("Error fetching post:", err);
        setError("Failed to load the blog post. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPostData();

    // Cleanup function to reset document title
    return () => {
      document.title = "Raymond Turk | Web Developer";
    };
  }, [slug]);

  // Prepare data for SEO
  const getSEOData = () => {
    if (!post) return {};

    // Remove HTML tags for description
    const stripHTML = (html) => {
      const doc = new DOMParser().parseFromString(html, 'text/html');
      return doc.body.textContent || "";
    };

    // Create a unique description from the post content
    let description = "";

    // Try to use excerpt first
    if (post.excerpt && post.excerpt.rendered) {
      description = stripHTML(post.excerpt.rendered);
    } else if (post.content && post.content.rendered) {
      // Fall back to content if excerpt is not available
      const contentText = stripHTML(post.content.rendered);

      // Try to get a meaningful first paragraph
      const paragraphs = contentText.split(/\n\s*\n/);
      const firstParagraph = paragraphs.find(p => p.trim().length > 80) || paragraphs[0] || "";

      description = firstParagraph.trim();
    }

    // Add title if description is too short
    if (!description || description.length < 80) {
      const postTitle = stripHTML(post.title.rendered);
      const contentSummary = stripHTML(post.content.rendered).substring(0, 120);
      description = `${postTitle}: ${contentSummary}`;
    }

    // Include category information to make it more unique
    const categories = post._embedded?.['wp:term']?.[0] || [];
    if (categories.length > 0) {
      const categoryNames = categories.map(cat => cat.name).join(", ");
      if (description.length < 120 && !description.includes(categoryNames)) {
        description = `${description.substring(0, 100)} [${categoryNames}]`;
      }
    }

    // Ensure the right length for meta description (between 140-160 characters)
    if (description.length > 160) {
      description = description.substring(0, 157) + "...";
    } else if (description.length < 140) {
      // If too short, add a call to action
      description = `${description} Learn more about WordPress development and web solutions by Ray Turk.`.substring(0, 160);
    }

    // Extract keywords from categories and tags
    const tags = post._embedded?.['wp:term']?.[1] || [];
    const allKeywords = [...categories, ...tags].map(term => term.name);

    // Get featured image if available
    const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;

    // Generate breadcrumb schema
    const breadcrumbSchema = generateBreadcrumbSchema([
      { name: 'Home', url: 'https://rturk.me/' },
      { name: 'Blog', url: 'https://rturk.me/blog' },
      { name: stripHTML(post.title.rendered), url: `https://rturk.me/blog/${post.slug}` }
    ]);

    return {
      title: stripHTML(post.title.rendered),
      description,
      keywords: allKeywords,
      ogImage: featuredImage,
      canonical: `https://rturk.me/blog/${post.slug}`,
      schema: breadcrumbSchema,
      articlePublishedTime: post.date,
      articleModifiedTime: post.modified,
      articleTags: allKeywords,
      pageType: "blogPost" // Specify page type
    };
  };

  // If loading, show loading spinner
  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-gradient-to-b from-[#020617] via-[#0a0f1f] to-[#000D1A]/90 text-white flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  // If error or no post found, show error message
  if (error || !post) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-gradient-to-b from-[#020617] via-[#0a0f1f] to-[#000D1A]/90 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center py-12 bg-red-500/10 rounded-lg border border-red-500/20 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold text-white mb-4">
              {error || "Blog post not found"}
            </h1>
            <p className="text-gray-300 mb-6">
              The blog post you're looking for might have been removed or doesn't exist.
            </p>
            <Button
              onClick={() => navigate('/blog')}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Extract all needed data from the post
  const title = post.title.rendered;
  const content = post.content.rendered;
  const date = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const modified = new Date(post.modified).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const readingTime = Math.ceil(post.content.rendered.replace(/<[^>]*>/g, '').split(' ').length / 200);
  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;
  const categories = post._embedded?.['wp:term']?.[0] || [];
  const tags = post._embedded?.['wp:term']?.[1] || [];
  const author = post._embedded?.['author']?.[0] || { name: 'Raymond Turk' };

  const seoData = getSEOData();

  return (
    <>
      <SEO {...seoData} />

      <main className="min-h-screen pt-32 pb-20 bg-gradient-to-b from-[#020617] via-[#0a0f1f] to-[#000D1A]/90 text-white relative">
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse delay-1000"></div>

          {/* Meteors effect (fewer than on blog list page) */}
          <div className="absolute inset-0 overflow-hidden">
            <Meteors number={3} />
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Navigation */}
          <div className="mb-8">
            <Button
              variant="outline"
              onClick={() => navigate('/blog')}
              className="border-gray-700 hover:bg-gray-800"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content area */}
            <div className="lg:col-span-2">
              {/* Featured image */}
              {featuredImage && (
                <div className="mb-8 rounded-xl overflow-hidden">
                  <img src={featuredImage} alt={title} className="w-full h-auto" />
                </div>
              )}

              {/* Article header */}
              <div className="mb-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  {categories.map(category => (
                    <Link
                      key={category.id}
                      to={`/blog?category=${category.id}`}
                    >
                      <Badge className="bg-blue-500/20 text-blue-300 hover:bg-blue-500/30">
                        {category.name}
                      </Badge>
                    </Link>
                  ))}
                </div>

                <h1
                  className="text-3xl md:text-4xl font-bold mb-4 text-white leading-tight"
                  dangerouslySetInnerHTML={{ __html: title }}
                />

                <div className="flex flex-wrap items-center text-sm text-gray-400 gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>{author.name}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{readingTime} min read</span>
                  </div>
                </div>

                <div className="border-t border-gray-800 pt-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {/* <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-700 hover:bg-gray-800"
                    >
                      <ThumbsUp className="mr-2 h-4 w-4" />
                      Like
                    </Button> */}

                    <ShareButton
                      url={window.location.href}
                      title={document.title}
                    />
                  </div>

                  {date !== modified && (
                    <div className="text-xs text-gray-500">
                      Updated: {modified}
                    </div>
                  )}
                </div>
              </div>

              {/* Article content */}
              <article className="prose prose-invert prose-lg max-w-none mb-12">
                <div
                  className="wp-content"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              </article>

              {/* Tags */}
              {tags && tags.length > 0 && (
                <div className="mb-8 border-t border-gray-800 pt-6">
                  <div className="flex items-start gap-2">
                    <Tag className="w-5 h-5 mt-1 text-gray-400" />
                    <div className="flex flex-wrap gap-2">
                      {tags.map(tag => (
                        <Link
                          key={tag.id}
                          to={`/blog?tag=${tag.id}`}
                        >
                          <Badge
                            variant="outline"
                            className="border-gray-700 hover:border-gray-600 hover:bg-gray-800"
                          >
                            {tag.name}
                          </Badge>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Author bio */}
              <Card className="mb-8 border-gray-800 bg-gray-900/50">
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-800">
                      <img
                        src={profileImage}
                        alt={author.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Ray Turk</h3>
                      <p className="text-sm text-gray-400">Full-Stack Developer</p>
                    </div>
                  </div>

                  <p className="text-gray-300 text-sm mb-4">
                    I'm a WordPress specialist with over 5 years of experience building custom themes and plugins. I help businesses of all sizes create efficient, scalable web solutions.
                  </p>

                  <Link to="/about">
                    <Button
                      variant="outline"
                      className="w-full border-gray-700 hover:bg-gray-800"
                    >
                      View Profile
                    </Button>
                  </Link>
                </div>
              </Card>

              {/* Related posts */}
              {relatedPosts.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4 text-white">Related Articles</h3>
                  <div className="space-y-4">
                    {relatedPosts.map(relatedPost => (
                      <RelatedPostCard key={relatedPost.id} post={relatedPost} />
                    ))}
                  </div>
                </div>
              )}

              {/* Categories */}
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4 text-white">Categories</h3>
                <Card className="border-gray-800 bg-gray-900/50">
                  <div className="p-4">
                    <div className="flex flex-wrap gap-2">
                      {categories.map(category => (
                        <Link
                          key={category.id}
                          to={`/blog?category=${category.id}`}
                        >
                          <Badge className="bg-blue-500/20 text-blue-300 hover:bg-blue-500/30">
                            {category.name}
                          </Badge>
                        </Link>
                      ))}
                    </div>
                  </div>
                </Card>
              </div>

              {/* Call to action - styled like the About page CTA */}
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
        </div>
      </main>
    </>
  );
};

export default BlogPost;
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, Tag, User, ArrowLeft, Facebook, Twitter, Linkedin, Copy, CheckCircle2 } from "lucide-react";
import useDocumentTitle from '../hooks/useDocumentTitle';
import SEO from './SEO';
import { generateBlogPostSchema, generateBreadcrumbSchema } from '../utils/schema';
import Meteors from "./ui/meteors";
import { marked } from "marked"; // Import the marked library

// Related Post component
const RelatedPostCard = ({ post }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg overflow-hidden hover:border-blue-500/20 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{
        y: -5,
        transition: { duration: 0.2 }
      }}
    >
      <div className="relative h-32 overflow-hidden">
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
      </div>
      <div className="p-4">
        <h4 className="font-bold mb-2 text-white group-hover:text-blue-400 transition-colors">
          {post.title}
        </h4>
        <div className="flex items-center text-gray-400 text-xs">
          <Calendar className="w-3 h-3 mr-1" />
          <span>{post.date}</span>
        </div>
        <Link to={`/blog/${post.slug}`} className="absolute inset-0 z-10" aria-label={`Read more about ${post.title}`} />
      </div>
    </motion.div>
  );
};

// Share buttons component
const ShareButtons = ({ url, title }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-gray-300 text-sm">Share:</span>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-gray-800 hover:bg-blue-800 text-white p-2 rounded-full transition-colors"
        aria-label="Share on Facebook"
      >
        <Facebook className="w-4 h-4" />
      </a>
      <a
        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-gray-800 hover:bg-blue-500 text-white p-2 rounded-full transition-colors"
        aria-label="Share on Twitter"
      >
        <Twitter className="w-4 h-4" />
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-gray-800 hover:bg-blue-700 text-white p-2 rounded-full transition-colors"
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="w-4 h-4" />
      </a>
      <button
        onClick={copyToClipboard}
        className="bg-gray-800 hover:bg-green-700 text-white p-2 rounded-full transition-colors"
        aria-label="Copy link to clipboard"
      >
        {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      </button>
    </div>
  );
};

// Table of Contents component
const TableOfContents = ({ headings }) => (
  <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-4 sticky top-24">
    <h3 className="text-lg font-bold mb-3">Table of Contents</h3>
    <ul className="space-y-2">
      {headings.map((heading, index) => (
        <li key={index} className={`pl-${(heading.level - 2) * 3}`}>
          <a
            href={`#${heading.id}`}
            className="text-gray-300 hover:text-blue-400 transition-colors block py-1"
          >
            {heading.text}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

// Configure marked renderer
// Configure marked renderer
const configureMarkedRenderer = () => {
  const renderer = new marked.Renderer();

  // Helper function to safely convert any value to a string
  const safeToString = (value) => {
    if (value === null || value === undefined) {
      return '';
    }

    if (typeof value === 'object') {
      try {
        // For React elements or complex objects, try to get meaningful string
        return value.toString ? value.toString() : JSON.stringify(value);
      } catch (e) {
        return '[Complex Object]';
      }
    }

    return String(value);
  };

  // Customize heading rendering
  renderer.heading = (text, level) => {
    const safeText = safeToString(text);
    const id = safeText.toLowerCase().replace(/[^\w]+/g, '-');
    let className = '';

    if (level === 2) {
      className = 'text-2xl font-bold mt-8 mb-4';
    } else if (level === 3) {
      className = 'text-xl font-bold mt-6 mb-3';
    } else {
      className = 'font-bold mt-4 mb-2';
    }

    return `<h${level} id="${id}" class="${className}">${safeText}</h${level}>`;
  };

  // Customize paragraph rendering
  renderer.paragraph = (text) => {
    return `<p class="mb-4 text-gray-300">${safeToString(text)}</p>`;
  };

  // Customize list rendering
  renderer.list = (body, ordered) => {
    const type = ordered ? 'ol' : 'ul';
    return `<${type} class="mb-4 pl-5 ${ordered ? 'list-decimal' : 'list-disc'} space-y-2">${body}</${type}>`;
  };

  // Customize list item rendering
  renderer.listitem = (text) => {
    return `<li class="text-gray-300">${safeToString(text)}</li>`;
  };

  // Customize link rendering
  renderer.link = (href, title, text) => {
    return `<a href="${href}" ${title ? `title="${title}"` : ''} class="text-blue-400 hover:text-blue-300 transition-colors">${safeToString(text)}</a>`;
  };

  // Customize code block rendering
  renderer.code = (code, language) => {
    return `<pre class="bg-gray-800 p-4 rounded-lg overflow-x-auto mb-4"><code class="text-gray-300 ${language ? `language-${language}` : ''}">${safeToString(code)}</code></pre>`;
  };

  // Customize inline code rendering
  renderer.codespan = (code) => {
    return `<code class="bg-gray-800 text-gray-300 px-1 py-0.5 rounded">${safeToString(code)}</code>`;
  };

  // Customize blockquote rendering
  renderer.blockquote = (quote) => {
    return `<blockquote class="border-l-4 border-blue-500 pl-4 py-1 mb-4 italic text-gray-400">${safeToString(quote)}</blockquote>`;
  };

  return renderer;
};

// Configure marked options
const configureMarked = () => {
  const renderer = configureMarkedRenderer();

  marked.setOptions({
    renderer: renderer,
    headerIds: true,
    gfm: true,
    breaks: true,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: true
  });
};

// Extract headings from the HTML content
const extractHeadingsFromHTML = (htmlContent) => {
  const headings = [];
  const headingRegex = /<h([2-6])\s+id="([^"]+)"[^>]*>(.*?)<\/h\1>/g;

  let match;
  while ((match = headingRegex.exec(htmlContent)) !== null) {
    const level = parseInt(match[1]);
    const id = match[2];
    // Remove any HTML tags from the heading text
    const text = match[3].replace(/<\/?[^>]+(>|$)/g, "");

    headings.push({ level, id, text });
  }

  return headings;
};

// Main BlogPost component
const BlogPost = () => {
  const { slug } = useParams();
  const [formattedContent, setFormattedContent] = useState('');
  const [headings, setHeadings] = useState([]);

  // Demo blog posts data - this array will be empty, you'll add your blog content later
  const blogPosts = [
    {
      id: 1,
      title: "5 Essential WordPress Security Tips for Small Businesses",
      slug: "wordpress-security-tips-small-businesses",
      excerpt: "Protect your WordPress site from hackers with these essential security measures that every small business owner should implement.",
      content: `
## Introduction

WordPress powers over 40% of all websites on the internet, making it a prime target for hackers. Small businesses are particularly vulnerable because they often lack dedicated IT security resources. In this article, I'll share five essential security measures to protect your WordPress site from common threats.

## 1. Keep Everything Updated

One of the most important security practices is keeping your WordPress core, plugins, and themes updated. Updates often include patches for security vulnerabilities that hackers can exploit.

### Why Updates Matter

Outdated software is one of the leading causes of website breaches. WordPress core updates address security issues promptly, and plugin developers regularly release patches to fix vulnerabilities.

### Best Practices for Updates

- Set up automatic updates for minor WordPress releases
- Review and update plugins weekly
- Use a staging site to test major updates before applying them to your live site
- Remove any plugins or themes you're not actively using

## 2. Use Strong Authentication

Weak passwords remain one of the easiest ways for hackers to gain unauthorized access to your site.

### Authentication Best Practices

- Enforce strong passwords for all user accounts
- Implement two-factor authentication (2FA)
- Limit login attempts to prevent brute force attacks
- Change the default "admin" username
- Use unique passwords for your WordPress admin, hosting account, and email

## 3. Install a Security Plugin

A good security plugin can provide an additional layer of protection by monitoring your site for suspicious activity.

### Recommended Security Features

- Malware scanning
- Firewall protection
- Login security
- File integrity monitoring
- Regular security scans

## 4. Back Up Your Website Regularly

Backups won't prevent an attack, but they will save you if your site is compromised.

### Backup Best Practices

- Automate your backups to run daily
- Store backups in multiple locations (not just on your server)
- Test restoring from backups periodically
- Keep backups for at least 30 days

## 5. Use HTTPS and SSL

HTTPS encrypts data transferred between your website and your visitors, providing both security and SEO benefits.

### Why HTTPS Matters

- Protects sensitive information like login credentials and payment details
- Builds trust with your visitors
- Provides a ranking boost in Google search results
- Required for many modern web features

## Conclusion

Implementing these five security measures will significantly improve your WordPress site's security posture. Remember that website security is not a one-time task but an ongoing process. Regular maintenance and vigilance are key to keeping your small business website secure.
      `,
      date: "March 20, 2025",
      readTime: 5,
      author: "Raymond Turk",
      authorBio: "Raymond is a Full-Stack Developer specializing in WordPress and custom solutions. With over 5 years of experience, he helps businesses build secure and efficient websites.",
      authorImage: "/src/assets/images/profile.png",
      featuredImage: "/placeholder.svg?height=480&width=640",
      category: "WordPress",
      tags: ["security", "wordpress", "small-business"],
      relatedPosts: [2, 4, 6]
    },
    {
      id: 2,
      title: "How to Speed Up Your WordPress Site in 2025",
      slug: "speed-up-wordpress-site-2025",
      excerpt: "Learn the latest techniques to optimize your WordPress site's performance and provide a better user experience.",
      content: `
    ## Why Website Speed Matters

    In 2025, website speed is more critical than ever. Users expect pages to load in under 2 seconds, and search engines like Google use page speed as a ranking factor. A slow WordPress site can lead to higher bounce rates, lower conversions, and frustrated visitors.

    ## 1. Choose High-Quality Hosting

    Your hosting provider is the foundation of your site's performance. Shared hosting might be cheaper, but it often leads to slower load times.

    ### Hosting Recommendations

    - Consider managed WordPress hosting for optimized performance
    - Look for hosts that offer server-side caching
    - Choose a hosting location close to your primary audience
    - Ensure your hosting plan includes sufficient resources for your traffic

    ## 2. Implement Proper Caching

    Caching creates static versions of your dynamic content, reducing server load and improving delivery speed.

    ### Effective Caching Strategies

    - Use a caching plugin like WP Rocket or LiteSpeed Cache
    - Enable browser caching to store resources locally
    - Implement Redis or Memcached for object caching
    - Consider using a CDN to cache content globally

    ## 3. Optimize Your Images

    Images often account for the majority of a page's weight. Optimizing them can significantly improve load times.

    ### Image Optimization Techniques

    - Compress all images before uploading
    - Use modern formats like WebP
    - Implement lazy loading for images below the fold
    - Set appropriate image dimensions in your HTML
    - Consider using an image CDN

    ## 4. Minimize HTTP Requests

    Each element on your page requires a separate HTTP request, which adds to the load time.

    ### Reducing HTTP Requests

    - Combine CSS and JavaScript files
    - Use CSS sprites for small, repeating images
    - Remove unnecessary plugins
    - Disable emojis and embeds if you don't use them
    - Consider implementing icon fonts instead of multiple icon images

    ## 5. Database Optimization

    A bloated database can slow down your entire WordPress site.

    ### Database Tuning Tips

    - Regularly clean up post revisions, spam comments, and orphaned metadata
    - Optimize database tables monthly
    - Implement database query caching
    - Consider using object caching for database-heavy operations
    - Schedule regular database maintenance

    ## 6. Use a Content Delivery Network (CDN)

    CDNs distribute your content across multiple servers worldwide, reducing the physical distance between your users and your server.

    ### CDN Implementation

    - Choose a CDN compatible with WordPress
    - Configure your CDN to cache both static and dynamic content
    - Set up proper cache invalidation rules
    - Optimize your CDN for mobile users

    ## 7. Adopt Modern Technologies

    Embrace new web technologies that can significantly improve performance.

    ### Advanced Optimization Techniques

    - Implement HTTP/3 and QUIC protocols
    - Use DNS prefetching and preconnect for external resources
    - Apply preloading for critical resources
    - Consider implementing server-side rendering for dynamic content
    - Explore edge computing solutions for ultra-fast delivery

    ## Conclusion

    Optimizing your WordPress site's speed is an ongoing process rather than a one-time fix. By implementing these seven strategies, you can significantly improve your site's performance, provide a better user experience, and potentially boost your search engine rankings. Remember to test your site's speed regularly and make incremental improvements over time.
      `,
      date: "March 15, 2025",
      readTime: 8,
      author: "Raymond Turk",
      authorBio: "Raymond is a Full-Stack Developer specializing in WordPress and custom solutions. With over 5 years of experience, he helps businesses build secure and efficient websites.",
      authorImage: "/src/assets/images/profile.png",
      featuredImage: "/placeholder.svg?height=480&width=640",
      category: "Performance",
      tags: ["performance", "wordpress", "optimization"],
      relatedPosts: [1, 4, 5]
    },
    {
      id: 3,
      title: "Building Custom Shopify Themes: A Developer's Guide",
      slug: "custom-shopify-themes-developer-guide",
      excerpt: "A comprehensive guide to creating custom Shopify themes that stand out from the crowd and deliver exceptional user experiences.",
      content: `
    ## Introduction to Shopify Theme Development

    Shopify has become one of the leading e-commerce platforms, with over a million businesses using it worldwide. While Shopify offers many excellent pre-built themes, creating a custom theme allows you to deliver a unique shopping experience tailored to your client's brand and business needs.

    ## Setting Up Your Development Environment

    Before diving into theme development, you need to set up a proper workflow.

    ### Essential Tools

    - Install Shopify CLI for local theme development
    - Set up Git for version control
    - Use Node.js and npm for asset compilation
    - Configure a code editor with Liquid syntax highlighting
    - Install Themekit as a backup development option

    ### Local Development Setup

    - Initialize a new theme with Shopify CLI
    - Connect to a development store
    - Set up a local server for real-time preview
    - Configure hot reloading for faster development

    ## Understanding Shopify Theme Architecture

    Shopify themes follow a specific structure that developers need to understand.

    ### Theme Structure

    - Layout files control the overall structure
    - Templates render specific page types
    - Sections are reusable components
    - Snippets are small, reusable code fragments
    - Assets contain your CSS, JavaScript, and images
    - Locales handle multi-language support
    - Config files control theme settings

    ## Working with Liquid

    Liquid is Shopify's templating language and the foundation of theme development.

    ### Liquid Basics

    - Objects access content from your store
    - Tags control the logic and flow
    - Filters modify how content is displayed
    - Use includes for modular code
    - Master conditional logic for dynamic content

    ### Advanced Liquid Techniques

    - Create custom Liquid filters
    - Use JavaScript to enhance Liquid capabilities
    - Implement caching strategies for better performance
    - Work with metafields for extended functionality
    - Create section blocks for maximum flexibility

    ## Designing for E-commerce Success

    A successful Shopify theme needs to balance aesthetics with conversion optimization.

    ### Design Principles

    - Focus on product presentation
    - Optimize the checkout flow
    - Create intuitive navigation
    - Design for mobile-first
    - Implement progressive enhancement
    - Consider accessibility from the start

    ## Performance Optimization

    E-commerce sites must be fast to convert effectively.

    ### Optimization Techniques

    - Minimize and bundle CSS and JavaScript
    - Optimize images with responsive image techniques
    - Implement lazy loading for below-fold content
    - Use resource hints for faster page loads
    - Limit the use of apps that inject code
    - Employ critical CSS rendering

    ## Testing Your Theme

    Thorough testing is essential before launching a custom Shopify theme.

    ### Testing Strategies

    - Test across multiple devices and browsers
    - Validate against Shopify's theme requirements
    - Perform lighthouse audits for performance
    - Conduct user testing for usability
    - Test all e-commerce functionality thoroughly
    - Check ADA compliance for accessibility

    ## Deploying and Maintaining Themes

    Launching is just the beginning of a theme's lifecycle.

    ### Deployment Process

    - Use theme version control
    - Implement a proper staging workflow
    - Create a deployment checklist
    - Plan for theme updates
    - Set up monitoring for post-launch issues

    ## Conclusion

    Building custom Shopify themes requires a combination of technical skills, design sensibility, and e-commerce knowledge. By following the guidelines in this article, you'll be well-equipped to create themes that not only look great but also drive conversions and provide an excellent shopping experience. Remember that theme development is an iterative process—continue to refine and optimize based on real-world usage and feedback.
      `,
      date: "March 10, 2025",
      readTime: 12,
      author: "Raymond Turk",
      authorBio: "Raymond is a Full-Stack Developer specializing in WordPress and custom solutions. With over 5 years of experience, he helps businesses build secure and efficient websites.",
      authorImage: "/src/assets/images/profile.png",
      featuredImage: "/placeholder.svg?height=480&width=640",
      category: "Shopify",
      tags: ["shopify", "themes", "development"],
      relatedPosts: [4, 5, 6]
    },
    {
      id: 4,
      title: "Integrating Payment Gateways with WordPress and WooCommerce",
      slug: "payment-gateways-wordpress-woocommerce",
      excerpt: "A step-by-step guide to adding popular payment gateways to your WordPress e-commerce store and optimizing the checkout experience.",
      content: `
    ## Why Payment Gateway Integration Matters

    The payment process is the most critical part of any e-commerce website. A smooth, secure checkout experience builds trust and increases conversions, while a complicated one leads to abandoned carts. In this guide, we'll explore how to effectively integrate payment gateways with your WordPress WooCommerce store.

    ## Understanding Payment Gateway Types

    Before integration, it's important to understand the different types of payment solutions available.

    ### On-Site vs. Off-Site Gateways

    - On-site gateways process payments directly on your website
    - Off-site gateways redirect customers to a separate payment page
    - Each type has different security implications and user experience considerations

    ### Popular Payment Gateway Options

    - Stripe: Developer-friendly with extensive API
    - PayPal: Widely recognized with broad customer trust
    - Square: Great for businesses with physical and online presence
    - Authorize.net: Established gateway with comprehensive features
    - Local payment methods: Important for regional businesses

    ## Basic WooCommerce Payment Setup

    WooCommerce makes it relatively easy to add payment gateways to your store.

    ### Core Payment Settings

    - Navigate to WooCommerce > Settings > Payments
    - Enable/disable available payment methods
    - Set up default gateway options
    - Configure payment icons display
    - Test payment flow in sandbox mode

    ## Integrating Stripe with WooCommerce

    Stripe is one of the most popular payment gateways for WooCommerce stores.

    ### Stripe Integration Steps

    - Install the WooCommerce Stripe Gateway plugin
    - Create and connect your Stripe account
    - Configure API keys in WooCommerce settings
    - Set up Apple Pay and Google Pay options
    - Enable Strong Customer Authentication (SCA) for EU compliance
    - Test the checkout process thoroughly

    ## Setting Up PayPal for WooCommerce

    PayPal remains a must-have payment option for most online stores.

    ### PayPal Configuration

    - Choose between PayPal Standard and PayPal Checkout
    - Connect your PayPal business account
    - Configure IPN (Instant Payment Notification) settings
    - Set up PayPal Credit if applicable
    - Test both guest checkout and account-based payments
    - Implement PayPal's fraud protection tools

    ## Optimizing the Checkout Experience

    Adding payment gateways is just the beginning. Optimizing the checkout process is equally important.

    ### Checkout Optimization Techniques

    - Simplify the checkout form
    - Implement a progress indicator
    - Enable guest checkout
    - Add trust badges near payment options
    - Ensure mobile-friendly payment processes
    - Set up appropriate error handling

    ## Security Considerations

    Payment processing requires strict security measures to protect both your business and your customers.

    ### Security Best Practices

    - Maintain PCI DSS compliance
    - Keep WordPress, WooCommerce, and gateway plugins updated
    - Implement SSL encryption across your site
    - Use strong authentication for admin accounts
    - Regularly scan for malware and vulnerabilities
    - Set up transaction monitoring for fraud detection

    ## Handling International Payments

    Global e-commerce requires supporting international payment methods.

    ### International Considerations

    - Support multiple currencies
    - Implement local payment methods for key markets
    - Account for currency conversion fees
    - Display tax and shipping costs appropriately
    - Consider regulatory requirements in different regions

    ## Troubleshooting Common Payment Issues

    Even with careful setup, payment issues can occur. Here's how to address them.

    ### Common Problems and Solutions

    - Failed transactions: Check gateway logs and connection status
    - Declined cards: Implement user-friendly error messages
    - Gateway timeouts: Optimize server performance
    - Webhook failures: Verify server configurations
    - Payment disputes: Create clear policies and documentation

    ## Conclusion

    Integrating payment gateways with WordPress and WooCommerce is a critical step in creating a successful online store. By carefully selecting the right gateways for your audience, implementing them securely, and continuously optimizing the checkout experience, you can increase conversion rates and build customer trust. Remember to regularly review your payment setup as new options and security requirements evolve.
      `,
      date: "March 5, 2025",
      readTime: 6,
      author: "Raymond Turk",
      authorBio: "Raymond is a Full-Stack Developer specializing in WordPress and custom solutions. With over 5 years of experience, he helps businesses build secure and efficient websites.",
      authorImage: "/src/assets/images/profile.png",
      featuredImage: "/placeholder.svg?height=480&width=640",
      category: "E-commerce",
      tags: ["wordpress", "woocommerce", "payments"],
      relatedPosts: [1, 2, 3]
    },
    {
      id: 5,
      title: "The Future of Web Development: Trends to Watch in 2025",
      slug: "web-development-trends-2025",
      excerpt: "Explore the emerging technologies and methodologies that are shaping the future of web development this year and beyond.",
      date: "February 28, 2025",
      readTime: 7,
      author: "Raymond Turk",
      authorImage: "/src/assets/images/profile.png",
      featuredImage: "/placeholder.svg?height=480&width=640",
      category: "Trends",
      tags: ["trends", "future", "technology"]
    },
    {
      id: 6,
      title: "Creating Accessible WordPress Websites: Best Practices",
      slug: "accessible-wordpress-websites-best-practices",
      excerpt: "Learn how to build WordPress websites that everyone can use, regardless of their abilities or disabilities.",
      // Content would be here
      date: "February 20, 2025",
      readTime: 9,
      author: "Raymond Turk",
      authorImage: "/src/assets/images/profile.png",
      featuredImage: "/placeholder.svg?height=480&width=640",
      category: "Accessibility",
      tags: ["accessibility", "wordpress", "inclusive-design"]
    }
  ];

  // Find the current post based on slug
  const post = blogPosts.find(post => post.slug === slug);

  // Configure marked when component mounts
  useEffect(() => {
    if (post) {
      console.log('Post content type:', typeof post.content);
      console.log('Post content preview:', post.content?.substring ? post.content.substring(0, 100) : post.content);
    }
  }, [post]);

  // Set the document title
  useDocumentTitle(post ? `${post.title} | Blog` : 'Post Not Found');

  // If post not found
  if (!post) {
    return (
      <div className="pt-32 pb-20 min-h-screen bg-gradient-to-b from-[#020617] via-[#0a0f1f] to-[#000D1A]/90 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-8 text-center">
            <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
            <p className="text-gray-300 mb-6">The blog post you're looking for could not be found.</p>
            <Link to="/blog" className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Blog</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Find related posts
  const relatedPosts = post.relatedPosts
    ? post.relatedPosts.map(id => blogPosts.find(post => post.id === id)).filter(Boolean)
    : blogPosts
      .filter(p => p.id !== post.id && p.category === post.category)
      .slice(0, 3);

  // Generate SEO data
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://rturk.me/' },
    { name: 'Blog', url: 'https://rturk.me/blog' },
    { name: post.title, url: `https://rturk.me/blog/${post.slug}` }
  ]);

  const blogPostSchema = generateBlogPostSchema({
    title: post.title,
    excerpt: post.excerpt,
    slug: post.slug,
    datePublished: post.date,
    author: post.author,
    image: post.featuredImage
  });

  const schemas = [breadcrumbSchema, blogPostSchema];

  return (
    <>
      <SEO
        title={`${post.title} | Raymond Turk's Blog`}
        description={post.excerpt}
        keywords={[...post.tags, post.category, 'WordPress', 'Web Development']}
        ogImage={post.featuredImage}
        canonical={`https://rturk.me/blog/${post.slug}`}
        schema={schemas}
        articlePublishedTime={post.date}
        articleTags={post.tags}
      />
      <main className="pt-32 pb-20 bg-gradient-to-b from-[#020617] via-[#0a0f1f] to-[#000D1A]/90 text-white min-h-screen relative">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse delay-1000"></div>

          {/* Meteors effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <Meteors number={3} />
          </div>
        </div>

        <article className="container mx-auto px-4 relative z-10">
          {/* Back to blog button */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 bg-gray-800/70 hover:bg-gray-700 text-gray-300 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to blog</span>
          </Link>

          {/* Featured image */}
          <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-8">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent"></div>

            {/* Category badge */}
            <div className="absolute top-6 left-6">
              <div className="bg-blue-500/80 text-white text-sm font-bold py-1 px-4 rounded-full">
                {post.category}
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-10">
            {/* Main content */}
            <div className="w-full lg:w-2/3">
              {/* Post header */}
              <header className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  {post.title}
                </h1>

                {/* Post meta */}
                <div className="flex items-center flex-wrap gap-4 text-gray-400 text-sm mb-6">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime} min read</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>{post.author}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {post.tags.map((tag, i) => (
                    <Link
                      key={i}
                      to={`/blog?tag=${tag}`}
                      className="bg-gray-800 hover:bg-blue-900/50 text-gray-300 hover:text-white px-3 py-1 rounded-full text-sm transition-colors flex items-center gap-1"
                    >
                      <Tag className="w-3 h-3" />
                      <span>{tag}</span>
                    </Link>
                  ))}
                </div>

                {/* Share buttons */}
                <ShareButtons
                  url={`https://rturk.me/blog/${post.slug}`}
                  title={post.title}
                />
              </header>

              {/* Post content - now using the formatted content from marked */}
              <div
                className="prose prose-invert prose-blue max-w-none mb-12"
                dangerouslySetInnerHTML={{ __html: formattedContent }}
              />

              {/* Author box */}
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6 mb-10 flex flex-col md:flex-row gap-6 items-center md:items-start">
                <img
                  src={post.authorImage}
                  alt={post.author}
                  className="w-24 h-24 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xl font-bold mb-2">About {post.author}</h3>
                  <p className="text-gray-300 mb-4">{post.authorBio || `${post.author} is a web developer specializing in WordPress and custom solutions.`}</p>
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    <span>Work with me</span>
                  </a>
                </div>
              </div>

              {/* Related posts */}
              {relatedPosts.length > 0 && (
                <div className="mb-10">
                  <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {relatedPosts.map((relatedPost) => (
                      <RelatedPostCard key={relatedPost.id} post={relatedPost} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="w-full lg:w-1/3">
              {/* Table of contents */}
              {headings.length > 0 && (
                <TableOfContents headings={headings} />
              )}
            </div>
          </div>
        </article>
      </main>
    </>
  );
};

export default BlogPost;
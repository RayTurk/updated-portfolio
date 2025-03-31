import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * Enhanced SEO component with dynamic meta descriptions
 * This component handles all meta tags, schema markup, and other SEO elements
 */
const SEO = ({
  title,
  description,
  keywords = [],
  ogImage = "https://rturk.me/og-image.jpg",
  canonical,
  schema,
  articlePublishedTime,
  articleModifiedTime,
  articleTags,
  noIndex = false,
  language = "en",
  pageType = "default" // New parameter to identify page type
}) => {
  // Combine title with site name
  const fullTitle = title ? `${title} | Raymond Turk` : "Raymond Turk | Full-Stack Web Developer";

  // Generate dynamic descriptions based on page type if none provided
  let metaDescription = description;
  if (!metaDescription) {
    switch (pageType) {
      case "home":
        metaDescription = "Cleveland-based Full-Stack Web Developer specializing in WordPress, Shopify and custom web solutions that drive business growth. Let's create your next digital success story.";
        break;
      case "about":
        metaDescription = "With 5+ years of development experience, I craft custom WordPress and Shopify solutions that help businesses thrive online. Learn about my skills and approach to web development.";
        break;
      case "skills":
        metaDescription = "Expert in WordPress, Shopify, React, PHP, and modern web technologies. Discover the technical skills I bring to every web development project for optimal performance and user experience.";
        break;
      case "experience":
        metaDescription = "Explore my professional journey as a Full-Stack Developer. From local Cleveland businesses to global clients, I've delivered custom web solutions that solve real business problems.";
        break;
      case "services":
        metaDescription = "Custom WordPress development, Shopify store creation, website maintenance and optimization services tailored to your business needs. Quality code, excellent support.";
        break;
      case "projects":
        metaDescription = "Browse my portfolio of custom WordPress websites, Shopify stores, and web applications. Each project showcases my commitment to clean code and effective design.";
        break;
      case "contact":
        metaDescription = "Ready to discuss your project? Get in touch for WordPress development, Shopify customization, or website maintenance services. Based in Cleveland, serving clients globally.";
        break;
      case "blog":
        metaDescription = "Web development insights, WordPress tips, and Shopify best practices from a full-stack developer. Practical advice to help your business succeed online.";
        break;
      case "blogPost":
        // For blog posts, we'll handle this separately with content excerpts
        metaDescription = "Read this insightful article about web development and digital strategies that can help your business grow online. Written by Raymond Turk, Cleveland WordPress developer.";
        break;
      default:
        metaDescription = "Full-Stack Web Developer specializing in WordPress, custom themes, and plugin development. Based in Cleveland, Ohio.";
    }
  }

  // Combine default keywords with page-specific ones
  const defaultKeywords = ["Web Developer", "Full-Stack Developer", "Cleveland", "Ohio", "WordPress", "Shopify", "React Developer"];
  const metaKeywords = [...defaultKeywords, ...keywords].join(", ");

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <html lang={language} />
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      <meta name="author" content="Raymond Turk" />

      {/* Robots Control */}
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}

      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph */}
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content={articlePublishedTime ? "article" : "website"} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={canonical || "https://rturk.me/"} />
      <meta property="og:site_name" content="Raymond Turk | Full-Stack Web Developer" />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/jpeg" />

      {/* Article specific tags */}
      {articlePublishedTime && <meta property="article:published_time" content={articlePublishedTime} />}
      {articleModifiedTime && <meta property="article:modified_time" content={articleModifiedTime} />}
      {articleTags && articleTags.map((tag, index) => (
        <meta property="article:tag" content={tag} key={index} />
      ))}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:creator" content="@RayTurkDev" />

      {/* Mobile Specific */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      <meta name="theme-color" content="#0a0f1f" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

      {/* Schema.org JSON-LD */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
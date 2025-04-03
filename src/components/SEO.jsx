import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * Enhanced SEO component with truly unique meta descriptions and titles
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
  pageType = "default" // Used to identify page type
}) => {
  // Create highly unique page titles based on page type
  let fullTitle;
  let metaDescription = description;

  // Generate unique page titles by page type
  switch (pageType) {
    case "home":
      fullTitle = "Raymond Turk | WordPress & Shopify Developer in Cleveland";
      break;
    case "about":
      fullTitle = "About Ray Turk | Cleveland Full-Stack Developer's Journey";
      break;
    case "skills":
      fullTitle = "Web Development Skills & Expertise | Raymond Turk";
      break;
    case "experience":
      fullTitle = "Professional Portfolio & Work History | Raymond Turk";
      break;
    case "services":
      fullTitle = "WordPress & Shopify Development Services | Raymond Turk";
      break;
    case "projects":
      fullTitle = title || "Custom Website Portfolio | Cleveland Developer";
      break;
    case "project":
      fullTitle = title ? `${title} | Project Case Study` : "Web Development Case Study | Raymond Turk";
      break;
    case "contact":
      fullTitle = "Hire a Cleveland Web Developer | Contact Raymond Turk";
      break;
    case "blog":
      fullTitle = title || "WordPress & Development Blog | Raymond Turk";
      break;
    case "blogPost":
      fullTitle = title ? `${title}` : "Web Development Article | Raymond Turk";
      break;
    default:
      fullTitle = title ? `${title} | Raymond Turk` : "Raymond Turk | Web Developer";
  }

  // Generate unique descriptions if none provided
  if (!metaDescription) {
    switch (pageType) {
      case "home":
        metaDescription = "Cleveland-based WordPress & Shopify specialist with 5+ years of experience crafting custom websites that deliver results for local businesses. Get a site that works for you.";
        break;
      case "about":
        metaDescription = "Meet Raymond Turk: Cleveland web developer with expertise in custom WordPress solutions. Learn about my background, approach to development, and why clients trust me with their digital presence.";
        break;
      case "skills":
        metaDescription = "From WordPress & PHP to JavaScript & React, explore the technical toolkit I use to build fast, secure, and effective websites. Specialized in custom themes and responsive design.";
        break;
      case "experience":
        metaDescription = "Browse my professional journey and track record of success in delivering web solutions for businesses across Ohio and beyond. See how my experience benefits your next project.";
        break;
      case "services":
        metaDescription = "Expert WordPress development, Shopify store creation, website maintenance, and performance optimization services in Cleveland. Get a quote for your custom web project today.";
        break;
      case "projects":
        metaDescription = "View my portfolio of custom WordPress websites, Shopify stores, and web applications. Each project showcases attention to detail, clean code, and business-focused solutions.";
        break;
      case "project":
        metaDescription = "Detailed case study exploring the challenges, solutions, and results for this custom web development project. See my development process in action.";
        break;
      case "contact":
        metaDescription = "Get in touch for WordPress development, Shopify customization, or website maintenance services. Fast responses and clear communication from a Cleveland-based developer.";
        break;
      case "blog":
        metaDescription = "Practical web development insights, WordPress tips, and Shopify advice from a Cleveland developer. Articles focused on helping businesses improve their online presence.";
        break;
      case "blogPost":
        metaDescription = "Valuable web development insights from a Cleveland WordPress expert. Learn actionable strategies to improve your website's performance and effectiveness.";
        break;
      default:
        metaDescription = "Full-Stack Web Developer specializing in WordPress and Shopify development. Creating custom websites that help Cleveland businesses succeed online.";
    }
  }

  // Add schema data for each page type
  let pageSchema = schema;
  if (!pageSchema) {
    // Here you could generate default schema JSON for each page type
    // This would help with structured data for search engines
  }

  // Combine default keywords with page-specific ones
  const defaultKeywords = ["Web Developer", "WordPress Developer", "Cleveland", "Ohio", "Shopify Expert"];
  const metaKeywords = [...new Set([...defaultKeywords, ...keywords])].join(", ");

  // Create a fallback canonical URL if none is provided
  const canonicalUrl = canonical || `https://rturk.me${pageType === "home" ? "" : `/${pageType}`}`;

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
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content={articlePublishedTime ? "article" : "website"} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="Raymond Turk | Cleveland Web Developer" />
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

      {/* This noscript content helps crawlers see content when JS is disabled */}
      <noscript>
        {`<div style="margin: 2rem auto; max-width: 90%; width: 800px;">
          <h1>${fullTitle}</h1>
          <p>${metaDescription}</p>
          <p>I'm a Full-Stack Web Developer specializing in WordPress and custom solutions, from small business websites to enterprise-level solutions.</p>
        </div>`}
      </noscript>

      {/* Schema.org JSON-LD */}
      {pageSchema && (
        <script type="application/ld+json">
          {JSON.stringify(pageSchema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
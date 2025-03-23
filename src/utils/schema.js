// src/utils/schema.js

/**
 * Generate person schema for the portfolio owner
 */
export const generatePersonSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Raymond Turk",
    "url": "https://rturk.me",
    "image": "https://rturk.me/profile-image.jpg",
    "jobTitle": "Full-Stack Web Developer",
    "sameAs": [
      "https://github.com/RayTurk",
      "https://linkedin.com/in/ray-turk",
      "https://twitter.com/RayTurkDev"
    ],
    "worksFor": {
      "@type": "Organization",
      "name": "Freelance"
    },
    "knowsAbout": ["WordPress", "PHP", "JavaScript", "React", "Shopify", "Web Development"]
  };
};

/**
 * Generate WebSite schema for the overall website
 */
export const generateWebsiteSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Raymond Turk | Full-Stack Web Developer",
    "url": "https://rturk.me",
    "description": "Full-Stack Web Developer specializing in WordPress, custom themes, and plugin development. Based in Cleveland, Ohio.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://rturk.me/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };
};

/**
 * Generate Professional Service schema for services provided
 */
export const generateServiceSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Raymond Turk Web Development",
    "image": "https://rturk.me/og-image.jpg",
    "url": "https://rturk.me",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Cleveland",
      "addressRegion": "OH",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 41.4993,
      "longitude": -81.6944
    },
    "priceRange": "$$",
    "telephone": "+1-216-555-5555", // Replace with actual phone if available
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "17:00"
    },
    "sameAs": [
      "https://github.com/RayTurk",
      "https://linkedin.com/in/ray-turk",
      "https://twitter.com/RayTurkDev"
    ],
    "makesOffer": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "WordPress Development",
          "description": "Custom WordPress theme and plugin development for businesses."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Shopify Development",
          "description": "Custom Shopify store setup and theme development."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Website Maintenance",
          "description": "Ongoing website maintenance and support services."
        }
      }
    ]
  };
};

/**
 * Generate Project schema for portfolio projects
 */
export const generateProjectSchema = (project) => {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": project.title,
    "url": project.links.demo,
    "description": project.description,
    "creator": {
      "@type": "Person",
      "name": "Raymond Turk",
      "url": "https://rturk.me"
    },
    "keywords": project.tags.join(", ")
  };
};

/**
 * Generate BreadcrumbList schema
 */
export const generateBreadcrumbSchema = (items) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
};
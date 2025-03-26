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
      "https://https://www.linkedin.com/in/raymond-turk-625097137/"
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
      "https://www.linkedin.com/in/raymond-turk-625097137/",
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

/**
 * Generate LocalBusiness schema for local SEO
 */
export const generateLocalBusinessSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Raymond Turk Web Development",
    "image": "https://rturk.me/profile-image.jpg",
    "url": "https://rturk.me",
    "telephone": "", // Add your business phone if available
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
    "sameAs": [
      "https://github.com/RayTurk",
      "https://linkedin.com/in/ray-turk",
      "https://twitter.com/RayTurkDev"
    ],
    "areaServed": ["Cleveland", "Ohio", "United States"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Web Development Services",
      "itemListElement": [
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
    }
  };
};

/**
 * Generate FAQ Page schema for common questions
 */
export const generateFAQSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What services do you offer as a web developer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "I offer a wide range of web development services including custom WordPress theme development, Shopify store creation and customization, website maintenance, performance optimization, and custom plugin development. I specialize in creating responsive, user-friendly websites that help businesses achieve their online goals."
        }
      },
      {
        "@type": "Question",
        "name": "Do you work with clients outside of Cleveland?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, while I'm based in Cleveland, Ohio, I work with clients throughout the United States. I use tools like Zoom, Slack, and email to maintain clear communication with remote clients, ensuring the same quality of service regardless of location."
        }
      },
      {
        "@type": "Question",
        "name": "How long does it typically take to build a custom WordPress website?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The timeline for a custom WordPress website varies depending on the complexity of the project. A basic website might take 2-4 weeks, while more complex sites with custom functionality could take 6-8 weeks or more. I'll provide a detailed timeline during our initial consultation based on your specific requirements."
        }
      },
      {
        "@type": "Question",
        "name": "Do you offer website maintenance services?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, I offer comprehensive website maintenance services including regular updates, security monitoring, performance optimization, and content updates. I recommend ongoing maintenance for all websites to ensure they remain secure, fast, and up-to-date."
        }
      },
      {
        "@type": "Question",
        "name": "What makes you different from other web developers?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "I combine technical expertise with a deep understanding of business needs. I focus on creating websites that not only look great but also drive results through improved user experience, faster loading speeds, and SEO best practices. I provide direct communication without account managers or middlemen, leading to more efficient project execution and better outcomes."
        }
      }
    ]
  };
};

// Blog post schema
export const generateBlogPostSchema = (post) => {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "image": post.image || "https://rturk.me/og-image.jpg",
    "datePublished": post.datePublished,
    "dateModified": post.dateModified || post.datePublished,
    "author": {
      "@type": "Person",
      "name": post.author || "Raymond Turk",
      "url": "https://rturk.me/about"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Raymond Turk Web Development",
      "logo": {
        "@type": "ImageObject",
        "url": "https://rturk.me/logo.png"
      }
    },
    "url": `https://rturk.me/blog/${post.slug}`,
    "description": post.excerpt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://rturk.me/blog/${post.slug}`
    }
  };
};

// Blog listing schema
export const generateBlogListingSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Raymond Turk's Web Development Blog",
    "description": "Insights, tutorials, and best practices on WordPress, Shopify, and web development",
    "url": "https://rturk.me/blog",
    "publisher": {
      "@type": "Person",
      "name": "Raymond Turk",
      "url": "https://rturk.me"
    }
  };
};
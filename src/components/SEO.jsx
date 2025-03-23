import React from 'react';
import { Helmet } from 'react-helmet-async';

// Reusable SEO component that can be used on all pages
const SEO = ({
  title,
  description,
  keywords = [],
  ogImage = "https://rturk.me/og-image.jpg",
  canonical,
  schema
}) => {
  // Combine title with site name
  const fullTitle = title ? `${title} | Raymond Turk` : "Raymond Turk | Full-Stack Web Developer";

  // Default description if none provided
  const metaDescription = description || "Full-Stack Web Developer specializing in WordPress, custom themes, and plugin development. Based in Cleveland, Ohio.";

  // Combine default keywords with page-specific ones
  const defaultKeywords = ["Web Developer", "Full-Stack Developer", "Cleveland", "Ohio", "WordPress", "Shopify"];
  const metaKeywords = [...defaultKeywords, ...keywords].join(", ");

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />

      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content="website" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={ogImage} />

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
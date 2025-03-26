// scripts/generate-sitemap.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// URLs for the sitemap
const SITE_URL = 'https://rturk.me';

// Blog posts data (simplified version)
const blogPosts = [
  {
    slug: "wordpress-security-tips-small-businesses",
    date: "2025-03-20"
  },
  {
    slug: "speed-up-wordpress-site-2025",
    date: "2025-03-15"
  },
  {
    slug: "custom-shopify-themes-developer-guide",
    date: "2025-03-10"
  },
  {
    slug: "payment-gateways-wordpress-woocommerce",
    date: "2025-03-05"
  },
  {
    slug: "web-development-trends-2025",
    date: "2025-02-28"
  },
  {
    slug: "accessible-wordpress-websites-best-practices",
    date: "2025-02-20"
  }
];

// Main routes
const routes = [
  {
    path: '/',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: '1.0'
  },
  {
    path: '/about',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: '0.8'
  },
  {
    path: '/skills',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: '0.8'
  },
  {
    path: '/experience',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: '0.8'
  },
  {
    path: '/services',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: '0.9'
  },
  {
    path: '/projects',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: '0.9'
  },
  {
    path: '/contact',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: '0.7'
  },
  // Add blog index page
  {
    path: '/blog',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'daily',
    priority: '0.9'
  },
];

// Add blog post routes
const blogRoutes = blogPosts.map(post => ({
  path: `/blog/${post.slug}`,
  lastmod: post.date,
  changefreq: 'weekly',
  priority: '0.8'
}));

// Combine all routes
const allRoutes = [...routes, ...blogRoutes];

// Generate sitemap XML
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allRoutes
    .map(
      (route) => `
  <url>
    <loc>${SITE_URL}${route.path}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
    )
    .join('')}
</urlset>`;

// Create dist directory if it doesn't exist
const distDir = path.resolve(__dirname, '../dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Write the sitemap to the dist directory
fs.writeFileSync(path.resolve(distDir, 'sitemap.xml'), sitemap);
console.log('Sitemap generated successfully!');

// Generate robots.txt file
const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml`;

fs.writeFileSync(path.resolve(distDir, 'robots.txt'), robotsTxt);
console.log('robots.txt generated successfully!');
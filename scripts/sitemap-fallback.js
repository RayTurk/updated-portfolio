// scripts/sitemap-fallback.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * This script generates a minimal sitemap when the WordPress API is unavailable
 * It ensures your build process doesn't fail if WordPress is down
 */

// URLs and configuration
const SITE_URL = 'http://rturk.me';

// Static routes (same as in the main sitemap generator)
const staticRoutes = [
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
  {
    path: '/blog',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'daily',
    priority: '0.9'
  },
];

// Generate minimal sitemap
function generateMinimalSitemap() {
  console.log('Generating minimal fallback sitemap...');

  // Generate sitemap XML with just static routes
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticRoutes
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
  console.log('Fallback sitemap generated successfully!');

  // Generate robots.txt file
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml`;

  fs.writeFileSync(path.resolve(distDir, 'robots.txt'), robotsTxt);
  console.log('robots.txt generated successfully!');

  return { success: true };
}

// Run the generator
generateMinimalSitemap();
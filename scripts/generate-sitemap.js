// scripts/generate-sitemap.js
const fs = require('fs');
const path = require('path');

// URLs for the sitemap
const SITE_URL = 'https://rturk.me';
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
];

// Generate sitemap XML
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${routes
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

// Write the sitemap to the public directory
fs.writeFileSync(path.resolve(__dirname, '../public/sitemap.xml'), sitemap);
console.log('Sitemap generated successfully!');

// Generate robots.txt file
const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml`;

fs.writeFileSync(path.resolve(__dirname, '../public/robots.txt'), robotsTxt);
console.log('robots.txt generated successfully!');
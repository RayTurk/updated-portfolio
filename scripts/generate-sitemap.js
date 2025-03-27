// scripts/generate-sitemap.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';

// Get current directory in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const SITE_URL = 'https://rturk.me';
const WP_API_URL = 'https://cms.rturk.me/wp-json/wp/v2';

// Static routes - always included
const staticRoutes = [
  { path: '/', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: '1.0' },
  { path: '/about', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: '0.8' },
  { path: '/skills', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: '0.8' },
  { path: '/experience', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: '0.8' },
  { path: '/services', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: '0.9' },
  { path: '/projects', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: '0.9' },
  { path: '/contact', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: '0.7' },
  { path: '/blog', lastmod: new Date().toISOString().split('T')[0], changefreq: 'weekly', priority: '0.9' },
];

// Function to write the sitemap file
function writeSitemapToFile(routes) {
  // Generate the sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `  <url>
    <loc>${SITE_URL}${route.path}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  // Create dist directory if it doesn't exist
  const distDir = path.resolve(__dirname, '../dist');
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }

  // Write sitemap to file
  const sitemapPath = path.resolve(distDir, 'sitemap.xml');
  fs.writeFileSync(sitemapPath, sitemap);
  console.log(`Sitemap generated at: ${sitemapPath}`);

  // Verify file was written correctly
  if (fs.existsSync(sitemapPath)) {
    const fileContent = fs.readFileSync(sitemapPath, 'utf8');
    if (fileContent.includes('/blog/') && routes.length > staticRoutes.length) {
      console.log('✓ Verification: Sitemap includes blog posts');
    } else {
      console.log('✗ Verification: Sitemap does NOT include blog posts');
    }

    console.log(`File size: ${fs.statSync(sitemapPath).size} bytes`);
  } else {
    console.error('Error: Sitemap file was not created successfully');
  }

  // Create robots.txt
  const robotsTxtPath = path.resolve(distDir, 'robots.txt');
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml`;

  fs.writeFileSync(robotsTxtPath, robotsTxt);
  console.log(`robots.txt generated at: ${robotsTxtPath}`);

  // Also write to public directory if it exists (some frameworks use this)
  const publicDir = path.resolve(__dirname, '../public');
  if (fs.existsSync(publicDir)) {
    fs.writeFileSync(path.resolve(publicDir, 'sitemap.xml'), sitemap);
    fs.writeFileSync(path.resolve(publicDir, 'robots.txt'), robotsTxt);
    console.log('Also wrote files to public directory');
  }
}

// Main function to generate sitemap
async function generateSitemap() {
  console.log('Starting sitemap generation...');

  try {
    // Step 1: Try to fetch WordPress posts
    console.log('Fetching posts from WordPress API...');

    const response = await fetch(`${WP_API_URL}/posts?per_page=100`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      timeout: 10000 // 10 second timeout
    });

    // Step 2: Process response
    if (!response.ok) {
      throw new Error(`WordPress API returned ${response.status}: ${response.statusText}`);
    }

    const posts = await response.json();
    console.log(`Successfully fetched ${posts.length} posts from WordPress API`);

    // Debug: Log the first post to verify structure
    if (posts.length > 0) {
      console.log('First post slug:', posts[0].slug);
    }

    // Step 3: Add blog post URLs to sitemap
    const blogPostRoutes = posts.map(post => ({
      path: `/blog/${post.slug}`,
      lastmod: new Date(post.modified || post.date).toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: '0.7'
    }));

    // Step 4: Combine static and dynamic routes
    const allRoutes = [...staticRoutes, ...blogPostRoutes];

    // Step 5: Write sitemap file
    console.log(`Writing sitemap with ${allRoutes.length} URLs (${staticRoutes.length} static + ${blogPostRoutes.length} blog posts)`);
    writeSitemapToFile(allRoutes);

    return true;
  } catch (error) {
    // If any error occurs, fall back to static sitemap
    console.error(`Error fetching WordPress posts: ${error.message}`);
    console.log('Falling back to static sitemap with only main pages...');
    writeSitemapToFile(staticRoutes);
    return false;
  }
}

// Run the generator and handle deployment verification
generateSitemap()
  .then(success => {
    console.log(`Sitemap generation ${success ? 'completed with WordPress posts' : 'completed with static routes only'}`);
    console.log('=== DEPLOYMENT INSTRUCTIONS ===');
    console.log('1. Make sure sitemap.xml is in your deployment directory');
    console.log('2. Check that your build process includes copying this file to your server');
    console.log('3. Verify that your server isn\'t caching the old sitemap');
    console.log('4. After deployment, visit your sitemap URL and verify it contains blog posts');
  })
  .catch(error => {
    console.error('Fatal error in sitemap generation:', error);
    process.exit(1);
  });
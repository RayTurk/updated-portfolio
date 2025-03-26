// scripts/generate-sitemap.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';

// Get current directory in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// URLs and configuration
const SITE_URL = 'https://rturk.me';
const WP_API_URL = 'https://cms.rturk.me/wp-json/wp/v2';
const POSTS_PER_PAGE = 100; // Max posts to fetch at once
const API_TIMEOUT = 10000; // 10 seconds timeout for API requests

// Static routes
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

// Custom fetch with timeout
async function fetchWithTimeout(url, options = {}) {
  const controller = new AbortController();
  const { signal } = controller;

  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

  try {
    const response = await fetch(url, { ...options, signal });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

// Function to check if WordPress API is available
async function isWordPressApiAvailable() {
  try {
    const response = await fetchWithTimeout(`${WP_API_URL}/posts?per_page=1`);
    return response.ok;
  } catch (error) {
    console.error('WordPress API check failed:', error.message);
    return false;
  }
}

// Function to fetch all blog posts from WordPress API
async function fetchAllBlogPosts() {
  try {
    console.log('Fetching posts from WordPress API...');

    // First, get total number of posts to determine pagination
    const initialResponse = await fetchWithTimeout(`${WP_API_URL}/posts?per_page=1`);

    if (!initialResponse.ok) {
      throw new Error(`Failed to fetch posts: ${initialResponse.status} ${initialResponse.statusText}`);
    }

    const totalPosts = parseInt(initialResponse.headers.get('X-WP-Total'), 10);
    const totalPages = parseInt(initialResponse.headers.get('X-WP-TotalPages'), 10);

    console.log(`Found ${totalPosts} posts across ${totalPages} pages`);

    // Fetch all pages of posts
    const allPosts = [];
    const fetchPromises = [];

    for (let page = 1; page <= totalPages; page++) {
      fetchPromises.push(
        fetchWithTimeout(`${WP_API_URL}/posts?per_page=${POSTS_PER_PAGE}&page=${page}`)
          .then(response => {
            if (!response.ok) {
              throw new Error(`Failed to fetch page ${page}: ${response.status} ${response.statusText}`);
            }
            return response.json();
          })
          .then(posts => {
            console.log(`Fetched ${posts.length} posts from page ${page}`);
            allPosts.push(...posts);
          })
      );
    }

    await Promise.all(fetchPromises);

    return allPosts;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

// Function to fetch categories from WordPress API
async function fetchAllCategories() {
  try {
    console.log('Fetching categories from WordPress API...');

    const response = await fetchWithTimeout(`${WP_API_URL}/categories?per_page=100`);

    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.status} ${response.statusText}`);
    }

    const categories = await response.json();
    console.log(`Fetched ${categories.length} categories`);

    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

// Function to fetch tags from WordPress API
async function fetchAllTags() {
  try {
    console.log('Fetching tags from WordPress API...');

    const response = await fetchWithTimeout(`${WP_API_URL}/tags?per_page=100`);

    if (!response.ok) {
      throw new Error(`Failed to fetch tags: ${response.status} ${response.statusText}`);
    }

    const tags = await response.json();
    console.log(`Fetched ${tags.length} tags`);

    return tags;
  } catch (error) {
    console.error('Error fetching tags:', error);
    return [];
  }
}

// Generate minimal sitemap with only static routes
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

// Generate complete sitemap with WordPress data
async function generateCompleteSitemap() {
  try {
    console.log('Starting sitemap generation...');

    // Fetch blog posts, categories, and tags
    const [posts, categories, tags] = await Promise.all([
      fetchAllBlogPosts(),
      fetchAllCategories(),
      fetchAllTags()
    ]);

    // If no posts were fetched, there might be an issue with the API
    if (posts.length === 0) {
      console.warn('No posts were fetched from WordPress API. Falling back to minimal sitemap.');
      return generateMinimalSitemap();
    }

    // Generate routes for blog posts
    const blogPostRoutes = posts.map(post => ({
      path: `/blog/${post.slug}`,
      lastmod: new Date(post.modified || post.date).toISOString().split('T')[0],
      changefreq: 'weekly',
      priority: '0.7'
    }));

    // Generate routes for category pages
    const categoryRoutes = categories.map(category => ({
      path: `/blog?category=${category.id}`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'weekly',
      priority: '0.6'
    }));

    // Generate routes for tag pages
    const tagRoutes = tags.map(tag => ({
      path: `/blog?tag=${tag.id}`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'weekly',
      priority: '0.5'
    }));

    // Combine all routes
    const allRoutes = [
      ...staticRoutes,
      ...blogPostRoutes,
      ...categoryRoutes,
      ...tagRoutes
    ];

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

    // Return success
    return { success: true, postsCount: posts.length };
  } catch (error) {
    console.error('Error generating complete sitemap:', error);
    console.log('Falling back to minimal sitemap...');

    // Generate minimal sitemap as fallback
    return generateMinimalSitemap();
  }
}

// Main function
async function main() {
  try {
    // Check if WordPress API is available
    const apiAvailable = await isWordPressApiAvailable();

    if (apiAvailable) {
      console.log('WordPress API is available. Generating complete sitemap...');
      const result = await generateCompleteSitemap();

      if (result.success) {
        if (result.postsCount) {
          console.log(`Sitemap generation complete with ${result.postsCount} blog posts included.`);
        } else {
          console.log('Minimal sitemap generation successful.');
        }
      }
    } else {
      console.log('WordPress API is not available. Generating minimal sitemap...');
      generateMinimalSitemap();
    }
  } catch (error) {
    console.error('Unexpected error in sitemap generation:', error);
    console.log('Falling back to minimal sitemap due to error...');
    generateMinimalSitemap();
  }
}

// Run the main function
main().catch(error => {
  console.error('Fatal error in sitemap generation:', error);
  process.exit(1);
});
// src/services/wordpressApi.js

/**
 * WordPress REST API service for fetching blog content and projects
 */

// You'll replace this with your WordPress site URL
const API_URL = 'https://cms.rturk.me/wp-json/wp/v2';

/**
 * Fetch posts with pagination and optional filtering
 * @param {Object} options - Query parameters
 * @param {number} options.page - Page number
 * @param {number} options.perPage - Posts per page
 * @param {number} options.categories - Category ID to filter by
 * @param {string} options.search - Search term
 * @param {string} options.slug - Post slug
 * @returns {Promise} - Promise with post data and headers
 */
export const getPosts = async ({
  page = 1,
  perPage = 10,
  categories = '',
  search = '',
  slug = '',
} = {}) => {
  try {
    let url = `${API_URL}/posts?_embed&page=${page}&per_page=${perPage}`;

    if (categories) url += `&categories=${categories}`;
    if (search) url += `&search=${encodeURIComponent(search)}`;
    if (slug) url += `&slug=${encodeURIComponent(slug)}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    // Extract total posts and pages from headers
    const totalPosts = response.headers.get('X-WP-Total');
    const totalPages = response.headers.get('X-WP-TotalPages');

    // Get the posts from the response
    const posts = await response.json();

    return {
      posts,
      totalPosts: parseInt(totalPosts, 10),
      totalPages: parseInt(totalPages, 10)
    };
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

/**
 * Fetch a single post by ID or slug
 * @param {string|number} identifier - Post ID or slug
 * @param {boolean} isSlug - Whether the identifier is a slug
 * @returns {Promise} - Promise with post data
 */
export const getPost = async (identifier, isSlug = false) => {
  try {
    let url;

    if (isSlug) {
      // Instead of calling getPosts, create a direct query
      url = `${API_URL}/posts?_embed&slug=${encodeURIComponent(identifier)}&per_page=1`;
    } else {
      url = `${API_URL}/posts/${identifier}?_embed`;
    }

    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`HTTP error ${response.status}`);
    }

    const data = await response.json();

    // If it's a slug query, return the first post or null
    return isSlug ? (data[0] || null) : data;
  } catch (error) {
    console.error('Error fetching post:', error);
    throw error;
  }
};

/**
 * Fetch categories
 * @param {Object} options - Query parameters
 * @param {number} options.perPage - Categories per page
 * @returns {Promise} - Promise with categories data
 */
export const getCategories = async ({ perPage = 100 } = {}) => {
  try {
    const url = `${API_URL}/categories?per_page=${perPage}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

/**
 * Fetch tags
 * @param {Object} options - Query parameters
 * @param {number} options.perPage - Tags per page
 * @returns {Promise} - Promise with tags data
 */
export const getTags = async ({ perPage = 100 } = {}) => {
  try {
    const url = `${API_URL}/tags?per_page=${perPage}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching tags:', error);
    throw error;
  }
};

/**
 * Fetch projects from WordPress API
 * @param {Object} options - Query parameters
 * @returns {Promise<{projects: Array, totalPages: Number}>}
 */
export const getProjects = async (options = {}) => {
  try {
    // Default parameters
    const {
      page = 1,
      perPage = 9,
      featured = null,
      search = null,
      exclude = null
    } = options;

    // Build query parameters
    let url = `${API_URL}/project?_embed=true&page=${page}&per_page=${perPage}`;

    // Add featured filter if specified
    if (featured !== null) {
      url += `&acf_filter[featured_status]=${featured ? 'true' : 'false'}`;
    }

    // Add search term if specified
    if (search) {
      url += `&search=${encodeURIComponent(search)}`;
    }

    // Add exclusion if specified
    if (exclude) {
      url += `&exclude=${exclude}`;
    }

    // Add sorting (newest first by default)
    url += '&order=desc&orderby=date';

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error fetching projects: ${response.status}`);
    }

    // Get total pages from headers
    const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '1', 10);

    // Get the projects from the response
    const projects = await response.json();

    return { projects, totalPages };
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    return { projects: [], totalPages: 0 };
  }
};

/**
 * Fetch a single project by slug
 * @param {String} slug - Project slug
 * @param {Boolean} embed - Whether to embed related data
 * @returns {Promise<Object>} - Project data
 */
export const getProject = async (slug, embed = true) => {
  try {
    const url = `${API_URL}/project?slug=${slug}${embed ? '&_embed=true' : ''}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error fetching project: ${response.status}`);
    }

    const projects = await response.json();
    return projects.length > 0 ? projects[0] : null;
  } catch (error) {
    console.error(`Failed to fetch project with slug "${slug}":`, error);
    return null;
  }
};
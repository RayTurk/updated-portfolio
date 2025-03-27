// src/services/wordpressApi.js

/**
 * WordPress REST API service for fetching blog content
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
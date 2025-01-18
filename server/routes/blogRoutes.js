import express from 'express';
import {
  createBlogPost,
  getAllBlogPosts,
  getBlogPostBySlug,
  updateBlogPost,
  deleteBlogPost,
  addComment,
  getComments,
} from '../controllers/blogController.js';

const router = express.Router();

/**
 * Route for creating a new blog post
 * @function
 * @name post/posts
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
router.post('/posts', createBlogPost);

/**
 * Route for retrieving all blog posts
 * @function
 * @name get/posts
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
router.get('/posts', getAllBlogPosts);

/**
 * Route for retrieving a blog post by its slug
 * @function
 * @name get/posts/:slug
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
router.get('/posts/:slug', getBlogPostBySlug);

/**
 * Route for updating a blog post
 * @function
 * @name put/posts/:id
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
router.put('/posts/:id', updateBlogPost);

/**
 * Route for deleting a blog post
 * @function
 * @name delete/posts/:id
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
router.delete('/posts/:id', deleteBlogPost);

/**
 * Route for adding a comment to a blog post
 * @function
 * @name post/posts/:id/comments
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
router.post('/posts/:id/comments', addComment);

/**
 * Route for retrieving comments for a specific blog post
 * @function
 * @name get/posts/:id/comments
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
router.get('/posts/:id/comments', getComments);

export default router;

import BlogPost from '../models/blogModel.js';
import Comment from '../models/commentModel.js';

/**
 * Creates a new blog post
 * 
 * @async
 * @param {Object} req - The request object containing blog post details
 * @param {Object} res - The response object to send back the result
 * @returns {Promise<void>} Sends a response with the created blog post
 * @throws {Error} If creation fails
 */
export const createBlogPost = async (req, res) => {
  try {
    const { title, slug, content, excerpt, tags, categories, coverImage, metaTitle, metaDescription, metaKeywords } = req.body;
    
    const newBlogPost = new BlogPost({
      title,
      slug,
      content,
      excerpt,
      tags,
      categories,
      coverImage,
      metaTitle,
      metaDescription,
      metaKeywords,
      isPublished: false,
    });
    
    const savedBlogPost = await newBlogPost.save();
    res.status(201).json(savedBlogPost);
  } catch (error) {
    res.status(500).json({ message: 'Error creating blog post', error });
  }
};

/**
 * Retrieves all blog posts
 * 
 * @async
 * @param {Object} req - The request object
 * @param {Object} res - The response object to send back the result
 * @returns {Promise<void>} Sends a response with the list of blog posts
 * @throws {Error} If fetching fails
 */
export const getAllBlogPosts = async (req, res) => {
  try {
    const blogPosts = await BlogPost.find().sort({ publishedAt: -1 });
    res.status(200).json(blogPosts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blog posts', error });
  }
};

/**
 * Retrieves a blog post by its slug
 * 
 * @async
 * @param {Object} req - The request object containing the slug
 * @param {Object} res - The response object to send back the result
 * @returns {Promise<void>} Sends a response with the blog post
 * @throws {Error} If fetching fails
 */
export const getBlogPostBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const blogPost = await BlogPost.findOne({ slug }).populate('comments');
    
    if (!blogPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    blogPost.viewCount += 1;
    await blogPost.save();

    res.status(200).json(blogPost);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blog post', error });
  }
};

/**
 * Updates a blog post by its ID
 * 
 * @async
 * @param {Object} req - The request object containing the blog post ID and updated details
 * @param {Object} res - The response object to send back the result
 * @returns {Promise<void>} Sends a response with the updated blog post
 * @throws {Error} If updating fails
 */
export const updateBlogPost = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBlogPost = await BlogPost.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedBlogPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    res.status(200).json(updatedBlogPost);
  } catch (error) {
    res.status(500).json({ message: 'Error updating blog post', error });
  }
};

/**
 * Deletes a blog post by its ID
 * 
 * @async
 * @param {Object} req - The request object containing the blog post ID
 * @param {Object} res - The response object to send back the result
 * @returns {Promise<void>} Sends a response confirming deletion
 * @throws {Error} If deletion fails
 */
export const deleteBlogPost = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBlogPost = await BlogPost.findByIdAndDelete(id);

    if (!deletedBlogPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    res.status(200).json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting blog post', error });
  }
};

/**
 * Adds a comment to a blog post
 * 
 * @async
 * @param {Object} req - The request object containing the blog post ID and comment details
 * @param {Object} res - The response object to send back the result
 * @returns {Promise<void>} Sends a response with the added comment
 * @throws {Error} If adding comment fails
 */
export const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body; 
    const user = req.user ? req.user._id : null; 
  
    const newComment = new Comment({
      content,
      author: user,
      isAnonymous: !user,
      blogPost: id,
    });
  
    const savedComment = await newComment.save();
  
    const blogPost = await BlogPost.findById(id);
    if (!blogPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    blogPost.comments.push(savedComment._id);
    await blogPost.save();
    
    res.status(201).json(savedComment);
  } catch (error) {
    res.status(500).json({ message: 'Error adding comment', error });
  }
};

/**
 * Retrieves comments for a blog post
 * 
 * @async
 * @param {Object} req - The request object containing the blog post ID
 * @param {Object} res - The response object to send back the result
 * @returns {Promise<void>} Sends a response with the list of comments
 * @throws {Error} If fetching comments fails
 */
export const getComments = async (req, res) => {
  try {
    const { id } = req.params;
    const blogPost = await BlogPost.findById(id).populate('comments');

    if (!blogPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    res.status(200).json(blogPost.comments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching comments', error });
  }
};
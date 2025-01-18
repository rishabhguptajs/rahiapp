import mongoose from 'mongoose';

/**
 * @fileoverview Blog post model schema for MongoDB using Mongoose
 * @module blogModel
 * @requires mongoose
 */

const { Schema } = mongoose;

/**
 * Schema definition for a blog post
 * 
 * @typedef {Object} BlogPost
 * @property {string} title - The title of the blog post
 * @property {string} slug - The unique slug for the blog post
 * @property {string} content - The main content of the blog post
 * @property {string} excerpt - A short excerpt of the blog post
 * @property {Array<string>} tags - Tags associated with the blog post
 * @property {Array<string>} categories - Categories for the blog post
 * @property {string} coverImage - URL of the cover image for the blog post
 * @property {Date} publishedAt - The date the blog post was published
 * @property {boolean} isPublished - Indicates if the blog post is published
 * @property {string} metaTitle - SEO title for the blog post
 * @property {string} metaDescription - SEO description for the blog post
 * @property {Array<string>} metaKeywords - SEO keywords for the blog post
 * @property {number} viewCount - Number of views for the blog post
 * @property {Array<ObjectId>} likes - List of users who liked the blog post
 * @property {Array<ObjectId>} comments - List of comments on the blog post
 * @property {Date} createdAt - The date the blog post was created
 * @property {Date} updatedAt - The date the blog post was last updated
 */

const blogPostSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 150,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  excerpt: {
    type: String,
    required: true,
    maxlength: 300,
  },
  tags: [{
    type: String,
    trim: true,
  }],
  categories: [{
    type: String,
    trim: true,
  }],
  coverImage: {
    type: String,
    required: true,
  },
  publishedAt: {
    type: Date,
    default: Date.now,
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  metaTitle: {
    type: String,
    trim: true,
    maxlength: 60,
  },
  metaDescription: {
    type: String,
    trim: true,
    maxlength: 160,
  },
  metaKeywords: [{
    type: String,
    trim: true,
  }],
  viewCount: {
    type: Number,
    default: 0,
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

const Blog =  mongoose.model('BlogPost', blogPostSchema);

export default Blog;
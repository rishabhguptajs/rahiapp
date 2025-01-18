import mongoose from 'mongoose';
const { Schema } = mongoose;

/**
 * Schema definition for a comment
 * 
 * @typedef {Object} Comment
 * @property {string} content - The content of the comment
 * @property {ObjectId} author - The ID of the user who authored the comment
 * @property {boolean} isAnonymous - Indicates if the comment is anonymous
 * @property {ObjectId} blogPost - The ID of the blog post the comment is associated with
 * @property {Date} createdAt - The date the comment was created
 * @property {Date} updatedAt - The date the comment was last updated
 */

const commentSchema = new Schema({
  content: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  isAnonymous: {
    type: Boolean,
    default: true,
  },
  blogPost: {
    type: Schema.Types.ObjectId,
    ref: 'BlogPost',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

export default mongoose.model('Comment', commentSchema);
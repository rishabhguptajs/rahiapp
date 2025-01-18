"use client";

/**
 * @page BlogPost
 * @description Renders a blog post along with comments and sharing options.
 */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { Toaster, toast } from "react-hot-toast";
import Head from "next/head";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import Header from "../../../components/Header";

const BlogPost = () => {
  const [blog, setBlog] = useState(null); // State to hold the blog post data
  const [comments, setComments] = useState([]); // State to hold comments for the blog post
  const [newComment, setNewComment] = useState(""); // State to hold the new comment input
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(null); // State to manage error messages
  const params = useParams(); // Get URL parameters
  const slug = params.slug; // Extract slug from parameters

  useEffect(() => {
    /**
     * Fetches the blog post data from the server.
     * @async
     * @function fetchBlogPost
     */
    const fetchBlogPost = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/blog/posts/${slug}`
        );
        setBlog(response.data); // Set the blog data
        setComments(response.data.comments); // Set the comments for the blog
        setLoading(false); // Update loading status
      } catch (error) {
        setError("Failed to load blog post. Please try again later."); // Set error message
        setLoading(false); // Update loading status
      }
    };

    if (slug) {
      fetchBlogPost(); // Fetch blog post if slug is available
    }
  }, [slug]);

  /**
   * Handles the submission of a new comment.
   * @async
   * @function handleCommentSubmit
   * @param {Event} e - The event object
   */
  const handleCommentSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const toastLoad = toast.loading("Posting comment..."); // Show loading toast
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/blog/posts/${blog._id}/comments`,
        { content: newComment } // Send new comment to the server
      );
      setComments([...comments, response.data]); // Update comments state
      toast.dismiss(toastLoad); // Dismiss loading toast
      toast.success("Comment posted successfully!"); // Show success toast
      setNewComment(""); // Clear the new comment input
    } catch (error) {
      toast.error("Failed to post comment. Please try again."); // Show error toast
    }
  };

  /**
   * Generates the share URL for the specified platform.
   * @function getShareUrl
   * @param {string} platform - The social media platform
   * @returns {string} The share URL
   */
  const getShareUrl = (platform) => {
    const url = window.location.href; // Get current URL
    const text = blog ? `Check out this blog about: ${blog.title}` : "Check out this blog!";
    
    switch (platform) {
      case "facebook":
        return `https://www.facebook.com/sharer/sharer.php?u=${url}`;
      case "twitter":
        return `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
      case "linkedin":
        return `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
      case "whatsapp":
        return `https://api.whatsapp.com/send?text=${text} ${url}`;
      default:
        return "#";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-24 w-24 border-8 border-t-transparent border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-600">
        {error}
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        Blog post not found
      </div>
    );
  }

  return (
    <div>
      <Toaster />
      <Header />
      <Head>
        <title>{blog.metaTitle || blog.title}</title>
        <meta name="description" content={blog.metaDescription || blog.excerpt} />
        <meta name="keywords" content={blog.metaKeywords?.join(", ") || "blog, travel, Himalayas"} />
        <link rel="canonical" href={window.location.href} />
      </Head>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link href="/blogs" className="inline-block mb-6 hover:underline text-orange-500">
          &larr; Back to Blogs
        </Link>

        <article className="mb-12">
          <h1 className="text-5xl font-bold mb-4 text-orange-500">{blog.title}</h1>
          <div className="flex items-center mb-6 text-gray-600">
            <time dateTime={blog.createdAt}>
              {format(new Date(blog.createdAt), "MMMM d, yyyy")}
            </time>
          </div>
          <div className="relative w-full h-96 mb-8">
            <Image
              src={blog.coverImage}
              alt={blog.title}
              layout="fill"
              objectFit="cover"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="prose prose-lg max-w-none mb-12">
            <div dangerouslySetInnerHTML={{ __html: formatText(blog.content) }} />
          </div>

          <div className="flex justify-start items-center space-x-4 mb-8">
            <a
              href={getShareUrl("facebook")}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
            >
              <FaFacebookF />
            </a>
            <a
              href={getShareUrl("twitter")}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-blue-400 text-white rounded-full hover:bg-blue-500"
            >
              <FaTwitter />
            </a>
            <a
              href={getShareUrl("linkedin")}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-blue-800 text-white rounded-full hover:bg-blue-900"
            >
              <FaLinkedinIn />
            </a>
            <a
              href={getShareUrl("whatsapp")}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600"
            >
              <FaWhatsapp />
            </a>
          </div>
        </article>

        <div className="border-t pt-4">
          <h2 className="text-2xl font-semibold mb-4">Leave a Comment</h2>
          <form onSubmit={handleCommentSubmit} className="mb-6">
            <textarea
              className="w-full border rounded-lg p-2 mb-4"
              rows="5"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            ></textarea>
            <button
              type="submit"
              className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
            >
              Post Comment
            </button>
          </form>
          <div className="space-y-4">
            {comments.map((comment) => (
              <div
                key={comment._id}
                className="bg-gray-100 p-4 rounded-lg shadow-sm"
              >
                <p>{comment.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Formats the text by replacing specific patterns with HTML elements.
 * @function formatText
 * @param {string} text - The text to format
 * @returns {string} The formatted text as HTML
 */
const formatText = (text) => {
  const formattedText = text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/__(.*?)__/g, "<strong>$1</strong>")
    .replace(/\*\*(\d+\.)\s(.*?)(?=\n|\*\*|$)/g, "<strong>$1</strong> $2")
    .replace(/(\d+)\./g, "<span class='font-bold'>$1.</span>")
    .replace(/(?:\r\n|\r|\n)/g, "<br/>");

  return formattedText;
};

export default BlogPost;

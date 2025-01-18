"use client";

/**
 * @page Blogs
 * @description Renders a list of blog posts with loading state and error handling.
 */
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]); // State to hold the list of blog posts
  const [loading, setLoading] = useState(true); // State to manage loading status

  useEffect(() => {
    /**
     * Fetches the list of blog posts from the server.
     * @async
     * @function fetchBlogs
     */
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/blog/posts`
        );
        setBlogs(response.data); // Set the blog posts data
        setLoading(false); // Update loading status
      } catch (error) {
        console.error("Error fetching blog posts:", error); // Log error message
        setLoading(false); // Update loading status
      }
    };

    fetchBlogs(); // Call the function to fetch blogs
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-24 w-24 border-8 border-t-transparent border-b-transparent border-customOrange">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-white to-customOrange rounded-full h-10 w-10"></div>
        </div>
      </div>
    );
  }

  return (
    <>
    <Header/>
      <div className="container mx-auto p-6">
        <div>
          <h1 className="text-5xl font-extrabold mb-8 text-customOrange text-center pb-8">
            Our Blogs
          </h1>
        </div>
        {blogs.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <Link href={`/blogs/${blog.slug}`} key={blog._id}>
                <div className="block bg-white rounded-lg shadow-lg hover:shadow-xl overflow-hidden transform hover:-translate-y-1 transition-all">
                  <div className="relative h-56 w-full">
                    <Image
                      src={blog.coverImage}
                      alt={blog.title}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-t-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 rounded-t-lg"></div>
                  </div>
                  <div className="p-6">
                    <h2 className="text-2xl font-semibold text-customOrange mb-4">
                      {blog.title}
                    </h2>
                    <p className="text-gray-600 line-clamp-3 leading-relaxed mb-4">
                      {blog.excerpt}
                    </p>
                    <span className="text-customOrange font-medium hover:underline">
                      Read more
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No blog posts available.</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Blogs;

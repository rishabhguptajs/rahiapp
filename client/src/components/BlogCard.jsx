/**
 * @component BlogCard
 * @description Renders a card component displaying blog information including title, excerpt, publication date, and estimated reading time.
 */
'use client';
import Image from "next/image";
import Link from "next/link";

/**
 * BlogCard component
 * @param {Object} props - Component properties
 * @param {Object} props.blog - Blog object containing details such as title, excerpt, cover image, and publication date
 * @returns {JSX.Element} The rendered blog card component
 */
const BlogCard = ({ blog }) => {
  return (
    <div className="w-full max-w-sm lg:max-w-xs flex flex-col bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 h-96">
      <div className="relative h-48 flex-none bg-cover text-center overflow-hidden">
        <Image
          src={blog.coverImage}
          alt={blog.title}
          layout="fill"
          objectFit="cover"
          className="w-full"
        />
      </div>
      <div className="flex flex-col justify-between p-4 flex-grow">
        <div className="mb-4">
          <div className="text-customOrange font-bold text-xl mb-2">
            <Link href={`/blog/${blog.slug}`}>
              <span className="hover:text-orange-600">{blog.title}</span>
            </Link>
          </div>
          <p className="text-gray-700 text-base line-clamp-3">{blog.excerpt}</p>
        </div>
        <div className="flex items-center justify-between">
          <span className="inline-block bg-orange-100 text-customOrange rounded-full px-3 py-1 text-sm font-semibold mr-2">
            {new Date(blog.published).toLocaleDateString()}
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
            {Math.ceil(blog.content.split(" ").length / 200)} min read
          </span>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;

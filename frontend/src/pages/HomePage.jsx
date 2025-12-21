import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-white w-full h-full">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Share Your Thoughts with the World
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mb-6">
          A simple and secure blogging platform where you can read, write, and
          share your ideas with others.
        </p>
        <div className="flex gap-4">
          <Link
            to="/blogs"
            className="bg-black dark:bg-white dark:text-black text-white px-6 py-2 rounded-sm "
          >
            Explore Blogs
          </Link>
          <Link
            to="/create"
            className="border border-black text-black dark:text-white px-6 py-2 rounded-sm dark:border-white   transition"
          >
            Create Blog
          </Link>
        </div>
      </section>

      {/* Featured Blogs */}
      <section className="px-6 py-12">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Featured Blogs
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-gray-100 dark:bg-gray-900 p-5 rounded-sm shadow hover:shadow-md border border-gray-700  transition"
            >
              <h3 className="text-xl font-semibold mb-2">Blog Title {item}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                This is a short description of the blog post. Click to read
                more.
              </p>
              <Link
                to="/blogs"
                className="text-indigo-600 dark:text-indigo-400 font-medium"
              >
                Read more →
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;

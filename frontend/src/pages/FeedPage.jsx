import React, { useState } from "react";
import Card from "../components/Card";
const FeedPage = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full min-h-screen bg-white dark:bg-gray-900 p-6">
      {/* Categories */}
      <div className="relative w-60 mb-6 pl-8">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between 
          bg-gray-50 dark:bg-gray-800 
          text-gray-700 dark:text-gray-200
          px-4 py-2 rounded-lg shadow"
        >
          <span>Categories</span>
          <i className="ri-arrow-down-s-line text-xl"></i>
        </button>

        {open && (
          <ul
            className="absolute mt-2 w-full 
            bg-gray-50 dark:bg-gray-800 
            rounded-lg shadow-lg overflow-hidden"
          >
            <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white cursor-pointer">
              Education
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white  cursor-pointer">
              Food
            </li>
            <li className="px-4 py-2 dark:text-white  hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
              Technology
            </li>
          </ul>
        )}
      </div>

      {/* Feed */}
      <div className="flex flex-col gap-4 px-5">
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
};

export default FeedPage;

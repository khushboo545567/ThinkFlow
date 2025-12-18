import React from "react";
const RegisgerPage = function () {
  return (
    <div
      className="min-h-screen flex items-center justify-center 
      bg-gray-100 dark:bg-gray-900"
    >
      <div
        className="w-full max-w-md bg-white dark:bg-gray-800 
        p-6 rounded-lg shadow-md"
      >
        <h2
          className="text-2xl font-semibold text-center 
          text-gray-800 dark:text-white mb-6"
        >
          Create Account
        </h2>

        <form className=" flex flex-col gap-4 p-4">
          <div>
            <label
              className="block text-sm mb-1 
              text-gray-600 dark:text-gray-300"
            >
              Username
            </label>
            <input
              type="text"
              name="userName"
              className="w-full px-3 py-2 rounded 
                border border-gray-300 dark:border-gray-600
                bg-white dark:bg-gray-700
                text-black dark:text-white
                focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label
              className="block text-sm mb-1 
              text-gray-600 dark:text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              className="w-full px-3 py-2 rounded 
                border border-gray-300 dark:border-gray-600
                bg-white dark:bg-gray-700
                text-black dark:text-white
                focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label
              className="block text-sm mb-1 
              text-gray-600 dark:text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              className="w-full px-3 py-2 rounded 
                border border-gray-300 dark:border-gray-600
                bg-white dark:bg-gray-700
                text-black dark:text-white
                focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label
              className="block text-sm mb-1 
              text-gray-600 dark:text-gray-300"
            >
              Bio
            </label>
            <input
              type="text"
              name="bio"
              className="w-full px-3 py-2 rounded 
                border border-gray-300 dark:border-gray-600
                bg-white dark:bg-gray-700
                text-black dark:text-white
                focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisgerPage;

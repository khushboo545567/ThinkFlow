import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div
      className="
        fixed left-0 top-0
        w-64 h-screen
        bg-white dark:bg-gray-900
        p-4 pt-16
        border-r border-gray-200 dark:border-gray-700
      "
    >
      <div className="flex flex-col gap-1">
        <Link
          to="/admin/dashboard"
          className="flex gap-3 text-lg hover:bg-gray-100 p-2 rounded-sm hover:dark:bg-gray-700"
        >
          <i className="ri-home-2-fill text-black dark:text-white cursor-pointer "></i>
          <span className="text-black dark:text-white">Dashboard</span>
        </Link>
        <Link
          to="/feed"
          className="flex gap-3 text-lg hover:bg-gray-100 p-2 rounded-sm hover:dark:bg-gray-700"
        >
          <i className="ri-article-line text-black dark:text-white cursor-pointer"></i>

          <span className="text-black dark:text-white"> Manage Post</span>
        </Link>
        <Link
          to="/postblog"
          className="flex gap-3 text-lg hover:bg-gray-100 p-2 rounded-sm hover:dark:bg-gray-700"
        >
          <i className="ri-edit-line text-black dark:text-white cursor-pointer"></i>

          <span className="text-black dark:text-white">
            Post Manage Comments
          </span>
        </Link>
        <Link
          to="/profile"
          className="flex gap-3 text-lg hover:bg-gray-100  p-2 rounded-sm hover:dark:bg-gray-700"
        >
          <i className="ri-account-circle-fill text-black dark:text-white cursor-pointer"></i>
          <span className="text-black dark:text-white">
            Assign Permission To Role
          </span>
        </Link>
        <Link
          to="/status"
          className="flex gap-3 text-lg hover:bg-gray-100  p-2 rounded-sm hover:dark:bg-gray-700"
        >
          <i className="ri-bar-chart-fill text-black dark:text-white cursor-pointer"></i>
          <span className="text-black dark:text-white">
            Assign role to user
          </span>
        </Link>
        <Link
          to="/status"
          className="flex gap-3 text-lg hover:bg-gray-100  p-2 rounded-sm hover:dark:bg-gray-700"
        >
          <i className="ri-bar-chart-fill text-black dark:text-white cursor-pointer"></i>
          <span className="text-black dark:text-white">Manage Roles</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;

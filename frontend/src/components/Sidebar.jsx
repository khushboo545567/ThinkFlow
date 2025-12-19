import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div
      className="
        fixed top-16 left-0
        w-64 h-[calc(100vh-4rem)]
        bg-gray-800 dark:bg-gray-800
        text-white p-4 pt-16
      "
    >
      <div className="flex flex-col gap-4">
        <Link
          to="/"
          className="flex gap-3 text-lg hover:bg-green-300 p-2 rounded-sm"
        >
          <i class="ri-home-2-fill"></i>Home
        </Link>
        <Link
          to="/profile"
          className="flex gap-3 text-lg hover:bg-green-300 p-2 rounded-sm"
        >
          <i class="ri-account-circle-fill"></i>Profile
        </Link>
        <Link
          to="#"
          className="flex gap-3 text-lg hover:bg-green-300 p-2 rounded-sm"
        >
          <i class="ri-bar-chart-fill"></i>Status
        </Link>
        <Link
          to="#"
          className="flex gap-3 text-lg hover:bg-green-300 p-2 rounded-sm"
        >
          <i class="ri-book-marked-fill"></i>Library
        </Link>
        <Link
          to="#"
          className="flex gap-3 text-lg hover:bg-green-300 p-2 rounded-sm"
        >
          <i class="ri-group-fill"></i>Following+
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;

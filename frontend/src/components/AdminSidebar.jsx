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
        {/* Admin Profile (Default Page) */}
        <Link
          to="/admin/profile"
          className="flex items-center gap-3 text-lg p-2 rounded-sm hover:bg-gray-100 hover:dark:bg-gray-700"
        >
          <i className="ri-user-3-fill text-black dark:text-white"></i>
          <span className="text-black dark:text-white">Admin Profile</span>
        </Link>

        {/* Dashboard */}
        <Link
          to="/admin/manageuser"
          className="flex items-center gap-3 text-lg p-2 rounded-sm hover:bg-gray-100 hover:dark:bg-gray-700"
        >
          <i className="ri-dashboard-fill text-black dark:text-white"></i>
          <span className="text-black dark:text-white">Manage User </span>
        </Link>

        {/* Manage Roles */}
        <Link
          to="/admin/roles"
          className="flex items-center gap-3 text-lg p-2 rounded-sm hover:bg-gray-100 hover:dark:bg-gray-700"
        >
          <i className="ri-shield-user-fill text-black dark:text-white"></i>
          <span className="text-black dark:text-white">Manage Roles</span>
        </Link>

        {/* Manage Permissions */}
        <Link
          to="/admin/permission"
          className="flex items-center gap-3 text-lg p-2 rounded-sm hover:bg-gray-100 hover:dark:bg-gray-700"
        >
          <i className="ri-lock-2-fill text-black dark:text-white"></i>
          <span className="text-black dark:text-white">Manage Permissions</span>
        </Link>

        {/* Assign Permission to Role */}
        <Link
          to="/admin/assignpermission"
          className="flex items-center gap-3 text-lg p-2 rounded-sm hover:bg-gray-100 hover:dark:bg-gray-700"
        >
          <i className="ri-key-fill text-black dark:text-white"></i>
          <span className="text-black dark:text-white">Assign Permissions</span>
        </Link>

        {/* Manage Comments */}
        <Link
          to="/admin/managecomment"
          className="flex items-center gap-3 text-lg p-2 rounded-sm hover:bg-gray-100 hover:dark:bg-gray-700"
        >
          <i className="ri-chat-delete-fill text-black dark:text-white"></i>
          <span className="text-black dark:text-white">Manage Comments</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;

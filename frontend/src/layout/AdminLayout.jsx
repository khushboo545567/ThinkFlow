import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/AdminSidebar";

export default function AdminLayout() {
  return (
    <div className="flex">
      <Sidebar />

      {/* Main content */}
      <div className="ml-64 w-full p-6">
        <Outlet />
      </div>
    </div>
  );
}

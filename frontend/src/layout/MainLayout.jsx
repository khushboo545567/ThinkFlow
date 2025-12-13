import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
export default function MainLayout() {
  return (
    <>
      <Navbar />
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 p-4 bg-gray-100">
          <Outlet />
        </div>
      </div>
    </>
  );
}

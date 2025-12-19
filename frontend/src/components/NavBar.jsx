import React from "react";
import "remixicon/fonts/remixicon.css";
import { Link } from "react-router-dom";
import useTheme from "../context/ThemeContext";

const Navbar = () => {
  const { themeMode, lightTheme, darkTheme } = useTheme();

  return (
    <nav
      className="fixed top-0 left-0 w-full h-16 bg-[#FFFFFF]
       dark:bg-gray-900 
      text-white flex items-center justify-between px-4 z-50 border-b border-gray-200 dark:border-gray-900"
    >
      <div className="flex items-center gap-4">
        <i className="ri-menu-line text-2xl text-black dark:text-white cursor-pointer"></i>
        {themeMode === "light" ? (
          <Link to="/" className="">
            <img src="/logo.png" alt="logo" className="text-black w-[70px]" />
          </Link>
        ) : (
          <Link to="/" className="">
            <img
              src="/blacklogo.png"
              alt="logo"
              className="text-black w-[70px]"
            />
          </Link>
        )}

        <div className="flex items-center bg-gray-100 text-black rounded-sm px-3 py-1">
          <i className="ri-search-line  text-black  cursor-pointer"></i>
          <input
            type="text"
            placeholder="Search..."
            className="outline-none px-2 text-sm"
          />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        {/* THEME TOGGLE */}
        <button
          onClick={themeMode === "light" ? darkTheme : lightTheme}
          className="text-2xl"
        >
          {themeMode === "light" ? (
            <i className="ri-moon-fill text-black dark:text-white cursor-pointer"></i>
          ) : (
            <i className="ri-sun-fill text-black dark:text-white cursor-pointer"></i>
          )}
        </button>

        <button className="bg-[#F9F9F9] text-black px-3 py-1 text-lg rounded-sm hover:bg-gray-200">
          <Link to="/login">Login</Link>
        </button>
        <button className="bg-[#F9F9F9] text-black px-3 py-1 text-lg rounded-sm hover:bg-gray-200">
          <Link to="/register">Signup</Link>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

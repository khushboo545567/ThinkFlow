import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisgerPage from "./pages/RegisterPage.jsx";
import AuthLayout from "./layout/authLayout.jsx";
import MainLayout from "./layout/mainLayout.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import ErrorPage from "./pages/error404.jsx";
import FeedPage from "./pages/FeedPage.jsx";
import SavedItems from "./pages/SavedItemsPage.jsx";
import StatusPage from "./pages/StatusPage.jsx";
import BlogDetails from "./pages/BlogDetails.jsx";
import PostBlog from "./pages/PostBlog.jsx";
import DashBoard from "./pages/admin/DashBoard.jsx";
import AdminLayout from "./layout/AdminLayout.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* main routes */}
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<HomePage />} />
        <Route path="error" element={<ErrorPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/save" element={<SavedItems />} />
        <Route path="/status" element={<StatusPage />} />
        <Route path="/blogdetails" element={<BlogDetails />} />
        <Route path="/postblog" element={<PostBlog />} />
      </Route>
      {/* auth routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />{" "}
        <Route path="/register" element={<RegisgerPage />} />
      </Route>
      {/* admin routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="/dashboard" element={<DashBoard />}></Route>
      </Route>
    </>
  )
);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <App /> */}
    <ThemeProvider>
      <ToastContainer position="top-right" autoClose={2000} />
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);

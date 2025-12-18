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

import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisgerPage from "./pages/RegisterPage.jsx";
import AuthLayout from "./layout/authLayout.jsx";
import MainLayout from "./layout/mainLayout.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* main routes */}
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<HomePage />} />

        <Route path="/profile" element={<ProfilePage />} />
      </Route>
      {/* auth routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />{" "}
        <Route path="/register" element={<RegisgerPage />} />
      </Route>
    </>
  )
);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <App /> */}
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);

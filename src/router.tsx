import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from "react-router-dom";
import Root from "./root";
import Home from "./pages/home";
import SongPreview from "./components/SongPreview";
import Charts from "./pages/charts";
import Submitmusic from "./pages/submitmusic";
import SubmitSingle from "./pages/SubmitSingle";
import SubmitAlbum from "./pages/SubmitAlbum";
import { JSX } from "react";
import AdminLayout from "./components/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Settings from "./pages/admin/Settings";
import UserManagement from "./pages/admin/UserManagement";
import Login from "./pages/admin/Login"; // Import the login page

import { jwtDecode } from 'jwt-decode';

const RequireAdmin = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/admin/login" />;
  }

  try {
    const decodedToken = jwtDecode<{ userId: string; role: string }>(token); // Decode the token
    const userRole = decodedToken.role;

    return userRole === "admin" ? children : <Navigate to="/admin" />;
  } catch (error) {
    console.error("Invalid token:", error);
    return <Navigate to="/admin/login" />;
  }
};

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Home />} />
      <Route path="/songPreview/:id" element={<SongPreview />} />
      <Route path="/charts" element={<Charts/>} />
      <Route path="/submit-music" element={<Submitmusic/>} />
      <Route path="/submit-single" element={<SubmitSingle/>} />
       <Route path="/submit-album" element={<SubmitAlbum />} />
       <Route
          path="/admin/*"
          element={
            <RequireAdmin>
              <AdminLayout />
            </RequireAdmin>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="/admin/login" element={<Login />} />
    </Route>
  )
);

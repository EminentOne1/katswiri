import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom";
import Root from "./root";
import Home from "./pages/home";
import SongPreview from "./components/SongPreview";
import Charts from "./pages/charts";
import Submitmusic from "./pages/submitmusic";
import SubmitSingle from "./pages/SubmitSingle";
import SubmitAlbum from "./pages/SubmitAlbum";
import { JSX } from "react";
import AdminLayout from "./components/AdminLayout";
import { DashboardContent } from "./pages/admin/Dashboard";
import Settings from "./pages/admin/Settings";
import UserManagement from "./pages/admin/UserManagement";
import Login from "./pages/admin/Login"; 
import Preload from "./components/Preload"; // Import the Preload component

import { jwtDecode } from "jwt-decode"; 
import AdminUsers from "./components/AdminUsers";

const RequireAdmin = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/admin/login" />;
  }

  try {
    const decodedToken = jwtDecode<{ userId: string; role: string }>(token); 
    const userRole = decodedToken.role; 
    console.log("Decoded token:", decodedToken);
    if (userRole === "authenticated") {
      return children;
    }
    console.log("User is not an admin:", userRole || "No role found in token");
    return <Navigate to="/" />;
  } catch (error) {
    console.error("Invalid token:", error);
    return <Navigate to="/admin/login" />;
  }
};

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Preload><Root /></Preload>}> {/* Wrap Root in Preload */}
      <Route index element={<Home />} />
      <Route path="/songPreview/:id" element={<SongPreview />} />
      <Route path="/charts" element={<Charts />} />
      <Route path="/submit-music" element={<Submitmusic />} />
      <Route path="/submit-single" element={<SubmitSingle />} />
      <Route path="/submit-album" element={<SubmitAlbum />} />
      <Route
        path="/admin"
        element={
          <RequireAdmin>
            <AdminLayout />
          </RequireAdmin>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<DashboardContent />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      <Route path="/admin/login" element={<Login />} />
    </Route>
  )
);
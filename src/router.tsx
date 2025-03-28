
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

const userRole = "admin"; // Replace with actual role from authentication logic

const RequireAdmin = ({ children }: { children: JSX.Element }) => {
  return userRole === "admin" ? children : <Navigate to="/" />;
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
    </Route>
  )
);

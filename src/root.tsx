import React, { Suspense, lazy, useState } from "react";
import { Outlet, useLocation, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Divider from "./components/components_old/divider";
import Footer from "./components/footer";
// import Sidebar from "./components/sidebar";
import Login from "./pages/Login"; // Import the new Login page

const Root = () => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="app-container">
      {!isAdminRoute && (
        <div className="header-top">
          <span>Katswirimusic.mail@gmail.com</span>
          <Divider />
          <span>0994276727</span>
        </div>
      )}
      {!isAdminRoute && (
        <Header
          logoText={""}
          handlesearchtext={function (searchText: string): void {
            // ...existing code...
          }}
        />
      )}
      <main>
        <div className="content-wrapper">
       
 
            <Outlet />
 
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default Root;

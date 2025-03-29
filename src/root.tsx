import React, { Suspense, lazy, useState } from "react";
import { Outlet, useLocation, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Divider from "./components/divider";
import Footer from "./components/footer";

const Root = () => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
 const [typedValue,setTypedValue]=useState("");
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
          handlesearchtext={function (searchText: string): void {setTypedValue(searchText)}}
          
        />
      )}
      <main>
        <div className="content-wrapper">
          <Outlet />
        </div>
        
      </main>
      <Footer />
    </div>
  );
};

export default Root;

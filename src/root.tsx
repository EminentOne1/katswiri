import React, { Suspense, lazy, useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "./components/Header";
import Sidebar from "./components/sidebar";

const Root = () => {
  const [currentTrack, setCurrentTrack] = useState(null);

  return (
    <div className="app-container">
      <Header logoText="Katswiri" />
      <main>
        <div className="content-wrapper">
          <Sidebar />
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Root;

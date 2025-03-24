import React, { Suspense, lazy, useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "./components/Header";
import Divider from "./components/components_old/divider";
// import Sidebar from "./components/sidebar";

const Root = () => {
  const [currentTrack, setCurrentTrack] = useState(null);

  return (
    <div className="app-container">
       <div className="header-top"><span>Katswiri.mail@gmail.com</span><Divider/><span>0994276727</span></div>
      <Header logoText="Katswiri" />
      <main>
        <div className="content-wrapper">
          {/* <Sidebar /> */}
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Root;

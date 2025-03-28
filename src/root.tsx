import React, { Suspense, lazy, useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "./components/Header";
import Divider from "./components/components_old/divider";
import Footer from "./components/footer";
// import Sidebar from "./components/sidebar";

const Root = () => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [searchText, setSearchText] = useState<string>("");
  return (
    <div className="app-container">
      <div className="header-top"><span>Katswirimusic.mail@gmail.com</span><Divider /><span>0994276727</span></div>
      <Header logoText={""} handlesearchtext={function (searchText: string): void {
        searchText.length > 0 ? setSearchText(searchText) : setSearchText("");
      }} />
      <main>
        <div className="content-wrapper">
          {/* <Sidebar /> */}
          <Outlet />
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default Root;

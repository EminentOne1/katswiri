import React from "react";
import { Outlet, Link } from "react-router-dom";
import Navbar from "./components/navbar";
import SideNav from "./components/sidenav";

const Root = () => {
  return (
    <div>
      <Navbar isloggedin={false}/>
      <main >
        <div className="main-container">
          <SideNav/>
        <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Root;

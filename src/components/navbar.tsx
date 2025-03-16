import { useState } from "react";
import Logo from "./logo";
import ProfileSect from "./ProfileSect";
import Searchbar from "./searchbar";
import Divider from "./divider";

interface nav {
  isloggedin?: boolean;
}
const Navbar: React.FC<nav> = ({ isloggedin }) => {
  return (
    <>
      <nav className="navigation-bar">
        <div className="logosearchbar">
          <Logo />
          <Searchbar />
          <button className="contact">Downloads</button>
          <button
            className="button-login"
            style={{
              width: "fit-content",
              backgroundColor: "transparent",
              border: "1px solid  rgba(0, 0, 0, 0.2)",
              color: "rgba(0, 0, 0, 0.2)",
              display:"flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            Music Distribution channels
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect x="16" y="16" width="6" height="6" rx="1" />
              <rect x="2" y="16" width="6" height="6" rx="1" />
              <rect x="9" y="2" width="6" height="6" rx="1" />
              <path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3" />
              <path d="M12 12V8" />
            </svg>
          </button>
        </div>
        <Divider />
        <button className="contact">Submit Music</button>
        <button className="contact">Contact us</button>
        <Divider />

        <ProfileSect isloggedin={isloggedin} />
      </nav>
    </>
  );
};
export default Navbar;

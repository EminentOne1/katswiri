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
          <button className="contact my-downloads">My Downloads</button>
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
            }}>
            Distribution channels
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

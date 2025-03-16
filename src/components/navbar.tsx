import { useState } from "react";
import Logo from "./logo";
import ProfileSect from "./ProfileSect";
import Searchbar from "./searchbar";
import Divider from "./divider";

interface nav {
  isloggedin?: boolean;
}
const Navbar: React.FC<nav> = ({isloggedin}) => {

  
  return (
    <>
      <nav className="navigation-bar">
        <div className="logosearchbar">
        <Logo />
        <Searchbar />

        </div>
      
        <button className="contact">Submit Music</button>
        <button className="contact">Contact us</button>
        <Divider/>
    
        <ProfileSect isloggedin = {isloggedin}/>
      </nav>
      
    </>
  );
};
export default Navbar;

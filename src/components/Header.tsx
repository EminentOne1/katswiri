import React from "react";
import { useNavigate } from "react-router-dom";
import NavigationIcons from "./NavigationIcons";

interface HeaderProps {
  logoText: string;
  handlesearchtext: (searchText: string) => void;
}

const Header: React.FC<HeaderProps> = ({ logoText, handlesearchtext }) => {
  const Navigate = useNavigate();
  const [isVisible, setVissibility] = React.useState(false);
  const [searchText, setSearchText] = React.useState<string>("");

  const handleSearchTextChange = (text: string) => {
    setSearchText(text);
  };
  return (
    <header className="app-header">
      <img
        src="images/home.png"
        className="logo"
        alt={logoText}
        onClick={() => Navigate("/")}
      />
      <div className="search-container">
        <button
          className="search-button"
          aria-label="Perform search"
          onClick={() => setVissibility(true)}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M21.5306 20.4694L16.8366 15.7762C19.6629 12.383 19.3204 7.36693 16.0591 4.38935C12.7978 1.41176 7.77134 1.526 4.64867 4.64867C1.526 7.77134 1.41176 12.7978 4.38935 16.0591C7.36693 19.3204 12.383 19.6629 15.7762 16.8366L20.4694 21.5306C20.7624 21.8237 21.2376 21.8237 21.5306 21.5306C21.8237 21.2376 21.8237 20.7624 21.5306 20.4694V20.4694ZM3.75 10.5C3.75 6.77208 6.77208 3.75 10.5 3.75C14.2279 3.75 17.25 6.77208 17.25 10.5C17.25 14.2279 14.2279 17.25 10.5 17.25C6.77379 17.2459 3.75413 14.2262 3.75 10.5V10.5Z"
              fill="#CCCCCC"
            />
          </svg>
        </button>
        <div className={`search-input ${isVisible ? "visible" : ""}`}>
          <input
            type="text"
            placeholder="Search..."
            className="search"
            value={searchText}
            onChange={(e) => handleSearchTextChange(e.target.value)}
          />
          <img
            src="images/close.svg"
            alt="Close search"
            className="close-icon"
            onClick={() =>{ setVissibility(false); setSearchText("")}}
            style={{ filter: "invert(1)" }}
          />
        </div>
      </div>
      {/* <nav className="header-nav">
        <ul className="nav-list">
          <li><a href="#downloads" className="nav-link">My Downloads</a></li>
          <li><a href="#channels" className="nav-link">Distributor Channels</a></li>
        </ul>
      </nav> */}
      <NavigationIcons />
      {/* <ProfilePicture src="https://cdn.builder.io/api/v1/image/assets/TEMP/d3245392fe5f0963d6e9758a4d08af69761ab5fe" alt="Profile" /> */}
    </header>
  );
};

export default Header;

import React from 'react';
import SearchBar from './SearchBar';
import NavigationIcons from './NavigationIcons';
import ProfilePicture from './ProfilePicture';

interface HeaderProps {
  logoText: string;
}

const Header: React.FC<HeaderProps> = ({ logoText }) => {
  return (
    <header className="app-header">
      <img src='images/home.png' className="logo" alt={logoText}/>
      {/* <SearchBar /> */}
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
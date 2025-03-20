import React from 'react';

const NavigationMenu: React.FC = () => {
  const menuItems = [
    { icon: 'images/home.svg', label: 'Home' },
    { icon: 'images/chartnew.svg', label: 'Chart' },
    { icon: 'images/favourites.svg', label: 'Favourites' },
    { icon: 'images/playlistnew.svg', label: 'Playlist' }
  ];

  return (
    <nav className="navigation-menu">
      <ul>
        {menuItems.map((item, index) => (
          <li key={index}>
            <a href={`#${item.label.toLowerCase()}`} className="nav-item">
              <img src={item.icon} alt={item.label} className="nav-icon"/>
             
              <span>{item.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavigationMenu;
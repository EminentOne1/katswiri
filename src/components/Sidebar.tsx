import React from 'react';
import UserInfo from './UserInfo';
import NavigationMenu from './NavigationMenu';
import LegalLinks from './LegalLinks';

const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      <UserInfo />
      <NavigationMenu />
      <LegalLinks />
    </aside>
  );
};

export default Sidebar;
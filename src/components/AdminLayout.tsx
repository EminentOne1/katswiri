import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
const AdminLayout: React.FC = () => {
  return (
    <div className="dashboard">
      <aside>
      <Sidebar />
      </aside>
      <main >
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;

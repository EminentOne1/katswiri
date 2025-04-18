import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";

const AdminLayout: React.FC = () => {
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
       <Sidebar/>
      </aside>
      <main className="admin-content">
        <Outlet /> 
      </main>
    </div>
  );
};

export default AdminLayout;

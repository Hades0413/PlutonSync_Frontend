import React, { useState } from "react";
import Sidebar from "../Sidebar";
import { Outlet, useNavigate } from "react-router-dom";

const Layout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex">
      <Sidebar
        isOpen={isSidebarOpen}
        onSidebarToggle={toggleSidebar}
        onLogout={handleLogout}
      />
      <main
  className={`flex-1 p-4 transition-all duration-300 ${
    isSidebarOpen ? "ml-64" : "ml-[70px]"
  }`}
>
  <Outlet />
</main>

    </div>
  );
};

export default Layout;

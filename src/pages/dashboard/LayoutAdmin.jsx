import Sidebar from "@/components/Admin/Sidebar";
import React from "react";
import { Outlet } from "react-router-dom";

const LayoutAdmin = () => {
  return (
    <div className="flex w-screen">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default LayoutAdmin;

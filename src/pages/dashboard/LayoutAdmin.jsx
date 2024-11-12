import Sidebar from "@/components/Admin/Sidebar";
import AdminMessager from "@/components/AdminMessager";
import React from "react";
import { Outlet } from "react-router-dom";

const LayoutAdmin = () => {
  return (
    <div className="flex w-screen">
      <Sidebar />
      <Outlet />
      <AdminMessager />
    </div>
  );
};

export default LayoutAdmin;

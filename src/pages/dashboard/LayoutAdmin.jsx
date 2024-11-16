import Sidebar from "@/components/Admin/Sidebar";
import AdminMessager from "@/components/AdminMessager";
import React from "react";
import { Outlet } from "react-router-dom";

const LayoutAdmin = () => {
  return (
    <div className="flex w-screen">
      <Sidebar />
      {/* <div className="min-w-[80px]"></div> */}
      <Outlet />
      <AdminMessager />
    </div>
  );
};

export default LayoutAdmin;

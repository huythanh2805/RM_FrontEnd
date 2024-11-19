import React from "react";
import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AdminMessager from "@/components/AdminMessager";
import { AppSidebar } from "@/components/Admin/Sidebar";

const LayoutAdmin = () => {
  return (
    <SidebarProvider>
      <div className="flex w-screen">
        <AppSidebar />
        <main className="flex-1">
          <SidebarTrigger />
          <Outlet />
        </main>
        <AdminMessager />
      </div>
    </SidebarProvider>
  );
};

export default LayoutAdmin;

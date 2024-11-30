import { AppSidebar } from "@/components/Admin/Sidebar";
import AdminMessager from "@/components/AdminMessager";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

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

import Navbar from "@/components/Admin/Navbar";
import { AppSidebar } from "@/components/Admin/Sidebar";
import AdminMessager from "@/components/AdminMessager";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

const LayoutAdmin = () => {
  return (
    <SidebarProvider>
      <div className="flex w-screen h-screen">
        <AppSidebar />
        <div className="flex flex-col flex-1">
          <Navbar />
          <main className="flex-1 p-10 bg-gray-100 overflow-y-auto">
            <Outlet />
          </main>
        </div>
        <AdminMessager />
      </div>
    </SidebarProvider>
  );
};

export default LayoutAdmin;

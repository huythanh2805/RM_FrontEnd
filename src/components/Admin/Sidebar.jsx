import {
  Home,
  User,
  Grid,
  Soup,
  Layers,
  Table,
  Contact,
  DollarSign,
  ChevronDown,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSubItem,
  SidebarMenuSub,
  SidebarProvider,
} from "@/components/ui/sidebar";

import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@radix-ui/react-collapsible";

import React from "react";
import { Link } from "react-router-dom";

export function AppSidebar() {
  const [open, setOpen] = React.useState(false);
  const menuItems = [
    { title: "Home", url: "/admin", icon: Home },
    { title: "Account", url: "/admin/users", icon: User },
    { title: "Table", url: "/admin/tables", icon: Table },
    { title: "Employee", url: "/admin/employees", icon: Contact },
    { title: "Bills", url: "/admin/bills", icon: DollarSign },
  ];

  const subItems = [
    { title: "Combo", url: "/admin/setCombos", icon: Layers },
    { title: "Categories", url: "/admin/categories", icon: Grid },
  ];

  return (
    <Sidebar className="w-64 h-full bg-gray-800 text-white">
      <SidebarHeader className="border-b ">
        <div className="flex items-center gap-4 p-4">
          <img
            src="/imgs/logoGolden.webp"
            alt="Golden Fork Logo"
            className="h-16 w-16 object-cover rounded-full"
          />
          <span className="font-bold text-2xl text-gray-800">Golden Fork</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent upContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton className="w-full hover:bg-gray-400 rounded-lg transition p-2">
                    <Link
                      to={item.url}
                      className="flex items-center gap-3 text-sm font-medium"
                    >
                      <item.icon className="w-5 h-5 text-gray-800" />
                      <span className="text-black">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              <Collapsible defaultOpen className="group">
                <SidebarMenuItem>
                  <SidebarMenuButton className="w-full hover:bg-gray-400 rounded-lg transition p-2">
                    <CollapsibleTrigger className="flex items-center justify-between w-full">
                      <Link
                        to="/admin/dishes"
                        className="flex items-center gap-3 text-sm font-medium"
                      >
                        <Soup className="w-5 h-5 text-gray-800" />
                        <span className="text-sm font-medium text-gray-800">
                          Dishes
                        </span>
                      </Link>

                      <ChevronDown className="w-5 h-5 text-gray-   group-data-[state=open]:rotate-180 transition-transform" />
                    </CollapsibleTrigger>
                  </SidebarMenuButton>

                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {subItems.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <Link
                            to={subItem.url}
                            className="flex items-center text-sm text-gray-800 hover:bg-gray-400 rounded-lg transition p-2"
                          >
                            {subItem.icon && (
                              <subItem.icon className="w-4 h-4 text-gray-800 mr-2" />
                            )}
                            {subItem.title}
                          </Link>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

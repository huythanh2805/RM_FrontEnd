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
} from "@/components/ui/sidebar";

import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@radix-ui/react-collapsible";

export function AppSidebar() {
  const menuItems = [
    { title: "Home", url: "/admin", icon: Home },
    { title: "Account", url: "/admin/users", icon: User },
    { title: "Categories", url: "/admin/categories", icon: Grid },
    { title: "Dishes", url: "/admin/dishes", icon: Soup },
    { title: "Combo", url: "/admin/setCombos", icon: Layers },
    { title: "Table", url: "/admin/tables", icon: Table },
    { title: "Employee", url: "/admin/employees", icon: Contact },
    { title: "Bills", url: "/admin/bills", icon: DollarSign },
  ];

  const subItems = [
    { title: "Item 1", url: "/" },
    { title: "Item 2", url: "/" },
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
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton className="w-full hover:bg-gray-400 rounded-lg transition p-2">
                    <a
                      href={item.url}
                      className="flex items-center gap-3 text-sm font-medium"
                    >
                      <item.icon className="w-5 h-5 text-gray-800" />
                      <span className="text-black">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              <Collapsible defaultOpen className="group">
                <SidebarMenuItem>
                  <SidebarMenuButton className="w-full hover:bg-gray-400 rounded-lg transition p-2">
                    <CollapsibleTrigger className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-3">
                        <Contact className="w-5 h-5 text-gray-800" />
                        <span className="text-sm font-medium text-gray-800">
                          More Options
                        </span>
                      </div>
                      <ChevronDown className="w-5 h-5 text-gray-   group-data-[state=open]:rotate-180 transition-transform" />
                    </CollapsibleTrigger>
                  </SidebarMenuButton>

                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {subItems.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <a
                            href={subItem.url}
                            className="ml-8 flex items-center gap-2 text-sm text-gray-400 hover:text-white transition"
                          >
                            {subItem.title}
                          </a>
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

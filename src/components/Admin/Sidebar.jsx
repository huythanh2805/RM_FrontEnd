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
  SidebarGroupLabel,
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

  const SubItems = [
    { title: "Item 1", url: "/" },
    { title: "Item 2", url: "/" },
  ];

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 p-4">
          <img
            src="/imgs/logoGolden.webp"
            alt="Golden Fork Logo"
            className="h-16 w-16 object-cover rounded-full"
          />
          <span className="font-bold text-lg">Golden Fork</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton className="my-2">
                    <a href={item.url} className="flex items-center gap-2">
                      <item.icon className="mr-2" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              <Collapsible defaultOpen className="group/collapsible">
                <SidebarMenuItem>
                  <SidebarMenuButton className="my-2">
                    <CollapsibleTrigger className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-2">
                        <Contact className="mr-2" />
                        <span>Item</span>
                      </div>
                      <ChevronDown className="transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </CollapsibleTrigger>
                  </SidebarMenuButton>

                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {SubItems.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <a
                            href={subItem.url}
                            className="ml-6 flex items-center gap-2"
                          >
                            <span>{subItem.title}</span>
                          </a>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                    <SidebarGroupContent />
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

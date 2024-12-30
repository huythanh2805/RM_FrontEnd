import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Home,
  User,
  Grid,
  Soup,
  Layers,
  Table,
  DollarSign,
  ChevronDown,
  List,
  Salad,
  MessageCircle,
  Ticket,
  TicketPlus,
  ChefHat,
  Contact,
  Calendar,
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
import { MdOutlineDiscount } from "react-icons/md";
import { CiViewList } from "react-icons/ci";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@radix-ui/react-collapsible";

export function AppSidebar() {
  const [isDishesOpen, setIsDishesOpen] = useState(false);
  const [isSubOpen, setIsSubOpen] = useState(false);

  const menuItems = [
    { title: "Trang chủ", url: "/admin", icon: Home },
    { title: "Danh sách đặt bàn", url: "/admin/listReser", icon: List },
    { title: "Bàn", url: "/admin/tables", icon: Table },
    { title: "Hóa đơn", url: "/admin/bills", icon: DollarSign },
    { title: "Tài khoản", url: "/admin/users", icon: User },
    { title: "Nhân viên", url: "/admin/employees", icon: Contact },
    { title: "Lịch làm việc", url: "/admin/workSchedule", icon: Calendar },
    { title: "Đánh giá", url: "/admin/feedbacks", icon: MessageCircle },
    { title: "Nhà bếp", url: "/admin/kitchen", icon: ChefHat },
  ];

  const subItems = [
    { title: "Danh mục", url: "/admin/categories", icon: Grid },
    { title: "Món ăn", url: "/admin/dishes", icon: Salad },
    { title: "Combo", url: "/admin/setCombos", icon: Layers },
  ];

  const discountItems = [
    { title: "Tạo phiếu", url: "/admin/discounts", icon: TicketPlus },
    { title: "Danh sách phiếu", url: "/admin/listDiscounts", icon: CiViewList },
  ];

  return (
    <Sidebar className=" bg-gray-800 text-white">
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-4 p-4">
          <img
            src="/imgs/logoGolden.webp"
            alt="Golden Fork Logo"
            className="h-16 w-16 object-cover rounded-full"
          />
          <span className="dancing text-2xl font-bold text-gray-800">
            Golden Fork
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-4">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <Link
                    to={item.url}
                    className="flex items-center gap-3 text-xl font-medium"
                  >
                    <SidebarMenuButton className="w-full hover:bg-gray-400 rounded-lg transition p-2">
                      <div className="flex items-center gap-3 text-xl font-medium">
                        <item.icon className="w-5 h-5 text-gray-800" />
                        <span className="text-black">{item.title}</span>
                      </div>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}

              <Collapsible open={isDishesOpen} onOpenChange={setIsDishesOpen}>
                <SidebarMenuItem>
                  <SidebarMenuButton className="w-full hover:bg-gray-400 rounded-lg transition p-2">
                    <CollapsibleTrigger className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-3">
                        <Soup className="w-5 h-5 text-gray-800" />
                        <span className="text-xl text-black">Món ăn</span>
                      </div>

                      <ChevronDown
                        className={`w-5 h-5 text-gray-800 transition-transform ${
                          isDishesOpen ? "rotate-180" : ""
                        }`}
                      />
                    </CollapsibleTrigger>
                  </SidebarMenuButton>

                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {subItems.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <Link
                            to={subItem.url}
                            className="flex items-center text-base text-gray-800 hover:bg-gray-400 rounded-lg transition p-2"
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

              <Collapsible open={isSubOpen} onOpenChange={setIsSubOpen}>
                <SidebarMenuItem>
                  <SidebarMenuButton className="w-full hover:bg-gray-400 rounded-lg transition p-2">
                    <CollapsibleTrigger className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-3">
                        <Ticket className="w-5 h-5 text-gray-800" />
                        <span className="text-xl text-black">
                          Phiếu giảm giá
                        </span>
                      </div>

                      <ChevronDown
                        className={`w-5 h-5 text-gray-800 transition-transform ${
                          isSubOpen ? "rotate-180" : ""
                        }`}
                      />
                    </CollapsibleTrigger>
                  </SidebarMenuButton>

                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {discountItems.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <Link
                            to={subItem.url}
                            className="flex items-center text-base text-gray-800 hover:bg-gray-400 rounded-lg transition p-2"
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

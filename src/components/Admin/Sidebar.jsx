import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible";
import {
  Calendar,
  ChefHat,
  ChevronDown,
  Contact,
  DollarSign,
  Grid,
  Home,
  Layers,
  List,
  MessageCircle,
  Salad,
  Soup,
  Table,
  Ticket,
  TicketPlus,
  User,
} from "lucide-react";
import { useState } from "react";
import { CiViewList } from "react-icons/ci";
import { Link, useLocation } from "react-router-dom";

export function AppSidebar() {
  const location = useLocation(); // Lấy URL hiện tại
  const [isDishesOpen, setIsDishesOpen] = useState(false);
  const [isDiscountOpen, setIsDiscountOpen] = useState(false);
  const [isWarehouseOpen, setIsWarehouseOpen] = useState(false);

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

  const warehouseItems = [
    { title: "Nhà cung cấp", url: "/admin/sellers", icon: Salad },
    { title: "Thực phẩm", url: "/admin/products", icon: Salad },
    { title: "Tồn kho", url: "/admin/stocks", icon: Salad },
    { title: "Phiếu nhập", url: "/admin/import-notes", icon: Salad },
    { title: "Phiếu xuất", url: "/admin/export-notes", icon: Salad },
  ];

  // Kiểm tra active
  const isActive = (path) => location.pathname === path;

  return (
    <Sidebar className="bg-gradient-to-b from-white to-gray-100 shadow-lg rounded-3xl w-72 text-gray-800">
      {/* Header */}
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-4 p-4">
          <img
            src="/imgs/logoGolden.webp"
            alt="Golden Fork Logo"
            className="h-12 w-12 object-cover rounded-full shadow-md"
          />
          <span className="text-2xl font-bold text-gray-700">Golden Fork</span>
        </div>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2 p-4">
              {/* Main menu items */}
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <Link
                    to={item.url}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition ${isActive(item.url)
                      ? "bg-gradient-to-r from-pink-200 to-pink-300 text-black"
                      : "hover:bg-gray-200 text-gray-800"
                      }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="text-base">{item.title}</span>
                  </Link>
                </SidebarMenuItem>
              ))}

              {/* Món ăn */}
              <Collapsible open={isDishesOpen} onOpenChange={setIsDishesOpen}>
                <SidebarMenuItem>
                  <SidebarMenuButton className="w-full px-4 py-3 flex items-center gap-3 rounded-lg hover:bg-gray-200 transition">
                    <CollapsibleTrigger className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-3">
                        <Soup className="w-5 h-5" />
                        <span className="text-base font-medium">Món ăn</span>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 transition-transform ${isDishesOpen ? "rotate-180" : ""
                          }`}
                      />
                    </CollapsibleTrigger>
                  </SidebarMenuButton>

                  <CollapsibleContent>
                    <SidebarMenuSub className="ml-6 space-y-1">
                      {subItems.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <Link
                            to={subItem.url}
                            className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition ${isActive(subItem.url)
                              ? "bg-gradient-to-r from-pink-200 to-pink-300 text-black"
                              : "hover:bg-gray-200 text-gray-800"
                              }`}
                          >
                            <subItem.icon className="w-4 h-4" />
                            <span className="text-sm">{subItem.title}</span>
                          </Link>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>

              {/* Phiếu giảm giá */}
              <Collapsible open={isDiscountOpen} onOpenChange={setIsDiscountOpen}>
                <SidebarMenuItem>
                  <SidebarMenuButton className="w-full px-4 py-3 flex items-center gap-3 rounded-lg hover:bg-gray-200 transition">
                    <CollapsibleTrigger className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-3">
                        <Ticket className="w-5 h-5" />
                        <span className="text-base font-medium">Phiếu giảm giá</span>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 transition-transform ${isDiscountOpen ? "rotate-180" : ""
                          }`}
                      />
                    </CollapsibleTrigger>
                  </SidebarMenuButton>

                  <CollapsibleContent>
                    <SidebarMenuSub className="ml-6 space-y-1">
                      {discountItems.map((item) => (
                        <SidebarMenuSubItem key={item.title}>
                          <Link
                            to={item.url}
                            className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition ${isActive(item.url)
                              ? "bg-gradient-to-r from-pink-200 to-pink-300 text-black"
                              : "hover:bg-gray-200 text-gray-800"
                              }`}
                          >
                            <item.icon className="w-4 h-4" />
                            <span className="text-sm">{item.title}</span>
                          </Link>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>

              {/* Quản lý kho */}
              <Collapsible open={isWarehouseOpen} onOpenChange={setIsWarehouseOpen}>
                <SidebarMenuItem>
                  <SidebarMenuButton className="w-full px-4 py-3 flex items-center gap-3 rounded-lg hover:bg-gray-200 transition">
                    <CollapsibleTrigger className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-3">
                        <Layers className="w-5 h-5" />
                        <span className="text-base font-medium">Quản lý kho</span>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 transition-transform ${isWarehouseOpen ? "rotate-180" : ""
                          }`}
                      />
                    </CollapsibleTrigger>
                  </SidebarMenuButton>

                  <CollapsibleContent>
                    <SidebarMenuSub className="ml-6 space-y-1">
                      {warehouseItems.map((item) => (
                        <SidebarMenuSubItem key={item.title}>
                          <Link
                            to={item.url}
                            className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition ${isActive(item.url)
                              ? "bg-gradient-to-r from-pink-200 to-pink-300 text-black"
                              : "hover:bg-gray-200 text-gray-800"
                              }`}
                          >
                            <item.icon className="w-4 h-4" />
                            <span className="text-sm">{item.title}</span>
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



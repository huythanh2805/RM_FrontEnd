import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSub
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible";
import jwtDecode from "jwt-decode";
import {
  Beef,
  Calendar,
  ChefHat,
  ChevronDown,
  Contact,
  DollarSign,
  Grid,
  Home,
  HousePlug,
  Layers,
  List,
  ListOrdered,
  MessageCircle,
  Salad,
  Soup,
  Table,
  Ticket,
  TicketMinus,
  TicketPlus,
  User,
  Warehouse,
} from "lucide-react";
import { useState } from "react";
import { CiViewList } from "react-icons/ci";
import { TbHomePlus } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";

export function AppSidebar() {
  const location = useLocation(); // Lấy URL hiện tại
  const [isDishesOpen, setIsDishesOpen] = useState(false);
  const [isDiscountOpen, setIsDiscountOpen] = useState(false);
  const [isWarehouseOpen, setIsWarehouseOpen] = useState(false);

  const decodedToken = (() => {
    const token = localStorage.getItem("token");
    return jwtDecode(token);
  })();

  // Các menu chính theo vai trò
  const menuItemsByRole = {
    ADMIN: [
      { title: "Trang chủ", url: "/admin", icon: Home },
      { title: "Danh sách đặt bàn", url: "/admin/listReser", icon: List },
      { title: "Bàn", url: "/admin/tables", icon: Table },
      { title: "Hóa đơn", url: "/admin/bills", icon: DollarSign },
      { title: "Nhân viên", url: "/admin/employees", icon: Contact },
      { title: "Lịch làm việc", url: "/admin/workSchedule", icon: Calendar },
      { title: "Đánh giá", url: "/admin/feedbacks", icon: MessageCircle },
      { title: "Nhà bếp", url: "/admin/kitchen", icon: ChefHat },
    ],
    ORDER: [
      { title: "Trang chủ", url: "/admin", icon: Home },
      { title: "Danh sách đặt bàn", url: "/admin/listReser", icon: List },
      { title: "Bàn", url: "/admin/tables", icon: Table },
      { title: "Hóa đơn", url: "/admin/bills", icon: DollarSign },
    ],
    WAREHOUSE: [
      { title: "Trang chủ", url: "/admin", icon: Home },
      { title: "Nhà bếp", url: "/admin/kitchen", icon: ChefHat },
    ],
    CASHIER: [
      { title: "Trang chủ", url: "/admin", icon: Home },
      { title: "Danh sách đặt bàn", url: "/admin/listReser", icon: List },
      { title: "Hóa đơn", url: "/admin/bills", icon: DollarSign },
    ],
  };

  const subItems = [
    { title: "Danh mục", url: "/admin/categories", icon: Grid },
    { title: "Món ăn", url: "/admin/dishes", icon: Salad },
    { title: "Combo", url: "/admin/setCombos", icon: Layers },
  ];

  const accountItems = [
    { title: "Tài khoản người dùng", url: "/admin/users", icon: User },
    { title: "Tài khoản nhân viên", url: "/admin/users/staff-accounts", icon: Contact },
  ];

  const discountItems = [
    { title: "Tạo phiếu", url: "/admin/discounts", icon: TicketPlus },
    { title: "Danh sách phiếu", url: "/admin/listDiscounts", icon: CiViewList },
  ];

  const warehouseItems = [
    { title: "Nhà cung cấp", url: "/admin/sellers", icon: HousePlug },
    { title: "Thực phẩm", url: "/admin/products", icon: Beef},
    { title: "Tồn kho", url: "/admin/stocks", icon: Warehouse },
    { title: "Kiểm kê số lượng", url: "/admin/take-inventory", icon: ListOrdered },
    { title: "Phiếu nhập", url: "/admin/import-notes", icon: TicketPlus },
    { title: "Phiếu xuất", url: "/admin/export-notes", icon: TicketMinus },
  ];

  const isActive = (path) => location.pathname === path;

  const renderMenuItems = (items) =>
    items.map((item) => (
      <SidebarMenuItem key={item.title}>
        <Link
          to={item.url}
          className={`flex items-center gap-4 px-4 py-3 rounded-lg font-medium transition ${isActive(item.url) ? "bg-gradient-to-r from-pink-200 to-pink-300 text-black" : "hover:bg-gray-200 text-gray-800"
            }`}
        >
          <item.icon className="w-5 h-5" />
          <span className="text-base">{item.title}</span>
        </Link>
      </SidebarMenuItem>
    ));

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
          <span className="text-xl font-bold text-gray-700">Golden Fork</span>
        </div>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2 p-4">
              {/* Menu chính */}
              {renderMenuItems(menuItemsByRole[decodedToken.role] || menuItemsByRole.ADMIN)}

              {/* Món ăn */}
              {decodedToken.role === "ADMIN" && (
                <Collapsible open={isDishesOpen} onOpenChange={setIsDishesOpen}>
                  <SidebarMenuItem>
                    <CollapsibleTrigger className="w-full px-4 py-3 flex items-center justify-between rounded-lg hover:bg-gray-200 transition">
                      <div className="flex items-center gap-4">
                        <Soup className="w-5 h-5" />
                        <span className="text-base font-medium">Món ăn</span>
                      </div>
                      <ChevronDown className={`w-5 h-5 transition-transform ${isDishesOpen ? "rotate-180" : ""}`} />
                    </CollapsibleTrigger>
                  </SidebarMenuItem>
                  <CollapsibleContent>
                    <SidebarMenuSub className="ml-6 space-y-1">{renderMenuItems(subItems)}</SidebarMenuSub>
                  </CollapsibleContent>
                </Collapsible>
              )}
              {decodedToken.role === "ADMIN" && (
                <Collapsible open={isDiscountOpen} onOpenChange={setIsDiscountOpen}>
                  <SidebarMenuItem>
                    <CollapsibleTrigger className="w-full px-4 py-3 flex items-center justify-between rounded-lg hover:bg-gray-200 transition">
                      <div className="flex items-center gap-4">
                        <User className="w-5 h-5" />
                        <span className="text-base font-medium">Tài khoản</span>
                      </div>
                      <ChevronDown className={`w-5 h-5 transition-transform ${isDiscountOpen ? "rotate-180" : ""}`} />
                    </CollapsibleTrigger>
                  </SidebarMenuItem>
                  <CollapsibleContent>
                    <SidebarMenuSub className="ml-6 space-y-1">{renderMenuItems(accountItems)}</SidebarMenuSub>
                  </CollapsibleContent>
                </Collapsible>
              )}

              {/* Phiếu giảm giá */}
              {decodedToken.role === "ADMIN" && (
                <Collapsible open={isDiscountOpen} onOpenChange={setIsDiscountOpen}>
                  <SidebarMenuItem>
                    <CollapsibleTrigger className="w-full px-4 py-3 flex items-center justify-between rounded-lg hover:bg-gray-200 transition">
                      <div className="flex items-center gap-4">
                        <Ticket className="w-5 h-5" />
                        <span className="text-base font-medium">Phiếu giảm giá</span>
                      </div>
                      <ChevronDown className={`w-5 h-5 transition-transform ${isDiscountOpen ? "rotate-180" : ""}`} />
                    </CollapsibleTrigger>
                  </SidebarMenuItem>
                  <CollapsibleContent>
                    <SidebarMenuSub className="ml-6 space-y-1">{renderMenuItems(discountItems)}</SidebarMenuSub>
                  </CollapsibleContent>
                </Collapsible>
              )}

              {/* Quản lý kho */}
              {(decodedToken.role === "ADMIN" || decodedToken.role === "WAREHOUSE") && (
                <Collapsible open={isWarehouseOpen} onOpenChange={setIsWarehouseOpen}>
                  <SidebarMenuItem>
                    <CollapsibleTrigger className="w-full px-4 py-3 flex items-center justify-between rounded-lg hover:bg-gray-200 transition">
                      <div className="flex items-center gap-4">
                        <Layers className="w-5 h-5" />
                        <span className="text-base font-medium">Quản lý kho</span>
                      </div>
                      <ChevronDown className={`w-5 h-5 transition-transform ${isWarehouseOpen ? "rotate-180" : ""}`} />
                    </CollapsibleTrigger>
                  </SidebarMenuItem>
                  <CollapsibleContent>
                    <SidebarMenuSub className="ml-6 space-y-1">{renderMenuItems(warehouseItems)}</SidebarMenuSub>
                  </CollapsibleContent>
                </Collapsible>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

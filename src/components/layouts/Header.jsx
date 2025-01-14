import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useThemeContext } from "@/contexts/ThemeProvider";
import { useProfile } from "@/hooks/home/useProfile";
import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cart from "../Cart";

const headerLink = [
  { name: "TRANG CHỦ", link: "/" },
  { name: "GIỚI THIỆU", link: "/about" },
  { name: "KHUYẾN MÃI", link: "/promotion" },
  { name: "THỰC ĐƠN", link: "/menu" },
  { name: "ĐẶT BÀN", link: "/reservation" },
  { name: "LIÊN HỆ", link: "/contact" },
];

import Swal from "sweetalert2";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { colorCode } = useThemeContext();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { user } = useProfile();
  useEffect(() => {}, [user]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    // if (token) {
    //   toast({ variant: "success", title: "Đăng nhập thành công !" });
    // }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
    window.location.reload();
  };
  return (
    <div className="sticky rounded-br-xl rounded-bl-xl top-0 left-0 w-full bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-50">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex flex-row justify-between items-center p-4">
          <Link to="/" className="flex flex-row items-center cursor-pointer">
            <img
              src="/imgs/logoGolden.webp"
              alt="Golden Fork Logo"
              className="h-16 w-16 object-cover rounded-full"
            />
            <h1 className="text-[28px] sm:text-[32px] md:text-[36px] font-semibold dancing">
              Golden Fork
            </h1>
          </Link>

          <nav className="hidden md:flex flex-row items-center text-lg font-medium gap-8">
            {headerLink.map((item) => (
              <Link
                key={item.name}
                to={item.link}
                className="group transition-all cursor-pointer"
              >
                {item.name}
                <div
                  style={{ backgroundColor: colorCode }}
                  className={`h-[2px] w-0 group-hover:w-full ${
                    location.pathname === item.link ? "w-full" : ""
                  } transition-all ease-in duration-300`}
                ></div>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <div className="flex md:hidden items-center justify-center">
              <Sheet>
                <SheetTrigger>
                  <AiOutlineMenuUnfold className="text-[30px]" />
                </SheetTrigger>
                <SheetContent className="w-[300px]">
                  <nav className="flex flex-col items-center text-lg font-medium gap-8">
                    {headerLink.map((item) => (
                      <SheetClose asChild key={item.name}>
                        <Link
                          to={item.link}
                          className="group hover:text-orange-500 transition-all cursor-pointer"
                        >
                          {item.name}
                          <div className="h-[2px] bg-orange-1 w-0 group-hover:w-full transition-all ease-in duration-300"></div>
                        </Link>
                      </SheetClose>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>

            <Cart />

            <DropdownMenu>
              <DropdownMenuTrigger className="h-fit w-fit border-none outline-none ring-0 ring-offset-0">
                 <div className="w-[50px] h-[50px] rounded-full  flex items-center justify-center overflow-hidden">
                     <img src={user?.image || "imgs/avatar.jpg"} alt="avatar" className="object-cover" />
                 </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuSeparator />
                {!isLoggedIn ? (
                  <>
                    <Link to="/register">
                      <DropdownMenuItem>Đăng kí</DropdownMenuItem>
                    </Link>
                    <Link to="/login">
                      <DropdownMenuItem>Đăng nhập</DropdownMenuItem>
                    </Link>
                  </>
                ) : (
                  <>
                    <DropdownMenuLabel className="text-gray-500">
                      Xin chào , {user?.userName}
                    </DropdownMenuLabel>
                    <DropdownMenuItem className="hover:bg-gray-100 text-gray-800">
                      <Link to="/profile">Thông tin cá nhân</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-gray-100 text-gray-800">
                      <Link to={`/history/${user?._id}`}>Lịch sử đặt bàn</Link>
                    </DropdownMenuItem>
                    {
                      user && user.role !== "CLIENT" &&
                    <DropdownMenuItem className="hover:bg-gray-100 text-gray-800">
                      <Link to={`/admin`}>Quản trị</Link>
                    </DropdownMenuItem>
                    }
                    <DropdownMenuItem
                      onClick={() => {
                        Swal.fire({
                          title: "Bạn có chắc muốn đăng xuất?",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonText: "Đăng xuất",
                          cancelButtonText: "Hủy",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            handleLogout();
                            Swal.fire("Đã đăng xuất!", "", "success");
                          }
                        });
                      }}
                      className="hover:bg-red-100 text-red-600"
                    >
                      Đăng xuất
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

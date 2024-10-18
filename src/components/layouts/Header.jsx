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
import { useEffect, useState } from "react";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { PiShoppingCartSimpleDuotone } from "react-icons/pi";
import { Link, useLocation } from "react-router-dom";

const headerLink = [
  { name: "TRANG CHỦ", link: "/" }, 
  { name: "GIỚI THIỆU", link: "/about" },
  { name: "THỰC ĐƠN", link: "/menu" },
  { name: "ĐẶT BÀN", link: "/reservation" },
  { name: "LIÊN HỆ", link: "/contact" },
  { name: "BÀI VIẾT", link: "/blog" },
];

const Header = () => {
  const {colorCode} = useThemeContext()
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Nếu có token thì người dùng đang đăng nhập
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Xóa token khi đăng xuất
    setIsLoggedIn(false); // Cập nhật trạng thái đăng nhập
  };

  return (
    <div className="sticky rounded-br-xl rounded-bl-xl top-0 left-0 w-full bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-50">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex flex-row justify-between items-center p-4">
          <Link to="/" className="flex flex-row items-center cursor-pointer">
            <span>
              <img
                src="/imgs/logoGolden.webp"
                alt="Golden Fork Logo"
                className="h-16 w-16 object-cover rounded-full"
              />
            </span>
            <h1 className="text-xl font-semibold font-serif">Golden Fork</h1>
          </Link>

          <nav className="hidden md:flex flex-row items-center text-lg font-medium gap-8">
            {headerLink.map((item) => (
              <Link
                key={item.name}
                to={item.link}
                className="group transition-all cursor-pointer "
              >
                {item.name}
                <div style={{backgroundColor: colorCode}} className={`h-[2px] w-0 group-hover:w-full ${location.pathname === item.link ? "w-full" : ""} transition-all ease-in duration-300`}></div>
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center gap-5">
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
                          className="group hover:text-orange-500 transition-all cursor-pointer "
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
            <div className="flex items-center justify-center ">
              <PiShoppingCartSimpleDuotone className="text-[30px]" />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger className="h-fit w-fit border-none outline-none ring-0 ring-offset-0">
                <Avatar>
                  <AvatarImage src="imgs/avatar.jpg" />
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {!isLoggedIn ? (
                  <>
                    <DropdownMenuSeparator />
                    <Link to="/register">
                      <DropdownMenuItem>Đăng kí</DropdownMenuItem>
                    </Link>
                    <Link to="/login">
                      <DropdownMenuItem>Đăng nhập</DropdownMenuItem>
                    </Link>
                  </>
                ) : (
                  <>
                    <DropdownMenuLabel>Tài khoản của tôi</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Thông tin cá nhân</DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
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

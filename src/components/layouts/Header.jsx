import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
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
  const location = useLocation();
  const { colorCode } = useThemeContext();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    if (token) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
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
            <h1 className="text-xl font-semibold font-serif">Golden Fork</h1>
          </Link>

          <nav className="hidden md:flex flex-row items-center text-lg font-medium gap-8">
            {headerLink.map((item) => (
              <Link key={item.name} to={item.link} className="group transition-all cursor-pointer">
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
                        <Link to={item.link} className="group hover:text-orange-500 transition-all cursor-pointer">
                          {item.name}
                          <div className="h-[2px] bg-orange-1 w-0 group-hover:w-full transition-all ease-in duration-300"></div>
                        </Link>
                      </SheetClose>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>

            <div className="flex items-center justify-center">
              <PiShoppingCartSimpleDuotone className="text-[30px]" />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger className="h-fit w-fit border-none outline-none ring-0 ring-offset-0">
                <Avatar>
                  <AvatarImage src="imgs/avatar.jpg" />
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel className="text-gray-500">Tài khoản của tôi</DropdownMenuLabel>
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
                    <DropdownMenuItem className="hover:bg-gray-100 text-gray-800">Thông tin cá nhân</DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout} className="hover:bg-red-100 text-red-600">
                      Đăng xuất
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Toast notification */}
      {showToast && (
        <div
          id="toast-success"
          className="fixed top-4 right-4 flex items-center w-full max-w-xs p-6 mb-4 text-gray-500 bg-white rounded-lg shadow-lg"
          role="alert"
        >
          <div className="inline-flex items-center justify-center flex-shrink-0 w-10 h-10 text-green-500 bg-green-100 rounded-lg">
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span className="sr-only">Check icon</span>
          </div>
          <div className="ms-3 text-lg font-semibold">Đăng nhập thành công!</div>
          <button
            type="button"
            className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-2 hover:bg-gray-100 inline-flex items-center justify-center h-10 w-10"
            onClick={() => setShowToast(false)}
          >
            <span className="sr-only">Close</span>
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;

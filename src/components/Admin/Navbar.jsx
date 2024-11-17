import React, { useState } from "react";
import { useProfile } from "@/hooks/home/useProfile";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const { user } = useProfile();

  return (
    <nav className="bg-white p-4 flex items-center justify-between">
      {/* Thanh tìm kiếm */}
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search"
          className="p-3 rounded-lg bg-gray-200 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="relative">
        <div className="flex gap-2 items-center">
          <div>
           Thong bao
          </div>
          <div>
            <img
              className="w-12 h-12 rounded-full cursor-pointer border-2 border-gray-600 object-cover"
              alt="User"
              src={user?.image || "default-image-url.png"}
              onClick={toggleMenu}
            />
          </div>
        </div>

        {isMenuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-gray-100 rounded-lg shadow-lg z-10">
            <div className="px-4 py-2 border-b">
              <p className="text-sm font-semibold">
                {user?.userName || "Khách"}
              </p>
              <p className="text-sm text-gray-500"> {user?.email || ""}</p>
            </div>

            <ul className="py-2">
              <Link to="/admin/proAdmin">
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    My profile
                  </a>
                </li>
              </Link>

              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Account settings
                </a>
              </li>

              <li>
                <a href="javascript:;">
                  <h2
                    onClick={() => {
                      const confirmLogout = window.confirm(
                        "Bạn có muốn đăng xuất không?"
                      );
                      if (confirmLogout) {
                        handleLogout();
                      }
                    }}
                    className="block px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                  >
                    Logout
                  </h2>
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

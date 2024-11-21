import React, { useState } from "react";
import { useProfile } from "@/hooks/home/useProfile";
import { Link, useNavigate } from "react-router-dom";
import { IoIosNotifications } from "react-icons/io";
import Swal from "sweetalert2";

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
    <nav className="bg-white p-3 shadow-md flex items-center justify-between">
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Tìm kiếm..."
          className="p-3 w-64 rounded-lg bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
      </div>

      <div className="relative">
        <div className="flex gap-4 items-center">
          <div className="relative cursor-pointer">
            <IoIosNotifications className="w-8 h-8 text-gray-600 hover:text-gray-800 transition" />
            {/* số lượng thông báo */}
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
              3
            </span>
          </div>

          <div>
            <img
              className="w-10 h-10 rounded-full cursor-pointer border-2 border-gray-400 hover:border-gray-600 transition object-cover"
              alt="User"
              src={user?.image || "default-image-url.png"}
              onClick={toggleMenu}
            />
          </div>
        </div>

        {isMenuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
            <div className="px-4 py-2 border-b">
              <p className="text-sm font-semibold text-gray-800">
                {user?.userName || "Khách"}
              </p>
              <p className="text-sm text-gray-500">{user?.email || ""}</p>
            </div>

            <ul className="py-2">
              <Link to="/admin/proAdmin">
                <li>
                  <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 rounded-lg transition">
                    My profile
                  </a>
                </li>
              </Link>

              <li>
                <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 rounded-lg transition">
                  Account settings
                </a>
              </li>

              <li>
                <h2
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
                        Swal.fire("Đã đăng xuất!", "success");
                      }
                    });
                  }}
                  className="block px-4 py-2 text-sm text-red-500 hover:bg-gray-200 rounded-lg transition cursor-pointer"
                >
                  Logout
                </h2>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

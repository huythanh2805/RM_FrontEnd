import { useProfile } from "@/hooks/home/useProfile";
import axios from "axios";
import { useEffect, useState } from "react";
import { IoIosNotifications } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import Swal from "sweetalert2";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loadingNotifications, setLoadingNotifications] = useState(false);
  useEffect(() => {
    const socket = io("http://localhost:1111");
    socket.on("new-notification", (notification) => {
      setNotifications((prevNotifications) => [notification, ...prevNotifications]);
    });
    return () => {
      socket.disconnect();
    };
  }, []);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const toggleNotifications = async () => {
    setIsNotificationOpen(!isNotificationOpen);
    if (!isNotificationOpen) {
      setLoadingNotifications(true);
      try {
        const response = await axios.get("http://localhost:1111/api/notification");
        setNotifications(response.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setLoadingNotifications(false);
      }
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleNotificationClick = async (notification) => {
    const updatedNotifications = notifications.map((notif) =>
      notif._id === notification._id ? { ...notif, isRead: true } : notif
    );
    setNotifications(updatedNotifications);
    try {
      await axios.put(`http://localhost:1111/api/notification/${notification._id}`, {
        isRead: true,
      });
    } catch (error) {
      console.error("Error updating notification:", error);
    }
    const unreadNotifications = updatedNotifications.filter((notif) => !notif.isRead);
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
          {/* Thông báo */}
          <div className="relative cursor-pointer">
            <IoIosNotifications
              className="w-8 h-8 text-gray-600 hover:text-gray-800 transition"
              onClick={toggleNotifications}
            />
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
              {notifications.filter((notif) => !notif.isRead).length}
            </span>
            {isNotificationOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg z-10 max-h-96 overflow-y-auto">
                <h3 className="text-lg font-semibold px-4 py-2 border-b text-gray-800">Thông báo</h3>
                {loadingNotifications ? (
                  <p className="px-4 py-2 text-sm text-gray-500">Đang tải...</p>
                ) : notifications.length > 0 ? (
                  <ul className="py-2">
                    {notifications.map((notification) => (
                      <li
                        key={notification._id}
                        className={`px-4 py-2 text-sm transition cursor-pointer ${
                          !notification.isRead ? "bg-gray-200" : "bg-white"
                        }`}
                        onClick={() => handleNotificationClick(notification)}
                      >
                        <p className="font-semibold">{notification.title}</p>
                        <p className="text-gray-500 text-xs">{notification.message}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="px-4 py-2 text-sm text-gray-500">Không có thông báo nào.</p>
                )}
              </div>
            )}
          </div>
          {/* Menu người dùng */}
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
              <p className="text-sm font-semibold text-gray-800">{user?.userName || "Khách"}</p>
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

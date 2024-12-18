import { useProfile } from "@/hooks/home/useProfile";
import { useNotifications, useUpdateNotification } from "@/services/notificationService";
import { useEffect, useState } from "react";
import { IoIosNotifications } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import Swal from "sweetalert2";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const { data: notifications = [], isLoading: loadingNotifications, refetch } = useNotifications();
  const updateNotificationMutation = useUpdateNotification();

  // Socket.IO để nhận thông báo mới
  useEffect(() => {
    const socket = io("http://localhost:1111");

    socket.on("new-notification", (notification) => {
      setAlertMessage(notification.message || "Bạn có thông báo mới!");
      setAlertVisible(true);
      refetch();
      setTimeout(() => {
        setAlertVisible(false);
      }, 8000);
    });

    return () => {
      socket.disconnect();
    };
  }, [refetch]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleNotifications = () => {
    setIsNotificationOpen(!isNotificationOpen);
    if (!isNotificationOpen) {
      refetch(); // Load lại thông báo khi mở menu
    }
  };

  const handleNotificationClick = (notification) => {
    updateNotificationMutation.mutate(notification._id);
    navigate("/admin/listReser");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  const { user } = useProfile();
  return (
    <nav className="bg-white py-3 px-5 shadow-md flex items-center justify-between">
      {alertVisible && (
        <div
          id="alert-border-1"
          className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 flex items-center p-4 mb-4 text-blue-800 border-t-4 border-blue-300 bg-blue-50 dark:text-blue-400 dark:bg-gray-800 dark:border-blue-800"
          role="alert"
        >
          <svg
            className="flex-shrink-0 w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <div className="ms-3 text-sm font-medium">{alertMessage}</div>
          <button
            type="button"
            className="ms-auto -mx-1.5 -my-1.5 bg-blue-50 text-blue-500 rounded-lg focus:ring-2 focus:ring-blue-400 p-1.5 hover:bg-blue-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700"
            aria-label="Close"
            onClick={() => setAlertVisible(false)}
          >
            <span className="sr-only">Dismiss</span>
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
      )}

      <div className="flex items-center">
        {/* <input
          type="text"
          placeholder="Tìm kiếm..."
          className="p-3 w-64 rounded-lg bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
        /> */}
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
                        <p className="text-gray-500 text-xs">
                          {new Date(notification.createdAt).toLocaleString("vi-VN", {
                            hour: "2-digit",
                            minute: "2-digit",
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })}
                        </p>
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
              src={user?.image || "/imgs/avatar.jpg"}
              onClick={toggleMenu}
            />
          </div>
        </div>
        {isMenuOpen && (
          <div className="absolute right-0 mt-2 w-52 bg-white rounded-lg shadow-lg z-10">
            <div className="px-4 py-2 border-b">
              <p className="text-sm font-semibold text-gray-800">{user?.userName || "Khách"}</p>
              <p className="text-sm text-gray-500">{user?.email || ""}</p>
            </div>
            <ul className="py-2">
              <Link to="/admin/proAdmin">
                <li>
                  <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 rounded-lg transition">
                    Tài khoản của tôi
                  </a>
                </li>
              </Link>
              <li>
                <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 rounded-lg transition">
                Cài đặt tài khoản
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
                  Đăng xuất
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

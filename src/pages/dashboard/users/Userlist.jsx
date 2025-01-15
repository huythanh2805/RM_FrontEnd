import Pagination from "@/components/Pagination";
import { Switch } from "@/components/ui/switch";
import { useUser } from "@/hooks/dashboard/useAccount"; // Sử dụng hook useUser
import { useQueryClient } from "@tanstack/react-query";
import { debounce } from "lodash";
import { useState } from "react";
import { FaEllipsisV, FaEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";


// API Function to update user status
const updateUserStatus = async (userId, isdelete) => {
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/admin/delete/${userId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    method: "PATCH",
    body: JSON.stringify({ isdelete }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Error updating user status");
  return data;
};

const UserList = () => {
  const { list: users = [], isLoading, error } = useUser(); // Lấy dữ liệu từ useUser hook
  const [selectedRole, setSelectedRole] = useState("Tất cả");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleSearchValueDebounced = debounce((value) => {
    setSearchValue(value);
  }, 300);

  const handleSearchValue = (e) => {
    handleSearchValueDebounced(e.target.value);
  };

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
    setCurrentPage(1); // Reset về trang đầu tiên khi lọc
  };

  const handleDeleteUser = async (userId, currentIsDelete) => {
    try {
      const newStatus = currentIsDelete === 1 ? 0 : 1;
      await updateUserStatus(userId, newStatus);

      // Làm mới dữ liệu danh sách người dùng
      queryClient.invalidateQueries("usersList");
      toast({ variant: "success", title: "Cập nhật trạng thái thành công !" })
    } catch (error) {
      toast({ variant: "destructive", title: "Cập nhật trạng thái thất bại" })
    }
  };

  const roleMapping = {
    CLIENT: "Khách hàng",
    ADMIN: "Quản lý",
    CASHIER: "Thu ngân",
    WAREHOUSE: "Nhân viên kho",
    ORDER: "Nhân viên order",
  };

  // Lọc người dùng theo vai trò và tìm kiếm
  const filteredUsers = users
    .filter((user) => selectedRole === "Tất cả" || user.role === selectedRole)
    .filter((user) => user.userName.toLowerCase().includes(searchValue.toLowerCase()));

  // Tính toán cho phân trang
  const totalItems = filteredUsers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  const goToUserReservations = (userId) => {
    navigate(`reservations/${userId}`);
  };

  if (isLoading) return <p className="text-center text-blue-600">Loading...</p>;
  if (error) return <p className="text-center text-red-600">Error loading user list.</p>;
  return (
    <div className="w-full min-h-screen bg-[#f9fafb]">
      <div className="px-5 py-5">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-semibold text-gray-800">Danh sách người dùng</h1>
          <Link to="/admin/users/add">
            <div className="bg-green-200 text-green-800 px-6 py-2 rounded-md text-sl font-semibold hover:bg-green-300 transition">
              Thêm +
            </div>
          </Link>
        </div>

        {/* Bộ lọc và tìm kiếm */}
        <div className="mb-4">
          <div className="flex justify-between items-center">
            {/* Input Tìm Kiếm */}
            <div className="relative w-full max-w-sm min-w-[200px]">
              <label htmlFor="Search" className="sr-only">
                Search
              </label>
              <input
                type="text"
                id="Search"
                placeholder="Tìm kiếm..."
                className="bg-white border border-gray-300 text-gray-900 text-sl rounded-lg w-full p-2.5"
                onChange={handleSearchValue}
              />
              <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
                <button type="button" className="text-gray-600 hover:text-gray-700">
                  <span className="sr-only">Search</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                </button>
              </span>
            </div>
          </div>
        </div>

        {/* Bảng danh sách người dùng */}
        <div className="overflow-x-auto rounded-xl border border-[#d5d5d5]">
          <table className="min-w-full bg-white">
            <thead className="border-b border-[#d5d5d5] text-left text-sl font-semibold text-[#202224] uppercase tracking-wider">
              <tr>
                <th className="hidden lg:table-cell py-3 px-6 text-left text-sl font-semibold text-gray-700">STT</th>
                <th className="py-3 px-6 text-left text-sl font-semibold text-gray-700">Tên</th>
                <th className="py-3 px-6 text-left text-sl font-semibold text-gray-700">Email</th>
                <th className="py-3 px-6 text-left text-sl font-semibold text-gray-700">Địa chỉ</th>
                <th className="py-3 px-6 text-left text-sl font-semibold text-gray-700">Vai trò</th>
                <th className="py-3 px-6 text-left text-sl font-semibold text-gray-700">Trạng thái</th>
                <th className="py-3 px-6 text-left text-sl font-semibold text-gray-700">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((user, index) => (
                <tr key={user._id} className="bg-white border-b border-[#d5d5d5] hover:bg-gray-50 transition">
                  <td className="py-3 px-6 text-sl text-gray-800 break-words font-medium">{index + 1 + startIndex}</td>
                  <td className="py-3 px-6 text-sl text-gray-800 break-words">{user.userName}</td>
                  <td className="py-3 px-6 text-sl text-gray-800 break-words">{user.email}</td>
                  <td className="py-3 px-6 text-sl text-gray-800 break-words">{user.address}</td>
                  <td className="py-3 px-6 text-sl text-gray-800 break-words">
                    {roleMapping[user.role] || "Không xác định"}
                  </td>
                  <td
                    className={`py-3 px-6 text-sl break-words ${user.isdelete === 0 ? "text-green-600" : "text-red-600"
                      }`}
                  >
                    {user.isdelete === 0 ? "Hoạt động" : "Ngừng hoạt động"}
                  </td>
                  <td className="py-3 px-6 text-sl flex items-center gap-3">
                    <Link to={`/admin/users/edit/${user._id}`}>
                      <div className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded-lg text-sl font-semibold hover:bg-yellow-300 transition">
                        <FaEye size={18} />
                      </div>
                    </Link>
                    <Switch
                      className={'bg-blue-1'}
                      checked={user.isdelete === 0}
                      onCheckedChange={() => handleDeleteUser(user._id, user.isdelete)}
                    />
                    <div
                      className="bg-gray-200 text-gray-800 px-3 py-1 rounded-lg cursor-pointer text-sl font-semibold hover:bg-gray-300 transition"
                      onClick={() => goToUserReservations(user._id)}
                    >
                      <FaEllipsisV size={18} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Phân trang */}
        {totalPages > 1 && <Pagination pageCount={totalPages} onPageChange={handlePageClick} />}
      </div>
    </div>
  );
};

export default UserList;

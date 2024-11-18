import Pagination from "@/components/Pagination";
import { useUser } from "@/hooks/dashboard/useAccount";
import { useState } from "react";
import { FaPenToSquare, FaRegTrashCan } from "react-icons/fa6";
import { Link } from "react-router-dom";

const UserList = () => {
  const { list, isLoading, error, deleteUser } = useUser();
  const [selectedRole, setSelectedRole] = useState("Tất cả");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Xử lý khi dữ liệu đang tải hoặc gặp lỗi
  if (isLoading) return <p className="text-center text-blue-600">Loading...</p>;
  if (error) return <p className="text-center text-red-600">Error loading user list.</p>;

  // Hàm xóa người dùng
  const handleDelete = async (userId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa người dùng này không?")) {
      await deleteUser(userId);
    }
  };

  // Lọc người dùng theo role
  const filteredUsers = selectedRole === "Tất cả" ? list : list.filter((user) => user.role === selectedRole);

  // Tính toán cho phân trang
  const totalItems = filteredUsers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  // Xử lý khi thay đổi trang
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  // Xử lý khi thay đổi bộ lọc
  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
    setCurrentPage(1); // Reset về trang 1 khi thay đổi bộ lọc
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 py-8 text-xl">
      <div className="mx-auto px-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Danh sách người dùng</h1>
          <Link to="/admin/users/add">
            <button className="bg-green-600 text-white px-4 py-2 rounded-md shadow hover:bg-green-700 transition">
              Thêm +
            </button>
          </Link>
        </div>

        {/* Bộ lọc người dùng */}
        <div className="mb-4">
          <select
            value={selectedRole}
            onChange={handleRoleChange}
            className="bg-white text-sl border border-gray-300 rounded-md p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          >
            <option value="Tất cả">Tất cả</option>
            <option value="CLIENT">Client</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>

        {/* Bảng danh sách người dùng */}
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-200">
              <tr>
                <th className="hidden lg:table-cell py-3 px-6 text-left text-sl font-semibold text-gray-700">STT</th>
                <th className="py-3 px-6 text-left text-sl font-semibold text-gray-700">Tên</th>
                <th className="py-3 px-6 text-left text-sl font-semibold text-gray-700">Email</th>
                <th className="py-3 px-6 text-left text-sl font-semibold text-gray-700">Địa chỉ</th>
                <th className="py-3 px-6 text-left text-sl font-semibold text-gray-700">Vai trò</th>
                <th className="py-3 px-6 text-center text-sl font-semibold text-gray-700">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((user, index) => (
                <tr key={user._id} className="border-b hover:bg-gray-100 transition">
                  <td className="hidden lg:table-cell py-4 px-6 text-sl text-gray-800">{index + 1 + startIndex}</td>
                  <td className="py-4 px-6 text-sl text-gray-800">{user.userName}</td>
                  <td className="py-4 px-6 text-sl text-gray-800">{user.email}</td>
                  <td className="py-4 px-6 text-sl text-gray-800">{user.address}</td>
                  <td className="py-4 px-6 text-sl text-gray-800">{user.role}</td>
                  <td className="py-4 px-6 text-sl flex justify-center gap-3">
                    <Link to={`/admin/users/edit/${user._id}`}>
                      <FaPenToSquare className="text-blue-600 hover:text-blue-800 cursor-pointer" />
                    </Link>
                    <FaRegTrashCan
                      className="text-red-600 hover:text-red-800 cursor-pointer"
                      onClick={() => handleDelete(user._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Phân trang */}
        <Pagination pageCount={totalPages} onPageChange={handlePageClick} />
      </div>
    </div>
  );
};

export default UserList;

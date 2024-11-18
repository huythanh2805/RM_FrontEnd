import { useUser } from "@/hooks/dashboard/useAccount";
import { useState } from "react";
import { FaPenToSquare, FaRegTrashCan } from "react-icons/fa6";
import { Link } from "react-router-dom";

const UserList = () => {
  const { list, isLoading, error, deleteUser } = useUser();
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  if (isLoading) return <p className="text-center text-blue-600">Loading...</p>;
  if (error) return <p className="text-center text-red-600">Error loading user list.</p>;

  const handleDelete = async (userId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa người dùng này không?")) {
      await deleteUser(userId);
    }
  };

  const filteredUsers = list.filter((user) => {
    if (filter === "all") return true;
    return user.role === filter;
  });

  const totalItems = filteredUsers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 py-8 text-xl">
      <div className=" mx-auto px-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Danh sách người dùng</h1>
          <Link to="/admin/users/add">
            <button className="bg-green-600 text-white px-4 py-2 rounded-md shadow hover:bg-green-700 transition">
              Thêm +
            </button>
          </Link>
        </div>

        {/* Bộ lọc */}
        <div className="mb-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-white border border-gray-300 rounded-md p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          >
            <option value="all">Tất cả</option>
            <option value="client">Client</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* Bảng danh sách người dùng */}
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="min-w-full bg-white ">
            <thead className="bg-gray-200">
              <tr>
                <th className="hidden lg:table-cell py-3 px-6 text-left text-s font-semibold text-gray-700">STT</th>
                <th className="py-3 px-6 text-left text-s font-semibold text-gray-700">Tên</th>
                <th className="py-3 px-6 text-left text-s font-semibold text-gray-700">Email</th>
                <th className="py-3 px-6 text-left text-s font-semibold text-gray-700">Địa chỉ</th>
                <th className="py-3 px-6 text-left text-s font-semibold text-gray-700">Role</th>
                <th className="py-3 px-6 text-center text-s font-semibold text-gray-700">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((user, index) => (
                <tr key={user._id} className="border-b hover:bg-gray-100 transition">
                  <td className="hidden lg:table-cell py-4 px-6 text-s text-gray-800">{index + 1 + startIndex}</td>
                  <td className="py-4 px-6 text-s text-gray-800">{user.userName}</td>
                  <td className="py-4 px-6 text-s text-gray-800">{user.email}</td>
                  <td className="py-4 px-6 text-s text-gray-800">{user.address}</td>
                  <td className="py-4 px-6 text-s text-gray-800">{user.role}</td>
                  <td className="py-4 px-6 flex justify-center gap-3">
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
        <div className="flex justify-center items-center mt-6 gap-4">
          <button
            className="px-4 py-2 bg-gray-300 rounded-md shadow hover:bg-gray-400 transition disabled:opacity-50"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Trang trước
          </button>
          <span className="text-sm font-semibold text-gray-700">
            Trang {currentPage} / {totalPages}
          </span>
          <button
            className="px-4 py-2 bg-gray-300 rounded-md shadow hover:bg-gray-400 transition disabled:opacity-50"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Trang sau
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserList;

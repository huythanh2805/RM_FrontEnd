import Pagination from "@/components/Pagination";
import { useList } from "@/hooks/dashboard/sellers/useList";
import { statusMapping } from "@/utilities/const";
import { debounce } from "lodash";
import { useEffect, useState } from "react";
import { FaPenToSquare } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export const SellerList = () => {
  const { sellersData, isLoading, error, deleteSeller } = useList();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [searchValue, setSearchValue] = useState({ name: "", code: "", email: "" });

  // Debounced search handler
  const handleDebouncedSearch = debounce((field, value) => {
    setSearchValue((prev) => ({ ...prev, [field]: value }));
  }, 300);

  const handleSearch = (field) => (e) => {
    handleDebouncedSearch(field, e.target.value);
  };

  // Lọc danh sách nhà cung cấp theo các trường tìm kiếm
  const filteredSellers = sellersData?.filter((seller) => {
    if (!seller) return false;

    const lowercasedSearch = {
      name: searchValue.name.toLowerCase(),
      code: searchValue.code.toLowerCase(),
      email: searchValue.email.toLowerCase(),
    };

    return (
      seller.name.toLowerCase().includes(lowercasedSearch.name) &&
      seller.code.toLowerCase().includes(lowercasedSearch.code) &&
      seller.email.toLowerCase().includes(lowercasedSearch.email)
    );
  }) || [];

  // Tính toán cho phân trang
  const totalItems = filteredSellers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredSellers.slice(startIndex, startIndex + itemsPerPage);

  // Đảm bảo currentPage không vượt quá số trang
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [totalPages]);

  // Hàm xóa nhà cung cấp
  const handleDeleteSeller = (sellerID) => {
    Swal.fire({
      title: "Xác nhận xóa nhà cung cấp?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteSeller(sellerID)
          .then(() => {
            Swal.fire({
              title: "Đã xóa!",
              text: "Người dùng đã được xóa thành công.",
              icon: "success",
            });
            setCurrentPage(1); // Đặt lại trang đầu tiên sau khi xóa
          })
          .catch((err) => {
            Swal.fire({
              title: "Lỗi!",
              text: "Không thể xóa người dùng. Vui lòng thử lại.",
              icon: "error",
            });
            console.error(err);
          });
      }
    });
  };

  // Hiển thị loading hoặc lỗi nếu cần
  if (isLoading) return <p className="text-center text-blue-600">Loading...</p>;
  if (error) return <p className="text-center text-red-600">Error loading seller list.</p>;

  return (
    <div className="w-full min-h-screen">
      <div className="px-5 py-5">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-semibold text-gray-800">Danh sách nhà cung cấp</h1>
          <Link to="/admin/sellers/create">
            <div className="bg-green-200 text-green-800 px-6 py-2 rounded-md text-sl font-semibold hover:bg-green-300 transition">
              Thêm mới +
            </div>
          </Link>
        </div>

        {/* Bộ lọc và tìm kiếm */}
        <div className="mb-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative w-full max-w-sm">
              <input
                type="text"
                placeholder="Tìm theo tên..."
                className="bg-white border border-gray-300 text-gray-900 rounded-lg w-full p-2.5"
                onChange={handleSearch("name")}
              />
            </div>
            <div className="relative w-full max-w-sm">
              <input
                type="text"
                placeholder="Tìm theo mã NCC..."
                className="bg-white border border-gray-300 text-gray-900 rounded-lg w-full p-2.5"
                onChange={handleSearch("code")}
              />
            </div>
            <div className="relative w-full max-w-sm">
              <input
                type="text"
                placeholder="Tìm theo email..."
                className="bg-white border border-gray-300 text-gray-900 rounded-lg w-full p-2.5"
                onChange={handleSearch("email")}
              />
            </div>
          </div>
        </div>

        {/* Bảng danh sách nhà cung cấp */}
        <div className="overflow-x-auto rounded-xl border border-[#d5d5d5]">
          <table className="min-w-full bg-white">
            <thead className="border-b border-[#d5d5d5] text-left text-sm font-semibold text-gray-700 uppercase">
              <tr>
                <th className="py-3 px-6 text-center">STT</th>
                <th className="py-3 px-6">Tên NCC</th>
                <th className="py-3 px-6">Mã NCC</th>
                <th className="py-3 px-6">Email</th>
                <th className="py-3 px-6">SĐT</th>
                <th className="py-3 px-6">Địa chỉ</th>
                <th className="py-3 px-6">Trạng thái</th>
                <th className="py-3 px-6">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((seller, index) => (
                  <tr key={seller._id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-6 text-center">{index + 1 + startIndex}</td>
                    <td className="py-3 px-6">{seller.name}</td>
                    <td className="py-3 px-6">{seller.code}</td>
                    <td className="py-3 px-6">{seller.email}</td>
                    <td className="py-3 px-6">{seller.phone}</td>
                    <td className="py-3 px-6">{seller.address}</td>
                    <td className="py-3 px-6">
                      {statusMapping[seller.isActive ? "ACTIVE" : "UN_ACTIVE"]}
                    </td>
                    <td className="py-3 px-6 flex items-center gap-3">
                      <Link to={`/admin/sellers/update/${seller._id}`}>
                        <div className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded-lg hover:bg-yellow-300">
                          <FaPenToSquare size={18} />
                        </div>
                      </Link>

                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="py-3 px-6 text-center text-gray-500">
                    Không có dữ liệu hiển thị
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Phân trang */}
        {totalPages > 1 && (
          <Pagination
            pageCount={totalPages}
            onPageChange={({ selected }) => setCurrentPage(selected + 1)}
          />
        )}
      </div>
    </div>
  );
};

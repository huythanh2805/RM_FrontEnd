import Pagination from "@/components/Pagination";
import { useList } from "@/hooks/dashboard/import-notes/useList";
import { formatCurrency, formatDateNoTime } from "@/utilities/utils";
import { debounce } from "lodash";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export const ImportNotesList = () => {
  const { importNotesData, isLoading, error, deleteImportNotes } = useList();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [searchValue, setSearchValue] = useState("");

  const handleSearchValueDebounced = debounce((value) => {
    setSearchValue(value);
  }, 300);

  const handleSearchValue = (e) => {
    handleSearchValueDebounced(e.target.value);
  };

  // Xử lý khi dữ liệu đang tải hoặc gặp lỗi
  if (isLoading) return <p className="text-center text-blue-600">Loading...</p>;
  if (error) return <p className="text-center text-red-600">Error loading import notes list.</p>;

  // Hàm xóa người dùng
  const handleDeleteImportNotes = (importNotesID) => {
    Swal.fire({
      title: "Xác nhận xóa phiếu nhập?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteImportNotes(importNotesID)
          .then(() => {
            Swal.fire({
              title: "Đã xóa!",
              text: "Phiếu nhập đã được xóa thành công.",
              icon: "success",
            });
          })
          .catch((err) => {
            Swal.fire({
              title: "Lỗi!",
              text: "Không thể xóa phiếu nhập. Vui lòng thử lại.",
              icon: "error",
            });
            console.error(err);
          });
      }
    });
  };

  // Lọc người dùng theo vai trò và tìm kiếm
  const filteredImportNotes = importNotesData?.filter(
    (importNotes) => importNotes?.code && importNotes?.code?.toLowerCase().includes(searchValue?.toLowerCase())
  );

  // Tính toán cho phân trang
  const totalItems = filteredImportNotes?.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredImportNotes?.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="w-full min-h-screen bg-[#f9fafb]">
      <div className="px-5 py-5">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-semibold text-gray-800">Danh sách phiếu nhập</h1>
          <Link to="/admin/import-notes/create">
            <div className="bg-green-200 text-green-800 px-6 py-2 rounded-md text-sl font-semibold hover:bg-green-300 transition">
              Thêm mới +
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

        <div className="overflow-x-auto rounded-xl border border-[#d5d5d5]">
          <table className="min-w-full bg-white">
            <thead className="border-b border-[#d5d5d5] text-left text-sl font-semibold text-[#202224] uppercase tracking-wider">
              <tr>
                <th className="hidden lg:table-cell py-3 px-6 text-sl font-semibold text-gray-700 text-center">STT</th>
                <th className="py-3 px-6 text-left text-sl font-semibold text-gray-700">Mã phiếu</th>
                <th className="py-3 px-6 text-left text-sl font-semibold text-gray-700">Số lượng SP</th>
                <th className="py-3 px-6 text-left text-sl font-semibold text-gray-700">Nhà cung cấp</th>
                <th className="py-3 px-6 text-left text-sl font-semibold text-gray-700">Tổng tiền</th>
                <th className="py-3 px-6 text-left text-sl font-semibold text-gray-700">Người tạo</th>
                <th className="py-3 px-6 text-left text-sl font-semibold text-gray-700">Thời gian</th>
                <th className="py-3 px-6 text-left text-sl font-semibold text-gray-700">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {currentItems?.map((importNotes, index) => (
                <tr key={importNotes._id} className="bg-white border-b border-[#d5d5d5] hover:bg-gray-50 transition">
                  <td className="py-3 px-6 text-sl text-gray-800 break-words font-medium text-center">
                    {index + 1 + startIndex}
                  </td>
                  <td className="py-3 px-6 text-sl text-gray-800 break-words">{importNotes?.code}</td>
                  <td className="py-3 px-6 text-sl text-gray-800 break-words">{importNotes?.products?.length}</td>
                  <td className="py-3 px-6 text-sl text-gray-800 break-words">{importNotes?.seller?.name}</td>
                  <td className="py-3 px-6 text-sl text-gray-800 break-words">{formatCurrency(importNotes?.total)}</td>
                  <td className="py-3 px-6 text-sl text-gray-800 break-words">{importNotes?.createdBy?.userName}</td>
                  <td className="py-3 px-6 text-sl text-gray-800 break-words">{formatDateNoTime(importNotes?.createdAt)}</td>
                  <td className="py-3 px-6 text-sl flex items-center gap-3">
                    <div className="flex justify-center gap-3">
                      <Link to={`/admin/import-notes/${importNotes?._id}`}>
                        <div className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded-lg text-sl font-semibold hover:bg-yellow-300 transition">
                          <FaEye size={18} />
                        </div>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Phân trang */}
        {totalPages > 1 && <Pagination pageCount={totalPages} onPageChange={(e) => setCurrentPage(e.selected + 1)} />}
      </div>
    </div>
  );
};

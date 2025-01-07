import Navbar from "@/components/Admin/Navbar";
import Pagination from "@/components/Pagination";
import { useList } from "@/hooks/dashboard/stocks/useList";
import { useState } from "react";
import { FaPenToSquare } from "react-icons/fa6";
import { Link } from "react-router-dom";

export const StockList = () => {
  const { stocksData, isLoading, error } = useList();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Xử lý khi dữ liệu đang tải hoặc gặp lỗi
  if (isLoading) return <p className="text-center text-blue-600">Loading...</p>;
  if (error) return <p className="text-center text-red-600">Error loading stocks list.</p>;

  // Tính toán cho phân trang
  const totalItems = stocksData?.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = stocksData?.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="w-full min-h-screen bg-[#f9fafb]">
      <Navbar />

      <div className="px-5 py-5">
        <div className="overflow-x-auto rounded-xl border border-[#d5d5d5]">
          <table className="min-w-full bg-white">
            <thead className="border-b border-[#d5d5d5] text-left text-sl font-semibold text-[#202224] uppercase tracking-wider">
              <tr>
                <th className="hidden lg:table-cell py-3 px-6 text-sl font-semibold text-gray-700 text-center">STT</th>
                <th className="py-3 px-6 text-left text-sl font-semibold text-gray-700">Mã SP</th>
                <th className="py-3 px-6 text-left text-sl font-semibold text-gray-700">Tên SP</th>
                <th className="py-3 px-6 text-left text-sl font-semibold text-gray-700">Số lượng tồn</th>
                <th className="py-3 px-6 text-left text-sl font-semibold text-gray-700">Thời gian</th>
                <th className="py-3 px-6 text-left text-sl font-semibold text-gray-700">Người phụ trách</th>
                <th className="py-3 px-6 text-left text-sl font-semibold text-gray-700">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {currentItems?.map((stock, index) => (
                <tr key={stock._id} className="bg-white border-b border-[#d5d5d5] hover:bg-gray-50 transition">
                  <td className="py-3 px-6 text-sl text-gray-800 break-words font-medium text-center">
                    {index + 1 + startIndex}
                  </td>
                  <td className="py-3 px-6 text-sl text-gray-800 break-words">{stock?.product?.code}</td>
                  <td className="py-3 px-6 text-sl text-gray-800 break-words">{stock?.product?.name}</td>
                  <td className="py-3 px-6 text-sl text-gray-800 break-words">{stock?.quantity}</td>
                  <td className="py-3 px-6 text-sl text-gray-800 break-words">{stock?.lastUpdated}</td>
                  <td className="py-3 px-6 text-sl text-gray-800 break-words">{stock?.address}</td>
                  <td className="py-3 px-6 text-sl flex items-center gap-3">
                    <Link to={`/admin/stocks/update/${stock._id}`}>
                      <div className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded-lg text-sl font-semibold hover:bg-yellow-300 transition">
                        <FaPenToSquare size={18} />
                      </div>
                    </Link>
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

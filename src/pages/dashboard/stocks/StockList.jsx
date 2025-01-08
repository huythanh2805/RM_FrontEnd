import Pagination from "@/components/Pagination";
import { useList } from "@/hooks/dashboard/stocks/useList";
import { formatCurrency, formatDateNoTime } from "@/utilities/utils";
import { useState } from "react";

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
      <div className="px-5 py-5">
        <div className="overflow-x-auto rounded-xl border border-[#d5d5d5]">
          <table className="min-w-full bg-white">
            <thead className="border-b border-[#d5d5d5] text-left text-sl font-semibold text-[#202224] uppercase tracking-wider">
              <tr>
                <th className="hidden lg:table-cell py-3 px-6 text-sl font-semibold text-gray-700 text-center">STT</th>
                <th className="py-3 px-6 text-left text-sl font-semibold text-gray-700">Mã SP</th>
                <th className="py-3 px-6 text-left text-sl font-semibold text-gray-700">Tên SP</th>
                <th className="py-3 px-6 text-left text-sl font-semibold text-gray-700">Số lượng tồn</th>
                <th className="py-3 px-6 text-left text-sl font-semibold text-gray-700">Giá tiền</th>
                <th className="py-3 px-6 text-left text-sl font-semibold text-gray-700">Ngày hết hạn</th>
                <th className="py-3 px-6 text-left text-sl font-semibold text-gray-700">Thời gian</th>
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
                  <td className="py-3 px-6 text-sl text-gray-800 break-words text-center">
                    {formatCurrency(stock?.price)}
                  </td>
                  <td className="py-3 px-6 text-sl text-gray-800 break-words text-center">
                    {formatDateNoTime(stock?.expiryDate)}
                  </td>
                  <td className="py-3 px-6 text-sl text-gray-800 break-words">{formatDateNoTime(stock?.lastUpdated)}</td>
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

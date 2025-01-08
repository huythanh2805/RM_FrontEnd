import Pagination from "@/components/Pagination";
import { useList } from "@/hooks/dashboard/stocks/useList";
import { formatCurrency, formatDateNoTime } from "@/utilities/utils";
import { useState } from "react";

// Hàm tính toán thời gian còn lại đến ngày hết hạn
const calculateTimeLeft = (expiryDate) => {
  if (!expiryDate) return { text: "Không xác định", color: "text-gray-500" };

  const now = new Date();
  const expiry = new Date(expiryDate);

  // Đặt cả hai mốc thời gian về đầu ngày (00:00:00)
  const nowStartOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const expiryStartOfDay = new Date(expiry.getFullYear(), expiry.getMonth(), expiry.getDate());

  const timeDifference = expiryStartOfDay - nowStartOfDay;

  if (timeDifference < 0) {
    return { text: "Đã hết hạn", color: "text-red-600" }; // Đỏ nếu đã hết hạn
  }

  const daysLeft = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Chuyển đổi milliseconds thành ngày

  if (daysLeft > 2) {
    return { text: `${daysLeft} ngày nữa hết hạn`, color: "text-green-600" }; // Xanh lá nếu còn trên 2 ngày
  } else if (daysLeft > 0) {
    return { text: `${daysLeft} ngày nữa hết hạn`, color: "text-yellow-600" }; // Vàng nếu dưới 2 ngày
  } else {
    const hoursLeft = Math.floor((expiry - now) / (1000 * 60 * 60)); // Giờ còn lại
    if (hoursLeft > 0) {
      return { text: `${hoursLeft} giờ nữa hết hạn`, color: "text-yellow-600" };
    }
    const minutesLeft = Math.floor((expiry - now) / (1000 * 60)); // Phút còn lại
    return { text: `${minutesLeft} phút nữa hết hạn`, color: "text-yellow-600" };
  }
};



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
      <div className="px-5 ">
        <h1 className="text-3xl font-semibold text-gray-800 pb-5">Tồn kho</h1>
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
                  <td className={`py-3 px-6 text-sl break-words text-center align-middle ${calculateTimeLeft(stock?.expiryDate).color}`}>
                    {calculateTimeLeft(stock?.expiryDate).text}
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

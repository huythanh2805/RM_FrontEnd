import Pagination from "@/components/Pagination";
import { useList } from "@/hooks/dashboard/stocks/useList";
import { formatCurrency, formatDateNoTime } from "@/utilities/utils";
import { useMemo, useState } from "react";
import * as XLSX from "xlsx";
const calculateTimeLeft = (expiryDate) => {
  if (!expiryDate) return { text: "Không xác định", color: "text-gray-500" };

  const now = new Date();
  const expiry = new Date(expiryDate);
  const timeDifference = expiry - now;

  if (timeDifference < 0) return { text: "Đã hết hạn", color: "text-red-600" };

  const daysLeft = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  if (daysLeft > 2) return { text: `${daysLeft} ngày nữa hết hạn`, color: "text-green-600" };
  if (daysLeft > 0) return { text: `${daysLeft} ngày nữa hết hạn`, color: "text-yellow-600" };

  const hoursLeft = Math.floor(timeDifference / (1000 * 60 * 60));
  if (hoursLeft > 0) return { text: `${hoursLeft} giờ nữa hết hạn`, color: "text-yellow-600" };

  const minutesLeft = Math.floor(timeDifference / (1000 * 60));
  return { text: `${minutesLeft} phút nữa hết hạn`, color: "text-yellow-600" };
};

export const StockList = () => {
  const { stocksData, isLoading, error } = useList();
  const [currentPage, setCurrentPage] = useState(1);
  const [filterCode, setFilterCode] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const itemsPerPage = 10;

  const uniqueCodes = useMemo(() => {
    const codes = stocksData?.map((stock) => stock?.product?.code).filter(Boolean);
    return [...new Set(codes)];
  }, [stocksData]);

  const filteredStocks = useMemo(() => {
    return stocksData?.filter((stock) => {
      const matchesFilterCode = !filterCode || stock?.product?.code === filterCode;
      const matchesStartDate = !startDate || new Date(stock?.lastUpdated) >= new Date(startDate);
      const matchesEndDate = !endDate || new Date(stock?.lastUpdated) <= new Date(endDate);
      return matchesFilterCode && matchesStartDate && matchesEndDate;
    });
  }, [stocksData, filterCode, startDate, endDate]);


  const totalItems = filteredStocks?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredStocks?.slice(startIndex, startIndex + itemsPerPage);

  if (isLoading) return <p className="text-center text-blue-600">Loading...</p>;
  if (error) return <p className="text-center text-red-600">Error loading stocks list.</p>;
  const exportToExcel = () => {
    const excelData = filteredStocks?.map((stock) => ({
      "Mã sản phẩm": stock?.product?.code,
      "Tên sản phẩm": stock?.product?.name,
      "Số lượng tồn": stock?.quantity,
      "Giá tiền": formatCurrency(stock?.price),
      "Ngày hết hạn": stock?.expiryDate ? new Date(stock?.expiryDate).toLocaleDateString() : "Không xác định",
      "Ngày cập nhật": formatDateNoTime(stock?.lastUpdated),
    }));

    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Tồn kho");
    XLSX.writeFile(wb, "DanhSachTonKho.xlsx");
  };
  return (
    <div className="w-full min-h-screen">
      <div className="px-5">
        <h1 className="text-3xl font-semibold text-gray-800 pb-5">Tồn kho</h1>

        {/* Filters */}
        <div className="mb-5 flex justify-between ">
          <div className="flex flex-wrap gap-4">
            <div>
              <label htmlFor="filterCode" className="mr-2 font-semibold">
                Lọc theo mã sản phẩm:
              </label>
              <select
                id="filterCode"
                className="border border-gray-300 p-2 rounded-md"
                value={filterCode}
                onChange={(e) => setFilterCode(e.target.value)}
              >
                <option value="">Tất cả</option>
                {uniqueCodes.map((code, index) => (
                  <option key={index} value={code}>
                    {code}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="startDate" className="mr-2 font-semibold">
                Từ ngày:
              </label>
              <input
                type="date"
                id="startDate"
                className="border border-gray-300 p-2 rounded-md"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="endDate" className="mr-2 font-semibold">
                Đến ngày:
              </label>
              <input
                type="date"
                id="endDate"
                className="border border-gray-300 p-2 rounded-md"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
          <div>
            <button
              onClick={exportToExcel}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Xuất Excel
            </button>
            </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-[#d5d5d5]">
          <table className="min-w-full bg-white">
            <thead className="border-b border-[#d5d5d5] text-left text-sl font-semibold text-[#202224] uppercase tracking-wider">
              <tr>
                <th className="hidden lg:table-cell py-3 px-6 text-center">STT</th>
                <th className="py-3 px-6">Mã SP</th>
                <th className="py-3 px-6">Tên SP</th>
                <th className="py-3 px-6">Số lượng tồn</th>
                <th className="py-3 px-6">Giá tiền</th>
                <th className="py-3 px-6">Ngày hết hạn</th>
                <th className="py-3 px-6">Thời gian</th>
              </tr>
            </thead>
            <tbody>
              {currentItems?.map((stock, index) => (
                <tr key={stock._id} className="bg-white border-b hover:bg-gray-50 transition">
                  <td className="py-3 px-6 text-center">{index + 1 + startIndex}</td>
                  <td className="py-3 px-6">{stock?.product?.code}</td>
                  <td className="py-3 px-6">{stock?.product?.name}</td>
                  <td className="py-3 px-6">{stock?.quantity}</td>
                  <td className="py-3 px-6">{formatCurrency(stock?.price)}</td>
                  <td className={`py-3 px-6 ${calculateTimeLeft(stock?.expiryDate).color}`}>
                    {calculateTimeLeft(stock?.expiryDate).text}
                  </td>
                  <td className="py-3 px-6">{formatDateNoTime(stock?.lastUpdated)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && <Pagination pageCount={totalPages} onPageChange={(e) => setCurrentPage(e.selected + 1)} />}
      </div>
    </div>
  );
};

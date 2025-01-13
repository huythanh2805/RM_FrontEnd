import Pagination from "@/components/Pagination";
import { useList } from "@/hooks/dashboard/stocks/useList";
import { formatCurrency, formatDateNoTime } from "@/utilities/utils";
import { useEffect, useMemo, useState } from "react";
import * as XLSX from "xlsx";

const calculateTimeLeft = (expiryDate) => {
  if (!expiryDate) return { text: "Không xác định", color: "text-gray-500" };

  const now = new Date();
  const expiry = new Date(expiryDate);
  const timeDifference = expiry - now;

  if (timeDifference < 0) return { text: "Đã hết hạn", color: "text-red-600" };

  const daysLeft = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hoursLeft = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutesLeft = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

  if (daysLeft > 0) {
    return {
      text: `${daysLeft} ngày ${hoursLeft} giờ nữa hết hạn`,
      color: daysLeft <= 2 ? "text-yellow-600" : "text-green-600",
    };
  }

  if (hoursLeft > 0) {
    return {
      text: `${hoursLeft} giờ ${minutesLeft} phút nữa hết hạn`,
      color: "text-yellow-600",
    };
  }

  return {
    text: `${minutesLeft} phút nữa hết hạn`,
    color: "text-yellow-600",
  };
};

export const StockList = () => {
  const { stocksData: initialStocksData, isLoading, error } = useList();
  const [stocksData, setStocksData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterCode, setFilterCode] = useState("");
  const [searchName, setSearchName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [expiryFilter, setExpiryFilter] = useState(""); // Bộ lọc HSD

  const itemsPerPage = 10;

  useEffect(() => {
    setStocksData(initialStocksData || []);
  }, [initialStocksData]);

  // Bộ lọc sản phẩm
  const filteredStocks = useMemo(() => {
    return stocksData?.filter((stock) => {
      const matchesFilterCode = !filterCode || stock?.product?.code === filterCode;
      const matchesSearchName = !searchName || stock?.product?.name?.toLowerCase().includes(searchName.toLowerCase());
      const matchesStartDate = !startDate || new Date(stock?.lastUpdated) >= new Date(startDate);
      const matchesEndDate = !endDate || new Date(stock?.lastUpdated) <= new Date(endDate);

      const expiryDate = stock?.expiryDate ? new Date(stock?.expiryDate) : null;
      const now = new Date();
      const isExpired = expiryDate && expiryDate < now;
      const isNearlyExpired = expiryDate && expiryDate >= now && (expiryDate - now) / (1000 * 60 * 60 * 24) <= 2;

      const matchesExpiryFilter =
        !expiryFilter ||
        (expiryFilter === "expired" && isExpired) ||
        (expiryFilter === "nearlyExpired" && isNearlyExpired);

      return (
        matchesFilterCode &&
        matchesSearchName &&
        matchesStartDate &&
        matchesEndDate &&
        matchesExpiryFilter
      );
    });
  }, [stocksData, filterCode, searchName, startDate, endDate, expiryFilter]);

  const totalItems = filteredStocks?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredStocks?.slice(startIndex, startIndex + itemsPerPage);


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

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading stocks list.</p>;

  return (
    <div className="w-full min-h-screen">
      <div className="px-5">
        <h1 className="text-3xl font-semibold text-gray-800 pb-5">Tồn kho</h1>

        {/* Filters */}
        <div className="mb-5 flex justify-between flex-wrap gap-4">
          <div>
            <select
              id="filterCode"
              className="border border-gray-300 p-2 rounded-md"
              value={filterCode}
              onChange={(e) => setFilterCode(e.target.value)}
            >
              <option value="">Tất cả</option>
              {filteredStocks &&
                [...new Set(filteredStocks.map((stock) => stock?.product?.code))].map((code) => (
                  <option key={code} value={code}>
                    {code}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <input
              type="text"
              id="searchName"
              placeholder="Nhập tên sản phẩm"
              className="border border-gray-300 p-2 rounded-md"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="startDate" className="mr-2 font-semibold">Từ ngày:</label>
            <input
              type="date"
              id="startDate"
              className="border border-gray-300 p-2 rounded-md"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="endDate" className="mr-2 font-semibold">Đến ngày:</label>
            <input
              type="date"
              id="endDate"
              className="border border-gray-300 p-2 rounded-md"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="expiryFilter" className="mr-2 font-semibold">Lọc theo HSD:</label>
            <select
              id="expiryFilter"
              className="border border-gray-300 p-2 rounded-md"
              value={expiryFilter}
              onChange={(e) => setExpiryFilter(e.target.value)}
            >
              <option value="">Tất cả</option>
              <option value="expired">Đã hết hạn</option>
              <option value="nearlyExpired">Sắp hết hạn</option>
            </select>
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
            <thead className="border-b border-[#d5d5d5] text-left text-sm font-semibold text-[#202224] uppercase tracking-wider">
              <tr>
                <th className="hidden lg:table-cell py-3 px-6 text-center">STT</th>
                <th className="py-3 px-6">Mã SP</th>
                <th className="py-3 px-6">Tên SP</th>
                <th className="py-3 px-6">Số lượng tồn</th>
                <th className="py-3 px-6">Ngày hết hạn</th>

              </tr>
            </thead>
            <tbody>
              {currentItems?.map((stock, index) => (
                <tr key={stock._id} className="bg-white border-b hover:bg-gray-50 transition">
                  <td className="py-3 px-6 text-center">{index + 1 + startIndex}</td>
                  <td className="py-3 px-6">{stock?.product?.code}</td>
                  <td className="py-3 px-6">{stock?.product?.name}</td>
                  <td className="py-3 px-6">{stock?.quantity}</td>
                  <td className={`py-3 px-6 ${calculateTimeLeft(stock?.expiryDate).color}`}>
                    {calculateTimeLeft(stock?.expiryDate).text}
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination pageCount={totalPages} onPageChange={(e) => setCurrentPage(e.selected + 1)} />
        )}
      </div>
    </div>
  );
};


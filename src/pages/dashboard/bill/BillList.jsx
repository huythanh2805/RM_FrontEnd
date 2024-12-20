import Navbar from "@/components/Admin/Navbar";
import Pagination from "@/components/Pagination";
import BASE_URL from "@/configs";
import { formatCurrency } from "@/utilities/utils";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { Link } from "react-router-dom";

const BillList = () => {
  const [dataBill, setDataBill] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [dateValue, setDateValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 10;

  const fetchData = () => {
    axios
      .get(BASE_URL + "/api/bills")
      .then((res) => {
        setDataBill(res.data.bills);
        // console.log("data bill:", res.data.bills);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearchValue = (e) => {
    setSearchValue(e.target.value);
    // console.log("search", e.target.value);
    setCurrentPage(1);
  };

  const handleDateValue = (e) => {
    setDateValue(e.target.value);
    // console.log("date", e.target.value);
    setCurrentPage(1);
  };

  const filterBills = dataBill.filter((item) => {
    const matchesSearchValue = item.reservation_id.userName
      .toLowerCase()
      .includes(searchValue.toLowerCase());

    const matchesDateValue = dateValue
      ? new Date(item.reservation_id.startTime).toLocaleDateString("vi-VN") ===
        new Date(dateValue).toLocaleDateString("vi-VN")
      : true;

    return matchesSearchValue && matchesDateValue;
  });

  // phân trang
  const startIndex = (currentPage - 1) * itemPerPage;
  const currentItems = filterBills
    .reverse()
    .slice(startIndex, startIndex + itemPerPage);
  const pageCount = Math.ceil(filterBills.reverse().length / itemPerPage);

  const handlePageClick = (e) => {
    setCurrentPage(e.selected + 1);
  };

  return (
    <div className="w-full min-h-screen bg-[#f9fafb]">
      <Navbar />

      <div className="px-5 py-5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-3xl font-semibold">Danh sách hóa đơn</p>
        </div>

        <div className="flex justify-between mb-4">
          <input
            type="date"
            class="p-2.5 w-64 rounded-lg border border-gray-300
           focus:outline-none focus:ring-2 focus:ring-blue-400 
           focus:border-blue-400 transition-all"
            onChange={handleDateValue}
          />

          {/* Input search */}
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
              <button
                type="button"
                className="text-gray-600 hover:text-gray-700"
              >
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

        <div className="overflow-x-auto rounded-xl border border-[#d5d5d5]">
          <table className="min-w-full bg-white">
            <thead className="border-b border-[#d5d5d5] text-left text-sl font-semibold text-[#202224] uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4 text-left text-sl font-semibold text-gray-700">
                  STT
                </th>
                <th className="py-3 px-4 text-left text-sl font-semibold text-gray-700">
                  Mã hóa đơn
                </th>
                <th className="py-3 px-4 text-left text-sl font-semibold text-gray-700">
                  Tên khách hàng
                </th>
                <th className="py-3 px-4 text-left text-sl font-semibold text-gray-700">
                  Số điện thoại
                </th>
                <th className="py-3 px-4 text-left text-sl font-semibold text-gray-700">
                  Thời gian đặt bàn
                </th>
                <th className="py-3 px-4 text-left text-sl font-semibold text-gray-700">
                  Số tiền
                </th>
                <th className="py-3 px-4 text-left text-sl font-semibold text-gray-700">
                  Trạng thái
                </th>
                <th className="py-3 px-4 text-left text-sl font-semibold text-gray-700">
                  Chi tiết
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((bill, index) => (
                <tr
                  key={bill._id}
                  className="bg-white border-b border-[#d5d5d5] hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-4 text-sl font-medium text-gray-800">
                    <Link to={`/admin/bills/${bill._id}/detail`}>
                      {startIndex + index + 1}
                    </Link>
                  </td>
                  <td className="py-3 px-4 text-sl text-gray-800">
                    <Link to={`/admin/bills/${bill._id}/detail`}>
                      {bill._id}
                    </Link>
                  </td>
                  <td className="py-3 px-4 text-sl text-gray-800">
                    <Link to={`/admin/bills/${bill._id}/detail`}>
                      {bill.reservation_id?.userName}
                    </Link>
                  </td>
                  <td className="py-3 px-4 text-sl text-gray-800">
                    <Link to={`/admin/bills/${bill._id}/detail`}>
                      {bill.reservation_id?.phoneNumber}
                    </Link>
                  </td>
                  <td className="py-3 px-4 text-sl text-gray-800">
                    <Link to={`/admin/bills/${bill._id}/detail`}>
                      {new Date(bill.reservation_id?.startTime).toLocaleString(
                        "vi-VN"
                      )}
                    </Link>
                  </td>
                  <td className="py-3 px-4 text-sl text-gray-800">
                    <Link to={`/admin/bills/${bill._id}/detail`}>
                      {formatCurrency(bill.total_money)}
                    </Link>
                  </td>
                  <td className="py-3 px-4 text-sl text-gray-800">
                    <Link to={`/admin/bills/${bill._id}/detail`}>
                      <span
                        className={`px-2 py-1 text-sl font-semibold rounded-lg ${
                          bill.status === "ISPAID"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {bill.status === "ISPAID"
                          ? "Đã thanh toán"
                          : "Chưa thanh toán"}
                      </span>
                    </Link>
                  </td>
                  <td className="py-3 px-4 text-sl text-gray-800 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <Link to={`/admin/bills/${bill._id}/detail`}>
                        <div className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded-lg text-sl font-semibold hover:bg-yellow-300 transition">
                          <FaEye size={18} />
                        </div>
                      </Link>
                      <div className="bg-red-200 text-red-800 px-2 py-1 rounded-lg cursor-pointer text-sl font-semibold hover:bg-red-300 transition">
                        <FaRegTrashCan size={18} />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Phân trang */}
          <Pagination pageCount={pageCount} onPageChange={handlePageClick} />
        </div>
      </div>
    </div>
  );
};

export default BillList;

import BASE_URL from "@/configs";
import { formatCurrency } from "@/utilities/utils";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { Link } from "react-router-dom";

const BillList = () => {
  const [dataBill, setDataBill] = useState([]);

  useEffect(() => {
    axios
      .get(BASE_URL + "/api/bills")
      .then((res) => {
        setDataBill(res.data.bills);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#f5f6fa]">
      <div className="px-5 py-2">
        <div className="flex items-center justify-between mb-4">
          <p className="text-[32px] font-semibold">Hóa đơn</p>
        </div>

        <div className="overflow-x-auto rounded-lg border border-[#d5d5d5] bg-white shadow-sm">
          <table className="min-w-full bg-white">
            <thead className="border-b border-[#d5d5d5] text-left text-xs font-semibold text-[#202224] uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">STT</th>
                <th className="py-3 px-4">Mã hóa đơn</th>
                <th className="py-3 px-4">Tên khách hàng</th>
                <th className="py-3 px-4">Số điện thoại</th>
                <th className="py-3 px-4">Thời gian đặt bàn</th>
                <th className="py-3 px-4">Số tiền</th>
                <th className="py-3 px-4">Trạng thái</th>
                <th className="py-3 px-4">Thanh toán</th>
                <th className="py-3 px-4">Chi tiết</th>
              </tr>
            </thead>
            <tbody>
              {dataBill.map((bill, index) => (
                <tr
                  key={bill._id}
                  className="bg-white border-b hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-4 text-sm font-medium">
                    <Link to={`/admin/bills/${bill._id}/detail`}>
                      {index + 1}
                    </Link>
                  </td>
                  <td className="py-3 px-4 text-sm font-medium">
                    <Link to={`/admin/bills/${bill._id}/detail`}>
                      {bill._id}
                    </Link>
                  </td>
                  <td className="py-3 px-4 text-sm">
                    <Link to={`/admin/bills/${bill._id}/detail`}>
                      {bill.reservation_id?.userName}
                    </Link>
                  </td>
                  <td className="py-3 px-4 text-sm">
                    <Link to={`/admin/bills/${bill._id}/detail`}>
                      {bill.reservation_id?.phoneNumber}
                    </Link>
                  </td>
                  <td className="py-3 px-4 text-sm">
                    <Link to={`/admin/bills/${bill._id}/detail`}>
                      {new Date(bill.reservation_id?.startTime).toLocaleString(
                        "vi-VN"
                      )}
                    </Link>
                  </td>
                  <td className="py-3 px-4 text-sm">
                    <Link to={`/admin/bills/${bill._id}/detail`}>
                      {formatCurrency(bill.original_money)}
                    </Link>
                  </td>
                  <td className="py-3 px-4 text-sm">
                    <Link to={`/admin/bills/${bill._id}/detail`}>
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-lg ${
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
                  <td className="py-3 px-4 text-sm">
                    <Link to={`/admin/bills/${bill._id}/detail`}>
                      {bill.reservation_id?.payment_method}
                    </Link>
                  </td>
                  <td className="py-3 px-4 text-sm cursor-pointer">
                    <div className="flex items-center gap-2 lg:gap-3">
                      <Link to={`/admin/bills/${bill._id}/detail`}>
                        <div className="hidden lg:block bg-yellow-200 text-yellow-800 px-2 py-1 rounded-lg text-xs lg:text-sm font-semibold hover:bg-yellow-300 transition">
                          <FaEye />
                        </div>
                      </Link>
                      <div className="bg-red-200 text-red-800 px-2 py-1 rounded-lg cursor-pointer text-xs lg:text-sm font-semibold hover:bg-red-300 transition">
                        <FaRegTrashCan />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BillList;

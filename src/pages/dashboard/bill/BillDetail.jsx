import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import BASE_URL from "@/configs";
import { formatCurrency } from "@/utilities/utils";

const BillDetail = () => {
  const { id } = useParams();
  const [dataBill, setDataBill] = useState(null);

  useEffect(() => {
    axios
      .get(BASE_URL + "/api/bills/" + id)
      .then((res) => {
        console.log(res.data.bill);
        setDataBill(res.data.bill);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  if (!dataBill) {
    return <div>Loading...</div>;
  }

  const {
    reservation_id = {},
    original_money,
    VAT,
    status,
    billDetail_id,
  } = dataBill;

  const {
    userName,
    phoneNumber,
    detailAddress,
    payment_method,
    table_id,
    startTime,
    guests_count,
  } = reservation_id || {};

  const { orderedDishes } = billDetail_id || {};

  return (
    <div className="w-full min-h-screen bg-[#f5f6fa]">
      {/* Thông tin người đặt */}
      <div className="px-5 py-2">
        <p className="text-[32px] font-semibold mb-4">Thông tin người đặt</p>
        <div className="rounded-xl bg-white border border-[#d5d5d5]">
          <table className="min-w-full table-auto text-left">
            <tbody>
              <tr className="border-b">
                <th className="py-4 px-6 text-gray-700 font-semibold">
                  Tên khách hàng
                </th>
                <td className="py-4 px-6 text-gray-600">
                  {userName || "Không có thông tin"}
                </td>
              </tr>
              <tr className="border-b">
                <th className="py-4 px-6 text-gray-700 font-semibold">
                  Địa chỉ
                </th>
                <td className="py-4 px-6 text-gray-600">
                  {detailAddress || "Không có thông tin"}
                </td>
              </tr>
              <tr className="border-b">
                <th className="py-4 px-6 text-gray-700 font-semibold">
                  Số điện thoại
                </th>
                <td className="py-4 px-6 text-gray-600">
                  {phoneNumber || "Không có thông tin"}
                </td>
              </tr>
              <tr>
                <th className="py-4 px-6 text-gray-700 font-semibold">
                  Hình thức thanh toán
                </th>
                <td className="py-4 px-6 text-gray-600">
                  {payment_method || "Không có thông tin"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Thông tin đặt bàn */}
      <div className="px-5 py-4">
        <p className="text-[32px] font-semibold mb-4">Thông tin đặt bàn</p>
        <div className="rounded-xl bg-white border border-[#d5d5d5]">
          <table className="min-w-full table-auto text-left">
            <tbody>
              <tr className="border-b">
                <th className="py-4 px-6 text-gray-700 font-semibold">
                  Tên bàn
                </th>
                <td className="py-4 px-6 text-gray-600">
                  {table_id?.name || "Không có thông tin"}
                </td>
              </tr>
              <tr className="border-b">
                <th className="py-4 px-6 text-gray-700 font-semibold">
                  Số ghế
                </th>
                <td className="py-4 px-6 text-gray-600">
                  {table_id?.number_of_seats || "Không có thông tin"}
                </td>
              </tr>
              <tr className="border-b">
                <th className="py-4 px-6 text-gray-700 font-semibold">
                  Số khách
                </th>
                <td className="py-4 px-6 text-gray-600">
                  {guests_count || "Không có thông tin"}
                </td>
              </tr>
              <tr>
                <th className="py-4 px-6 text-gray-700 font-semibold">
                  Thời gian đặt
                </th>
                <td className="py-4 px-6 text-gray-600">
                  {startTime
                    ? new Date(startTime).toLocaleString("vi-VN")
                    : "Không có thông tin"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Thông tin chi tiết hóa đơn */}
      <div className="px-5 py-4">
        <p className="text-[32px] font-semibold mb-4">Chi tiết hóa đơn</p>
        <div className="overflow-x-auto rounded-xl border border-[#d5d5d5]">
          <table className="min-w-full bg-white table-auto">
            <thead className="border-b border-[#d5d5d5] text-left text-xs font-semibold text-[#202224] uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4 lg:px-6">Tên món ăn</th>
                <th className="py-3 px-4 lg:px-6">Hình ảnh</th>
                <th className="py-3 px-4 lg:px-6">Giá</th>
                <th className="py-3 px-4 lg:px-6">Số lượng</th>
                <th className="py-3 px-4 lg:px-6">Tổng</th>
              </tr>
            </thead>
            <tbody>
              {orderedDishes?.map((dish) => (
                <tr
                  className="bg-white border-b border-[#d5d5d5] hover:bg-gray-50 transition"
                  key={dish._id}
                >
                  <td className="py-4 px-6 text-sm font-medium text-[#202224]">
                    {dish.name}
                  </td>
                  <td className="py-4 px-6 text-sm">
                    <img
                      src={dish.images[0]}
                      alt={dish.name}
                      className="w-20 h-20 object-cover"
                    />
                  </td>
                  <td className="py-4 px-6 text-sm">
                    {formatCurrency(dish.price)}
                  </td>
                  <td className="py-4 px-6 text-sm">{dish.quantity}</td>
                  <td className="py-4 px-6 text-sm">
                    {formatCurrency(dish.price * dish.quantity)}
                  </td>
                </tr>
              ))}

              <tr>
                <td
                  className="table-cell py-4 px-6 font-semibold text-right"
                  colSpan={4}
                >
                  Thuế VAT ({VAT}%)
                </td>
                <td className="py-4 px-6 font-semibold">
                  {((original_money * VAT) / 100).toLocaleString("vi-VN")} VND
                </td>
              </tr>
              <tr className="bg-gray-50">
                <td
                  className="table-cell py-4 px-6 font-semibold text-right"
                  colSpan={4}
                >
                  Tổng hóa đơn
                </td>
                <td className="py-4 px-6 font-semibold">
                  {original_money.toLocaleString("vi-VN")} VND
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-4 flex justify-between items-center">
        <Link to={`/admin/bills`}>
          <div className="bg-gray-200 flex gap-2 items-center text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300">
            Quay lại
          </div>
        </Link>
        <div
          className={`py-2 px-4 rounded-lg ${
            status === "ISPAID"
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {status === "ISPAID" ? "Đã thanh toán" : "Chưa thanh toán"}
        </div>
      </div>
    </div>
  );
};

export default BillDetail;

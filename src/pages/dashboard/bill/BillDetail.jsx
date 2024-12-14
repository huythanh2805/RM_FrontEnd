import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import BASE_URL from "@/configs";
import { formatCurrency } from "@/utilities/utils";
import Navbar from "@/components/Admin/Navbar";

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
    reservation_id,
    original_money,
    VAT,
    total_money,
    discount_money,
    deposit_money,
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

  const { orderedDishes, orderedCombos } = billDetail_id || {};

  return (
    <div className="w-full min-h-screen bg-[#f5f6fa]">
      <Navbar />

      {/* Thông tin người đặt */}
      <div className="px-5 py-5">
        <p className="text-3xl font-semibold mb-4">Thông tin người đặt</p>
        <div className="rounded-xl bg-white border border-[#d5d5d5]">
          <table className="min-w-full table-auto text-left">
            <tbody>
              <tr className="border-b">
                <th className="py-4 px-6 text-gray-700 font-semibold">
                  Tên khách hàng
                </th>
                <td className="py-4 px-6 text-gray-600">{userName}</td>
              </tr>
              <tr className="border-b">
                <th className="py-4 px-6 text-gray-700 font-semibold">
                  Địa chỉ
                </th>
                <td className="py-4 px-6 text-gray-600">{detailAddress}</td>
              </tr>
              <tr className="border-b">
                <th className="py-4 px-6 text-gray-700 font-semibold">
                  Số điện thoại
                </th>
                <td className="py-4 px-6 text-gray-600">{phoneNumber}</td>
              </tr>
              <tr>
                <th className="py-4 px-6 text-gray-700 font-semibold">
                  Hình thức thanh toán
                </th>
                <td className="py-4 px-6 text-gray-600">{payment_method}</td>
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
                <td className="py-4 px-6 text-gray-600">{table_id?.name}</td>
              </tr>
              <tr className="border-b">
                <th className="py-4 px-6 text-gray-700 font-semibold">
                  Số ghế
                </th>
                <td className="py-4 px-6 text-gray-600">
                  {table_id?.number_of_seats}
                </td>
              </tr>
              <tr className="border-b">
                <th className="py-4 px-6 text-gray-700 font-semibold">
                  Số khách
                </th>
                <td className="py-4 px-6 text-gray-600">{guests_count}</td>
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
            <thead className="border-b border-[#d5d5d5] text-left text-sl font-semibold text-[#202224] uppercase tracking-wider">
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
                  <td className="py-4 px-6 text-sl font-medium text-[#202224]">
                    {dish.name}
                  </td>
                  <td className="py-4 px-6 text-sl">
                    <img
                      src={dish.images[0]}
                      alt={dish.name}
                      className="w-20 h-20 object-cover"
                    />
                  </td>
                  <td className="py-4 px-6 text-sl">
                    {formatCurrency(dish.price)}
                  </td>
                  <td className="py-4 px-6 text-sl">{dish.quantity}</td>
                  <td className="py-4 px-6 text-sl">
                    {formatCurrency(dish.price * dish.quantity)}
                  </td>
                </tr>
              ))}

              {orderedCombos?.map((combo) => (
                <tr
                  className="bg-white border-b border-[#d5d5d5] hover:bg-gray-50 transition"
                  key={combo._id}
                >
                  <td className="py-4 px-6 text-sl font-medium text-[#202224]">
                    {combo.name}
                  </td>
                  <td className="py-4 px-6 text-sl">
                    <img
                      src={combo.images[0]}
                      alt={combo.name}
                      className="w-20 h-20 object-cover"
                    />
                  </td>
                  <td className="py-4 px-6 text-sl">
                    {formatCurrency(combo.price)}
                  </td>
                  <td className="py-4 px-6 text-sl">{combo.quantity}</td>
                  <td className="py-4 px-6 text-sl">
                    {formatCurrency(combo.price * combo.quantity)}
                  </td>
                </tr>
              ))}
              <tr>
                <td
                  className="table-cell py-4 px-6 font-semibold text-right"
                  colSpan={4}
                >
                  Tổng tiền (Trước thuế):
                </td>
                <td className="py-4 px-6 font-semibold">
                  {formatCurrency(original_money)}
                </td>
              </tr>
              <tr>
                <td
                  className="table-cell py-4 px-6 font-semibold text-right"
                  colSpan={4}
                >
                  Thuế VAT ({VAT}%):
                </td>
                <td className="py-4 px-6 font-semibold">
                  {formatCurrency((original_money * VAT) / 100)}
                </td>
              </tr>
              {discount_money !== null && discount_money !== 0 && (
                <tr>
                  <td
                    className="table-cell py-4 px-6 font-semibold text-right"
                    colSpan={4}
                  >
                    Giảm giá:
                  </td>
                  <td className="py-4 px-6 font-semibold">
                    {formatCurrency(discount_money)}
                  </td>
                </tr>
              )}
              {deposit_money !== null && deposit_money !== 0 && (
                <tr>
                  <td
                    className="table-cell py-4 px-6 font-semibold text-right"
                    colSpan={4}
                  >
                    Tiền đã cọc:
                  </td>
                  <td className="py-4 px-6 font-semibold">
                    {formatCurrency(deposit_money)}
                  </td>
                </tr>
              )}
              <tr>
                <td
                  className="table-cell py-4 px-6 font-semibold text-right"
                  colSpan={4}
                >
                  Tổng cộng (Sau thuế):
                </td>
                <td className="py-4 px-6 font-semibold">
                  {formatCurrency(total_money)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-4 flex justify-between items-center">
        <Link to={`/admin/bills`}>
          <div className="bg-gray-200 flex text-sl gap-2 items-center text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300">
            Quay lại
          </div>
        </Link>
        <div
          className={`py-2 px-4 text-sl rounded-lg ${
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

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { FaPenToSquare, FaRegTrashCan } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import BASE_URL from "@/configs";
import { formatCurrency } from "@/utilities/utils";
import { AiTwotoneFileImage } from "react-icons/ai";
import Pagination from "@/components/Pagination";

const SetComboList = () => {
  const [combos, setCombos] = useState([]);

  const fetchData = () => {
    axios
      .get(BASE_URL + "/setCombos")
      .then((res) => {
        setCombos(res.data);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Xác nhận xóa ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(BASE_URL + `/setCombos/${id}`)
          .then(() => {
            Swal.fire({
              title: "Đã xóa!",
              text: "Combo đã được xóa thành công.",
              icon: "success",
            });
            fetchData();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  return (
    <div className="w-full min-h-screen bg-[#f5f6fa]">
      <div className="px-5 py-2">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[32px] font-semibold">Set Combo</p>
          <Link to={"/dashboard/setCombos/add"}>
            <div className="bg-green-200 text-green-800 px-6 py-2 rounded-md text-xs font-semibold hover:bg-green-300 transition">
              Thêm +
            </div>
          </Link>
        </div>

        {/* Lọc món */}
        {/* <div className="flex justify-between mb-4">
          <div class="max-w-sm">
            <select
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option value={category} key={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div> */}

        <div className="overflow-x-auto rounded-xl border border-[#d5d5d5]">
          <table className="min-w-full bg-white">
            <thead className="border-b border-[#d5d5d5] text-left text-xs font-semibold text-[#202224] uppercase tracking-wider">
              <tr>
                <th className="hidden lg:table-cell py-3 px-4 lg:px-6">STT</th>
                <th className="py-3 px-4 lg:px-6">Tên combo</th>
                <th className="py-3 px-4 lg:px-6">Giá</th>
                <th className="hidden lg:table-cell py-3 px-4 lg:px-6">
                  Mô tả
                </th>
                <th className="hidden lg:table-cell py-3 px-4 lg:px-6">
                  Trạng thái
                </th>
                <th className="py-3 px-4 lg:px-6"></th>
              </tr>
            </thead>
            <tbody>
              {combos.map((d, index) => (
                <tr
                  className="bg-white border-b border-[#d5d5d5] hover:bg-gray-50 transition"
                  key={d._id}
                >
                  <td className="hidden lg:table-cell">
                    <div className="py-3 px-4 lg:px-6 text-sm font-medium text-[#202224]">
                      {index + 1}
                    </div>
                  </td>
                  <td className="py-3 px-4 lg:px-6 text-sm font-medium text-[#202224] break-words">
                    <Link
                      to={`/dashboard/setCombos/${d._id}/detail`}
                      className="hover:underline"
                    >
                      <div className="flex items-center gap-2 lg:gap-4">
                        {d.images && d.images.length > 0 ? (
                          <img
                            src={d.images[0]}
                            alt=""
                            className="w-16 h-20 lg:w-20 lg:h-25 object-cover"
                          />
                        ) : (
                          <AiTwotoneFileImage className="w-16 h-20 lg:w-20 lg:h-25 object-cover" />
                        )}

                        <span className="hidden lg:block">{d.name}</span>
                      </div>
                    </Link>
                  </td>
                  <td className="py-3 px-4 lg:px-6 text-sm">
                    {formatCurrency(d.price)}
                  </td>
                  <td className="hidden lg:table-cell py-3 px-4 lg:px-6 text-sm">
                    {d.desc}
                  </td>

                  <td className="hidden lg:table-cell py-3 px-4 lg:px-6 text-sm">
                    {d.isShow ? (
                      <span className="px-2 py-1 text-xs font-semibold rounded-lg bg-green-100 text-green-800">
                        Có sẵn
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs font-semibold rounded-lg bg-gray-100 text-gray-700">
                        Hết hàng
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 lg:px-6">
                    <div className="flex items-center gap-2 lg:gap-3">
                      <Link to={`/dashboard/setCombos/${d._id}/detail`}>
                        <div className="hidden lg:block bg-yellow-200 text-yellow-800 px-2 py-1 rounded-lg text-xs lg:text-sm font-semibold hover:bg-yellow-300 transition">
                          <FaEye />
                        </div>
                      </Link>
                      <Link to={`/dashboard/setCombos/${d._id}/update`}>
                        <div className="bg-blue-200 text-blue-800 px-2 py-1 rounded-lg text-xs lg:text-sm font-semibold hover:bg-blue-300 transition">
                          <FaPenToSquare />
                        </div>
                      </Link>
                      <div
                        className="bg-red-200 text-red-800 px-2 py-1 rounded-lg cursor-pointer text-xs lg:text-sm font-semibold hover:bg-red-300 transition"
                        onClick={() => handleDelete(d._id)}
                      >
                        <FaRegTrashCan />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Phân trang */}
          {/* <Pagination pageCount={pageCount} onPageChange={handlePageClick} /> */}
        </div>
      </div>
    </div>
  );
};

export default SetComboList;

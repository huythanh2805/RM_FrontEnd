import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaPenToSquare, FaRegTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";

const CategoryList = () => {
  const [data, setData] = useState([]);

  const fetchData = () => {
    axios
      .get("http://localhost:1111/categories")
      .then((res) => {
        setData(res.data);
        console.log(res.data);
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
          .delete(`http://localhost:1111/categories/${id}`)
          .then(() => {
            Swal.fire({
              title: "Đã xóa!",
              text: "Danh mục đã được xóa thành công.",
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
        <div className="flex items-center justify-between">
          <p className="text-[32px] font-semibold mb-4">Danh mục</p>
          <Link to={"/dashboard/categories/add"}>
            <div className="bg-green-200 text-green-800 px-6 py-2 rounded-md text-xs font-semibold hover:bg-green-300 transition">
              Thêm +
            </div>
          </Link>
        </div>
        <div className="overflow-x-auto rounded-xl border border-[#d5d5d5]">
          <table className="min-w-full bg-white">
            <thead className="border-b border-[#d5d5d5] text-left text-xs font-semibold text-[#202224] uppercase tracking-wider">
              <tr>
                <th className="hidden lg:block py-3 px-6">STT</th>
                <th className="py-3 px-6">Tên</th>
                <th className="py-3 px-6">Mô tả</th>
                <th className="py-3 px-6">Trạng thái</th>
                <th className="py-3 px-6"></th>
              </tr>
            </thead>
            <tbody>
              {data.map((d, index) => (
                <tr
                  className="bg-white border-b border-[#d5d5d5] hover:bg-gray-50 transition"
                  key={d._id}
                >
                  <td className="hidden lg:block py-4 px-6 text-sm font-medium text-[#202224]">
                    {index + 1}
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-[#202224] max-w-[100px] lg:max-w-[250px] break-words">
                    {d.name}
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-[#202224] max-w-[100px] lg:max-w-[250px] break-words">
                    {d.desc}
                  </td>
                  <td className="py-4 px-6 text-sm">
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
                  <td className="py-4 px-6 text-sm flex items-center gap-1.5 lg:gap-3">
                    <Link to={`/dashboard/categories/${d._id}/update`}>
                      <div className="bg-blue-200 text-blue-800 px-3 py-1 rounded-lg text-xs lg:text-base font-semibold hover:bg-blue-300 transition">
                        <FaPenToSquare />
                      </div>
                    </Link>
                    <div
                      className="bg-red-200 text-red-800 px-3 py-1 rounded-lg cursor-pointer text-xs lg:text-base font-semibold hover:bg-red-300 transition"
                      onClick={() => handleDelete(d._id)}
                    >
                      <FaRegTrashCan />
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

export default CategoryList;

import Pagination from "@/components/Pagination";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaPenToSquare, FaRegTrashCan } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { formatCurrency } from "@/utilities/utils";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemPerPage = 5;

  const fetchData = () => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/employees`)
      .then((res) => {
        setEmployees(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const pageCount = Math.ceil(employees.length / itemPerPage);

  const currentItems = employees.slice(
    currentPage * itemPerPage,
    (currentPage + 1) * itemPerPage
  );

  const handlePageChange = (e) => {
    setCurrentPage(e.selected);
  };

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
          .delete(`${import.meta.env.VITE_API_BASE_URL}/employees/${id}`)
          .then(() => {
            Swal.fire(
              "Đã xóa!",
              "Nhân viên đã được xóa thành công.",
              "success"
            );
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
          <p className="text-[32px] font-semibold mb-4">Nhân Viên</p>
          <Link to={"/admin/employees/add"}>
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
                <th className="py-3 px-6">Giới tính</th>
                <th className="py-3 px-6">Số điện thoại</th>
                <th className="py-3 px-6">Vị trí công việc</th>
                <th className="py-3 px-6">Lương</th>
                <th className="py-3 px-6">Trạng thái</th>
                <th className="py-3 px-6">Lịch làm việc</th>
                <th className="py-3 px-6"></th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((d, index) => (
                <tr
                  className="bg-white border-b border-[#d5d5d5] hover:bg-gray-50 transition"
                  key={d._id}
                >
                  <td className="hidden lg:block py-4 px-6 text-sm font-medium text-[#202224]">
                    {index + 1}
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-[#202224]">
                    {d.name}
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-[#202224]">
                    {d.gender}
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-[#202224]">
                    {d.phoneNumber}
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-[#202224]">
                    {d.workPosition}
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-[#202224]">
                    {formatCurrency(d.salary)}
                  </td>

                  <td className="py-4 px-6 text-sm">
                    {d.employStatus === "ACTIVE" ? (
                      <span className="px-2 py-1 text-xs font-semibold rounded-lg bg-green-100 text-green-800">
                        Đang làm việc
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs font-semibold rounded-lg bg-gray-100 text-gray-700">
                        Nghỉ
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-[#202224]">
                    Trống
                  </td>
                  <td className="py-4 px-6 text-sm flex items-center gap-1.5 lg:gap-3">
                    <Link to={`/admin/employees/${d._id}/update`}>
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
          <Pagination pageCount={pageCount} onPageChange={handlePageChange} />
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;

import Pagination from "@/components/Pagination";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaPenToSquare, FaRegTrashCan } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 10;

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

  const startIndex = (currentPage - 1) * itemPerPage;
  const currentItems = employees
    .reverse()
    .slice(startIndex, startIndex + itemPerPage);
  const pageCount = Math.ceil(employees.reverse().length / itemPerPage);

  const handlePageChange = (e) => {
    setCurrentPage(e.selected + 1);
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
            setCurrentPage(1);
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
            <div className="bg-green-200 text-green-800 px-6 py-2 rounded-md text-sl font-semibold hover:bg-green-300 transition">
              Thêm +
            </div>
          </Link>
        </div>
        <div className="overflow-x-auto rounded-xl border border-[#d5d5d5]">
          <table className="min-w-full bg-white">
            <thead className="border-b border-[#d5d5d5] text-left text-sl font-semibold text-[#202224] uppercase tracking-wider">
              <tr>
                <th className="py-3 px-6 font-bold">STT</th>
                <th className="py-3 px-6 font-bold">Tên</th>
                <th className="py-3 px-6 font-bold">Giới tính</th>
                <th className="py-3 px-6 font-bold">Số điện thoại</th>
                <th className="py-3 px-6 font-bold">Vị trí công việc</th>
                <th className="py-3 px-6 font-bold">Trạng thái</th>
                <th className="py-3 px-6 font-bold"></th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((employee, index) => (
                <tr
                  className="bg-white border-b border-[#d5d5d5] hover:bg-gray-50 transition"
                  key={employee._id}
                >
                  <td className="py-4 px-6 text-[#202224]">
                    {" "}
                    {startIndex + index + 1}
                  </td>
                  <td className="py-4 px-6 text-[#202224]">{employee.name}</td>
                  <td className="py-4 px-6 text-[#202224]">
                    <p>{employee.gender === "MALE" ? "Nam" : "Nữ"}</p>
                  </td>
                  <td className="py-4 px-6 text-[#202224]">{employee.phoneNumber}</td>
                  <td className="py-4 px-6 text-[#202224]">{employee.workPosition}</td>

                  <td className="py-4 px-6 text-sm">
                    {employee.employStatus === "ACTIVE" ? (
                      <span className="px-2 py-1 font-semibold rounded-lg bg-green-200 text-green-800">
                        Đang làm việc
                      </span>
                    ) : (
                      <span className="px-2 py-1 font-semibold rounded-lg bg-red-200 text-red-800">
                        Đã nghỉ việc
                      </span>
                    )}
                  </td>

                  <td className="py-4 px-6 text-sm flex items-center gap-1.5 lg:gap-3">
                    <Link to={`/admin/employees/${employee._id}/update`}>
                      <div className="bg-blue-200 text-blue-800 px-3 py-1 rounded-lg text-xs lg:text-base font-semibold hover:bg-blue-300 transition">
                        <FaPenToSquare size={18} />
                      </div>
                    </Link>
                    <div
                      className="bg-red-200 text-red-800 px-3 py-1 rounded-lg cursor-pointer text-xs lg:text-base font-semibold hover:bg-red-300 transition"
                      onClick={() => handleDelete(employee._id)}
                    >
                      <FaRegTrashCan size={18} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Phân trang */}
          {pageCount > 1 && (
            <Pagination pageCount={pageCount} onPageChange={handlePageChange} />
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;

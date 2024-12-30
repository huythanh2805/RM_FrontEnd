import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaPenToSquare, FaRegTrashCan } from "react-icons/fa6";
import Pagination from "@/components/Pagination";
import { Link } from "react-router-dom";

const WorkScheduleList = () => {
  const [workSchedules, setWorkSchedules] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 10;

  const mapShift = (value) => {
    switch (value) {
      case 1:
        return "Ca sáng";
      case 2:
        return "Ca chiều";
      case 3:
        return "Ca tối";
      default:
        return "Không xác định";
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/workSchedules`
      );
      setWorkSchedules(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Xử lý tìm kiếm
  const handleSearchValue = (e) => {
    setSearchValue(e.target.value);
    setCurrentPage(1);
  };

  // Lọc danh sách theo từ khóa tìm kiếm
  const filteredSchedules = workSchedules.filter((schedule) => {
    return schedule.employee_id?.name
      ?.toLowerCase()
      .includes(searchValue.toLowerCase());
  });

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
          .delete(`${import.meta.env.VITE_API_BASE_URL}/workSchedules/${id}`)
          .then(() => {
            Swal.fire("Đã xóa!", "Ca làm đã được xóa thành công.", "success");
            fetchData();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  // Phân trang
  const startIndex = (currentPage - 1) * itemPerPage;
  const currentItems = filteredSchedules.slice(
    startIndex,
    startIndex + itemPerPage
  );
  const pageCount = Math.ceil(filteredSchedules.length / itemPerPage);

  const handlePageClick = (e) => {
    setCurrentPage(e.selected + 1);
  };

  return (
    <div className="w-full min-h-screen bg-[#f9fafb] px-5 py-5">
      <div className="flex items-center justify-between mb-5">
        <p className="text-3xl font-semibold text-gray-800">
          Danh sách lịch làm việc
        </p>
        <input
          type="text"
          placeholder="Tìm kiếm nhân viên..."
          className="bg-white border border-gray-300 text-gray-900 text-sl rounded-lg w-full max-w-sm p-2.5"
          onChange={handleSearchValue}
        />
      </div>

      <div className="overflow-x-auto rounded-xl border border-[#d5d5d5]">
        <table className="min-w-full bg-white">
          <thead className="border-b border-[#d5d5d5] text-left text-sl font-semibold text-[#202224] uppercase tracking-wider">
            <tr>
              <th className="py-3 px-6 font-bold">STT</th>
              <th className="py-3 px-6 font-bold">Tên nhân viên</th>
              <th className="py-3 px-6 font-bold">Vị trí công việc</th>
              <th className="py-3 px-6 font-bold">Tháng</th>
              <th className="py-3 px-6 font-bold">Tuần 1</th>
              <th className="py-3 px-6 font-bold">Tuần 2</th>
              <th className="py-3 px-6 font-bold">Tuần 3</th>
              <th className="py-3 px-6 font-bold">Tuần 4</th>
              <th className="py-3 px-6 font-bold">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((schedule, index) => (
                <tr
                  key={schedule._id}
                  className="bg-white border-b border-[#d5d5d5] hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-6">{startIndex + index + 1}</td>
                  <td className="py-3 px-6">
                    {schedule.employee_id?.name || "Không xác định"}
                  </td>
                  <td className="py-3 px-6">
                    {schedule.employee_id?.workPosition || "Không xác định"}
                  </td>
                  <td className="py-3 px-6">
                    {schedule.month.split("-").reverse().join("/")}
                  </td>

                  <td className="py-3 px-6">{mapShift(schedule.week_1)}</td>
                  <td className="py-3 px-6">{mapShift(schedule.week_2)}</td>
                  <td className="py-3 px-6">{mapShift(schedule.week_3)}</td>
                  <td className="py-3 px-6">{mapShift(schedule.week_4)}</td>
                  <td className="py-3 px-6">
                    <div className="flex items-center gap-3">
                      <Link to={`/admin/workSchedule/${schedule._id}/update`}>
                        <div className="bg-blue-200 text-blue-800 px-3 py-1 rounded-lg text-xs lg:text-base font-semibold hover:bg-blue-300 transition">
                          <FaPenToSquare />
                        </div>
                      </Link>
                      <div
                        className="bg-red-200 text-red-800 px-3 py-1 rounded-lg cursor-pointer text-xs lg:text-base font-semibold hover:bg-red-300 transition"
                        onClick={() => handleDelete(schedule._id)}
                      >
                        <FaRegTrashCan />
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-500">
                  Không tìm thấy lịch làm việc.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Phân trang */}
        {pageCount > 1 && (
          <Pagination pageCount={pageCount} onPageChange={handlePageClick} />
        )}
      </div>
    </div>
  );
};

export default WorkScheduleList;

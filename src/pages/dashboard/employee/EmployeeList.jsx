import Pagination from "@/components/Pagination";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaPenToSquare } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Switch } from "@/components/ui/switch";
import { TableCell } from "@/components/ui/table";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 10;
  const [searchValue, setSearchValue] = useState("");
  const [filterStatus, setFilterStatus] = useState("Tất cả");

  const fetchData = () => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/employees`)
      .then((res) => {
        setEmployees(res.data.filter((item) => item.isDelete == false));
        console.log(res.data);
        
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearchValue = (e) => {
    setSearchValue(e.target.value);
    setCurrentPage(1);
  };

  // Xử lí lọc
  const filterEmployees = employees.filter((employee) => {
    const matchesSearchValue = employee.name
      .toLowerCase()
      .includes(searchValue.toLowerCase());

    const matchesStatus =
      filterStatus === "Tất cả" || employee.employStatus === filterStatus;

    return matchesSearchValue && matchesStatus;
  });

  const startIndex = (currentPage - 1) * itemPerPage;
  const currentItems = filterEmployees
    .reverse()
    .slice(startIndex, startIndex + itemPerPage);
  const pageCount = Math.ceil(filterEmployees.reverse().length / itemPerPage);

  const handlePageChange = (e) => {
    setCurrentPage(e.selected + 1);
  };

  // const handleDelete = (id) => {
  //   Swal.fire({
  //     title: "Xác nhận xóa?",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Xác nhận",
  //     cancelButtonText: "Hủy",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       axios
  //         .put(`${import.meta.env.VITE_API_BASE_URL}/employees/${id}`, {
  //           isDelete: true,
  //         })
  //         .then(() => {
  //           Swal.fire({
  //             title: "Đã xóa!",
  //             text: "Nhân viên đã được xóa thành công!",
  //             icon: "success",
  //           });
  //           fetchData();
  //         })
  //         .catch((err) => {
  //           console.error(err);
  //           Swal.fire({
  //             title: "Lỗi!",
  //             text: "Không thể xóa nhân viên!",
  //             icon: "error",
  //           });
  //         });
  //     }
  //   });
  // };
  const toggleEmployeeStatus = (id, currentStatus) => {
    const newStatus = currentStatus === "ACTIVE" ? "LEAVED" : "ACTIVE";
  
    Swal.fire({
      title: "Xác nhận thay đổi trạng thái?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(`${import.meta.env.VITE_API_BASE_URL}/employees/${id}`, {
            employStatus: newStatus,
          })
          .then((response) => {
            axios
              .put(`${import.meta.env.VITE_API_BASE_URL}/workSchedules`, {
                employee_id: id,
                isShow: newStatus === "LEAVED" ? true : false,
              })
              .then(() => {
                Swal.fire({
                  title: "Thành công!",
                  text: "Trạng thái đã được thay đổi và lịch làm việc đã được cập nhật.",
                  icon: "success",
                });
                fetchData(); 
              })
              .catch((err) => {
                console.log(err);
                Swal.fire({
                  title: "Lỗi!",
                  text: "Cập nhật lịch làm việc thất bại.",
                  icon: "error",
                });
              });
          })
          .catch((err) => {
            console.error(err);
            Swal.fire({
              title: "Lỗi!",
              text: "Không thể thay đổi trạng thái nhân viên!",
              icon: "error",
            });
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

        {/* Bộ lọc */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex gap-5 items-center">
            <select
              className="bg-white border border-gray-300 text-gray-900 text-sl rounded-lg w-full p-2.5"
              value={filterStatus}
              onChange={(e) => {
                setFilterStatus(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="Tất cả">Tất cả</option>
              <option value="ACTIVE">Đang làm việc</option>
              <option value="LEAVED">Đã nghỉ việc</option>
            </select>
          </div>

          {/* Search */}
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
                <th className="py-3 px-6 font-bold">STT</th>
                <th className="py-3 px-6 font-bold">Mã nhân viên</th>
                <th className="py-3 px-6 font-bold">Tên nhân viên</th>
                <th className="py-3 px-6 font-bold">Giới tính</th>
                <th className="py-3 px-6 font-bold">Số điện thoại</th>
                <th className="py-3 px-6 font-bold">Vị trí công việc</th>
                <th className="py-3 px-6 font-bold">Trạng thái</th>
                <th className="py-3 px-6 font-bold">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((employee, index) => (
                <tr
                  className="bg-white border-b border-[#d5d5d5] hover:bg-gray-50 transition"
                  key={employee._id}
                >
                  <td className="py-4 px-6 text-[#202224]">
                    {startIndex + index + 1}
                  </td>
                  <td className="py-4 px-6 text-[#202224]">{employee._id}</td>
                  <td className="py-4 px-6 text-[#202224]">{employee.name}</td>
                  <td className="py-4 px-6 text-[#202224]">
                    <p>{employee.gender === "MALE" ? "Nam" : "Nữ"}</p>
                  </td>
                  <td className="py-4 px-6 text-[#202224]">
                    {employee.phoneNumber}
                  </td>
                  <td className="py-4 px-6 text-[#202224]">
                    {employee.workPosition}
                  </td>

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
                    {/* <div
                      className="bg-red-200 text-red-800 px-3 py-1 rounded-lg cursor-pointer text-xs lg:text-base font-semibold hover:bg-red-300 transition"
                      onClick={() => handleDelete(employee._id)}
                    >
                      <FaRegTrashCan size={18} />
                    </div> */}
                    <TableCell className="text-center text-xl">
                      <Switch
                        className={`${
                          employee.employStatus === "ACTIVE"
                            ? "bg-green-200"
                            : "bg-red-200"
                        } transition`}
                        checked={employee.employStatus === "ACTIVE"}
                        onCheckedChange={() =>
                          toggleEmployeeStatus(
                            employee._id,
                            employee.employStatus
                          )
                        }
                      />
                    </TableCell>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          currentPage={currentPage}
          pageCount={pageCount}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default EmployeeList;

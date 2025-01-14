import Pagination from "@/components/Pagination";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaPenToSquare, FaRegTrashCan } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 10;

  const fetchData = () => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/categories`)
      .then((res) => {
        setCategories(res.data.filter((item) => item.isDelete == false));
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

  const filterCategories = categories.filter((item) =>
    item.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  // phân trang
  const startIndex = (currentPage - 1) * itemPerPage;
  const currentItems = filterCategories
    .reverse()
    .slice(startIndex, startIndex + itemPerPage);
  const pageCount = Math.ceil(filterCategories.reverse().length / itemPerPage);

  const handlePageClick = (e) => {
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
          .put(`${import.meta.env.VITE_API_BASE_URL}/categories/${id}`, {
            isDelete: true,
            isShow: false,
          })
          .then(() => {
            axios
              .put(`${import.meta.env.VITE_API_BASE_URL}/dishes`, {
                category_id: id, 
                isShow: false,
              })
              .then(() => {
                Swal.fire({
                  title: "Đã xóa!",
                  text: "Danh mục đã được xóa.",
                  icon: "success",
                });
                fetchData();
              })
              .catch((err) => {
                console.log(err);
                Swal.fire({
                  title: "Lỗi!",
                  text: "Cập nhật sản phẩm thất bại.",
                  icon: "error",
                });
              });
          })
          .catch((err) => {
            console.log(err);
            Swal.fire({
              title: "Lỗi!",
              text: "Xóa danh mục thất bại.",
              icon: "error",
            });
          });
      }
    });
  };

  return (
    <div className="w-full min-h-screen bg-[#f9fafb]">
      <div className="px-5 py-5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-3xl font-semibold text-gray-800">Danh mục</p>
          <Link to={"/admin/categories/add"}>
            <div className="bg-green-200 text-green-800 px-6 py-2 rounded-md text-sl font-semibold hover:bg-green-300 transition">
              Thêm +
            </div>
          </Link>
        </div>

        {/* Input search */}
        <div className="mb-4">
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
                <th className="py-3 px-6 text-left text-sl font-semibold text-gray-700">
                  STT
                </th>
                <th className="py-3 px-6 text-left text-sl font-semibold text-gray-700">
                  Tên
                </th>
                <th className="py-3 px-6 text-left text-sl font-semibold text-gray-700">
                  Mô tả
                </th>
                <th className="py-3 px-6 text-left text-sl font-semibold text-gray-700">
                  Trạng thái
                </th>
                <th className="py-3 px-6 text-left text-sl font-semibold text-gray-700">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((d, index) => (
                  <tr
                    key={d._id}
                    className="bg-white border-b border-[#d5d5d5] hover:bg-gray-50 transition"
                  >
                    <td className="py-3 px-6 text-sl font-medium text-gray-800">
                      {startIndex + index + 1}
                    </td>
                    <td className="py-3 px-6 text-sl text-gray-800 break-words">
                      {d.name}
                    </td>
                    <td className="py-3 px-6 text-sl text-gray-800 break-words">
                      {d.desc}
                    </td>
                    <td className="py-3 px-6 text-sl text-gray-800 break-words">
                      {d.isShow ? (
                        <span className="px-2 py-1 text-sl font-semibold rounded-lg bg-green-100 text-green-800">
                          Hiển thị
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-sl font-semibold rounded-lg bg-gray-100 text-gray-700">
                          Tạm ẩn
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-sl flex items-center gap-3">
                      <Link to={`/admin/categories/${d._id}/update`}>
                        <div className="bg-blue-200 text-blue-800 px-3 py-1 rounded-lg text-sl font-semibold hover:bg-blue-300 transition">
                          <FaPenToSquare size={18} />
                        </div>
                      </Link>
                      <div
                        className="bg-red-200 text-red-800 px-3 py-1 rounded-lg cursor-pointer text-sl font-semibold hover:bg-red-300 transition"
                        onClick={() => handleDelete(d._id)}
                      >
                        <FaRegTrashCan size={18} />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-gray-500">
                    Không tìm thấy danh mục..
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
    </div>
  );
};

export default CategoryList;

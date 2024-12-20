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
import Navbar from "@/components/Admin/Navbar";

const SetComboList = () => {
  const [combos, setCombos] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 10;

  const fetchData = () => {
    axios
      .get(BASE_URL + "/setCombos")
      .then((res) => {
        setCombos(res.data);
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

  const handleSearchValue = (e) => {
    setSearchValue(e.target.value);
    // console.log(e.target.value);
    setCurrentPage(1);
  };

  // Xử lí lọc
  const filterSetCombos = combos.filter((setCombo) => {
    const matchesPrice =
      setCombo.price >= priceRange.min && setCombo.price <= priceRange.max;

    const matchesSearchValue = setCombo.name
      .toLowerCase()
      .includes(searchValue.toLowerCase());

    return matchesSearchValue && matchesPrice;
  });

  // Phân trang
  const startIndex = (currentPage - 1) * itemPerPage;
  const currentItems = filterSetCombos
    .reverse()
    .slice(startIndex, startIndex + itemPerPage);
  const pageCount = Math.ceil(filterSetCombos.reverse().length / itemPerPage);

  const handlePageClick = (e) => {
    setCurrentPage(e.selected + 1);
  };
  return (
    <div className="w-full min-h-screen bg-[#f9fafb]">
      <Navbar />

      <div className="px-5 py-5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[32px] font-semibold">Danh sách combo</p>
          <Link to={"/admin/setCombos/add"}>
            <div className="bg-green-200 text-green-800 px-6 py-2 rounded-md text-sl font-semibold hover:bg-green-300 transition">
              Thêm +
            </div>
          </Link>
        </div>

        {/* Bộ lọc */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex gap-5 items-center">
            {/* Lọc theo giá */}
            <div className="flex justify-between">
              <div className="max-w-sm">
                <select
                  className="bg-white border border-gray-300 text-gray-900 text-sl rounded-lg w-full p-2.5"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "all") {
                      setPriceRange({ min: 0, max: Infinity });
                    } else if (value === "range_1") {
                      setPriceRange({ min: 0, max: 100000 });
                    } else if (value === "range_2") {
                      setPriceRange({ min: 100000, max: 200000 });
                    } else if (value === "range_end") {
                      setPriceRange({ min: 200000, max: Infinity });
                    }
                    setCurrentPage(1);
                  }}
                >
                  <option value="all">Khoảng giá</option>
                  <option value="range_1">
                    {"< " + formatCurrency(100000)}
                  </option>
                  <option value="range_2">
                    {formatCurrency(100000) + " - " + formatCurrency(200000)}
                  </option>
                  <option value="range_end">
                    {"> " + formatCurrency(200000)}
                  </option>
                </select>
              </div>
            </div>
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
                <th className="py-3 px-6 text-left text-sl font-semibold text-gray-700">
                  STT
                </th>
                <th className="py-3 px-6 text-left text-sl font-semibold text-gray-700">
                  Tên combo
                </th>
                <th className="py-3 px-6 text-left text-sl font-semibold text-gray-700">
                  Hình ảnh
                </th>
                <th className="py-3 px-6 text-left text-sl font-semibold text-gray-700">
                  Giá
                </th>
                {/* <th className="py-3 px-6 text-left text-sl font-semibold text-gray-700">
                  Mô tả
                </th> */}
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
                    className="bg-white border-b border-[#d5d5d5] hover:bg-gray-50 transition"
                    key={d._id}
                  >
                    <td className="py-3 px-6 text-sl font-medium text-gray-800">
                      {startIndex + index + 1}
                    </td>
                    <td className="py-3 px-6 text-sl text-gray-800 break-words">
                      <Link
                        to={`/admin/setCombos/${d._id}/detail`}
                        className="hover:underline"
                      >
                        <span>{d.name}</span>
                      </Link>
                    </td>
                    <td className="py-3 px-6 text-sl text-gray-800 break-words">
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
                      </div>
                    </td>
                    <td className="py-3 px-6 text-sl text-gray-800 break-words">
                      {formatCurrency(d.price)}
                    </td>
                    {/* <td className="py-3 px-6 text-sl text-gray-800 break-words">
                      {d.desc}
                    </td> */}
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
                    <td className="py-3 px-6 text-sl text-gray-800 break-words">
                      <div className="flex items-center gap-2 lg:gap-3">
                        <Link to={`/admin/setCombos/${d._id}/detail`}>
                          <div className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded-lg text-sl font-semibold hover:bg-yellow-300 transition">
                            <FaEye size={18} />
                          </div>
                        </Link>
                        <Link to={`/admin/setCombos/${d._id}/update`}>
                          <div className="bg-blue-200 text-blue-800 px-2 py-1 rounded-lg text-sl font-semibold hover:bg-blue-300 transition">
                            <FaPenToSquare size={18} />
                          </div>
                        </Link>
                        <div
                          className="bg-red-200 text-red-800 px-2 py-1 rounded-lg cursor-pointer text-sl lg:text-sl font-semibold hover:bg-red-300 transition"
                          onClick={() => handleDelete(d._id)}
                        >
                          <FaRegTrashCan size={18} />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-gray-500">
                    Không tìm thấy combo..
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

export default SetComboList;

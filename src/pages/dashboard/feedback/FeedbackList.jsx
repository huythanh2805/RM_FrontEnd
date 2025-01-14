import Pagination from "@/components/Pagination";
import BASE_URL from "@/configs";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import ReactStars from "react-rating-stars-component";
import Swal from "sweetalert2";

const FeedbackList = () => {
  const [dataFeedback, setDataFeedback] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [dateValue, setDateValue] = useState("");
  const [ratingValue, setRatingValue] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 10;

  const fetchData = () => {
    axios
      .get(BASE_URL + "/feedbacks")
      .then((res) => {
        setDataFeedback(res.data.feedbacks);
        console.log("hí", res.data.feedbacks);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearchValue = (e) => {
    setSearchValue(e.target.value);
    setCurrentPage(1);
  };

  const handleDateValue = (e) => {
    setDateValue(e.target.value);
    setCurrentPage(1);
  };

  const handleRatingValue = (e) => {
    setRatingValue(e.target.value);
    setCurrentPage(1);
  };

  // Filter
  const filterFeedbacks = dataFeedback.filter((item) => {
    const matchesRatingValue = ratingValue
      ? item.rating === parseInt(ratingValue)
      : true;

    const matchesSearchValue = searchValue
      ? (item.setcombo_id?.name || "")
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      : true;

    const matchesDateValue = dateValue
      ? new Date(item.createdAt).toLocaleDateString("vi-VN") ===
        new Date(dateValue).toLocaleDateString("vi-VN")
      : true;

    return matchesRatingValue && matchesSearchValue && matchesDateValue;
  });

  // phân trang
  const startIndex = (currentPage - 1) * itemPerPage;
  const currentItems = filterFeedbacks
    .reverse()
    .slice(startIndex, startIndex + itemPerPage);
  const pageCount = Math.ceil(filterFeedbacks.reverse().length / itemPerPage);

  const handlePageClick = (e) => {
    setCurrentPage(e.selected + 1);
  };

  // Xử lí ẩn, hiện feedback
  const handleChangeStatus = (id, status) => {
    Swal.fire({
      title: status ? "Xác nhận ẩn đánh giá?" : "Xác nhận hiển thị đánh giá?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(`${BASE_URL}/feedbacks/${id}`, { isShow: !status })
          .then(() => {
            const action = status ? "ẩn" : "hiển thị";
            Swal.fire(
              `Đã ${action}!`,
              `Đánh giá đã được ${action}.`,
              "success"
            );
            fetchData();
          })
          .catch((err) => {
            console.error("Lỗi khi cập nhật trạng thái:", err);
            Swal.fire(
              "Lỗi!",
              "Có lỗi xảy ra khi cập nhật trạng thái. Vui lòng thử lại.",
              "error"
            );
          });
      }
    });
  };

  return (
    <div className="w-full min-h-screen bg-[#f9fafb]">
      <div className="px-5 py-5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-3xl font-semibold text-gray-800">
            Danh sách đánh giá
          </p>
        </div>

        <div className="flex items-center gap-10 mb-4">
          <div className="w-full flex items-center gap-4">
            <div className="max-w-sm">
              <select
                className="bg-white border border-gray-300 text-gray-900 text-sl rounded-lg w-full p-3"
                onChange={handleRatingValue}
              >
                <option value="">Số sao</option>
                <option value="1">⭐</option>
                <option value="2">⭐⭐</option>
                <option value="3">⭐⭐⭐</option>
                <option value="4">⭐⭐⭐⭐</option>
                <option value="5">⭐⭐⭐⭐⭐</option>
              </select>
            </div>

            <div className="max-w-sm">
              <input
                onChange={handleDateValue}
                type="date"
                class="p-2.5 w-64 rounded-lg border border-gray-300
           focus:outline-none focus:ring-2 focus:ring-blue-400 
           focus:border-blue-400 transition-all"
              />
            </div>
          </div>

          <div className="relative w-full max-w-sm min-w-[200px]">
            <label htmlFor="Search" className="sr-only">
              Search
            </label>

            <input
              type="text"
              id="Search"
              placeholder="Tìm kiếm món ăn..."
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
                <th className="py-3 pl-4 pr-3 text-left text-sl font-semibold text-gray-700">
                  STT
                </th>
                <th className="py-3 px-3 text-left text-sl font-semibold text-gray-700 w-[180px]">
                  Tên khách hàng
                </th>
                <th className="py-3 px-3 text-left text-sl font-semibold text-gray-700 w-[220px]">
                  Tên món ăn
                </th>
                <th className="py-3 px-3 text-left text-sl font-semibold text-gray-700">
                  Số sao
                </th>
                <th className="py-3 px-3 text-left text-sl font-semibold text-gray-700">
                  Ngày
                </th>
                <th className="py-3 px-3 text-left text-sl font-semibold text-gray-700 w-[290px]">
                  Đánh giá
                </th>
                <th className="py-3 px-3 text-left text-sl font-semibold text-gray-700">
                  Trạng thái
                </th>
                <th className="py-3 pl-3 pr-4 text-center text-sl font-semibold text-gray-700">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((feedback, index) => (
                  <tr
                    key={feedback._id}
                    className="bg-white border-b border-[#d5d5d5] hover:bg-gray-50 transition"
                  >
                    <td className="py-3 pl-4 pr-3 text-sl font-medium text-gray-800">
                      {startIndex + index + 1}
                    </td>
                    <td className="py-3 px-3 text-sl break-words">
                      {feedback.user_id.userName
                        ? feedback.user_id.userName
                        : feedback.user_id.email}
                    </td>
                    <td className="py-3 px-3 text-sl break-words">
                      {feedback?.dish_id?.name || feedback?.setcombo_id?.name}
                    </td>
                    <td className="py-3 px-3 text-sl w-[120px]">
                      <ReactStars
                        count={5}
                        size={20}
                        value={feedback.rating}
                        edit={false}
                        activeColor="#ffd700"
                      />
                    </td>
                    <td className="py-3 px-3 text-sl">
                      {new Date(feedback.createdAt).toLocaleDateString("vi-VN")}
                    </td>
                    <td className="py-3 px-4 text-sl text-justify break-words">
                      {feedback.comment}
                    </td>
                    <td className="py-3 px-2 text-sl">
                      {feedback.isShow ? (
                        <span className="px-2 py-1 text-sl font-semibold rounded-lg bg-green-100 text-green-800">
                          Hiển thị
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-sl font-semibold rounded-lg bg-gray-100 text-gray-700">
                          Tạm ẩn
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-1 text-sl cursor-pointer">
                      <div className="flex items-center justify-center gap-3">
                        {feedback.isShow ? (
                          <div
                            className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded-lg text-sl font-semibold hover:bg-yellow-300 transition"
                            onClick={() =>
                              handleChangeStatus(feedback._id, feedback.isShow)
                            }
                          >
                            <FaEye size={18} />
                          </div>
                        ) : (
                          <div
                            className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded-lg text-sl font-semibold hover:bg-yellow-300 transition"
                            onClick={() =>
                              handleChangeStatus(feedback._id, feedback.isShow)
                            }
                          >
                            <FaEyeSlash size={18} />
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-4 text-gray-500">
                    Không tìm thấy đánh giá...
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

export default FeedbackList;

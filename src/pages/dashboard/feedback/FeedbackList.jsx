import Navbar from "@/components/Admin/Navbar";
import Pagination from "@/components/Pagination";
import BASE_URL from "@/configs";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import ReactStars from "react-rating-stars-component";
import Swal from "sweetalert2";

const FeedbackList = () => {
  const [dataFeedback, setDataFeedback] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 10;

  const fetchData = () => {
    axios
      .get(BASE_URL + "/feedbacks")
      .then((res) => {
        setDataFeedback(res.data.feedbacks);
        console.log(res.data.feedbacks);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  // phân trang
  const startIndex = (currentPage - 1) * itemPerPage;
  const currentItems = dataFeedback
    .reverse()
    .slice(startIndex, startIndex + itemPerPage);
  const pageCount = Math.ceil(dataFeedback.reverse().length / itemPerPage);

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
      <Navbar />

      <div className="px-5 py-5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-3xl font-semibold text-gray-800">
            Danh sách đánh giá
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-[#d5d5d5]">
          <table className="min-w-full bg-white">
            <thead className="border-b border-[#d5d5d5] text-left text-sl font-semibold text-[#202224] uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4 text-left text-sl font-semibold text-gray-700">
                  STT
                </th>
                <th className="py-3 px-4 text-left text-sl font-semibold text-gray-700">
                  Tên khách hàng
                </th>
                <th className="py-3 px-4 text-left text-sl font-semibold text-gray-700">
                  Tên món ăn
                </th>
                <th className="py-3 px-4 text-left text-sl font-semibold text-gray-700">
                  Số sao
                </th>
                <th className="py-3 px-4 text-left text-sl font-semibold text-gray-700">
                  Ngày
                </th>
                <th className="py-3 px-4 text-left text-sl font-semibold text-gray-700">
                  Đánh giá
                </th>
                <th className="py-3 px-4 text-left text-sl font-semibold text-gray-700">
                  Trạng thái
                </th>
                <th className="py-3 px-4 text-center text-sl font-semibold text-gray-700">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((feedback, index) => (
                <tr
                  key={feedback._id}
                  className="bg-white border-b border-[#d5d5d5] hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-6 text-sl font-medium text-gray-800">
                    {startIndex + index + 1}
                  </td>
                  <td className="py-3 px-4 text-sl">
                    {feedback.user_id.userName
                      ? feedback.user_id.userName
                      : feedback.user_id.email}
                  </td>
                  <td className="py-3 px-4 text-sl">
                    {feedback?.dish_id?.name || feedback?.setcombo_id?.name}
                  </td>
                  <td className="py-3 px-4 text-sl">
                    <ReactStars
                      count={5}
                      size={20}
                      value={feedback.rating}
                      edit={false}
                      activeColor="#ffd700"
                    />
                  </td>
                  <td className="py-3 px-4 text-sl text-justify">
                    {new Date(feedback.createdAt).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="py-3 px-4 text-sl w-1/4 text-justify">
                    {feedback.comment}
                  </td>
                  <td className="py-3 px-4 text-sl">
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
                  <td className="py-3 px-4 text-sl cursor-pointer">
                    <div className="flex items-center justify-center gap-3">
                      <div
                        className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded-lg text-sl font-semibold hover:bg-yellow-300 transition"
                        onClick={() =>
                          handleChangeStatus(feedback._id, feedback.isShow)
                        }
                      >
                        <FaEye size={18} />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Phân trang */}
          <Pagination pageCount={pageCount} onPageChange={handlePageClick} />
        </div>
      </div>
    </div>
  );
};

export default FeedbackList;

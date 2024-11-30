import Pagination from "@/components/Pagination";
import BASE_URL from "@/configs";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import ReactStars from "react-rating-stars-component";

const FeedbackList = () => {
  const [dataFeedback, setDataFeedback] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 5;

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
  const currentItems = dataFeedback.slice(startIndex, startIndex + itemPerPage);
  const pageCount = Math.ceil(dataFeedback.length / itemPerPage);

  const handlePageClick = (e) => {
    setCurrentPage(e.selected + 1);
  };

  return (
    <div className="w-full min-h-screen bg-[#f5f6fa]">
      <div className="px-5 py-2">
        <div className="flex items-center justify-between mb-4">
          <p className="text-3xl font-semibold">Danh sách đánh giá</p>
        </div>

        <div className="overflow-x-auto rounded-lg border border-[#d5d5d5] bg-white shadow-sm">
          <table className="min-w-full bg-white">
            <thead className="border-b border-[#d5d5d5] text-left text-sl font-semibold text-[#202224] uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">STT</th>
                <th className="py-3 px-4">Tên khách hàng</th>
                <th className="py-3 px-4">Tên món ăn</th>
                <th className="py-3 px-4">Số sao</th>
                <th className="py-3 px-4">Đánh giá</th>
                <th className="py-3 px-4">Trạng thái</th>
                <th className="py-3 px-4 text-center">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((feedback, index) => (
                <tr
                  key={feedback._id}
                  className="bg-white border-b hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-4 text-sl font-medium">
                    {startIndex + index + 1}
                  </td>
                  <td className="py-3 px-4 text-sl font-medium">
                    {feedback.user_id.userName
                      ? feedback.user_id.userName
                      : feedback.user_id.email}
                  </td>
                  <td className="py-3 px-4 text-sl">{feedback.dish_id.name}</td>
                  <td className="py-3 px-4 text-sl">
                    <ReactStars
                      count={5}
                      size={20}
                      value={feedback.rating}
                      edit={false}
                      activeColor="#ffd700"
                    />
                  </td>
                  <td className="py-3 px-4 text-sl w-1/3 text-justify">
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
                    <div className="flex items-center justify-center gap-2 lg:gap-3">
                      <div className="hidden lg:block bg-yellow-200 text-yellow-800 px-2 py-1 rounded-lg text-sl lg:text-sl font-semibold hover:bg-yellow-300 transition">
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

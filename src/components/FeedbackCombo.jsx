import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import jwtDecode from "jwt-decode";
import ReactStars from "react-rating-stars-component";
import axios from "axios";
import BASE_URL from "@/configs";
import { toast } from "@/hooks/use-toast";
import { HiOutlineUserCircle } from "react-icons/hi2";
import Pagination from "./Pagination";

const FeedbackCombo = () => {
  const { id } = useParams();

  // Lấy id từ token
  const dataUser = localStorage.getItem("token")
    ? jwtDecode(localStorage.getItem("token"))
    : null;

  const userId = dataUser ? dataUser.id : null;

  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [dataComment, setDataComment] = useState([]);
  const [inforUser, setInforUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 5;

  const fetchData = () => {
    axios
      .get(BASE_URL + "/feedbacks/combo/" + id)
      .then((res) => {
        setDataComment(res.data.feedbacks.filter((item) => item.isShow));
      })
      .catch((err) => {
        console.log(err);
        setDataComment([]);
      });
  };

  useEffect(() => {
    if (userId) {
      const fetchInforUser = () => {
        axios
          .get(BASE_URL + "/users/get/v2/" + userId)
          .then((res) => {
            setInforUser(res.data.user);
          })
          .catch((err) => {
            console.log(err);
          });
      };

      fetchInforUser();
    }

    fetchData();
  }, [id, userId]);

  // phân trang
  const startIndex = (currentPage - 1) * itemPerPage;
  const currentItems = dataComment
    .reverse()
    .slice(startIndex, startIndex + itemPerPage);
  const pageCount = Math.ceil(dataComment.reverse().length / itemPerPage);

  const handlePageClick = (e) => {
    setCurrentPage(e.selected + 1);
  };

  const handleCommentInput = (e) => {
    const value = e.target.value;
    setComment(value);
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleSubmit = () => {
    const data = {
      setcombo_id: id,
      user_id: userId,
      comment,
      rating,
    };

    axios
      .post(BASE_URL + "/feedbacks", data)
      .then((res) => {
        toast({ variant: "success", title: "Đánh giá thành công !" });
        setComment("");
        setRating(5);
        fetchData();
      })
      .catch((err) => {
        toast({ variant: "destructive", title: "Đánh giá thất bại !" });
        console.log(err);
      });
  };

  return (
    <div className="py-2 relative">
      <div className="w-full max-w-7xl px-4 mx-auto">
        <div className="w-full flex-col justify-start items-start gap-7 inline-flex">
          <h2 className="w-full text-gray-900 text-4xl font-bold font-manrope leading-normal">
            Nhận xét
          </h2>

          {!userId ? (
            <p className="text-red-600">
              Bạn cần đăng nhập để đánh giá.{" "}
              <Link to="/login">
                <span className="cursor-pointer hover: underline ">
                  Đăng nhập ngay!
                </span>
              </Link>
            </p>
          ) : (
            <>
              <div className="w-full flex flex-col justify-start items-start gap-5">
                <div className="w-full rounded-3xl justify-start items-start gap-3.5 inline-flex">
                  {inforUser.image ? (
                    <img
                      src={inforUser?.image}
                      alt=""
                      className="w-10 h-10 object-cover rounded-full"
                    />
                  ) : (
                    <HiOutlineUserCircle size={40} />
                  )}
                  <textarea
                    name=""
                    rows="5"
                    className="w-full px-5 py-3 rounded-2xl border border-gray-300 shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] resize-none focus:outline-none placeholder-gray-400 text-gray-900 text-lg font-normal leading-7"
                    placeholder="Viết đánh giá của bạn về món ăn này..."
                    onChange={handleCommentInput}
                    value={comment}
                  ></textarea>
                </div>
                <div className="w-full flex justify-between">
                  <div className="flex gap-4 items-center text-lg">
                    <p className="font-semibold">Đánh giá món ăn: </p>
                    <ReactStars
                      count={5}
                      size={30}
                      activeColor="#ffd700"
                      value={rating}
                      onChange={handleRatingChange}
                    />
                  </div>
                  <button
                    className="px-5 py-2.5 bg-[#fb6340] hover:bg-[#e6532f] transition-all duration-700 ease-in-out rounded-xl shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] justify-center items-center flex"
                    onClick={handleSubmit}
                  >
                    <span className="px-2 py-px text-white text-base font-semibold leading-relaxed">
                      Gửi
                    </span>
                  </button>
                </div>
              </div>
            </>
          )}

          {/* List */}
          <div className="w-full flex-col justify-start items-start gap-8 flex mt-16">
            {currentItems && currentItems.length > 0 ? (
              currentItems.map((item) => (
                <div
                  className="w-full pb-6 border-b border-gray-300 justify-start items-start gap-2.5 inline-flex"
                  key={item._id}
                >
                  {item.user_id?.image ? (
                    <img
                      src={item.user_id.image}
                      alt=""
                      className="w-10 h-10 object-cover rounded-full"
                    />
                  ) : (
                    <HiOutlineUserCircle size={40} />
                  )}

                  <div className="w-full flex-col justify-start items-start gap-3.5 inline-flex">
                    <div className="w-full justify-start items-start flex-col flex gap-1">
                      <div className="w-full justify-between items-start gap-1 inline-flex">
                        <div>
                          <h5 className="text-gray-900 text-lg font-semibold leading-snug">
                            {item.user_id?._id === userId
                              ? "Bạn"
                              : item.user_id?.userName
                              ? item.user_id?.userName
                              : item.user_id?.email}
                          </h5>

                          <ReactStars
                            count={5}
                            size={20}
                            value={item.rating}
                            edit={false}
                            activeColor="#ffd700"
                          />
                        </div>
                        <span className="text-right text-gray-500 text-lg font-normal leading-5">
                          {new Date(item.createdAt).toLocaleDateString("vi-VN")}
                        </span>
                      </div>
                      <h5 className="text-gray-800 text-lg font-normal leading-snug">
                        {item.comment}
                      </h5>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>Sản phẩm này chưa có đánh giá</p>
            )}
          </div>

          {/* Phân trang */}
          <div className="flex justify-center items-center w-full">
            {pageCount > 0 && (
              <Pagination
                pageCount={pageCount}
                onPageChange={handlePageClick}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackCombo;

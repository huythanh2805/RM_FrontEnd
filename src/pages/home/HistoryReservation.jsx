import ButtonCustome from "@/components/ButtonCustome";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";

export const HistoryReservation = () => {
  // const { userId } = useParams();
  const [userId, setUserId] = useState(() => {
    const token = localStorage.getItem("token");
    return jwtDecode(token).id;
  });
  const queryClient = useQueryClient();
  const [opacity] = useState(1);
  const [translateY] = useState(0);
  const navigate = useNavigate();
  // Fetch danh sách đặt bàn
  const { data, error, isLoading } = useQuery(
    ["reservations", userId],
    async () => {
      const response = await axios.get(
        `http://localhost:1111/api/reservations/user/${userId}`
      );

      return response.data;
    }
  );

  useEffect(() => {
    const socket = io("http://localhost:1111"); // URL của server WebSocket

    // Lắng nghe sự kiện "reservation-canceled"
    socket.on("new-notification", (data) => {
      setReservations((prev) =>
        prev.map((res) =>
          res._id === data.reservationId ? { ...res, status: data.status } : res
        )
      );
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // Mutation để hủy đặt bàn
  const [isCanceling, setIsCanceling] = useState(false);

  const mutation = useMutation(
    async (reservationId) => {
      setIsCanceling(true);
      const response = await axios.put(
        `http://localhost:1111/api/reservations/cancel/${reservationId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    },
    {
      onSuccess: (data) => {
        alert(data.message);
        setIsCanceling(false);
        queryClient.invalidateQueries(["reservations", userId]); // Cập nhật dữ liệu từ server
      },
      onError: (error) => {
        setIsCanceling(false);
        alert(
          error.response?.data?.message || "Đã xảy ra lỗi khi hủy đơn hàng."
        );
      },
    }
  );

  const handleCancelReservation = (reservationId) => {
    if (isCanceling) {
      alert("Đang hủy đơn hàng, vui lòng đợi.");
      return;
    }

    if (window.confirm("Bạn có chắc chắn muốn hủy đơn hàng này không?")) {
      mutation.mutate(reservationId);
    }
  };
  const handleBack = (reservationId) => {
    const reservation = data?.reservations.find(
      (item) => item._id === reservationId
    );
    const dishs = reservation.ordered_dishes.map((item) => ({
      quantity: item.quantity,
      dish_id: item.dish_id._id,
      name: item.dish_id.name,
      price: item.dish_id.price,
      type: "dish",
      image: item.dish_id.images[0],
    }));
    const postData = {
      _id: reservation._id,
      startTime: reservation.startTime,
      dishs: dishs,
      user_id: reservation.user_id,
      guests_count: reservation.guests_count,
      phoneNumber: reservation.phoneNumber,
      userName: reservation.userName,
      couponValue: reservation.userDiscountId,
    };
    if (localStorage.getItem("postData")) {
      // Nếu có, xóa 'postData' cũ
      localStorage.removeItem("postData");
    }
    console.log(reservation._id);
    // Lưu 'postData' mới vào localStorage
    localStorage.setItem("postData", JSON.stringify(postData));
    navigate("/payment?type=UPDATE");
  };
  // Chuyển đổi trạng thái sang tiếng Việt
  const getStatusInVietnamese = (status) => {
    switch (status) {
      case "ISWAITING":
        return "Đang chờ";
      case "ISCOMFIRMED":
        return "Đã xác nhận";
      case "SEATED":
        return "Đang phục vụ";
      case "COMPLETED":
        return "Hoàn thành";
      case "CANCELED":
        return "Đã hủy";
      case "ISPAYMENT":
        return "Chờ thanh toán";
      default:
        return "Không xác định";
    }
  };

  return (
    <div>
      {/* Banner */}
      <div className="relative w-full h-[200px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/imgs/pagetitle-reservation.jpg')",
            backgroundAttachment: "fixed",
            filter: "brightness(0.7)",
          }}
        ></div>
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div
          className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white"
          style={{
            opacity: opacity,
            transform: `translateY(-${translateY}px)`,
            transition: "opacity 0.3s, transform 0.3s",
          }}
        >
          <h1 className="text-4xl md:text-5xl sm:text-3xl dancing">
            Lịch sử đặt bàn
          </h1>
        </div>
      </div>

      {/* Lịch sử đặt bàn */}
      <section className="py-24 relative">
        <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
          {!data?.reservations ? (
            <div className="text-center text-2xl text-gray-500 mt-4">
              Không có đơn đặt bàn nào
              <div className="mt-4">
                <Link to="/reservation">
                  <ButtonCustome buttonText="Đặt Bàn ngay" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {" "}
              {/* Chỉnh sửa để các đơn hàng hiển thị theo một dòng riêng biệt */}
              {data?.reservations?.map((reservation) => {
                const date = new Date(reservation.startTime);
                const formattedDate = date.toLocaleDateString("vi-VN");
                const formattedTime = date.toLocaleTimeString("vi-VN", {
                  hour: "2-digit",
                  minute: "2-digit",
                });

                let statusClass = "";
                switch (reservation.status) {
                  case "ISWAITING":
                    statusClass = "bg-amber-50 text-amber-600 border ";
                    break;
                  case "ISCOMFIRMED":
                    statusClass = "bg-blue-100 text-blue-600 border ";
                    break;
                  case "SEATED":
                    statusClass = "bg-purple-100 text-purple-600 border ";
                    break;
                  case "ISPAYMENT":
                    statusClass = "bg-amber-50 text-amber-600 border ";
                    break;
                  case "COMPLETED":
                    statusClass = "bg-green-100 text-green-600 border ";
                    break;
                  case "CANCELED":
                    statusClass = "bg-red-50 text-red-600 border";
                    break;
                  default:
                    statusClass = "bg-gray-50 text-gray-600 border ";
                }

                return (
                  <div
                    key={reservation._id}
                    className="flex flex-col md:flex-row items-start justify-between p-4 border border-gray-200 rounded-lg bg-white shadow-sm space-y-4 md:space-y-0 md:space-x-6"
                  >
                    <div className="flex-1">
                      <h4 className="text-gray-800 text-lg font-semibold">
                        <strong>Người đặt:</strong> {reservation.userName}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        <strong>Số điện thoại:</strong>{" "}
                        {reservation.phoneNumber}
                      </p>
                      <p className="text-gray-600 text-sm">
                        <strong>Ngày đặt:</strong> {formattedDate}
                      </p>
                      <p className="text-gray-600 text-sm">
                        <strong>Giờ đặt:</strong> {formattedTime}
                      </p>
                      <div>
                        <p className="text-gray-600 text-sm">
                          <strong>Số người:</strong> {reservation.guests_count}
                        </p>
                      </div>
                      <div className="mt-2">
                        <span
                          className={` ${statusClass} text-base font-medium py-2 px-1 rounded-md`}
                        >
                          {getStatusInVietnamese(reservation.status)}
                        </span>
                      </div>
                    </div>

                    {/* Button */}
                    <div className="flex flex-col  gap-2 w-full md:w-auto">
                      {(reservation.status === "ISWAITING" ||
                        reservation.status === "ISCOMFIRMED") &&
                        reservation.deposit === 0 && (
                          <button
                            onClick={() => handleBack(reservation._id)}
                            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 w-full "
                          >
                            Thanh toán
                          </button>
                        )}
                      {reservation.status === "ISWAITING" && (
                        <>
                          <Link to={`/history-details/${reservation?._id}`}>
                            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600  w-full ">
                              Xem Chi Tiết
                            </button>
                          </Link>
                          <button
                            onClick={() =>
                              handleCancelReservation(reservation._id)
                            }
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600  w-full"
                          >
                            Hủy
                          </button>
                        </>
                      )}

                      {reservation.status !== "ISWAITING" &&
                        reservation.status !== "ISPAYMENT" && (
                          <Link to={`/history-details/${reservation?._id}`}>
                            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 ease-in-out w-full">
                              Xem Chi Tiết
                            </button>
                          </Link>
                        )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

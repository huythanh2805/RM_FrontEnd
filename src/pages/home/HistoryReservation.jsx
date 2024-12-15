import ButtonCustome from "@/components/ButtonCustome";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

export const HistoryReservation = () => {
  const [userId, setUserId] = useState(() => {
    const token = localStorage.getItem("token");
    return jwtDecode(token).id;
  });
  const queryClient = useQueryClient();
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

    socket.on("new-notification", (data) => {
      queryClient.invalidateQueries(["reservations", userId]);
    });

    return () => {
      socket.disconnect();
    };
  }, [queryClient, userId]);

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

  const getStatusStyle = (status) => {
    switch (status) {
      case "ISWAITING":
        return "bg-yellow-100 text-yellow-800"; // Đang chờ
      case "ISCOMFIRMED":
        return "bg-blue-100 text-blue-800"; // Đã xác nhận
      case "SEATED":
        return "bg-purple-100 text-purple-800"; // Đã ngồi
      case "COMPLETED":
        return "bg-green-100 text-green-800"; // Hoàn thành
      case "CANCELED":
        return "bg-red-100 text-red-800"; // Đã hủy
      case "ISPAYMENT":
        return "bg-purple-200 text-purple-800"; // Chờ thanh toán
      default:
        return "bg-gray-100 text-gray-800"; // Không xác định
    }
  };

  const handleCancelReservation = (reservationId) => {
    if (isCanceling) {
      alert("Đang hủy đơn hàng, vui lòng đợi.");
      return;
    }

    if (window.confirm("Bạn có chắc chắn muốn hủy đơn hàng này không?")) {
      mutation.mutate(reservationId);
    }
  };

  const handleBack = (code) => {
    navigate(`/payment?code=${code}`);
  };

  // Chuyển đổi trạng thái sang tiếng Việt
  const getStatusInVietnamese = (status) => {
    switch (status) {
      case "ISWAITING":
        return "Đang chờ";
      case "ISCOMFIRMED":
        return "Đã xác nhận";
      case "SEATED":
        return "Đã ngồi";
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
      <div className="relative w-full h-[150px] sm:h-[100px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/imgs/pagetitle-reservation.jpg')",
            backgroundAttachment: "fixed",
            filter: "brightness(0.7)",
          }}
        ></div>
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
          <h1 className="text-3xl sm:text-2xl">Lịch sử đặt bàn</h1>
        </div>
      </div>

      {/* Lịch sử đặt bàn */}
      <section className="py-8 relative">
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
            <div className="space-y-4">
              {data?.reservations?.map((reservation) => {
                const date = new Date(reservation.startTime);
                const formattedDate = date.toLocaleDateString("vi-VN");
                const formattedTime = date.toLocaleTimeString("vi-VN", {
                  hour: "2-digit",
                  minute: "2-digit",
                });

                return (
                  <div
                    key={reservation._id}
                    className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-xl transition-all"
                  >
                    <div className="flex justify-between items-center">
                      <h4 className="text-xl font-semibold text-gray-800">
                        <strong>Người đặt:</strong> {reservation.userName}
                      </h4>
                      <div
                        className={`p-3 text-sm font-medium rounded-lg inline-flex items-center ${getStatusStyle(
                          reservation.status
                        )} shadow-md transition duration-300 ease-in-out hover:shadow-xl`}
                      >
                        {getStatusInVietnamese(reservation.status)}
                      </div>
                    </div>
                    <p className="mt-2 text-gray-600">
                      <strong>Số điện thoại:</strong> {reservation.phoneNumber}
                    </p>
                    <p className="mt-1 text-gray-600">
                      <strong>Ngày đặt:</strong> {formattedDate}
                    </p>
                    <p className="mt-1 text-gray-600">
                      <strong>Giờ đặt:</strong> {formattedTime}
                    </p>
                    <p className="mt-1 text-gray-600">
                      <strong>Số người:</strong> {reservation.guests_count}
                    </p>

                    <div className="mt-4 flex items-center justify-between">
                      <Link to={`/history-details/${reservation._id}`}>
                        <button className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out">
                          <i className="fas fa-info-circle"></i> Chi Tiết
                        </button>
                      </Link>
                      {reservation.status === "ISWAITING" && (
                        <button
                          onClick={() =>
                            handleCancelReservation(reservation._id)
                          }
                          className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300 ease-in-out"
                        >
                          <i className="fas fa-times"></i> Hủy
                        </button>
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

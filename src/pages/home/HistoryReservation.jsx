import ButtonCustome from "@/components/ButtonCustome";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export const HistoryReservation = () => {
  // const { userId } = useParams();
  const [userId, setUserId] = useState(()=>{
      const token = localStorage.getItem('token')
      return jwtDecode(token).id
    })
  const queryClient = useQueryClient();
  const [opacity] = useState(1);
  const [translateY] = useState(0);
  const navigate = useNavigate();
  // Fetch danh sách đặt bàn
  const { data, error, isLoading } = useQuery(["reservations", userId], async () => {
    const response = await axios.get(`http://localhost:1111/api/reservations/user/${userId}`);

    return response.data;
  });

  // Mutation để hủy đặt bàn
  const [isCanceling, setIsCanceling] = useState(false);

  const mutation = useMutation(
    async (reservationId) => {
      setIsCanceling(true); // Bắt đầu hủy
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
        setIsCanceling(false); // Kết thúc hủy
      },
      onError: (error) => {
        setIsCanceling(false); // Kết thúc hủy
        if (error.response && error.response.data) {
          alert(error.response.data.message || "Đã xảy ra lỗi khi hủy đơn hàng.");
        } else {
          alert("Đã xảy ra lỗi khi hủy đơn hàng.");
        }
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
          <h1 className="text-4xl md:text-5xl sm:text-3xl dancing">Lịch sử đặt bàn</h1>
          <p className="text-3xl md:text-[20px] sm:text-[15px] mt-4 flex items-center justify-center">
            <span className="bg-white p-1 rounded-full ml-0 mr-0 hidden lg:block"></span>
            <span className="bg-white h-[2px] w-[100px] hidden lg:block"></span>
            <span className="ml-4">Khám phá tất cả các lần đặt bàn trước đây của bạn</span>
            <span className="bg-white h-[2px] w-[100px] ml-4 hidden lg:block"></span>
            <span className="bg-white p-1 rounded-full ml-0 mr-0 hidden lg:block"></span>
          </p>
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
            <table className="min-w-full mt-6 bg-gray-50 border border-gray-200">
              <thead>
                <tr className="bg-gray-200 text-gray-500 text-base font-normal leading-relaxed">
                  <th className="py-4 px-6 text-left">Thông tin</th>
                  <th className="py-4 px-6 text-center">Ngày đặt</th>
                  <th className="py-4 px-6 text-center">Giờ đặt</th>
                  <th className="py-4 px-6 text-center">Số người</th>
                  <th className="py-4 px-6 text-center">Trạng thái</th>
                  <th className="py-4 px-6 text-center"></th>
                </tr>
              </thead>
              <tbody>
                {data?.reservations?.map((reservation) => {
                  const date = new Date(reservation.startTime);
                  const formattedDate = date.toLocaleDateString("vi-VN");
                  const formattedTime = date.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });

                  let statusClass = "";
                  switch (reservation.status) {
                    case "ISWAITING":
                      statusClass = "bg-amber-50 text-amber-600 border border-amber-400";
                      break;
                    case "ISCOMFIRMED":
                      statusClass = "bg-green-200 text-green-600 border border-green-400";
                      break;
                    case "SEATED":
                      statusClass = "bg-green-200 text-green-600 border border-green-400";
                      break;
                    case "ISPAYMENT":
                      statusClass = "bg-amber-50 text-amber-600 border border-amber-400";
                      break;
                    case "COMPLETED":
                      statusClass = "bg-green-200 text-green-600 border border-green-400";
                      break;
                    case "CANCELED":
                      statusClass = "bg-red-50 text-red-600 border border-red-400";
                      break;
                    default:
                      statusClass = "bg-gray-50 text-gray-600 border border-gray-400";
                  }

                  return (
                    <tr key={reservation._id} className="border-b border-gray-200">
                      <td className="py-4 px-6 flex flex-col items-start">
                        <h4 className="text-black text-lg font-medium leading-8">{reservation.userName}</h4>
                        <h4 className="text-black text-lg font-medium leading-8">{reservation.phoneNumber}</h4>
                      </td>
                      <td className="py-4 px-6 text-center text-black text-lg font-medium leading-relaxed">
                        {formattedDate}
                      </td>
                      <td className="py-4 px-6 text-center text-black text-lg font-medium leading-relaxed">
                        {formattedTime}
                      </td>
                      <td className="py-4 px-6 text-center text-black text-lg font-medium leading-relaxed">
                        {reservation.guests_count}
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span
                          className={`flex items-center justify-center ${statusClass} text-xs font-medium mr-2 px-1.5 rounded-full py-1`}
                        >
                          {getStatusInVietnamese(reservation.status)}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <div className="flex items-center justify-center space-x-4">
                          {/* Nếu trạng thái là ISWAITING, hiển thị nút Hủy và Xem Chi Tiết */}
                          {reservation.status === "ISWAITING" && (
                            <>
                              <button
                                onClick={() => handleCancelReservation(reservation._id)}
                                className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300 ease-in-out"
                              >
                                Hủy
                              </button>
                              <Link to={`/history-details/${reservation?._id}`}>
                                <button className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300 ease-in-out">
                                  Xem Chi Tiết
                                </button>
                              </Link>
                            </>
                          )}
                          {/* Nếu trạng thái là IS_PAYMENT, hiển thị nút Tiếp tục thanh toán */}
                          {(reservation.status === "ISWAITING" || reservation.status === "ISCOMFIRMED") && reservation.deposit == 0 && (
                            <button
                              onClick={() => handleBack(reservation.code)}
                              className="p-2 bg-green-500 text-white rounded hover:bg-yellow-600 transition duration-300 ease-in-out"
                            >
                              Thanh toán
                            </button>
                          )}
                          {/* Nếu trạng thái là các giá trị khác, chỉ hiển thị nút Xem Chi Tiết */}
                          {reservation.status !== "ISWAITING" && reservation.status !== "ISPAYMENT" && (
                            <Link to={`/history-details/${reservation?._id}`}>
                              <button className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300 ease-in-out">
                                Xem Chi Tiết
                              </button>
                            </Link>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </div>
  );
};

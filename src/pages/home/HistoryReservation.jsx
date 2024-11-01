import ButtonCustome from "@/components/ButtonCustome";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export const HistoryReservation = () => {
  const { userId } = useParams();
  const queryClient = useQueryClient();

  // danh sách đặt bàn
  const { data, error, isLoading } = useQuery(["reservations", userId], async () => {
    const response = await axios.get(`http://localhost:1111/api/reservations/user/${userId}`);
    return response.data.reservations || [];
  });

  // hủy đặt bàn
  const mutation = useMutation(
    async (reservationId) => {
      const response = await axios.put(`http://localhost:1111/api/reservations/cancel/${reservationId}`);
      return response.data; 
    },
    {
      onSuccess: (data, reservationId) => {
        queryClient.setQueryData(["reservations", userId], (old) =>
          old.filter((reservation) => reservation._id !== reservationId)
        );
        alert(data.message); 
      },
      onError: (error) => {
        console.error("Error canceling reservation:", error);
        alert("Đã xảy ra lỗi khi hủy đơn hàng.");
      },
    }
  );
  const handleCancelReservation = (reservationId) => {
    if (window.confirm("Bạn có chắc chắn muốn hủy đơn hàng này không?")) {
      mutation.mutate(reservationId); 
    }
  };
  const getStatusInVietnamese = (status) => {
    switch (status) {
      case "ISWAITING":
        return "Đang chờ";
      case "ISCONFIRMED":
        return "Đã xác nhận";
      case "SEATED":
        return "Đã ngồi";
      case "COMPLETED":
        return "Hoàn thành";
      case "CANCELED":
        return "Đã hủy";
      default:
        return "Không xác định";
    }
  };
  if (isLoading) return <div>Loading...</div>;

  return (
    <section className="py-24 relative">
      <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
        <h1 className="text-center text-black text-3xl font-bold font-manrope leading-normal">Lịch sử đặt bàn</h1>

        {data.length === 0 ? (
          <div className="text-center text-gray-500 mt-4">
            Không có đơn đặt bàn nào
            <div className="mt-4">
              <Link to="/reservation">
                <ButtonCustome buttonText="Đặt Bàn ngay"></ButtonCustome>
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
              {data.map((reservation) => {
                const date = new Date(reservation.startTime);
                const formattedDate = date.toLocaleDateString("vi-VN");
                const formattedTime = date.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
                let statusClass = "";
                switch (reservation.status) {
                  case "ISWAITING":
                    statusClass = "bg-amber-50 text-amber-600 border border-amber-400";
                    break;
                  case "ISCONFIRMED":
                    statusClass = "bg-green-50 text-green-600 border border-green-400";
                    break;
                  case "SEATED":
                    statusClass = "bg-blue-50 text-blue-600 border border-blue-400";
                    break;
                  case "COMPLETED":
                    statusClass = "bg-gray-200 text-gray-600 border border-gray-400";
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
                        {reservation.status !== "CANCELED" && (
                          <button
                            onClick={() => handleCancelReservation(reservation._id)}
                            className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300 ease-in-out"
                          >
                            Hủy
                          </button>
                        )}
                        <Link to={`/history-details/${reservation?._id}`}>
                          <button className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300 ease-in-out">
                            Xem Chi Tiết
                          </button>
                        </Link>
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
  );
};

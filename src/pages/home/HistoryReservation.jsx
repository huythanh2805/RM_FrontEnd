import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const HistoryReservation = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userId } = useParams();

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get(`http://localhost:1111/api/reservations/user/${userId}`);
        setReservations(response.data.reservations || []);
      } catch (err) {
        setError(err.response?.data.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <section className="py-24 relative">
      <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
        <h1 className="text-center text-black text-3xl font-bold font-manrope leading-normal">Lịch sử đặt bàn</h1>
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
            {reservations.map((reservation) => {
              const date = new Date(reservation.startTime);
              const formattedDate = date.toLocaleDateString("vi-VN"); // Định dạng ngày theo chuẩn Việt Nam
              const formattedTime = date.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }); // Định dạng giờ theo chuẩn Việt Nam

              // Xác định lớp cho trạng thái
              let statusClass = "";
              switch (reservation.status) {
                case "ISWAITING":
                  statusClass = "bg-amber-50 text-amber-600 border border-amber-400";
                  break;
                case "CONFIRMED":
                  statusClass = "bg-green-50 text-green-600 border border-green-400";
                  break;
                case "CANCELLED":
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
                      {reservation.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <button className="p-2 hover:bg-gray-100 transition-all duration-700 ease-in-out group flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M12 16.9896V17.0396M12 11.976V12.026M12 6.96228V7.01228"
                          stroke="black"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

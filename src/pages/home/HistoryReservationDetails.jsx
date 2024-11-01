import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export const HistoryReservationDetail = () => {
  const navigate = useNavigate();
  const { reservation_id } = useParams();
  const fetchReservationDetails = async () => {
    const response = await axios.get(`http://localhost:1111/api/reservations/history-detail/${reservation_id}`);
    return response.data;
  };
  const {
    data: reservationDetails,
    error,
    isLoading,
  } = useQuery(["reservationDetails", reservation_id], fetchReservationDetails);
  const handleGoBack = () => {
    navigate(-1);
  };
  if (isLoading) {
    return <div>Loading...</div>; 
  }
  if (error) {
    console.error("Error fetching reservation details:", error);
    return <div>Error loading reservation details</div>; 
  }
  const date = new Date(reservationDetails.startTime);
  const formattedDate = date.toLocaleDateString("vi-VN"); 
  const formattedTime = date.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }); 
  return (
    <section className="py-24 relative">
      <div className="w-full max-w-7xl px-4 md:px-5 lg:px-6 mx-auto">
        <div className="flex items-start flex-col gap-6 xl:flex-row">
          <div className="w-full max-w-sm md:max-w-3xl xl:max-w-sm flex items-start flex-col gap-8 max-xl:mx-auto">
            <div className="p-6 border border-gray-200 rounded-3xl w-full group transition-all duration-500 hover:border-gray-400">
              <h2 className="font-manrope font-bold text-3xl leading-10 text-black pb-6 border-b border-gray-200">
                Thông tin đặt bàn
              </h2>
              <div className="data py-6 border-b border-gray-200">
                <div className="flex items-center justify-between gap-4 mb-5">
                  <p className="font-normal text-lg leading-8 text-gray-400 transition-all duration-500 group-hover:text-gray-700">
                    Họ tên
                  </p>
                  <p className="font-medium text-lg leading-8 text-gray-900">{reservationDetails.userName}</p>
                </div>
                <div className="flex items-center justify-between gap-4 mb-5">
                  <p className="font-normal text-lg leading-8 text-gray-400 transition-all duration-500 group-hover:text-gray-700">
                    Số điện thoại
                  </p>
                  <p className="font-medium text-lg leading-8 text-gray-600">{reservationDetails.phoneNumber}</p>
                </div>
                <div className="flex items-center justify-between gap-4 mb-5">
                  <p className="font-normal text-lg leading-8 text-gray-400 transition-all duration-500 group-hover:text-gray-700">
                    Ngày đặt
                  </p>
                  <p className="font-medium text-lg leading-8 text-gray-900">{formattedDate}</p>
                </div>
                <div className="flex items-center justify-between gap-4 mb-5">
                  <p className="font-normal text-lg leading-8 text-gray-400 transition-all duration-500 group-hover:text-gray-700">
                    Giờ đặt
                  </p>
                  <p className="font-medium text-lg leading-8 text-gray-900">{formattedTime}</p>
                </div>
                <div className="flex items-center justify-between gap-4 mb-5">
                  <p className="font-normal text-lg leading-8 text-gray-400 transition-all duration-500 group-hover:text-gray-700">
                    Số người
                  </p>
                  <p className="font-medium text-lg leading-8 text-gray-900">{reservationDetails.guests_count}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full max-w-sm md:max-w-3xl max-xl:mx-auto">
            <div className="grid grid-cols-1 gap-6">
              {Array.isArray(reservationDetails.ordered_dishes) && reservationDetails.ordered_dishes.length > 0 ? (
                reservationDetails.ordered_dishes.map((orderedDish, index) => (
                  <div
                    key={orderedDish._id} 
                    className="rounded-3xl p-6 bg-gray-100 border border-gray-100 flex flex-col md:flex-row md:items-center gap-5 transition-all duration-500 hover:border-gray-400"
                  >
                    <div className="img-box">
                      <img
                        src={orderedDish.dish_id.images[0]} 
                        alt={orderedDish.dish_id.name}
                        className="w-full md:max-w-[122px] rounded-lg object-cover"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-3 md:gap-8">
                      <div>
                        <h2 className="font-medium text-xl leading-8 text-black mb-3">{orderedDish.dish_id.name}</h2>
                      </div>
                      <div className="flex items-center justify-between gap-8">
                        <h6 className="font-medium text-xl leading-8 text-600">Số lượng: {orderedDish.quantity}</h6>
                        <h6 className="font-medium text-xl leading-8 text-600">
                          {orderedDish.dish_id.price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                        </h6>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-600">Không có món ăn đặt trước.</div>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center flex-col sm:flex-row justify-center gap-3 mt-8">
          <button
            onClick={handleGoBack}
            className="rounded-full py-4 w-full max-w-[280px] flex items-center bg-indigo-50 justify-center transition-all duration-500 hover:bg-indigo-100"
          >
            <span className="px-2 font-semibold text-lg leading-8 text-indigo-600">Quay lại</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path
                d="M8.25324 5.49609L13.7535 10.9963L8.25 16.4998"
                stroke="#4F46E5"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

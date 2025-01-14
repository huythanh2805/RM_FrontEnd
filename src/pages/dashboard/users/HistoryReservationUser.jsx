import axios from "axios";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";

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

export const UserReservations = () => {
    const { userId } = useParams();
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_BASE_URL}/api/reservations/user/${userId}`
                );
                setReservations(response.data.reservations || []);
            } catch (err) {
                setError(err.response?.data?.message || "Error fetching reservations");
            } finally {
                setLoading(false);
            }
        };

        fetchReservations();
    }, [userId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-600">{error}</p>;

    return (
        <div className="w-full relative">

            <div className="flex items-center gap-3 mb-5">
                <button
                    onClick={() => navigate(-1)}
                    className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition"
                >
                    <FaArrowLeft size={20} />
                </button>
                <h1 className="text-3xl font-semibold">Lịch sử đặt bàn</h1>
            </div>
            {/* Lịch sử đặt bàn */}
            <section className="py-24 relative">
                <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
                    {reservations.length === 0 ? (
                        <div className="text-center text-2xl text-gray-500 mt-4">
                            Không có đơn đặt bàn nào
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {reservations.map((reservation) => {
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

                                        <div className="flex flex-col gap-2 w-full md:w-auto">
                                            {reservation.status === "ISWAITING" && (
                                                <>
                                                    <Link to={`/history-details/${reservation?._id}`}>
                                                        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600  w-full ">
                                                            Xem Chi Tiết
                                                        </button>
                                                    </Link>
                                                </>
                                            )}
                                            {reservation.status !== "ISWAITING" && (
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

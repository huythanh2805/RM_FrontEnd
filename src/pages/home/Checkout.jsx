import { useCart } from "@/contexts/CartProvider";
import { toast } from "@/hooks/use-toast";
import { useFetchData } from "@/hooks/useFetchData";
import { ServerUrl } from "@/utilities/utils";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
export const Checkout = () => {
  const [reservationDetails, setReservationDetails] = useState(null);
  const navigate = useNavigate();
  const [qrCodeUrl, setQrCodeUrl] = useState(null);
  const { cart, clearCart } = useCart();
  const [decodedToken, setDecodeToken] = useState(() => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    return jwtDecode(token);
  });
  const { data: userDiscounts } = useFetchData(
    `${ServerUrl}/api/userDiscount/reservation/client/getAvailableStatus/${decodedToken?.id}`
  );
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const currentCode = params.get("code");

    const storedDetails = JSON.parse(localStorage.getItem("reservationDetails")) || [];
    console.log({storedDetails})
    console.log({currentCode})
    if (currentCode && Array.isArray(storedDetails)) {
      const reservation = storedDetails.find((item) => item.code === currentCode);
      if (reservation) {
        setReservationDetails(reservation);
      } else {
        navigate("/");
      }
    } else {
      navigate("/");
    }
  }, [location, navigate]);
  useEffect(() => {
    const socket = io("http://localhost:1111");
    socket.on("notification", (notification) => {
      if (decodedToken?.id) {
        navigate(`/history/${decodedToken.id}`);
        return toast({
          variant: "success",
          title: "Thanh Toán thành công",
        });
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [decodedToken.id, navigate]);
  // Tính tổng tiền món ăn
  const computeTotalAmount = (dishes) => {
    return dishes.reduce((total, dish) => total + dish.price * dish.quantity, 0);
  };
  // Tính thuế 5%
  const calculateTaxAmount = (amount) => {
    return amount * 0.05;
  };
  // Tính số tiền giảm giá
  const calculateDiscountAmount = (amount, couponValue) => {
    if (!userDiscounts || userDiscounts.length === 0) {
      return 0;
    }

    const discount = userDiscounts.find((item) => item._id === couponValue);
    if (!discount) return 0;
    // Tính toán theo loại giảm giá
    if (discount.discountId.discountType === "PERCENTAGE") {
      // Giảm theo phần trăm
      return (amount * discount.discountId.discountValue) / 100;
    } else if (discount.discountType === "FIXEDAMOUNT") {
      // Giảm theo số tiền cố định
      return discount.discountId.discountValue;
    }
    return 0;
  };
  const totalAmount = reservationDetails ? computeTotalAmount(reservationDetails.dishs) : 0;
  const tax = totalAmount ? calculateTaxAmount(totalAmount) : 0;
  const couponValue = reservationDetails ? reservationDetails.couponValue : null;
  const discountAmount = couponValue ? calculateDiscountAmount(totalAmount, couponValue) : 0;
  const totalAfterTaxAndDiscount = totalAmount + tax - discountAmount;
  const totalDeposit = (totalAfterTaxAndDiscount * 25) / 100;
  const generateQrCodeUrl = (totalDeposit, storedDetails) => {
    const description = `${storedDetails?.code}`;
    const bank = "MB";
    const account = "0386426150";
    const template = "compact";
    const qrUrl = `https://qr.sepay.vn/img?bank=${encodeURIComponent(bank)}&acc=${encodeURIComponent(
      account
    )}&template=${encodeURIComponent(template)}&amount=${encodeURIComponent(totalDeposit)}&des=${description}`;
    return qrUrl;
  };
  const handlePayment = () => {
    if (!reservationDetails) {
      toast({
        variant: "destructive",
        title: "Không tìm thấy thông tin đặt bàn.",
      });
      return;
    }
    // Tạo mã QR để hiển thị cho người dùng
    const qrCodeUrl = generateQrCodeUrl(totalDeposit, reservationDetails);
    console.log(qrCodeUrl);
    setQrCodeUrl(qrCodeUrl);
    clearCart();
    toast({
      variant: "success",
      title: "Mã QR đã được tạo, vui lòng quét để thanh toán.",
    });
  };

  if (!reservationDetails) {
    return <div>Loading...</div>;
  }
  const formattedDate = new Date(reservationDetails.startTime).toLocaleDateString();
  const formattedTime = new Date(reservationDetails.startTime).toLocaleTimeString();
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };
  const handleBack = () => {
    navigate(`/history/${decodedToken.id}`);
  };
  return (
    <div>
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
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
          <h1 className="text-5xl md:text-4xl sm:text-3xl font-bold">Thanh Toán</h1>
          <p className="text-4xl md:text-xl sm:text-xl mt-4 flex items-center justify-center">
            <span className="bg-white p-1 rounded-full ml-0 mr-0 hidden lg:block"></span>
            <span className="bg-white h-[2px] w-[100px] hidden lg:block"></span>
            <span className="ml-4">Vui lòng thanh toán trước 25% hóa đơn</span>
            <span className="bg-white h-[2px] w-[100px] ml-4 hidden lg:block"></span>
            <span className="bg-white p-1 rounded-full ml-0 mr-0 hidden lg:block"></span>
          </p>
        </div>
      </div>
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
                    <p className="font-normal text-lg leading-8 text-gray-400">Họ tên</p>
                    <p className="font-medium text-lg leading-8 text-gray-900">{reservationDetails.userName}</p>
                  </div>
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <p className="font-normal text-lg leading-8 text-gray-400">Số điện thoại</p>
                    <p className="font-medium text-lg leading-8 text-gray-600">{reservationDetails.phoneNumber}</p>
                  </div>
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <p className="font-normal text-lg leading-8 text-gray-400">Ngày đặt</p>
                    <p className="font-medium text-lg leading-8 text-gray-900">{formattedDate}</p>
                  </div>
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <p className="font-normal text-lg leading-8 text-gray-400">Giờ đặt</p>
                    <p className="font-medium text-lg leading-8 text-gray-900">{formattedTime}</p>
                  </div>
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <p className="font-normal text-lg leading-8 text-gray-400">Số người</p>
                    <p className="font-medium text-lg leading-8 text-gray-900">
                      {reservationDetails.guests_count} người
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <p className="font-normal text-lg leading-8 text-gray-400">Tổng tiền</p>
                    <p className="font-medium text-lg leading-8 text-gray-900">{formatCurrency(totalAmount)} </p>
                  </div>
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <p className="font-normal text-lg leading-8 text-gray-400">Giảm giá</p>
                    <p className="font-medium text-lg leading-8 text-gray-900">{formatCurrency(discountAmount)}</p>
                  </div>
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <p className="font-normal text-lg leading-8 text-gray-400">Thuế (5%)</p>
                    <p className="font-medium text-lg leading-8 text-gray-900">{formatCurrency(tax)}</p>
                  </div>
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <p className="font-normal text-lg leading-8 text-gray-400">Tổng cộng</p>
                    <p className="font-medium text-lg leading-8 text-gray-900">
                      {formatCurrency(totalAfterTaxAndDiscount)}
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <p className="font-normal text-lg leading-8 text-gray-400">Thanh toán trước ( 25% )</p>
                    <p className="font-medium text-lg leading-8 text-gray-900">{formatCurrency(totalDeposit)}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full max-w-sm md:max-w-3xl max-xl:mx-auto">
              <div className="grid grid-cols-1 gap-6">
                {Array.isArray(reservationDetails.dishs) && reservationDetails.dishs.length > 0 ? (
                  reservationDetails.dishs.map((orderedDish, index) => (
                    <div
                      key={orderedDish._id}
                      className="rounded-3xl p-6 bg-gray-100 border border-gray-100 flex flex-col md:flex-row md:items-center gap-5 transition-all duration-500 hover:border-gray-400"
                    >
                      <div className="img-box">
                        {orderedDish.image ? (
                          <img
                            src={orderedDish.image}
                            alt={orderedDish.name}
                            className="w-full md:max-w-[122px] rounded-lg object-cover"
                          />
                        ) : (
                          <p>No image available</p>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-3 md:gap-8">
                        <div>
                          <h2 className="font-medium text-xl leading-8 text-black mb-3">{orderedDish.dish_id.name}</h2>
                        </div>
                        <div className="flex items-center justify-between gap-8">
                          <h6 className="font-medium text-xl leading-8 text-600">Số lượng: {orderedDish.quantity}</h6>
                          <h6 className="font-medium text-xl leading-8 text-600">
                            Giá : {formatCurrency(orderedDish.price)}
                          </h6>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center">No dishes found</p>
                )}
              </div>
            </div>
          </div>
        </div>
        {qrCodeUrl && (
          <div className="mt-4 text-center">
            <p>Quét mã QR để thanh toán:</p>
            <img src={qrCodeUrl} alt="QR code for payment" className="mx-auto " width={400} />
          </div>
        )}
        <div className="flex gap-5 justify-center mt-4">
          <button
            className="bg-blue-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-600 transition"
            onClick={handleBack}
          >
            Quay lại
          </button>

          {!qrCodeUrl && (
            <button
              className="bg-green-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-green-600 transition"
              onClick={handlePayment}
            >
              Thanh toán
            </button>
          )}
        </div>
      </section>
    </div>
  );
};

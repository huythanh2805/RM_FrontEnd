import ReservationForm from "@/components/layouts/ReservationForm";
import { useThemeContext } from "@/contexts/ThemeProvider";
import { useState } from "react";

const Reservation = () => {
  const { colorCode } = useThemeContext();
  const [opacity] = useState(1);
  const [translateY] = useState(0);

  const services = [
    {
      id: 1,
      title: "Đặt bàn",
      description:
        "Đặt bàn nhanh chóng chỉ với vài cú nhấp chuột, tiết kiệm thời gian của bạn.",
      icon: "imgs/dish.png",
    },
    {
      id: 2,
      title: "Sự kiện riêng tư",
      description:
        "Tổ chức sự kiện đặc biệt trong không gian riêng tư, sang trọng và ấm cúng.",
      icon: "imgs/private.png",
    },
    {
      id: 3,
      title: "Đặt hàng trực tuyến",
      description:
        "Đặt món ăn yêu thích của bạn trực tuyến và nhận tại nhà một cách thuận tiện.",
      icon: "imgs/online.png",
    },
    {
      id: 4,
      title: "Giao hàng nhanh",
      description:
        "Thưởng thức món ăn ngon mà không phải chờ đợi với dịch vụ giao hàng nhanh của chúng tôi.",
      icon: "imgs/delivery.png",
    },
  ];

  return (
    <>
      {/* Header Section */}
      <div className="relative w-full h-[150px] sm:h-[200px] lg:h-[300px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('imgs/pagetitle-about.jpg')",
            backgroundAttachment: "fixed",
            filter: "brightness(0.7)",
          }}
        ></div>
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div
          className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4 sm:px-6 lg:px-8"
          style={{
            opacity: opacity,
            transform: `translateY(-${translateY}px)`,
            transition: "opacity 0.3s, transform 0.3s",
          }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold dancing">
            Đặt Bàn
          </h1>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg mt-4 flex items-center justify-center text-center">
            <span className="bg-white p-1 rounded-full mr-2 hidden lg:block"></span>
            <span className="bg-white h-[2px] w-[60px] sm:w-[80px] md:w-[100px] lg:w-[120px] hidden lg:block"></span>
            <span className="ml-2 sm:ml-4">
              Vui lòng thanh toán trước 25% nếu bạn gọi món trước nhé ^_^
            </span>
            <span className="bg-white h-[2px] w-[60px] sm:w-[80px] md:w-[100px] lg:w-[120px] ml-2 sm:ml-4 hidden lg:block"></span>
            <span className="bg-white p-1 rounded-full ml-2 hidden lg:block"></span>
          </p>
        </div>
      </div>

      {/* Reservation Form Section */}
      <section className="py-12 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <ReservationForm />
      </section>

      {/* Services Section */}
      <div className="lg:mt-12">
        <div
          className="relative bg-fixed bg-cover bg-center w-full min-h-[900px] sm:min-h-[800px] flex flex-col items-center justify-center text-center text-white"
          style={{
            backgroundImage: "url('imgs/pagetitle-reservation.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center center",
          }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 w-full text-white px-4 sm:px-6">
            <div className="relative z-10 bg-cover bg-center text-white py-16">
              <h2 className="text-3xl sm:text-4xl font-bold mt-20">
                Dịch vụ tốt nhất của Golden Fork
              </h2>
              <div className="container mx-auto mt-8">
                {/* Grid layout: 2 services per row on mobile, 4 services per row on larger screens */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      className="text-center w-full transform transition-transform duration-300"
                      style={{
                        transform: `translateY(${translateY}px)`,
                      }}
                    >
                      <div className="relative w-[120px] sm:w-[150px] h-[120px] sm:h-[150px] mx-auto mb-6">
                        <div
                          className="absolute inset-0 rounded-full border-2 border-dashed animate-spin-slow"
                          style={{ borderColor: colorCode }}
                        ></div>
                        <div className="flex items-center justify-center w-full h-full rounded-full overflow-hidden">
                          <img
                            src={service.icon}
                            alt={service.title}
                            className="w-[80px] sm:w-[90px] sm:h-[90px] object-contain"
                          />
                        </div>
                      </div>
                      <h3 className="text-lg sm:text-xl font-semibold">
                        {service.title}
                      </h3>
                      <p className="text-sm sm:text-base mt-2 text-gray-300">
                        {service.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reservation;

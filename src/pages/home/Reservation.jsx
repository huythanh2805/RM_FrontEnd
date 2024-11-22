import ReservationForm from "@/components/layouts/ReservationForm";
import { useThemeContext } from "@/contexts/ThemeProvider";
import React, { useState } from "react";

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
      <div className="relative w-full h-[400px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('imgs/pagetitle-reservation.jpg')",
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
          <h1 className="text-5xl md:text-4xl sm:text-3xl font-bold">
            ĐẶT BÀN
          </h1>
          <p className="text-4xl md:text-xl sm:text-xl mt-4 flex items-center justify-center">
            <span className="bg-white p-1 rounded-full ml-0 mr-0 hidden lg:block"></span>
            <span className="bg-white h-[2px] w-[100px] hidden lg:block"></span>
            <span className="ml-4">
              Chỉ cần vài cú nhấp chuột để đặt chỗ trực tuyến để tiết kiệm thời
              gian và tiền bạc của bạn
            </span>
            <span className="bg-white h-[2px] w-[100px] ml-4 hidden lg:block"></span>
            <span className="bg-white p-1 rounded-full ml-0 mr-0 hidden lg:block"></span>
          </p>
        </div>
      </div>

      {/* Reservation Form */}
      <section className="py-12 bg-gray-50">
        <ReservationForm />
      </section>

      <div
        className="relative -mt-40 bg-fixed bg-cover bg-center w-full h-[600px] flex flex-col items-center justify-center text-center text-white"
        style={{
          backgroundImage:
            "url('imgs/pagetitle-reservation.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div
          className="relative z-10 max-w-2xl space-y-6"
          style={{
            opacity: opacity,
            transform: `translateY(-${translateY}px)`,
            transition: "opacity 0.3s, transform 0.3s",
          }}
        ></div>
        <div className="relative z-10 bg-cover bg-center text-white py-16">
          <h2 className="text-4xl font-bold mt-20">
            Dịch vụ tốt nhất của Golden Fork
          </h2>
          <div className="container mx-auto flex flex-wrap justify-center gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="text-center w-64 transform transition-transform duration-300"
                style={{
                  transform: `translateY(${translateY}px)`,
                }}
              >
                <div className="relative w-[150px] h-[150px] mx-auto mb-6">
                  <div
                    className="absolute inset-0 rounded-full border-2 border-dashed  animate-spin-slow"
                    style={{ borderColor: colorCode }}
                  ></div>
                  <div className="flex items-center justify-center w-full h-full rounded-full overflow-hidden">
                    <img
                      src={service.icon}
                      alt={service.title}
                      className="w-[90px] h-20 object-contain"
                    />
                  </div>
                </div>
                <h3 className="text-xl font-semibold">{service.title}</h3>
                <p className="text-sl mt-2 text-gray-300">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Reservation;

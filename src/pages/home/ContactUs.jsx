import ButtonCustome from "@/components/ButtonCustome";
import { useThemeContext } from "@/contexts/ThemeProvider";
import React, { useState } from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaUser, FaComment } from 'react-icons/fa';

const ContactUs = () => {
  const [opacity, setOpacity] = useState(1);
  const [translateY, setTranslateY] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="relative w-full h-[400px] overflow-hidden">
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
          className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white"
          style={{
            opacity: opacity,
            transform: `translateY(-${translateY}px)`,
            transition: "opacity 0.3s, transform 0.3s",
          }}
        >
          <h1 className="text-5xl md:text-4xl sm:text-3xl font-bold">
            LIÊN HỆ
          </h1>
          <p className="text-4xl md:text-xl sm:text-xl mt-4">
            Hãy cho chúng tôi biết nếu bạn có bất kỳ thắc mắc nào về thực đơn,
            dịch vụ của chúng tôi hoặc thông tin khác mà bạn muốn có
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-12 px-6 md:px-16 lg:px-32 py-12 bg-white shadow-lg">
        {/* Contact Form */}
        <div className="w-full md:w-1/2 text-white rounded-lg shadow-xl p-8"
  style={{
    backgroundColor: '#FF66 '
  }}>
          <h2 className="text-3xl font-bold text-black mb-4">Liên hệ</h2>
          <div className="w-[100px] h-[2px] rounded-full bg-orange-1 mb-8"></div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="relative">
              <input
                type="text"
                placeholder="Tên"
                className="w-full p-4 pl-12 bg-white rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-blue-500 text-gray-700 focus:outline-none"
              />
              <span className="absolute left-4 top-4 text-gray-400">
                <FaUser />
              </span>
            </div>
            <div className="relative">
              <input
                type="email"
                placeholder="Email"
                className="w-full p-4 pl-12 bg-white rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-blue-500 text-gray-700 focus:outline-none"
              />
              <span className="absolute left-4 top-4 text-gray-400">
                <FaEnvelope />
              </span>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Số điện thoại"
                className="w-full p-4 pl-12 bg-white rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-blue-500 text-gray-700 focus:outline-none"
              />
              <span className="absolute left-4 top-4 text-gray-400">
                <FaPhoneAlt />
              </span>
            </div>
            <div className="relative">
              <textarea
                placeholder="Ghi chú"
                className="w-full p-4 pl-12 bg-white rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-blue-500 text-gray-700 focus:outline-none"
                rows="4"
              ></textarea>
              <span className="absolute left-4 top-4 text-gray-400">
                <FaComment />
              </span>
            </div>
            <ButtonCustome buttonText='Gửi'/>
          </form>
        </div>

        {/* Contact Info */}
        <div className="w-full md:w-1/2 text-black space-y-8">
          <h2 className="text-3xl font-bold mb-4">Thông tin liên hệ</h2>
          <div className="w-[100px] h-[2px] rounded-full bg-orange-1 mb-8"></div>
          <ul className="space-y-8">
            <li className="flex items-center">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-blue-600">
                <FaMapMarkerAlt />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold">Địa chỉ nhà hàng</h3>
                <p className="text-gray-600">Tòa nhà FPT Polytechnic., Cổng số 2, 13 P. Trịnh Văn Bô, Xuân Phương, Nam Từ Liêm, Hà Nội</p>
              </div>
            </li>
            <li className="flex items-center">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-blue-600">
                <FaPhoneAlt />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold">Số điện thoại</h3>
                <p className="text-gray-600">(012) 978 645 312</p>
              </div>
            </li>
            <li className="flex items-center">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-blue-600">
                <FaEnvelope />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold">Email</h3>
                <p className="text-gray-600">goldenfork@gmail.com</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default ContactUs;

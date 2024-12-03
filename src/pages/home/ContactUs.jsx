import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation từ react-router-dom
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const ContactUs = () => {
  const [opacity, setOpacity] = useState(1);
  const [translateY, setTranslateY] = useState(0);
  const location = useLocation();
  const isContactPage = location.pathname === '/contact';

  return (
    <>
      {isContactPage && (
        <div className="relative w-full h-[200px] overflow-hidden">
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
            <h1 className="text-4xl md:text-3xl sm:text-3xl font-bold">
              LIÊN HỆ
            </h1>
            <p className="text-3xl md:text-[20px] sm:text-[15px] mt-4 flex items-center justify-center">
              <span className="bg-white p-1 rounded-full ml-0 mr-0 hidden lg:block"></span>
              <span className="bg-white h-[2px] w-[100px] hidden lg:block"></span>
              <span className="ml-4">
                Hãy cho chúng tôi biết nếu bạn có bất kỳ thắc mắc nào về thực đơn,
                dịch vụ của chúng tôi hoặc thông tin khác mà bạn muốn có
              </span>
              <span className="bg-white h-[2px] w-[100px] ml-4 hidden lg:block"></span>
              <span className="bg-white p-1 rounded-full ml-0 mr-0 hidden lg:block"></span>
            </p>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row items-center justify-between gap-12 px-6 md:px-16 lg:px-32 py-12 bg-white shadow-lg">
        <div className="w-full md:w-1/2 h-[500px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14895.472351647697!2d105.7469268!3d21.0379635!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313455305afd834b%3A0x17268e09af37081e!2sT%C3%B2a%20nh%C3%A0%20FPT%20Polytechnic.!5e0!3m2!1svi!2s!4v1732871297615!5m2!1svi!2s"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

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
                <p className="text-gray-600">
                  Tòa nhà FPT Polytechnic, Cổng số 2, 13 P. Trịnh Văn Bô, Xuân
                  Phương, Nam Từ Liêm, Hà Nội
                </p>
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

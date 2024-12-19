import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation từ react-router-dom
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { useThemeContext } from "@/contexts/ThemeProvider";

const ContactUs = () => {
  const [opacity, setOpacity] = useState(1);
  const [translateY, setTranslateY] = useState(0);
  const location = useLocation();
  const isContactPage = location.pathname === "/contact";
  const { colorCode } = useThemeContext();

  return (
    <>
      {isContactPage && (
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
              Liên Hệ
            </h1>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg mt-4 flex items-center justify-center text-center">
              <span className="bg-white p-1 rounded-full mr-2 hidden lg:block"></span>
              <span className="bg-white h-[2px] w-[60px] sm:w-[80px] md:w-[100px] lg:w-[120px] hidden lg:block"></span>
              <span className="ml-2 sm:ml-4">
                Hãy cho chúng tôi biết nếu bạn có bất kỳ thắc mắc nào về thực
                đơn, dịch vụ của chúng tôi hoặc thông tin khác mà bạn muốn có
              </span>
              <span className="bg-white h-[2px] w-[60px] sm:w-[80px] md:w-[100px] lg:w-[120px] ml-2 sm:ml-4 hidden lg:block"></span>
              <span className="bg-white p-1 rounded-full ml-2 hidden lg:block"></span>
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
          <h2 className="text-2xl sm:text-[28px] md:text-[40px] dancing mb-4" style={{color: colorCode}}>
            Thông tin liên hệ
          </h2>
          <div className="w-[80px] md:w-[100px] h-[2px] rounded-full bg-orange-1 mb-8" style={{backgroundColor: colorCode}}></div>
          <ul className="space-y-6 sm:space-y-8">
            <li className="items-center flex">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-blue-600">
                <FaMapMarkerAlt className="text-lg sm:text-xl" style={{color: colorCode}}/>
              </div>
              <div className="ml-4">
                <h3 className="text-sm sm:text-lg font-semibold" style={{color: colorCode}}>
                  Địa chỉ nhà hàng
                </h3>
                <p className="text-gray-600 flex text-xs sm:text-sm">
                  Tòa nhà FPT Polytechnic, Cổng số 2 <br />
                  13 P. Trịnh Văn Bô, Xuân Phương <br />
                  Nam Từ Liêm, Hà Nội
                </p>
              </div>
            </li>
            <li className="flex items-center flex-wrap">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-blue-600">
                <FaPhoneAlt className="text-lg sm:text-xl" style={{color: colorCode}}/>
              </div>
              <div className="ml-4">
                <h3 className="text-sm sm:text-lg font-semibold" style={{color: colorCode}}>
                  Số điện thoại
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm">
                  (012) 978 645 312
                </p>
              </div>
            </li>
            <li className="flex items-center flex-wrap">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-blue-600">
                <FaEnvelope className="text-lg sm:text-xl" style={{color: colorCode}} />
              </div>
              <div className="ml-4">
                <h3 className="text-sm sm:text-lg font-semibold" style={{color: colorCode}}>Email</h3>
                <p className="text-gray-600 text-xs sm:text-sm">
                  goldenfork@gmail.com
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default ContactUs;

import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { CiClock2 } from "react-icons/ci";
import { useThemeContext } from "@/contexts/ThemeProvider";

const Footer = () => {
  const { colorCode } = useThemeContext();

  return (
    <div className="relative bg-black text-white mt-8 md:mt-0">
      <div
        className="absolute w-full h-full bg-cover bg-center bg-no-repeat opacity-100 bg-[url('/imgs/logoFooter.jpg')]"
 
      ></div>
      <div className="relative flex flex-col md:flex-row justify-between p-8 md:px-32 px-5 z-10">
        <div className="w-full md:w-1/4">
          <Link to="/" className="flex flex-row items-center cursor-pointer">
            <img
              src="/imgs/logoGolden.webp"
              alt="Golden Fork Logo"
              className="h-[125px] w-16 object-cover rounded-full"
            />
          </Link>
          <h1 className="text-[35px] font-semibold newFont mt-4">
            Golden Fork
          </h1>
          <hr className="pt-2" />
          <p className="text-white text-sm max-w-xs mx-auto md:mx-0">
            Chúng tôi tự hào mang đến cho quý khách trải
            nghiệm ẩm thực đa dạng với không gian ấm cúng, sang trọng. Đặt bàn
            dễ dàng và tận hưởng những bữa ăn ngon miệng cùng dịch vụ chuyên
            nghiệp tại Golden Fork.
          </p>
          <div className="flex justify-center md:justify-start space-x-4 mt-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500"
            >
              <FaFacebookF className="text-2xl" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500"
            >
              <FaTwitter className="text-2xl" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500"
            >
              <FaInstagram className="text-2xl" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-500"
            >
              <FaYoutube className="text-2xl" />
            </a>
          </div>
        </div>

        {/* Open Hours Section */}
        <div>
          <h1 className="font-semibold newFont text-[30px] pb-4 pt-5 md:pt-0">
            Giờ Mở Cửa{" "}
          </h1>
          <hr className="pt-2" />
          <ul className="space-y-2 text-white">
            {[
              "Thứ Hai",
              "Thứ Ba",
              "Thứ Tư",
              "Thứ Năm",
              "Thứ Sáu",
              "Thứ Bảy",
              "Chủ Nhật",
            ].map((day, index) => (
              <div className="flex items-center" key={index}>
                <CiClock2 className="mr-2" style={{ color: colorCode }} />
                <li>
                  {day}:{" "}
                  {day === "Thứ Bảy" || day === "Chủ Nhật"
                    ? "10AM - 11PM"
                    : "9AM - 10PM"}
                </li>
              </div>
            ))}
          </ul>
        </div>

        {/* Links Section */}
        <div>
          <h1 className="font-semibold newFont text-[30px] pb-4 pt-5 md:pt-0">
            Liên Kết
          </h1>
          <hr className="pt-2" />
          <ul className="space-y-2">
            {[
              "Trang chủ",
              "Giới thiệu",
              "Thực đơn",
              "Đặt bàn",
              "Liên hệ",
              "Bài viết",
            ].map((link, index) => (
              <li key={index}>
                <Link
                  to={`/${link.toLowerCase()}`}
                  className="hover:text-orange-500"
                >
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company Section */}
        <div>
          <h3 className="font-semibold newFont text-[30px] pb-4 pt-5 md:pt-0">
            Công Ty
          </h3>
          <hr className="pt-2" />
          <ul className="space-y-2">
            {[
              "Điều khoản & Điều kiện",
              "Chính sách bảo mật",
              "Chính sách Cookie",
            ].map((company, index) => (
              <li key={index}>
                <Link
                  to={`/${company.toLowerCase().replace(/ & /, "-")}`}
                  className="hover:text-orange-500"
                >
                  {company}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="relative mt-8">
        <div
          className="border-t-0 border-b border-transparent"
          aria-hidden="true"
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
        </div>
        <div className="pt-4">
          <p className="text-center text-sm text-white">
            Copyright © 2024{" "}
            <span style={{color: colorCode}}>GOLDEN FORK</span>. All Rights
            Reserved
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;

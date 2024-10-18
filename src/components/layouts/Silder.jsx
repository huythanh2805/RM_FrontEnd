import { useThemeContext } from "@/contexts/ThemeProvider";
import React, { useState, useEffect } from "react";

const Slider = () => {
  const images = [
    "/imgs/img1.jpg",
    "/imgs/img2.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const { colorCode } = useThemeContext();

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const handleDoubleClick = () => {
    goToNext();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 3000);

    // Dọn dẹp interval khi component unmount
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="relative w-full h-[500px] overflow-hidden">
      {/* Slider Image */}
      <div
        style={{ backgroundImage: `url(${images[currentIndex]})` }}
        className="w-full h-full bg-center bg-no-repeat bg-cover transition-opacity duration-500 ease-in-out object-center"
        onDoubleClick={handleDoubleClick} // Nhấp đúp để chuyển slide
      ></div>

      <div className="absolute top-1/3 w-full text-center text-white">
        <h2 className="text-4xl font-bold">
          CHÀO MỪNG BẠN ĐẾN VỚI NHÀ HÀNG GOLDEN FORK
        </h2>
        <img
          src="https://sun-themes.com/html/fooday/assets/images/slider/slider1-icon.png"
          alt="Icon"
          className="mx-auto my-2 w-[120px] h-[75px]"
        />
        <p className="text-2xl mt-2">
          Hãy thưởng thức những món ăn hấp dẫn tại Golden Fork
        </p>
      </div>
    </div>
  );
};

export default Slider;

import React from "react";

const Slider = () => {
  return (
    <div className="relative w-full h-[800px] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/imgs/slider2-bg1.jpg')",
          backgroundAttachment: "fixed", // parallax effect
        }}
      ></div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
        <img
          src="https://sun-themes.com/html/fooday/assets/images/slider/slider3-icon.png"
          alt="logo"
          className="w-50 mb-2 hidden sm:block"
        />
        <h1 className="text-5xl md:text-4xl sm:text-3xl font-bold">
          GOLDEN FORK RESTAURANT
        </h1>
        <p className="text-4xl md:text-2xl sm:text-xl mt-4 flex items-center justify-center">
          <span className="bg-white p-1 rounded-full ml-0 mr-0"></span>
          <span className="bg-white h-[2px] w-[200px]"></span>
          <span className="ml-4">Tasty</span>
          <span className="bg-white p-1 rounded-full ml-4 mr-4"></span>
          <span>Delicious</span>
          <span className="bg-white p-1 rounded-full ml-4 mr-4"></span>
          <span>Savoury</span>
          <span className="bg-white h-[2px] w-[200px] ml-4"></span>
          <span className="bg-white p-1 rounded-full ml-0 mr-0"></span>
        </p>
      </div>
    </div>
  );
};

export default Slider;

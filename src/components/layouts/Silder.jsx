import React, { useEffect, useState } from "react";

const Slider = () => {
  const [opacity, setOpacity] = useState(1);
  const [translateY, setTranslateY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const fadeStart = 0;
      const fadeEnd = 200;

      let newOpacity = 1 - (scrollY - fadeStart) / (fadeEnd - fadeStart);
      newOpacity = Math.max(0, Math.min(1, newOpacity));
      setOpacity(newOpacity);

      const newTranslateY = Math.min(30, scrollY / 10);
      setTranslateY(newTranslateY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative w-full h-[800px] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/imgs/slider2-bg1.jpg')",
          backgroundAttachment: "fixed", // parallax effect
        }}
      ></div>

      <div
        className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white"
        style={{
          opacity: opacity,
          transform: `translateY(-${translateY}px)`,
          transition: "opacity 0.3s, transform 0.3s",
        }}
      >
        <img
          src="imgs/slider3-icon.png"
          alt="logo"
          className="w-50 mb-2 hidden sm:block"
        />
        <h1 className="text-5xl md:text-4xl sm:text-3xl font-bold">
          GOLDEN FORK RESTAURANT
        </h1>
        <p className="text-4xl md:text-2xl sm:text-xl mt-4 flex items-center justify-center">
          <span className="bg-white p-1 rounded-full ml-0 mr-0"></span>
          <span className="bg-white h-[2px] w-[200px]"></span>
          <span className="ml-4 dancing text-[35px]">Tasty</span>
          <span className="bg-white p-1 rounded-full ml-4 mr-4"></span>
          <span className="dancing text-[35px]">Delicious</span>
          <span className="bg-white p-1 rounded-full ml-4 mr-4"></span>
          <span className="dancing text-[35px]">Savoury</span>
          <span className="bg-white h-[2px] w-[200px] ml-4"></span>
          <span className="bg-white p-1 rounded-full ml-0 mr-0"></span>
        </p>
      </div>
    </div>
  );
};

export default Slider;

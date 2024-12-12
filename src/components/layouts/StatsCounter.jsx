import { useThemeContext } from "@/contexts/ThemeProvider";
import React, { useState, useEffect, useRef } from "react";

const StatsCounter = () => {
  const images = [
    "/imgs/counter-1.png",
    "/imgs/counter-2.png",
    "/imgs/counter-3.png",
    "/imgs/counter-4.png",
  ];

  const [dishes, setDishes] = useState(80);
  const [customers, setCustomers] = useState(2370);
  const [awards, setAwards] = useState(0);
  const [workingHours, setWorkingHours] = useState(2570);
  const { colorCode } = useThemeContext();
  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef(null);

  const incrementCounters = () => {
    if (dishes < 103) setDishes((prev) => prev + 1);
    if (customers < 2398) setCustomers((prev) => prev + 1);
    if (awards < 20) setAwards((prev) => prev + 1);
    if (workingHours < 2589) setWorkingHours((prev) => prev + 1);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 } // Chỉ khi 10% của component được nhìn thấy
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(incrementCounters, 50); // Tăng mỗi 50ms
      return () => clearInterval(interval);
    }
  }, [isVisible, dishes, customers, awards, workingHours]);

  const stats = [
    { value: dishes, label: "/Món ăn" },
    { value: customers, label: "/Khách hàng" },
    { value: awards, label: "/Giải thưởng" },
    { value: workingHours, label: "/Giờ làm việc" },
  ];

  return (
    <div
      ref={statsRef}
      className="flex flex-col sm:flex-row justify-center sm:justify-between items-center p-6 sm:p-20 bg-zinc-100 relative mt-[90px] h-[auto] sm:h-[300px]"
    >
      <img
        src="imgs/vegetable_01.png"
        alt="Vegetable 1"
        className="absolute left-0 transform translate-x-[-50%] w-24 h-24 sm:w-40 sm:h-40 hidden lg:block"
      />

      <img
        src="imgs/vegetable_02.png"
        alt="Vegetable 2"
        className="absolute right-0 transform translate-x-[50%] -translate-y-[60%] w-24 h-24 sm:w-40 sm:h-40 hidden lg:block"
      />

      {stats.map((stat, index) => (
        <div
          key={index}
          className="text-center flex flex-col items-center mb-6 sm:mb-0 sm:w-1/4"
        >
          <div className="flex items-baseline">
            <h2
              className="text-3xl sm:text-5xl font-bold"
              style={{ color: colorCode }}
            >
              {stat.value}
            </h2>
            <span className="text-sm sm:text-[20px] ml-1">{stat.label}</span>
          </div>
          <img
            src={images[index]}
            alt={stat.label}
            className="mt-2 w-16 h-16 sm:w-20 sm:h-20"
          />
        </div>
      ))}
    </div>
  );
};

export default StatsCounter;

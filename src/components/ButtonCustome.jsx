import { useThemeContext } from "@/contexts/ThemeProvider";
import React from "react";

const ButtonCustome = () => {
  const { colorCode } = useThemeContext();
  return (
    <div className="w-full flex items-center justify-center">
      <button
        className="max-w-fit mx-auto p-3 rounded-full px-8 text-[20px] font-semibold text-white group"
        style={{ backgroundColor: colorCode }}
      >
        <div className="flex flex-col">
          <p>Đặt Bàn</p>
          <div className="w-full h-[1px] bg-white"></div>
        </div>
      </button>
    </div>
  );
};

export default ButtonCustome;

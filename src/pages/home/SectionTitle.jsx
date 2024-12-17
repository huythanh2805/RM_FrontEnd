import { useThemeContext } from "@/contexts/ThemeProvider";
import React from "react";

function SectionTitle({ title, desc, color }) {
  const { colorCode } = useThemeContext();

  return (
    <div className="py-6 flex items-center justify-center">
      <div className="w-full sm:w-fit min-w-[250px] flex flex-col items-center sm:items-start">
        <div className="w-full flex items-center justify-center sm:justify-start">
          {/* Đường kẻ bên trái */}
          <div
            className="h-[1px] relative w-full flex-1"
            style={{ backgroundColor: colorCode }}
          >
            <span
              className="w-1 h-1 rounded-full absolute top-0 left-0 translate-y-[-50%]"
              style={{ backgroundColor: colorCode }}
            ></span>
          </div>

          {/* Tiêu đề */}
          <h5
            className="text-[20px] sm:text-[25px] mx-1 font-semibold"
            style={{ color: colorCode }}
          >
            {title}
          </h5>

          {/* Đường kẻ bên phải */}
          <div
            className="relative h-[1px] w-full flex-1"
            style={{ backgroundColor: colorCode }}
          >
            <span
              className="w-1 h-1 rounded-full absolute top-0 right-0 translate-y-[-50%]"
              style={{ backgroundColor: colorCode }}
            ></span>
          </div>
        </div>

        {/* Phần mô tả */}
        <h5
          className="text-[30px] sm:text-[45px] dancing"
          style={{ color: colorCode }}
        >
          {desc}
        </h5>
      </div>
    </div>
  );
}

export default SectionTitle;

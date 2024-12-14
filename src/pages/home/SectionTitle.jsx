import { useThemeContext } from "@/contexts/ThemeProvider";
import React from "react";

function SectionTitle({ title, desc }) {
  const { colorCode } = useThemeContext();
  return (
    <div className="py-4 md:py-6 flex items-center justify-center">
      <div className="w-full sm:w-fit min-w-[250px] flex flex-col items-center sm:items-start">
        <div className="w-full flex items-center justify-center sm:justify-start">
          <div className="h-[1px] relative w-full bg-orange-1 flex-1">
            <span className="w-1 h-1 rounded-full bg-orange-1 absolute top-0 left-0 translate-y-[-50%]"></span>
          </div>
          <h5 className="text-[20px] sm:text-[25px] text-orange-1 mx-1 font-semibold">
            {title}
          </h5>
          <div className="relative h-[1px] w-full bg-orange-1 flex-1">
            <span className="w-1 h-1 rounded-full bg-orange-1 absolute top-0 right-0 translate-y-[-50%]"></span>
          </div>
        </div>
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

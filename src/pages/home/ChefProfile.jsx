import { useThemeContext } from "@/contexts/ThemeProvider";
import React, { useState } from "react";

const ChefProfile = () => {
  const { colorCode } = useThemeContext();
  const [selectedChef, setSelectedChef] = useState("chef1");

  const chefContent = {
    chef1: {
      name: "TERESA DOE",
      role: "Bếp Trưởng",
      description:
        "Với nhiều năm kinh nghiệm trong lĩnh vực ẩm thực, Teresa luôn mang đến những món ăn độc đáo, tinh tế, và đậm chất nghệ thuật. Tận tâm và sáng tạo, anh ấy là người dẫn dắt đội ngũ bếp của chúng tôi tạo nên những hương vị tuyệt vời và trải nghiệm ẩm thực đẳng cấp cho thực khách.",
      imageUrl: "imgs/team-thumbnail-3.png",
    },
    chef2: {
      name: "ALEX SMITH",
      role: "Sous Chef",
      description:
        "Alex là một đầu bếp tài năng, người đã làm việc cùng Teresa để mang đến những trải nghiệm ẩm thực độc đáo. Với sự sáng tạo và đam mê, anh ấy không ngừng học hỏi và phát triển để đóng góp cho đội ngũ.",
      imageUrl: "imgs/team-thumbnail-4.png",
    },
  };

  return (
    <div
      className="relative bg-fixed bg-cover bg-center w-full h-[600px] flex items-center"
      style={{
        backgroundImage: "url('imgs/bg7.jpg')",
      }}
    >
      <div className="container mx-auto flex items-center py-10 px-6">
        <div className="text-white max-w-lg space-y-4">
          <div
            className="text-xl font-semibold mb-2 flex items-center"
            style={{ color: colorCode }}
          >
            <div
              className="border-t w-12 mr-2"
              style={{ borderColor: colorCode }}
            />
            GẶP GỠ
            <div
              className="border-t w-12 ml-2"
              style={{ borderColor: colorCode }}
            />
          </div>

          <h1 className="text-5xl font-bold">
            {selectedChef === "chef1" ? "Bếp Trưởng" : "Phó Bếp Trưởng"}
          </h1>
          <h2 className="text-xl font-semibold">
            {chefContent[selectedChef].name}{" "}
            <span className="text-gray-300">
              . {chefContent[selectedChef].role}
            </span>
          </h2>
          <p className="text-gray-300">
            {chefContent[selectedChef].description}
          </p>

          <div className="flex space-x-4">
            <img
              src="imgs/team-thumbnail-3.png"
              alt="Chef Thumbnail"
              className={`w-16 h-16 rounded-full border-2 cursor-pointer ${
                selectedChef === "chef1"
                  ? "border-white"
                  : "border-gray-400 grayscale"
              }`}
              onClick={() => setSelectedChef("chef1")}
            />
            <img
              src="imgs/team-thumbnail-4.png"
              alt="Chef Thumbnail"
              className={`w-16 h-16 rounded-full border-2 cursor-pointer ${
                selectedChef === "chef2"
                  ? "border-white"
                  : "border-gray-400 grayscale"
              }`}
              onClick={() => setSelectedChef("chef2")}
            />
          </div>
        </div>

        <div className="translate-x-[500px]">
          <img
            src={chefContent[selectedChef].imageUrl}
            alt="Chef"
            className="w-80 h-auto object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default ChefProfile;

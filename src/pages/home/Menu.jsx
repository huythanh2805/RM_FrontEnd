import { useThemeContext } from "@/contexts/ThemeProvider";
import { apiClient } from "@/services/api";
import { formatCurrency } from "@/utilities/utils";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { HiOutlineShoppingCart } from "react-icons/hi";

const Menu = () => {
  const { colorCode } = useThemeContext();
  const [dish, setDish] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:1111/dishes")
      .then((res) => {
        console.log(res.data);
        setDish(res.data);
      })
      .catch((error) => {
        console.error(error.response ? error.response.data : error.message);
      });
  }, []);

  return (
    <div className="w-full p-10">
      <div
        className="text-xl font-semibold mb-2 flex justify-center items-center"
        style={{ color: colorCode }}
      >
        <div
          className="border-t w-12 mr-2"
          style={{ borderColor: colorCode }}
        />
        Thực đơn
        <div
          className="border-t w-12 ml-2"
          style={{ borderColor: colorCode }}
        />
      </div>

      {/* Navbar */}
      <div className="flex justify-between items-center gap-10 mt-10 max-w-4xl mx-auto">
        <div className="font-bold border-b-2 border-black text-lg cursor-pointer hover:font-bold">
          Tất cả
        </div>
        <div className="text-lg cursor-pointer hover:font-bold">Món chính</div>
        <div className="text-lg cursor-pointer hover:font-bold">Khai vị</div>
        <div className="text-lg cursor-pointer hover:font-bold">
          Tráng miệng
        </div>
        <div className="text-lg cursor-pointer hover:font-bold">Đồ uống</div>
      </div>

      {/* Main menu */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 max-w-5xl mx-auto">
        {dish.map((item) => (
          <div
            key={item._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden w-full md:w-auto"
          >
            <img
              src={item.images[0]}
              alt={item.name}
              className="w-full max-h-56 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
              <p className="text-gray-500 text-sm mb-4">{item.desc}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">
                  {formatCurrency(item.price)}
                </span>
                <div className="bg-white border border-[#fb6240de] text-[#fb6240de] p-2 rounded-full hover:bg-[#fb6240de] hover:text-white focus:outline-none transition duration-300 ease-in-out">
                  <HiOutlineShoppingCart />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;

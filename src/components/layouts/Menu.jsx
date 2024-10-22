import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaShoppingCart } from "react-icons/fa";
import ReactStars from "react-rating-stars-component";
import { useThemeContext } from "@/contexts/ThemeProvider";
import { Link } from "react-router-dom";
import axios from "axios";

const Menu = () => {
  const [dishes, setDishes] = useState([]);
  const [ratings, setRatings] = useState({});
  const { colorCode } = useThemeContext();

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await axios.get("http://localhost:1111/dishes");
        console.log("Dữ liệu nhận được:", response.data.data);
        setDishes(response.data.data);
      } catch (error) {
        console.error("Có lỗi xảy ra khi lấy dữ liệu món ăn:", error);
      }
    };
    fetchDishes();
  }, []);

  const handleRatingChange = (newRating, dishId) => {
    setRatings({
      ...ratings,
      [dishId]: newRating,
    });
  };

  const handleAddToCart = (dish) => {
    console.log(`Added ${dish.name} to cart`);
  };

  return (
    <div className="container mx-auto py-8 pt-[90px]">
      <div
        className="text-xl font-semibold mb-2 flex justify-center items-center"
        style={{ color: colorCode }}
      >
        <div
          className="border-t w-12 mr-2"
          style={{ borderColor: colorCode }}
        />
        THỰC ĐƠN CỦA CHÚNG TÔI
        <div
          className="border-t w-12 ml-2"
          style={{ borderColor: colorCode }}
        />
      </div>

      {/* Danh sách các món ăn */}
      <div className="pt-10 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {dishes.slice(0, 6).map((dish) => (
            <div
              key={dish._id}
              className="relative group rounded-lg shadow-lg overflow-hidden bg-white w-full"
            >
              <div className="relative overflow-hidden">
                <img
                  src={dish.images[0]}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  alt={dish.name}
                />
                <div className="absolute inset-0 bg-gray-400 bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="flex space-x-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      className="p-2 text-white rounded-full"
                      style={{ backgroundColor: colorCode }}
                      onClick={() => handleAddToCart(dish)}
                    >
                      <FaShoppingCart />
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Thông tin món ăn */}
              <div className="p-4 relative">
                <Link to={`/dishes/${dish._id}`}>
                  <h3 className="text-lg font-bold cursor-pointer">
                    {dish.name}
                  </h3>
                </Link>
                <p className="text-sm text-gray-600">{dish.desc}</p>

                {/* Giá và đánh giá */}
                <div className="flex justify-between items-center mt-4">
                  <span
                    className="text-xl font-bold"
                    style={{ color: colorCode }}
                  >
                    {dish.price}₫
                  </span>
                  <ReactStars
                    count={5}
                    onChange={(newRating) =>
                      handleRatingChange(newRating, dish._id)
                    }
                    size={24}
                    activeColor="#ffd700"
                    value={ratings[dish._id] || dish.rating}
                  />
                </div>

                <div className="absolute inset-x-0 bottom-0 flex justify-center items-center">
                  <div
                    className="h-1 w-0 transition-all duration-500 group-hover:w-full"
                    style={{ backgroundColor: colorCode }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;

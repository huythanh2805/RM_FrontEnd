import { useThemeContext } from "@/contexts/ThemeProvider";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import ReactStars from "react-rating-stars-component";

const Menu = ({ limit }) => {
  const { colorCode } = useThemeContext();
  const [dish, setDish] = useState([]);
  const [ratings, setRatings] = useState({});

  // Function to handle rating change
  const handleRatingChange = (newRating, dishId) => {
    setRatings({
      ...ratings,
      [dishId]: newRating,
    });
  };

  useEffect(() => {
    axios
      .get("http://localhost:1111/dishes")
      .then((res) => {
        console.log(res.data);
        setDish(res.data);
      })
      .catch((error) => {
        console.error(
          error.response ? error.response.data.data : error.message
        );
      });
  }, []);

  // Sử dụng slice để giới hạn số lượng món ăn nếu có prop limit
  const limitDishes = limit ? dish.slice(0, limit) : dish;

  const handleAddToCart = (dish) => {
    console.log(`Added ${dish.name} to cart`);
  };

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
        THỰC ĐƠN
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
        {limitDishes.map((item) => (
          <div
            key={item._id}
            className="relative group rounded-lg shadow-lg overflow-hidden bg-white w-full"
          >
            <div className="relative overflow-hidden">
              <img
                src={item.images[0]}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                alt={item.name}
              />
              <div className="absolute inset-0 bg-gray-400 bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="flex space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    className="p-2 text-white rounded-full"
                    style={{ backgroundColor: colorCode }}
                    onClick={() => handleAddToCart(item)}
                  >
                    <FaShoppingCart />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Thông tin món ăn */}
            <div className="p-4 relative">
              <Link to={`/dishes/${item._id}`}>
                <h3 className="text-lg font-bold cursor-pointer">
                  {item.name}
                </h3>
              </Link>
              <p className="text-sm text-gray-600">{item.desc}</p>

              {/* Giá và đánh giá */}
              <div className="flex justify-between items-center mt-4">
                <span
                  className="text-xl font-bold"
                  style={{ color: colorCode }}
                >
                  {item.price}₫
                </span>
                <ReactStars
                  count={5}
                  onChange={(newRating) =>
                    handleRatingChange(newRating, item._id)
                  }
                  size={24}
                  activeColor="#ffd700"
                  value={ratings[item._id] || item.rating}
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
  );
};

export default Menu;

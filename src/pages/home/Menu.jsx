import { useThemeContext } from "@/contexts/ThemeProvider";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import ReactStars from "react-rating-stars-component";
import { formatCurrency } from "@/utilities/utils";
import { useCart } from "@/contexts/CartProvider";
import MenuItem from "../MenuItem";

const Menu = ({ limit }) => {
  const { colorCode } = useThemeContext();
  const { addItem } = useCart();
  const [dish, setDish] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  

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
        setDish(res.data);

        // Lấy danh sách tên danh mục
        const uniqueCategories = [
          ...new Set(res.data.map((item) => item.category_id.name)),
        ];
        setCategories(["Tất cả", ...uniqueCategories]);
      })
      .catch((error) => {
        console.error(
          error.response ? error.response.data.data : error.message
        );
      });
  }, []);

  const filteredDishes =
    selectedCategory === "Tất cả"
      ? dish
      : dish.filter((dish) => dish.category_id.name === selectedCategory);

  // Sử dụng slice để giới hạn số lượng món ăn nếu có prop limit
  const limitDishes = limit ? filteredDishes.slice(0, limit) : filteredDishes;

  const handleAddToCart = (dish) => {
    console.log(`Added ${dish.name} to cart`);
    addItem({
      dish_id: dish._id,
      name: dish.name,
      price: dish.price,
      image: dish.images[0],
      quantity: 1,
      type: "dish",
    });
  };

  return (
    <div className="w-full p-10">
      <img
        src="https://sun-themes.com/html/fooday/assets/images/background/pizza1.png"
        alt="Vegetable 1"
        className="absolute left-0 transform translate-x-[-60%] translate-y-[120%] w-40 h-40 sm:w-auto sm:h-auto hidden lg:block"
      />

      <img
        src="https://sun-themes.com/html/fooday/assets/images/background/food1.png"
        alt="Vegetable 2"
        className="absolute right-0 transform translate-x-[40%] translate-y-[-5%] w-40 h-40 sm:w-auto sm:h-auto hidden lg:block"
      />

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

      {/* Navbar menu */}
      <div className="flex justify-between items-center gap-10 mt-10 max-w-4xl mx-auto">
        {categories.map((category) => (
          <div
            className={`text-lg cursor-pointer ${
              selectedCategory === category
                ? "font-bold border-b-2 border-black"
                : ""
            }`}
            key={category}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </div>
        ))}
      </div>

      {/* Main menu */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 max-w-5xl mx-auto">
        {limitDishes.map((item) => (
         <MenuItem item={item} onCLick={handleAddToCart} />
        ))}
      </div>

    </div>
  );
};

export default Menu;

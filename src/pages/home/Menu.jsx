import { useThemeContext } from "@/contexts/ThemeProvider";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import ReactStars from "react-rating-stars-component";
import { formatCurrency } from "@/utilities/utils";
import { useCart } from "@/contexts/CartProvider";

const Menu = ({ limit }) => {
  const { colorCode } = useThemeContext();
  const { addItem } = useCart();
  const [dish, setDish] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [ratings, setRatings] = useState({});

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
          <div
            key={item._id}
            className="relative group rounded shadow-lg overflow-hidden bg-white w-full"
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
                  {formatCurrency(item.price)}
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

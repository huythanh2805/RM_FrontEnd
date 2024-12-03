  import { useThemeContext } from "@/contexts/ThemeProvider";
  import { useLocation } from "react-router-dom";
  import axios from "axios";
  import React, { useEffect, useState } from "react";
  import { useCart } from "@/contexts/CartProvider";
  import MenuItem from "../MenuItem";
import { toast } from "@/hooks/use-toast";

  const Menu = ({ limit }) => {
    const { colorCode } = useThemeContext();
    const { addItem } = useCart();
    const [dish, setDish] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("Tất cả");
    const [opacity, setOpacity] = useState(1);
    const [translateY, setTranslateY] = useState(0);
    const categoryImages = {
      "Món chính": "monchinh.png",
      "Khai vị": "khaivi.png",
      "Tất cả": "tatca.png",
      "Đồ uống": "douong.png",
      "Tráng miệng": "trangmieng.png",
    };

    const location = useLocation();
    const isMenuPage = location.pathname === "/menu";

    useEffect(() => {
      const handleScroll = () => {
        const scrollY = window.scrollY;
        const fadeStart = 0;
        const fadeEnd = 200;

        let newOpacity = 1 - (scrollY - fadeStart) / (fadeEnd - fadeStart);
        newOpacity = Math.max(0, Math.min(1, newOpacity));
        setOpacity(newOpacity);

        const newTranslateY = Math.min(30, scrollY / 10);
        setTranslateY(newTranslateY);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
      axios
        .get("http://localhost:1111/dishes")
        .then((res) => {
          setDish(res.data);
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

    const limitDishes = limit ? filteredDishes.slice(0, limit) : filteredDishes;

    const handleAddToCart = (dish) => {
      toast({
        variant: 'success',
        title: 'Thêm thành công'+" "+ dish.name
      })
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
      <div className="w-full relative">
        {isMenuPage && (
          <div className="relative w-full h-[200px] overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: "url('imgs/pagetitle-menu.jpg')",
                backgroundAttachment: "fixed",
                filter: "brightness(0.7)",
              }}
            ></div>
            <div className="absolute inset-0 bg-black opacity-30"></div>
            <div
              className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white"
              style={{
                opacity: opacity,
                transform: `translateY(-${translateY}px)`,
                transition: "opacity 0.3s, transform 0.3s",
              }}
            >
              <h1 className="text-4xl md:text-3xl sm:text-3xl font-bold">THỰC ĐƠN</h1>
              <p className="text-3xl md:text-[20px] sm:text-[15px] mt-4 flex items-center justify-center">
                <span className="bg-white p-1 rounded-full ml-0 mr-0 hidden lg:block"></span>
                <span className="bg-white h-[2px] w-[100px] hidden lg:block"></span>
                <span className="ml-4">Những món ăn đa dạng đang chờ bạn đến thưởng thức</span>
                <span className="bg-white h-[2px] w-[100px] ml-4 hidden lg:block"></span>
                <span className="bg-white p-1 rounded-full ml-0 mr-0 hidden lg:block"></span>
              </p>
            </div>
          </div>
        )}

        <img
          src="imgs/pizza1.png"
          alt="Vegetable 1"
          className="absolute left-0 transform translate-x-[-60%] translate-y-[40%] w-[40px] h-[40px] sm:w-auto sm:h-auto hidden lg:block"
        />
        <img
          src="imgs/food1.png"
          alt="Vegetable 2"
          className="absolute right-0 transform translate-x-[40%] translate-y-[-2%] w-40 h-40 sm:w-auto sm:h-auto hidden lg:block"
        />

        {!isMenuPage && (
          <div
            className="text-xl font-semibold mb-2 mt-8 flex justify-center items-center"
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
        )}

        {/* Bộ lọc danh mục */}
        <div className="flex flex-wrap justify-center items-center gap-8 mt-10 sm:flex-row sm:justify-center sm:gap-6 md:gap-8">
          {categories.map((category, index) => (
            <div
              key={index}
              className={`flex flex-col items-center cursor-pointer transition duration-300 ${
                selectedCategory === category
                  ? "text-orange-500 font-bold"
                  : "text-gray-500"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              <div
                className={`w-20 h-20 flex items-center justify-center rounded-full border-2 transition ${
                  selectedCategory === category
                    ? "border-orange-500 bg-orange-100"
                    : "border-gray-300"
                }`}
                style={{ borderColor: colorCode }}
              >
                <img
                  src={`imgs/${categoryImages[category]}`}
                  alt={category}
                  className="w-15 h-[50px] text-black"
                />
              </div>

              <span className="mt-2" style={{ color: colorCode }}>
                {category}
              </span>
            </div>
          ))}
        </div>

        {/* Danh sách món ăn */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 max-w-5xl mx-auto mb-8 px-4 sm:px-40 lg:px-8">
          {limitDishes.map((item) => (
            <MenuItem key={item._id} item={item} onCLick={handleAddToCart} />
          ))}
        </div>
      </div>
    );
  };

  export default Menu;

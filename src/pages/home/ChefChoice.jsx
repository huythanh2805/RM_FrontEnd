import React, { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper/modules";
import ProductDecor from "/imgs/product-decorate.jpg"; // Cập nhật ảnh tùy ý
import { toast } from "@/hooks/use-toast";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "@/contexts/CartProvider";
import { ChevronsDown, ChevronsUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useThemeContext } from "@/contexts/ThemeProvider";
import { formatCurrency } from "@/utilities/utils";

const ChefChoice = () => {
  const { addItem } = useCart();
  const [dishes, setDishes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [activeIndex, setActiveIndex] = useState(0);
  const { colorCode } = useThemeContext();

  useEffect(() => {
    axios
      .get("http://localhost:1111/dishes")
      .then((res) => {
        setDishes(res.data);

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
      ? dishes
      : dishes.filter((dish) => dish.category_id.name === selectedCategory);

  const handleAddToCart = (dish) => {
    toast({
      variant: "success",
      title: "Thêm thành công" + " " + dish.name,
    });
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
    <div className="w-full flex py-4 mb-6 md:py-6 lg:10">
      <div className="hidden lg:block flex-1">
        <img
          src={ProductDecor}
          alt={"ProductDecor"}
          className="w-[850px] object-cover relative"
        />
      </div>

      <div className="flex-1 px-2 lg:px-5">
        <div
          className="text-xl font-semibold mb-2 flex items-center justify-center text-center lg:justify-start lg:text-left"
          style={{ color: colorCode }}
        >
          <div
            className="border-t w-12 mr-2"
            style={{ borderColor: colorCode }}
          />
          NỔI BẬT
          <div
            className="border-t w-12 ml-2"
            style={{ borderColor: colorCode }}
          />
        </div>

        <div className="max-w-[555px]">
          <Swiper
            direction={"vertical"}
            slidesPerView={3}
            spaceBetween={15}
            simulateTouch={false}
            speed={600}
            pagination={{ el: ".swiper-pagination", clickable: true }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            modules={[Pagination, Navigation]}
            className="mySwiper"
            style={{ height: "336px" }}
          >
            {filteredDishes.map((dish, i) => (
              <SwiperSlide
                key={i}
                style={{
                  color: i === activeIndex ? "red" : "black",
                }}
              >
                <div className="relative w-full flex items-center justify-between">
                  <div className="w-[80px] h-[80px] flex items-center justify-center rounded-full overflow-hidden relative group">
                    <img
                      src={dish.images[0]}
                      alt={dish.name}
                      className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-50"
                    />

                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <FaShoppingCart
                        size={25}
                        className="text-orange-1 cursor-pointer"
                        onClick={() => handleAddToCart(dish)}
                      />
                    </div>
                  </div>

                  <div className="text-start flex-1 flex flex-col px-2">
                    <div className="flex">
                      <Link to={`/dishes/${dish._id}`}>
                        <p className="flex-1 text-nowrap font-semibold text-[19px]">
                          {dish.name}
                        </p>
                      </Link>
                      <p className="w-full border-b border-dashed border-red-1 h-[18px] mx-1"></p>
                      <div className="text-[20px] font-semibold text-orange-1 px-5">
                        {formatCurrency(dish.price)}
                      </div>
                    </div>
                    <div className="max-w-[360px] truncate text-nowrap">
                      {dish.description}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="w-full">
            <div className="slider-controler relative flex items-center justify-start max-w-[100px] py-6 md:py-10">
              <div className="mx-auto relative flex items-center justify-between">
                <button className="swiper-button-next slider-arrow relative w-fit hidden md:block">
                  <div className="min-w-10 flex items-center justify-center rounded-full shadow-main_shadow cursor-pointer">
                    <ChevronsDown className="text-orange-1 w-[25px]" />
                  </div>
                </button>

                <button className="swiper-button-prev slider-arrow relative w-fit hidden md:block">
                  <div className="min-w-10 flex items-center justify-center rounded-full shadow-main_shadow cursor-pointer">
                    <ChevronsUp className="text-orange-1 w-[25px]" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChefChoice;

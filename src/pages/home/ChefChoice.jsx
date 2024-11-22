import React, { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper/modules";
import ProductDecor from "/imgs/Screen2.jpg"; // Cập nhật ảnh tùy ý

import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "@/contexts/CartProvider"; // Giả sử bạn đang sử dụng cart provider
import { ChevronsDown, ChevronsUp } from "lucide-react";

const ChefChoice = () => {
  const { addItem } = useCart(); // Thêm món ăn vào giỏ hàng
  const [dishes, setDishes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [activeIndex, setActiveIndex] = useState(0);

  // Lấy dữ liệu món ăn từ API
  useEffect(() => {
    axios
      .get("http://localhost:1111/dishes")
      .then((res) => {
        setDishes(res.data);

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

  // Lọc món ăn theo danh mục đã chọn
  const filteredDishes =
    selectedCategory === "Tất cả"
      ? dishes
      : dishes.filter((dish) => dish.category_id.name === selectedCategory);

  const handleAddToCart = (dish) => {
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
    <div className="w-full flex py-4 md:py-6 lg:10">
      <div className="hidden lg:block flex-1">
        <img
          src={ProductDecor}
          alt={"ProductDecor"}
          className="w-[850px] object-cover relative"
        />
      </div>

      <div className="flex-1 px-2 lg:px-5">
        <div className="flex flex-col">
          <div className="flex text-orange-1 max-w-[250px]">
            <p className="text-[23px] font-serif font-medium">Chef Choice</p>
            <div className="flex-1 flex items-center justify-between mt-[10px]">
              <p className="flex-1 w-[2px] h-[2px] bg-orange-1 ml-2"></p>
              <p className="w-[6px] h-[6px] rounded-full bg-orange-1"></p>
            </div>
          </div>

          <div className="pb-2 pt-1 text-[28px] font-serif font-semibold">
            Daily Special
          </div>
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
                <div className="w-full flex items-center justify-between">
                  <div className="w-[80px] h-[80px] flex items-center justify-center rounded-full overflow-hidden">
                    <img
                      src={dish.images[0]} // Hình ảnh món ăn
                      alt={dish.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="text-start flex-1 flex flex-col px-2">
                    <div className="flex">
                      <p className="flex-1 text-nowrap  font-semibold text-[19px]">
                        {dish.name}
                      </p>
                      <p className="w-full border-b border-dashed border-red-1 h-[18px] mx-1"></p>
                      <div className=" text-[20px] font-semibold text-orange-1 px-5">
                        {(dish.price)}đ {/* Định dạng tiền tệ */}
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

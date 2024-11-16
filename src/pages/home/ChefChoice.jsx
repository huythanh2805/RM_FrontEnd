import React, { useState } from "react"
import ProductDecor from "/imgs/Screen2.jpg"

import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import "swiper/css/effect-coverflow"
import "swiper/css/pagination"
import "swiper/css/navigation"

import { Navigation, Pagination } from "swiper/modules"
import { Button } from "@/components/ui/button"
import {
  ChevronsDown,
  ChevronsLeft,
  ChevronsRight,
  ChevronsUp,
} from "lucide-react"

const ChefChoice = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  return (
    <div className="w-full flex py-4 md:py-6 lg:10">
      <div className="hidden lg:block flex-1 ">
        <img
          src={ProductDecor}
          alt={"ProductDecor"}
          className="w-[850px] object-cover relative"
        />
      </div>

      <div className="flex-1  px-2 lg:px-5">

        <div className="flex flex-col">
          <div className="flex text-orange-1  max-w-[250px]">
            <p className="text-[23px] font-serif font-medium">chef choise</p>
            <div className="flex-1 flex items-center justify-between mt-[10px]">
             <p className="flex-1 w-[2px] h-[2px] bg-orange-1  ml-2"></p>
             <p className="w-[6px] h-[6px] rounded-full bg-orange-1"></p>
            </div>
          </div>

          <div className="pb-2 pt-1 text-[28px] font-serif font-semibold ">
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
            {[...Array(6).keys()].map((i) => (
              <SwiperSlide
                key={i}
                style={{ color: i === activeIndex ? "red" : "black" }} // Nền đỏ cho slide đầu tiên
              >
                <SwiperSlide>
                  <div className="w-full flex items-center justify-between">
                    <div className="w-[80px] h-[80px] flex items-center justify-center rounded-full overflow-hidden">
                      <img
                        src={ProductDecor}
                        alt={"ProductDecor"}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="text-start flex-1 flex flex-col px-2">
                      <div className="flex">
                        <p className="flex-1 text-nowrap font-serif font-semibold text-[19px]">
                          Mì xào xả ớt
                        </p>
                        <p className="w-full border-b border-dashed border-red-1 h-[18px] mx-1"></p>
                        <div className="font-serif text-[20px] font-semibold text-orange-1 px-5">
                          30$
                        </div>
                      </div>
                      <div className="max-w-[360px] truncate text-nowrap">
                        Lorem ipsum ametto maxime ut, perfer. Lorem ipsum dolor
                        sit, amet consectetur adipisicing elit. Consequuntur
                        tempore temporibus dignissimos voluptates officiis ut,
                        quaerat, labore blanditiis modi exercitationem quam
                        expedita. Fugit amet rem possimus at, necessitatibus ab
                        eius?
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="w-full">
            <div className=" slider-controler relative flex items-center justify-start max-w-[100px] py-6 md:py-10">
              <div className="mx-auto relative flex items-center justify-between">
                <button className="swiper-button-next slider-arrow relative w-fit hidden md:block">
                  <div className="min-w-10 dark:bg-dark-bg_2 flex items-center justify-center rounded-full shadow-main_shadow dark:shadow-button_shadow shadow-black/10 dark:shadow-blue-1 cursor-pointer active:shadow-inner">
                    <ChevronsDown className="text-orange-1 dark:text-dark-primaryColor w-[25px]" />
                  </div>
                </button>

                <button className="swiper-button-prev slider-arrow relative w-fit hidden md:block">
                  <div className="min-w-10 dark:bg-dark-bg_2 flex items-center justify-center rounded-full shadow-main_shadow dark:shadow-button_shadow shadow-black/10 dark:shadow-blue-1 cursor-pointer active:shadow-inner">
                    <ChevronsUp className="text-orange-1 dark:text-dark-primaryColor w-[25px]" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChefChoice

import React, { useState } from "react"
import {
  Autoplay,
  Controller,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import SectionTitle from "./SectionTitle"
import { FaFacebookF, FaGoogle, FaTwitter } from "react-icons/fa";
import { BiLogoInstagramAlt } from "react-icons/bi";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { cn } from "@/lib/utils";
const chefs =  [
    {
        image: '/chefs/chef_1.png',
        name: 'Luffy',
        role: 'Bếp trưởng'
    },
    {
        image: '/chefs/chef_3.png',
        name: 'Zoro',
        role: 'Bếp Phó'
    },
    {
        image: '/chefs/chef_4.png',
        name: 'Sanj',
        role: 'Đầu bếp'
    },
    {
        image: '/chefs/chef_2.png',
        name: 'Nami',
        role: 'Hoa tiêu'
    }
]
function Chefs() {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  return (
    <section>
      <SectionTitle title={"Gặp gỡ"} desc={"Những người đầu bếp tuyệt vời "} />

      <div className=" mx-auto relative sm:w-[450px] md:w-[768px] xl:w-[1136px]">
      <Swiper
        effect={"coverflow"}
        coverflowEffect={{
            rotate: 0,
            stretch: -10,
            depth: 30,
            modifier: 5,
            slideShadows: false,
        }}
        slidesPerView={3}
        loop={true}
        centeredSlides={true}
        speed={400} 
        spaceBetween={30}
        breakpoints={{
            0: {
                slidesPerView: 1.2,
              },
            640: {
                slidesPerView: 1.2,
                spaceBetween: 20,
              },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1228: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
        modules={[Navigation, EffectCoverflow]}
        navigation={{
            nextEl: ".swiper-chef_button-next",
            prevEl: ".swiper-chef_button-prev",
          }}  
        onActiveIndexChange={(swiper) => {
            setCurrentSlideIndex(swiper.realIndex); 
          }}
        style={{ width: "100%" }}
        className="mySwiper2 relative"
      >
       {
        chefs.map((item, index)=>(
            <SwiperSlide>
            <div className="w-[300px] flex flex-col gap-2">
            <div className=" w-full relative flex items-center justify-center">
               <img
                 className="w-[238px] h-[390px] relative z-20"
                 src={item.image}
                 alt="cheft"
               />
               <div className="absolute top-16 left-0 w-[300px] h-[300px]">
                 <div className={cn(
                    "w-full h-full rounded-full -z-50 shadow-panel",
                    currentSlideIndex === index && 'bg-orange-1'
                 )}/>
               </div>
             </div>
   
              <div className="w-full flex flex-col items-center">
               <p className="text-2xl font-bold text-orange-1 pt-3">{item.name}</p>
               <p className="font-sans font-medium text-gray-1">
                  {item.role}
               <div className="separate_line my-4"/>
               </p>
   
               <div className="socialMedia w-full flex justify-center items-center gap-4">
               <FaFacebookF className="w-[20px] h-[20px] text-gray-1 cursor-pointer hover:text-orange-1 transition-all duration-300"/>
               <BiLogoInstagramAlt className="w-[25px] h-[25px] text-gray-1 cursor-pointer hover:text-orange-1 transition-all duration-300"/>
               <FaTwitter className="w-[20px] h-[20px] text-gray-1 cursor-pointer hover:text-orange-1 transition-all duration-300"/>
               <FaGoogle className="w-[20px] h-[20px] text-gray-1 cursor-pointer hover:text-orange-1 transition-all duration-300"/>
               </div>
              </div>
            </div>
           </SwiperSlide>
        ))
       }
      </Swiper>
      <div className="swiper-chef_button-prev slider-arrow absolute z-20 top-[50%]  left-[-100px] w-fit hidden lg:block">
                <div className="flex items-center group">
                <div className="min-w-10 min-h-10 border group-hover:border-orange-1 flex items-center justify-center rounded-full shadow-main_shadow shadow-black/10cursor-pointer active:shadow-inner">
                  <IoIosArrowBack  className="text-[#e5e7eb] group-hover:text-orange-1 dark:text-dark-primaryColor w-8 h-8" />
                </div>
                <div className="h-[1px] bg-[#e5e7eb] group-hover:bg-orange-1 w-[50px]"/>
                </div>
          </div>

        <div className="swiper-chef_button-next slider-arrow absolute z-20 top-[50%] right-[-100px] xl:right-[-50px] w-fit hidden lg:block">
                <div className="flex items-center group">
                <div className="order-2 min-w-10 min-h-10 border group-hover:border-orange-1 dark:bg-dark-bg_2 flex items-center justify-center rounded-full shadow-main_shadow dark:shadow-button_shadow shadow-black/10 dark:shadow-blue-1 cursor-pointer active:shadow-inner">
                  <IoIosArrowForward className="text-[#e5e7eb] group-hover:text-orange-1 dark:text-dark-primaryColor w-8 h-8" />
                </div>
                <div className="order-1 h-[1px] bg-[#e5e7eb] group-hover:bg-orange-1 w-[50px]"/>
                </div>
          </div>
      </div>
    </section>
  )
}

export default Chefs

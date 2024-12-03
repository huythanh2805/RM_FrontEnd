import React, { useRef, useState } from 'react';
import { Autoplay, Controller, EffectCoverflow, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SiComma } from "react-icons/si";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';

import { FreeMode, Thumbs } from 'swiper/modules';
import { ChevronsLeft, ChevronsRight } from 'lucide-react';
const testimonials = [
  {
    image: 'https://swiperjs.com/demos/images/nature-1.jpg',
    name: "Thanh",
    role: "Client",
    comment: '1 Lorem ipsum dolor sit amet consectetur adipisicing elit.  Aut a omnis debitis? Laborum sit quidem quam olor sit amet consectetur adipisicing elit. Aut a omnis debitis? Laborum sit quidem quam'
  },
  {
    image: 'https://swiperjs.com/demos/images/nature-2.jpg',
    name: "Thanh",
    role: "Client",
    comment: '2 Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut a omnis debitis? Laborum sit quidem quam'
  },
  {
    image: 'https://swiperjs.com/demos/images/nature-3.jpg',
    name: "Thanh",
    role: "Client",
    comment: '3 Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut a omnis debitis? Laborum sit quidem quam'
  },
  {
    image: 'https://swiperjs.com/demos/images/nature-4.jpg',
    name: "Thanh",
    role: "Client",
    comment: '4 Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut a omnis debitis? Laborum sit quidem quam'
  },
  {
    image: 'https://swiperjs.com/demos/images/nature-5.jpg',
    name: "Thanh",
    role: "Client",
    comment: '5 Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut a omnis debitis? Laborum sit quidem quam'
  },
]
function Testimonial() {
  const [firstSwiper, setFirstSwiper] = useState(null);
  const [secondSwiper, setSecondSwiper] = useState(null);
  return (
    <div className='container'>
      <div className="py-4 md:py-6 flex items-center justify-center">
        <div className="min-w-fit flex flex-col place-items-center">
          <div className="w-full flex items-center justify-center">
            <div className="h-[1px] relative w-full bg-orange-1 flex-1">
              <span className="w-1 h-1 rounded-full bg-orange-1 absolute top-0 left-0 translate-y-[-50%]"></span>
            </div>
            <h5 className="text-[28px] text-orange-1 mx-1">Testimonial </h5>
            <div className="relative h-[1px] w-full bg-orange-1 flex-1">
              <span className="w-1 h-1 rounded-full bg-orange-1 absolute top-0 right-0 translate-y-[-50%]"></span>
            </div>
          </div>
          <h5 className="text-[35px] rancho">Nhận xét của khách</h5>
        </div>
      </div>

      <div className="max-w-[500px] mx-auto">
        <Swiper
          slidesPerView={1.0001}
          onSwiper={setFirstSwiper}
          controller={{ control: secondSwiper }}
          loop={true}
          centeredSlides={true}
          speed={800} // Tốc độ chuyển động
          navigation={true}
          spaceBetween={150}
          modules={[Navigation, Controller]}
          style={{ height: "130px", width: "100%" }}
          className="mySwiper2"
        >
          {
            testimonials.map(item=>(
              <SwiperSlide className='relative overflow-visible'>
             <div className='font-sans px-4 pt-3 text-wrap h-[130px] truncate flex flex-col gap-2 justify-between items-center cursor-default'>
               <div className='max-h-[72px] overflow-hidden truncate text-ellipsis text-wrap text-center px-2'>{item.comment}</div>
               <div>
                <span className='rancho text-2xl'>{item.name}</span>
                 <span className='mx-1 text-gray-1'>|</span>
                 <span className='rancho text-xl text-gray-1'>{item.role}</span>
               </div>
             </div>

             <div className='absolute w-[30px] h-[30px] z-20 flex items-center justify-center  top-0 left-0'>
             <div className='flex items-center gap-[-4px]'>
             <SiComma className='text-orange-1 scale-x-[-1]'/>
             </div>
             </div>
            </SwiperSlide>
            ))
          }
          
        </Swiper>

        <div className='flex gap-1 items-center'>
        <div className='separate_line flex-1 h-[1px]'/>
        <Swiper
          effect={"coverflow"}
          slidesPerView={1.8}
          spaceBetween={-18}
          loop={true}
          centeredSlides={true}
          speed={800} // Tốc độ chuyển động
          watchSlidesProgress={true} // Theo dõi tiến trình slide
          modules={[Navigation, Controller, EffectCoverflow]}
          navigation={{
            nextEl: ".swiper-testimonial_button-next",
            prevEl: ".swiper-testimonial_button-prev",
          }}
          onSwiper={setSecondSwiper}
          coverflowEffect={{
            rotate: 3,
            stretch: 0,
            depth: 100,
            modifier: 5,
            slideShadows: false,
          }}
          controller={{ control: firstSwiper }}
          className="mySwiper  relative"
          style={{ height: "100px", width: "180px" }}
        >
          {testimonials.map((item) => (
            <SwiperSlide className="flex items-center justify-center min-w-[64px] min-h-[64px]">
              <div className="w-[64px] h-[64px] rounded-full flex items-center justify-center overflow-hidden border-[2px] border-orange-1">
                <img className=" w-full h-full object-cover" src={item.image} />
              </div>
            </SwiperSlide>
          ))}
          <div className="swiper-testimonial_button-prev slider-arrow absolute z-20 top-[27px] left-0 w-fit">
                <div className="w-12 h-12 dark:bg-dark-bg_2 flex items-center justify-center rounded-full shadow-main_shadow dark:shadow-button_shadow shadow-black/10 dark:shadow-blue-1 cursor-pointer active:shadow-inner">
                  {/* <ChevronsLeft className="text-orange-1 dark:text-dark-primaryColor w-12 h-12" /> */}
                </div>
          </div>

           <div className="swiper-testimonial_button-next slider-arrow absolute top-[27px]  z-20 right-0 w-fit">
              <div className="w-12 h-12 dark:bg-dark-bg_2 flex items-center justify-center rounded-full shadow-main_shadow dark:shadow-button_shadow shadow-black/10 dark:shadow-blue-1 cursor-pointer ">
                {/* <ChevronsRight className="text-orange-1 dark:text-dark-primaryColor w-12 h-12" /> */}
              </div>
            </div>

        </Swiper>
        <div className='separate_line flex-1 h-[1px]'/>
        </div>
      </div>
    </div>
  )
}

export default Testimonial

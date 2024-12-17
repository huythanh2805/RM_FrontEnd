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
import SectionTitle from './SectionTitle';
import { useThemeContext } from '@/contexts/ThemeProvider';
const testimonials = [
  {
    image: 'https://swiperjs.com/demos/images/nature-1.jpg',
    name: "Thanh",
    role: "Khách hàng",
    comment: 'Tôi thực sự ấn tượng với chất lượng món ăn tại đây. Từng món ăn được trình bày rất bắt mắt, hương vị đậm đà và chuẩn vị. Ngoài ra, nhân viên phục vụ vô cùng chu đáo, thân thiện và luôn sẵn sàng hỗ trợ. Đây là một nơi lý tưởng để thưởng thức các món ăn ngon cùng gia đình và bạn bè.',
  },
  {
    image: 'https://swiperjs.com/demos/images/nature-2.jpg',
    name: "Lan",
    role: "Khách hàng",
    comment: 'Không gian của quán rất rộng rãi và thoải mái, với thiết kế hiện đại nhưng vẫn mang nét ấm cúng. Tôi cảm thấy thư giãn khi ngồi đây thưởng thức bữa ăn. Món ăn được phục vụ rất nhanh, nóng hổi và ngon miệng. Nhìn chung, tôi hoàn toàn hài lòng với trải nghiệm tại đây.',
  },
  {
    image: 'https://swiperjs.com/demos/images/nature-3.jpg',
    name: "Minh",
    role: "Khách hàng",
    comment: 'Đây là một trong những nhà hàng mà tôi thích nhất! Các món ăn rất đa dạng, phù hợp với khẩu vị của mọi người. Tôi đặc biệt thích các món nướng vì chúng được chế biến rất vừa miệng và thơm ngon. Giá cả cũng rất hợp lý so với chất lượng. Chắc chắn tôi sẽ quay lại nhiều lần nữa.',
  },
  {
    image: 'https://swiperjs.com/demos/images/nature-4.jpg',
    name: "Hoa",
    role: "Khách hàng",
    comment: 'Tôi đã thử rất nhiều món tại quán và mỗi món đều mang một hương vị riêng biệt, rất độc đáo. Đặc biệt, tôi thích cách quán chú trọng đến việc sử dụng nguyên liệu tươi ngon và đảm bảo vệ sinh an toàn thực phẩm. Đây là một điểm cộng lớn khiến tôi tin tưởng và yêu thích nơi này.',
  },
  {
    image: 'https://swiperjs.com/demos/images/nature-5.jpg',
    name: "Phúc",
    role: "Khách hàng",
    comment: 'Một trải nghiệm ăn uống tuyệt vời! Tôi thích nhất là cách các món ăn được chế biến một cách tỉ mỉ, từ phần nguyên liệu đến cách nêm nếm. Nhân viên phục vụ rất nhiệt tình, luôn tươi cười và sẵn sàng giải đáp mọi thắc mắc. Đây chắc chắn là một địa điểm mà tôi sẽ giới thiệu cho gia đình và bạn bè của mình.',
  },
];

function Testimonial() {
  const [firstSwiper, setFirstSwiper] = useState(null);
  const [secondSwiper, setSecondSwiper] = useState(null);
  const { colorCode } = useThemeContext();
  return (
    <div className='container'>
        <SectionTitle title={'ĐÁNH GIÁ'} desc={'Nhận xét của khách'} />
        

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
             <SiComma className='text-orange-1 scale-x-[-1]'style={{color: colorCode}}/>
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

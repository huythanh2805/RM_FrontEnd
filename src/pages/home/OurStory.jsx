import ButtonCustome from '@/components/ButtonCustome';
import { useThemeContext } from '@/contexts/ThemeProvider';
import React, { useEffect, useRef, useState } from 'react';

const OurStory = () => {
  const { colorCode } = useThemeContext();
  const [isVisible, setIsVisible] = useState(false);
  const imagesRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 } // Chỉ khi 10% phần tử được nhìn thấy
    );

    if (imagesRef.current) {
      observer.observe(imagesRef.current);
    }

    return () => {
      if (imagesRef.current) {
        observer.unobserve(imagesRef.current);
      }
    };
  }, []);

  return (
    <div className="flex flex-wrap items-start justify-between py-12 px-6 lg:px-20">
      <div ref={imagesRef} className="w-full lg:w-1/2 grid grid-cols-2 gap-4">
        <div
          className={`col-span-1 row-span-2 transition-all duration-700 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <img
            src="imgs/Screenshot.png"
            alt="Món chính"
            className="w-full h-[480px] object-cover shadow-lg rounded transition-transform transform hover:scale-105 hover:opacity-90" // Hiệu ứng hover
          />
        </div>
        <div
          className={`col-span-1 transition-all duration-700 transform delay-200 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <img
            src="imgs/Screen2.jpg"
            alt="Món phụ"
            className="w-full h-auto object-cover shadow-lg rounded transition-transform transform hover:scale-105 hover:opacity-90" // Hiệu ứng hover
          />
        </div>
        <div
          className={`col-span-1 row-span-1 transition-all duration-700 transform delay-400 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <img
            src="imgs/Screenshot3.png"
            alt="Món khác"
            className="w-full h-auto object-cover shadow-lg rounded transition-transform transform hover:scale-105 hover:opacity-90" // Hiệu ứng hover
          />
        </div>
      </div>

      <div className="w-full lg:w-1/2 lg:pl-8 mt-8 lg:mt-0 flex flex-col items-center">
        <div className="text-xl font-semibold mb-2 flex justify-center items-center" style={{ color: colorCode }}>
          <div className="border-t w-12 mr-2" style={{ borderColor: colorCode }} />
          KHÁM PHÁ
          <div className="border-t w-12 ml-2" style={{ borderColor: colorCode }} />
        </div>
        <h2 className="text-5xl font-bold mb-4 text-center">Câu Chuyện Của Chúng Tôi</h2>
        <h4 className="text-xl font-semibold mb-6 text-center">
          Chúng tôi có khởi đầu vinh quang trong lĩnh vực nhà hàng
        </h4>
        <p className="text-gray-800 mb-6 text-center">
          Tại Golden Fork, mỗi món ăn đều là một tác phẩm nghệ thuật, được chế biến từ những nguyên liệu tươi ngon nhất. Chúng tôi tự hào mang đến cho thực khách không chỉ những bữa ăn ngon miệng mà còn là những trải nghiệm đáng nhớ. Với một câu chuyện đầy đam mê và sự sáng tạo, chúng tôi đã xây dựng nhà hàng này để mang đến cho bạn không gian ấm cúng, nơi bạn có thể thưởng thức ẩm thực đa dạng từ khắp nơi trên thế giới.
        </p>
        <ButtonCustome buttonText="Giới Thiệu" />
      </div>
    </div>
  );
};

export default OurStory;

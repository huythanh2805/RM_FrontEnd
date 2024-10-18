import { useThemeContext } from '@/contexts/ThemeProvider';
import React, { useState, useEffect } from 'react';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { colorCode } = useThemeContext();

  // Hàm cuộn về đầu trang
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Hiển thị hoặc ẩn nút khi người dùng scroll
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 w-12 h-12 text-white rounded-full flex items-center justify-center transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        visibility: isVisible ? 'visible' : 'hidden',
        backgroundColor: colorCode,
        zIndex: 50,
      }}
    >
      ↑
    </button>
  );
};

export default ScrollToTopButton;

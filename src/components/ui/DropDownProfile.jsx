import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const DropDownProfile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    // Thêm sự kiện lắng nghe khi component mount
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Gỡ bỏ sự kiện lắng nghe khi component unmount
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsOpen(true)} // Mở dropdown khi hover
      onMouseLeave={() => setIsOpen(false)} // Đóng dropdown khi không hover
      ref={dropdownRef}
    >
      <button onClick={handleToggle} className="focus:outline-none flex items-center">
        <img
          src="https://doanhnhanphaply.vn/wp-content/uploads/2024/09/anh-meo-vo-tri-1.jpg" 
          alt="Avatar"
          className="h-8 w-8 rounded-full object-cover"
        />
        <span className="ml-2 hover:text-blue-500">Tài khoản</span>
      </button>

      {isOpen && (
        <div className="dropDownProfile p-4 bg-white rounded-lg shadow-lg border border-gray-200">
          <Link to="/profile" className="block w-full py-2 mb-2 text-center hover:bg-gray-200 transition-all rounded-lg">
            Profile
          </Link>
          <Link to="/signin" className="block w-full py-2 mb-2 text-center hover:bg-gray-200 transition-all rounded-lg">
            Đăng nhập
          </Link>
          <Link to="/signup" className="block w-full py-2 mb-2 text-center hover:bg-gray-200 transition-all rounded-lg">
            Đăng ký
          </Link>
          <button className="w-full py-2 mt-2 text-center hover:bg-gray-200 transition-all rounded-lg">
            Đăng xuất
          </button>
        </div>
      )}
    </div>
  );
};

export default DropDownProfile;

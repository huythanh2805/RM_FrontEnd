import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
        <img src="imgs/notfound.png" alt="" />
      <h2 className="text-3xl font-semibold text-gray-600 mb-6">Oops...! Không tìm thấy trang</h2>
      <p className="text-lg text-gray-500 mb-8">
      Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
      </p>
      <Link to="/" className="bg-orange-600 text-white px-6 py-3 rounded-full hover:bg-orange-700 transition-all">
        Trở Về Trang Chủ
      </Link>
    </div>
  );
};

export default NotFound;

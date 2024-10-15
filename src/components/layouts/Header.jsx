import React from "react";
import { Link } from "react-router-dom";
import DropDownProfile from "../ui/DropDownProfile";

const Header = () => {
  return (
    <div className="fixed w-full">
      <div>
        <div className="flex flex-row justify-between p-5 md:px-32 px-5 bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
          <div className="flex flex-row items-center cursor-pointer">
            <span>
              <img
                src="https://restaurant-management-app-ten.vercel.app/_next/image?url=%2Fimages%2Flogo2.png&w=256&q=75"
                alt=""
                className="h-16 w-16 object-cover rounded-full"
              />
            </span>
            <h1 className="text-xl font-semibold">Golden Fork</h1>
          </div>
          <nav className="hidden md:flex flex-row items-center text-lg font-medium gap-8">
            <Link to="/" className="hover:text-blue-500 transition-all cursor-pointer">Home</Link>
            <Link to="/menu" className="hover:text-blue-500 transition-all cursor-pointer">Menu</Link>
            <Link to="/about" className="hover:text-blue-500 transition-all cursor-pointer">About</Link>
            <Link to="/blog" className="hover:text-blue-500 transition-all cursor-pointer">Blog</Link>
          </nav>
          <DropDownProfile/>
        </div>
      </div>
    </div>
  );
};

export default Header;

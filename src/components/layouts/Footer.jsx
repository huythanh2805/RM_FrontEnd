import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-black text-white rounded-t-3xl mt-8 md:mt-0">
      <div className="flex flex-col md:flex-row justify-between p-8 md:px-32 px-5">
        <div className="w-full md:w-1/4">
          <h1 className="font-semibold text-xl pb-4">Golden Fork</h1>
          <p className="text-sm">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio nemo
            ullam nostrum unde dolor reprehenderit quam nulla esse consectetur,
            cum quaerat ut qui est recusandae mollitia corporis quas facere
            nesciunt.
          </p>
        </div>
        <div>
            <h1 className="font-medium text-xl pb-4 pt-5 md:pt-0">Links</h1>
            <nav className="flex flex-col gap-2">
            <Link to="/" className="hover:text-blue-500 transition-all cursor-pointer">Home</Link>
            <Link to="/menu" className="hover:text-blue-500 transition-all cursor-pointer">Menu</Link>
            <Link to="/about" className="hover:text-blue-500 transition-all cursor-pointer">About</Link>
            <Link to="/blog" className="hover:text-blue-500 transition-all cursor-pointer">Blog</Link>
            </nav>
        </div>
        <div>
            <h1 className="font-medium text-xl pb-4 pt-5 md:pt-0">Menu</h1>
            <nav className="flex flex-col gap-2">
            <Link to="/" className="hover:text-blue-500 transition-all cursor-pointer">Ours Dishes</Link>
            <Link to="/" className="hover:text-blue-500 transition-all cursor-pointer">Premium Menu</Link>
            </nav>
        </div>
        <div>
            <h1 className="font-medium text-xl pb-4 pt-5 md:pt-0">Contact Us</h1>
            <nav className="flex flex-col gap-2">
            <Link to="/" className="hover:text-blue-500 transition-all cursor-pointer">GoldenFork@gmail.com</Link>
            <Link to="/" className="hover:text-blue-500 transition-all cursor-pointer">+84 666 888</Link>
            <Link to="/" className="hover:text-blue-500 transition-all cursor-pointer">Social Media</Link>
            </nav>
        </div>
      </div>
      <div>
        <p className="text-center py-4"> @copyright developed by <span className="text-blue-500">Golden Fork</span> | All right reserved</p>
      </div>
    </div>
  );
};

export default Footer;

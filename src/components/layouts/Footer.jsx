import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { CiClock2 } from "react-icons/ci";

const Footer = () => {
  return (
    <div className="relative bg-black text-white mt-8 md:mt-0">
      <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: "url('https://media.istockphoto.com/id/1836907127/photo/roasted-lamb-on-green-beans-with-potato.jpg?s=612x612&w=0&k=20&c=tpdRhv_7sbUxHrhMXw32ReqgxuGOuEw06WIXjtA68uM=')" }}></div>
      <div className="relative flex flex-col md:flex-row justify-between p-8 md:px-32 px-5 z-10">
        <div className="w-full md:w-1/4">
          <Link to="/" className="flex flex-row items-center cursor-pointer">
            <img
              src="https://restaurant-management-app-ten.vercel.app/_next/image?url=%2Fimages%2Flogo2.png&w=256&q=75"
              alt="Golden Fork Logo"
              className="h-[120px] w-30 object-cover rounded-full"
            />
          </Link>
          <h1 className="text-xl font-semibold font-serif mt-4">Golden Fork</h1>
          <hr className="pt-2" />
          <p className="text-white text-sm max-w-xs mx-auto md:mx-0">
            Lorem ipsum, dolor sit amet consectetur adipisicing elitercitationem
            neque repellendus necessitatibus nam sit ducimus officia laborum!
          </p>
          <div className="flex justify-center md:justify-start space-x-4 mt-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500"
            >
              <FaFacebookF className="text-2xl" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500"
            >
              <FaTwitter className="text-2xl" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500"
            >
              <FaInstagram className="text-2xl" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-500"
            >
              <FaYoutube className="text-2xl" />
            </a>
          </div>
        </div>
        
        {/* Open Hours Section */}
        <div>
          <h1 className="font-semibold font-serif text-xl pb-4 pt-5 md:pt-0">Open Hours</h1>
          <hr className="pt-2" />
          <ul className="space-y-2 text-white">
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day, index) => (
              <div className="flex items-center" key={index}>
                <CiClock2 className="mr-2 text-orange-500" />
                <li>{day}: {day === "Saturday" || day === "Sunday" ? "10AM - 11PM" : "9AM - 10PM"}</li>
              </div>
            ))}
          </ul>
        </div>
        
        {/* Links Section */}
        <div>
          <h1 className="font-semibold font-serif text-xl pb-4 pt-5 md:pt-0">Links</h1>
          <hr className="pt-2" />
          <ul className="space-y-2">
            {["Home", "About", "Menu", "Reservation", "Contact", "Blog"].map((link, index) => (
              <li key={index}>
                <Link to={`/${link.toLowerCase()}`} className="hover:text-orange-500">{link}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company Section */}
        <div>
          <h3 className="font-semibold font-serif text-xl pb-4 pt-5 md:pt-0">Company</h3>
          <hr className="pt-2" />
          <ul className="space-y-2">
            {["Team & Condition", "Privacy Policy", "Cookie Policy"].map((company, index) => (
              <li key={index}>
                <Link to={`/${company.toLowerCase().replace(/ & /, "-")}`} className="hover:text-orange-500">{company}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Copyright Section */}
      <div className="relative mt-8">
        <div className="border-t-0 border-b border-transparent" aria-hidden="true">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
        </div>
        <div className="pt-4">
          <p className="text-center text-sm text-white">
            Copyright © 2024 <span className="text-orange-500">GOLDEN FORK</span>. All Rights Reserved
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;

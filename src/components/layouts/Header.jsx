import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gray-600 py-2 px-4 flex justify-between items-center">
      <Link to="/" className="flex items-center">
        <img 
          src="https://restaurant-management-app-ten.vercel.app/_next/image?url=%2Fimages%2Flogo2.png&w=256&q=75" 
          alt="Golden Fork Logo" 
          width={70} 
        />
        <span className="text-white text-2xl font-bold ml-2">Golden Fork</span>
      </Link>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="text-white hover:underline">Home</Link>
          </li>
          <li>
            <Link to="/about" className="text-white hover:underline">About</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

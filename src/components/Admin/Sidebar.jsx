import React, { useState } from "react";
import { AiFillGolden, AiFillProduct } from "react-icons/ai";
import { FaHome, FaRegMoneyBillAlt } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { MdCategory, MdRememberMe } from "react-icons/md";
import { SiAirtable } from "react-icons/si";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <div
      className={`transition-all duration-300 ${
        isCollapsed ? "w-28" : "xl:w-80 w-80"
      } xl:p-4 p-2 bg-white flex-col justify-start items-start gap-5 inline-flex border-r`}
    >
      <div className="w-full pt-4 justify-between items-center gap-2.5 inline-flex">
        <Link to="/" className="flex flex-row items-center cursor-pointer">
          <img
            src="/imgs/logoGolden.webp"
            alt="Golden Fork Logo"
            className="h-16 w-16 object-cover rounded-full"
          />
          {!isCollapsed && (
            <h1 className="text-xl font-semibold font-serif">Golden Fork</h1>
          )}
        </Link>
        <a
          href="javascript:;"
          className="w-6 h-6 relative bg-white"
          onClick={toggleSidebar}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="Menu">
              <rect width="24" height="24" fill="white" />
              <path
                id="icon"
                d="M13 6H21M3 12H21M7 18H21"
                stroke="#1F2937"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </g>
          </svg>
        </a>
      </div>

      {/* Menu */}
      <div className="w-full">
        <ul
          className={`flex-col gap-1 flex ${isCollapsed ? "items-center" : ""}`}
        >
          <li>
            <Link to="/admin">
              <div className="flex-col flex p-3 bg-white rounded-lg">
                <div className="h-5 gap-3 flex items-center">
                  <FaHome />
                  {!isCollapsed && (
                    <h2 className="text-gray-500 text-sm font-medium leading-snug">
                      Home
                    </h2>
                  )}
                </div>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/admin/users">
              <div className="flex-col gap-1 flex">
                <div className="flex-col flex p-3 bg-white rounded-lg">
                  <div className="h-5 gap-3 flex">
                    <div className="relative">
                      <FaUserGroup />
                    </div>
                    {!isCollapsed && (
                      <h2 className="text-gray-500 text-sm font-medium leading-snug">
                        Account
                      </h2>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/admin/categories">
              <div className="flex-col gap-1 flex">
                <div className="flex-col flex p-3 bg-white rounded-lg">
                  <div className="h-5 gap-3 flex">
                    <div className="relative">
                      <MdCategory />
                    </div>
                    {!isCollapsed && (
                      <h2 className="text-gray-500 text-sm font-medium leading-snug">
                        Categories
                      </h2>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          </li>

          <li>
            <Link to={"/admin/dishes"}>
              <div className="flex-col flex">
                <div className="flex-col flex p-3 bg-white rounded-lg">
                  <div className="justify-between inline-flex">
                    <a href="javascript:;" className="h-5 gap-3 flex">
                      <div className="relative">
                        <AiFillProduct />
                      </div>
                      {!isCollapsed && (
                        <h2 className="text-gray-500 text-sm font-medium leading-snug">
                          Dishes
                        </h2>
                      )}
                    </a>
                  </div>
                </div>
              </div>
            </Link>
            {/* <div className="flex-col flex">
              <div className="flex-col flex p-3 bg-white rounded-lg">
                <div className="justify-between inline-flex">
                  <a href="javascript:;" className="h-5 gap-3 flex">
                    <div className="relative">
                      <AiFillProduct />
                    </div>
                    <h2 className="text-gray-500 text-sm font-medium leading-snug">
                      Dishes
                    </h2>
                  </a>
                </div>
              </div>
            </div> */}
          </li>

          <li>
            <Link to={"/admin/setCombos"}>
              <div className="flex-col flex">
                <div className="flex-col flex p-3 bg-white rounded-lg">
                  <div className="justify-between inline-flex">
                    <a href="javascript:;" className="h-5 gap-3 flex">
                      <div className="relative">
                        <AiFillGolden />
                      </div>
                      {!isCollapsed && (
                        <h2 className="text-gray-500 text-sm font-medium leading-snug">
                          Combo
                        </h2>
                      )}
                    </a>
                  </div>
                </div>
              </div>
            </Link>
          </li>

          <li>
            <Link to="/admin/tables">
              <div className="flex-col gap-1 flex">
                <div className="flex-col flex bg-white rounded-lg p-3">
                  <div className="h-5 gap-3 flex">
                    <div className="relative">
                      <SiAirtable />
                    </div>
                    {!isCollapsed && (
                      <h2 className="text-gray-500 text-sm font-medium leading-snug">
                        Table
                      </h2>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/admin/employees">
              <div className="flex-col gap-1 flex">
                <div className="flex-col flex bg-white rounded-lg p-3">
                  <div className="h-5 gap-3 flex">
                    <div className="relative">
                      <MdRememberMe />
                    </div>
                    {!isCollapsed && (
                      <h2 className="text-gray-500 text-sm font-medium leading-snug">
                        Employee
                      </h2>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/admin/bills">
              <div className="flex-col gap-1 flex">
                <div className="flex-col flex bg-white rounded-lg p-3">
                  <div className="h-5 gap-3 flex">
                    <div className="relative">
                      <FaRegMoneyBillAlt />
                    </div>
                    {!isCollapsed && (
                      <h2 className="text-gray-500 text-sm font-medium leading-snug">
                        Bills
                      </h2>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

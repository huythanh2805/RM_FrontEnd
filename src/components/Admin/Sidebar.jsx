import React from "react";
import { AiFillProduct } from "react-icons/ai";
import { FaHome, FaRegMoneyBillAlt } from "react-icons/fa";
import { MdAccountCircle, MdCategory } from "react-icons/md";
import { SiAirtable } from "react-icons/si";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div class="xl:w-96 w-80 xl:p-4 p-2 bg-white flex-col justify-start items-start gap-5 inline-flex border-r">
      <div class="w-full pt-4 justify-between items-center gap-2.5 inline-flex">
        <p>Golden Pork</p>
        <a href="javascript:;" class="w-6 h-6 relative bg-white">
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
                stroke-width="1.6"
                stroke-linecap="round"
              />
            </g>
          </svg>
        </a>
      </div>
      <div class="w-full p-3 rounded-lg border border-gray-300">
        <div class="w-full items-center flex">
          <div class="w-full justify-between items-center inline-flex">
            <div class="items-center flex">
              {/* <img
                class="rounded-lg"
                alt="Ronald image"
                src="https://pagedone.io/asset/uploads/1701235464.png"
              /> */}
              <div class="flex-col inline-flex ml-2.5">
                <h2 class="text-gray-700 text-sm font-semibold leading-snug">
                  Admin
                </h2>
                <h6 class="text-black/20 text-xs font-normal leading-4">
                  123@gmail.com
                </h6>
              </div>
            </div>
            <div class="flex items-center">
              <a href="javascript:;" class="w-5 h-5 relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <g id="More Vertical">
                    <path
                      id="icon"
                      d="M10.0156 14.9896V15.0396M10.0156 9.97595V10.026M10.0156 4.96228V5.01228"
                      stroke="black"
                      stroke-width="2.5"
                      stroke-linecap="round"
                    />
                  </g>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div class="w-full">
        <div class="w-full h-8 px-3 items-center flex">
          <h6 class="text-gray-500 text-xs font-semibold leading-4">MENU</h6>
        </div>
        <ul class="flex-col gap-1 flex">
          <li>
            <Link to="/dashboard">
              <div class="flex-col flex p-3 bg-white rounded-lg">
                <div class="h-5 gap-3 flex">
                  <div class="relative">
                    <FaHome />
                  </div>
                  <h2 class="text-gray-500 text-sm font-medium leading-snug">
                    Home
                  </h2>
                </div>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/categories">
              <div class="flex-col gap-1 flex">
                <div class="flex-col flex p-3 bg-white rounded-lg">
                  <div class="h-5 gap-3 flex">
                    <div class="relative">
                      <MdCategory />
                    </div>
                    <h2 class="text-gray-500 text-sm font-medium leading-snug">
                      Categories
                    </h2>
                  </div>
                </div>
              </div>
            </Link>
          </li>
          <li>
            <div class="flex-col flex">
              <div class="flex-col flex p-3 bg-white rounded-lg">
                <div class="justify-between inline-flex">
                  <a href="javascript:;" class="h-5 gap-3 flex">
                    <div class="relative">
                      <AiFillProduct />
                    </div>
                    <h2 class="text-gray-500 text-sm font-medium leading-snug">
                      Dishes
                    </h2>
                  </a>
                </div>
              </div>
            </div>
          </li>
          <li>
            <a href="javascript:;">
              <div class="flex-col gap-1 flex">
                <div class="flex-col flex bg-white rounded-lg p-3">
                  <div class="h-5 gap-3 flex">
                    <div class="relative">
                      <SiAirtable />
                    </div>
                    <h2 class="text-gray-500 text-sm font-medium leading-snug">
                      Table
                    </h2>
                  </div>
                </div>
              </div>
            </a>
          </li>
          <li>
            <a href="javascript:;">
              <div class="flex-col gap-1 flex">
                <div class="flex-col flex bg-white rounded-lg p-3">
                  <div class="h-5 gap-3 flex">
                    <div class="relative">
                      <FaRegMoneyBillAlt />
                    </div>
                    <h2 class="text-gray-500 text-sm font-medium leading-snug">
                      Bill
                    </h2>
                  </div>
                </div>
              </div>
            </a>
          </li>
        </ul>
      </div>

      {/* setting */}
      <div class="w-full flex-col flex">
        <div class="h-8 px-3 items-center inline-flex">
          <h6 class="text-gray-500 text-xs font-semibold leading-4">
            SETTINGS
          </h6>
        </div>
        <ul class="flex-col gap-1 flex">
          <li>
            <a href="javascript:;">
              <div class="p-3 rounded-lg items-center inline-flex">
                <div class="h-5 items-center gap-3 flex">
                  <div class="relative">
                    <MdAccountCircle />
                  </div>
                  <h2 class="text-gray-500 text-sm font-medium leading-snug">
                    Profile
                  </h2>
                </div>
              </div>
            </a>
          </li>

          <li>
            <a href="javascript:;">
              <div class="p-3 rounded-lg items-center inline-flex">
                <div class="h-5 items-center gap-3 flex">
                  <div class="relative">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <g id="Help circle">
                        <path
                          id="icon"
                          d="M6.89302 7.67903C6.89302 8.12086 7.2512 8.47903 7.69302 8.47903C8.13485 8.47903 8.49302 8.12086 8.49302 7.67903H6.89302ZM9.41044 11.9928C9.41044 12.4346 9.76861 12.7928 10.2104 12.7928C10.6523 12.7928 11.0104 12.4346 11.0104 11.9928H9.41044ZM9.97915 13.7854C9.53732 13.7854 9.17915 14.1436 9.17915 14.5854C9.17915 15.0273 9.53732 15.3854 9.97915 15.3854V13.7854ZM10.0208 15.3854C10.4626 15.3854 10.8208 15.0273 10.8208 14.5854C10.8208 14.1436 10.4626 13.7854 10.0208 13.7854V15.3854ZM16.7 10C16.7 13.7003 13.7003 16.7 10 16.7V18.3C14.584 18.3 18.3 14.584 18.3 10H16.7ZM10 16.7C6.29969 16.7 3.3 13.7003 3.3 10H1.7C1.7 14.584 5.41604 18.3 10 18.3V16.7ZM3.3 10C3.3 6.29969 6.29969 3.3 10 3.3V1.7C5.41604 1.7 1.7 5.41604 1.7 10H3.3ZM10 3.3C13.7003 3.3 16.7 6.29969 16.7 10H18.3C18.3 5.41604 14.584 1.7 10 1.7V3.3ZM8.49302 7.67903C8.49302 7.14654 8.68796 6.80331 8.93991 6.58348C9.20767 6.34985 9.58974 6.21456 10 6.21456C10.4103 6.21456 10.7923 6.34985 11.0601 6.58348C11.312 6.80331 11.507 7.14654 11.507 7.67903H13.107C13.107 6.70187 12.7252 5.91287 12.112 5.37787C11.5146 4.85667 10.7432 4.61456 10 4.61456C9.25677 4.61456 8.48535 4.85667 7.888 5.37787C7.27483 5.91287 6.89302 6.70187 6.89302 7.67903H8.49302ZM11.507 7.67903C11.507 8.07278 11.4159 8.2976 11.308 8.46417C11.1782 8.66443 11.0054 8.81873 10.7151 9.08755C10.4468 9.33601 10.1005 9.6662 9.83713 10.1449C9.56679 10.6362 9.41044 11.2306 9.41044 11.9928H11.0104C11.0104 11.4613 11.1162 11.1393 11.2389 10.9162C11.3686 10.6805 11.5464 10.4984 11.8023 10.2614C12.0362 10.0449 12.3874 9.74064 12.6508 9.33412C12.936 8.89392 13.107 8.36372 13.107 7.67903H11.507ZM9.97915 15.3854H10.0208V13.7854H9.97915V15.3854Z"
                          fill="#6B7280"
                        />
                      </g>
                    </svg>
                  </div>
                  <h2 class="text-gray-500 text-sm font-medium leading-snug">
                    Settings
                  </h2>
                </div>
              </div>
            </a>
          </li>
          <li>
            <a href="javascript:;">
              <div class="p-3 rounded-lg items-center inline-flex">
                <div class="h-5 items-center gap-3 flex">
                  <div class="relative">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <g id="Logout">
                        <path
                          id="icon"
                          d="M9.16667 17.5L5.83333 17.5V17.5C3.98765 17.5 2.5 16.0123 2.5 14.1667V14.1667L2.5 5.83333V5.83333C2.5 3.98765 3.98765 2.5 5.83333 2.5V2.5L9.16667 2.5M8.22814 10L17.117 10M14.3393 6.66667L17.0833 9.41074C17.3611 9.68852 17.5 9.82741 17.5 10C17.5 10.1726 17.3611 10.3115 17.0833 10.5893L14.3393 13.3333"
                          stroke="#6B7280"
                          stroke-width="1.6"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </g>
                    </svg>
                  </div>
                  <h2 class="text-gray-500 text-sm font-medium leading-snug">
                    Logout
                  </h2>
                </div>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

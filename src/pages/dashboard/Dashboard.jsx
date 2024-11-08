import BASE_URL from "@/configs";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaArrowUp, FaMoneyBillAlt, FaUserCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BiSolidDish } from "react-icons/bi";
const Dashboard = () => {
  const [dataProduct, setDataProduct] = useState([]);
  useEffect(() => {
    axios
      .get(BASE_URL + "/dishes")
      .then((res) => {
        console.log(res);
        setDataProduct(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="w-full min-h-screen bg-[#f5f6fa]">
      <div className="px-5 py-2">
        <p className="text-[32px] font-semibold mb-4">Thống Kê</p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
          {/* Tổng doanh Thu */}
          <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default ">
            <div className="px-6">
              <div className="flex h-11.5 w-11.5 rounded-full bg-meta-2 dark:bg-meta-4">
                <FaMoneyBillAlt size={25} />
              </div>
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <h4 class="text-title-md font-bold text-black dark:text-white">
                    $3.456K
                  </h4>
                  <span class="text-sm font-medium">Tổng doanh thu</span>
                </div>
                <span class="flex items-center gap-1 text-sm font-medium text-meta-3 undefined ">
                  42%
                  <FaArrowUp color="green" />
                </span>
              </div>
            </div>
          </div>
          {/* Tổng đơn hàng */}
          <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default ">
            <div className="px-6">
              <div className="flex h-11.5 w-11.5 rounded-full bg-meta-2 dark:bg-meta-4">
                <FaMoneyBillAlt size={25} />
              </div>
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <h4 class="text-title-md font-bold text-black dark:text-white">
                    $3.456K
                  </h4>
                  <span class="text-sm font-medium">Tổng doanh thu</span>
                </div>
                <span class="flex items-center gap-1 text-sm font-medium text-meta-3 undefined ">
                  42%
                  <FaArrowUp color="green" />
                </span>
              </div>
            </div>
          </div>
          {/* Tổng món ăn */}
          <Link to="/admin/dishes">
            <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default ">
              <div className="px-6">
                <div className="flex h-11.5 w-11.5 rounded-full bg-meta-2 dark:bg-meta-4">
                  <BiSolidDish size={25} />
                </div>
                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <h4 class="text-title-md font-bold text-black dark:text-white">
                      {dataProduct.length}
                    </h4>
                    <span class="text-sm font-medium">Tổng món ăn</span>
                  </div>
                  <span class="flex items-center gap-1 text-sm font-medium text-meta-3 undefined ">
                    42%
                    <FaArrowUp color="green" />
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Tổng khách hàng */}
          <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default ">
            <div className="px-6">
              <div className="flex h-11.5 w-11.5 rounded-full bg-meta-2 dark:bg-meta-4">
                <FaUserCheck size={25} />
              </div>
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <h4 class="text-title-md font-bold text-black dark:text-white">
                    $3.456K
                  </h4>
                  <span class="text-sm font-medium">Tổng khách hàng</span>
                </div>
                <span class="flex items-center gap-1 text-sm font-medium text-meta-3 undefined ">
                  42%
                  <FaArrowUp color="green" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

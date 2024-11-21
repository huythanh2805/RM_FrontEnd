import BASE_URL from "@/configs";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaArrowUp, FaMoneyBillAlt, FaUserCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BiSolidDish } from "react-icons/bi";
import Navbar from "@/components/Admin/Navbar";

const Dashboard = () => {
  const [dataProduct, setDataProduct] = useState([]);

  // Lấy dữ liệu món ăn
  useEffect(() => {
    axios
      .get(BASE_URL + "/dishes")
      .then((res) => {
        setDataProduct(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Lấy dữ liệu người dùng
  const [dataUser, setDataUser] = useState([]);
  useEffect(() => {
    axios
      .get(BASE_URL + "/users/admin/list")
      .then((res) => {
        setDataUser(res.data.users || []);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const clientCount = dataUser.filter(
    (users) => users.role === "CLIENT"
  ).length;

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="px-5 py-4">
        <Navbar />
      </div>
      <div className="px-5 py-4">
        <p className="text-3xl font-semibold mb-6 text-gray-800">Thống Kê</p>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4 2xl:gap-8">
          {/* Tổng doanh Thu */}
          <div className="rounded-lg border border-gray-300 bg-white py-6 px-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="px-6">
              <div className="flex h-10 w-10 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 p-3">
                <FaMoneyBillAlt size={18} color="white" />
              </div>
              <div className="mt-6 flex items-end justify-between">
                <div>
                  <h4 className="text-xl font-bold text-gray-800 dark:text-white">
                    $3.456K
                  </h4>
                  <span className="text-sm font-medium text-gray-500">
                    Tổng doanh thu
                  </span>
                </div>
                <span className="flex items-center gap-1 text-sm font-medium text-green-600">
                  42% <FaArrowUp />
                </span>
              </div>
            </div>
          </div>

          {/* Tổng đơn hàng */}
          <div className="rounded-lg border border-gray-300 bg-white py-6 px-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="px-6">
              <div className="flex h-10 w-10 rounded-full bg-gradient-to-r from-blue-400 to-teal-500 p-3">
                <FaMoneyBillAlt size={18} color="white" />
              </div>
              <div className="mt-6 flex items-end justify-between">
                <div>
                  <h4 className="text-xl font-bold text-gray-800 dark:text-white">
                    $3.456K
                  </h4>
                  <span className="text-sm font-medium text-gray-500">
                    Tổng đơn hàng
                  </span>
                </div>
                <span className="flex items-center gap-1 text-sm font-medium text-green-600">
                  42% <FaArrowUp />
                </span>
              </div>
            </div>
          </div>

          {/* Tổng món ăn */}
          <Link to="/admin/dishes">
            <div className="rounded-lg border border-gray-300 bg-white py-6 px-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="px-6">
                <div className="flex h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 p-3">
                  <BiSolidDish size={18} color="white" />
                </div>
                <div className="mt-6 flex items-end justify-between">
                  <div>
                    <h4 className="text-xl font-bold text-gray-800 dark:text-white">
                      {dataProduct.length}
                    </h4>
                    <span className="text-sm font-medium text-gray-500">
                      Tổng món ăn
                    </span>
                  </div>
                  <span className="flex items-center gap-1 text-sm font-medium text-green-600">
                    42% <FaArrowUp />
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Tổng khách hàng */}
          <div className="rounded-lg border border-gray-300 bg-white py-6 px-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="px-6">
              <div className="flex h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 p-3">
                <FaUserCheck size={18} color="white" />
              </div>
              <div className="mt-6 flex items-end justify-between">
                <div>
                  <h4 class="text-title-md font-bold text-black dark:text-white">
                    {clientCount}
                  </h4>
                  <span className="text-sm font-medium text-gray-500">
                    Tổng khách hàng
                  </span>
                </div>
                <span className="flex items-center gap-1 text-sm font-medium text-green-600">
                  42% <FaArrowUp />
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

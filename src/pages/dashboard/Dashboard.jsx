import BASE_URL from "@/configs";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaArrowUp, FaMoneyBillAlt, FaUserCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BiSolidDish } from "react-icons/bi";
import Navbar from "@/components/Admin/Navbar";
import DashBoardCard from "./DashBoardCard";
import RevenueChart from "./charts/RevenueChart";
import ReserVationChart from "./charts/ReservationChart";
import FavorFoodChart from "./charts/FavorFoodChart";
import TotalResevationChart from "./charts/TotalResevationChart";
import DashBoardControl from "./DashBoardControl";

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
        <div className="w-full flex items-center justify-between">
          <p className="text-3xl font-semibold text-gray-800">Thống Kê</p>

          <DashBoardControl />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4 2xl:gap-8 py-4">
          <DashBoardCard
            title={"Doanh số"}
            value={"140.000.000đ"}
            icon={
              <div className="flex h-10 w-10 rounded-full bg-gradient-to-r from-blue-1 to-blue-500 p-3">
                <FaMoneyBillAlt size={18} color="white" />
              </div>
            }
          />
          <DashBoardCard
            title={"Đơn đặt bàn"}
            value={"140"}
            icon={
              <div className="flex h-10 w-10 rounded-full bg-gradient-to-r  from-purple-400 to-pink-500 p-3">
                <FaMoneyBillAlt size={18} color="white" />
              </div>
            }
          />
          <DashBoardCard
            title={"Đơn thành công"}
            value={"126"}
            icon={
              <div className="flex h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 p-3">
                <FaMoneyBillAlt size={18} color="white" />
              </div>
            }
          />
          <DashBoardCard
            title={"Đơn hủy"}
            value={"14"}
            icon={
              <div className="flex h-10 w-10 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 p-3">
                <FaMoneyBillAlt size={18} color="white" />
              </div>
            }
          />
        </div>

        <div class="grid grid-cols-4 gap-4">
          <div class="col-span-3 ">
            <RevenueChart />
          </div>
          <div class="col-span-1">
            <FavorFoodChart />
          </div>
          <div class="col-span-1 ">
            <TotalResevationChart />
          </div>
          <div class="col-span-3">
            <ReserVationChart />
          </div>
        </div>
      </div>
    </div>
  )
};

export default Dashboard;

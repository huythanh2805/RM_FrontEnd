import BASE_URL from "@/configs";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaMoneyBillAlt, FaSyncAlt, FaCalculator } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BiSolidDish } from "react-icons/bi";
import Navbar from "@/components/Admin/Navbar";
import DashBoardCard from "./DashBoardCard";
import RevenueChart from "./charts/RevenueChart";
import ReserVationChart from "./charts/ReservationChart";
import FavorFoodChart from "./charts/FavorFoodChart";
import TotalResevationChart from "./charts/TotalResevationChart";
import DashBoardControl from "./DashBoardControl";
import { toast } from "@/hooks/use-toast";
import { formatCurrency, ServerUrl } from "@/utilities/utils";
import { TbTruckDelivery } from "react-icons/tb";
const Dashboard = () => {
  const [dataProduct, setDataProduct] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [allBillByMonth, setAllBillByMonth] = useState([]);
  const [top5Dishes, setTop5Dishes] = useState([]);
  const [sixMonthRevenue, setSixMonthRevenue] = useState([]);
  const [reservationStatusChart, setReservationStatusChart] = useState([]);

  const [revenueCard, setRevenueCard] = useState(0);
  const [totalReserCard, setToltalReserCard] = useState(0);
  const [canceledReserCard, setCanceledReserCard] = useState(0);
  const [successedReserCard, setSuccessedReserCard] = useState(0);
  console.log({ reservationStatusChart });
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
  // Get revenue
  useEffect(() => {
    if (!selectedMonth) return;
    const fetData = async () => {
      const res = await fetch(
        `${ServerUrl}/api/dashboard/revenue/${selectedMonth}/${selectedDate.getFullYear()}`,
        {
          method: "GET",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        toast({
          variant: "destructive",
          title: "Can't get any data for ordered dishes!",
        });
      }
      setAllBillByMonth(data);
      const total = data.reduce((sum, bill) => (sum += bill.total_money), 0);
      setRevenueCard(total);
    };
    fetData();
  }, [selectedDate, selectedMonth]);
  // Get top 5 dishes
  useEffect(() => {
    if (!selectedMonth) return;
    const fetData = async () => {
      const res = await fetch(
        `${ServerUrl}/api/dashboard/top5/${selectedMonth}/${selectedDate.getFullYear()}`,
        {
          method: "GET",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        toast({
          variant: "destructive",
          title: "Can't get any data for ordered dishes!",
        });
      }
      setTop5Dishes(data);
    };
    fetData();
  }, [selectedDate, selectedMonth]);
  // Get top 6 months revenue
  useEffect(() => {
    if (!selectedMonth) return;
    const fetData = async () => {
      const res = await fetch(
        `${ServerUrl}/api/dashboard/revenue/6months/${selectedMonth}/${selectedDate.getFullYear()}`,
        {
          method: "GET",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        toast({
          variant: "destructive",
          title: "Can't get any data for ordered dishes!",
        });
      }
      setSixMonthRevenue(data);
    };
    fetData();
  }, [selectedDate, selectedMonth]);
  // Get reservation Status chart
  useEffect(() => {
    if (!selectedMonth) return;
    const fetData = async () => {
      const res = await fetch(
        `${ServerUrl}/api/dashboard/reservationState/${selectedMonth}/${selectedDate.getFullYear()}`,
        {
          method: "GET",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        toast({
          variant: "destructive",
          title: "Can't get any data for ordered dishes!",
        });
      }
      setReservationStatusChart(data);
      setCanceledReserCard(
        data.reduce((sum, item) => (sum += item.canceled), 0)
      );
      setSuccessedReserCard(
        data.reduce((sum, item) => (sum += item.completed), 0)
      );
    };
    fetData();
  }, [selectedDate, selectedMonth]);
  return (
    <div className="w-full min-h-screen bg-gray-50">
      <Navbar />

      <div className="px-5 py-5">
        <div className="w-full flex items-center justify-between">
          <p className="text-3xl font-semibold text-gray-800">Thống Kê</p>

          <DashBoardControl
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4 2xl:gap-8 py-4">
          <DashBoardCard
            title={"Doanh số"}
            value={formatCurrency(revenueCard)}
            icon={
              <div className="flex h-10 w-10 rounded-full bg-gradient-to-r from-blue-1 to-blue-500 p-3">
                <FaMoneyBillAlt size={18} color="white" />
              </div>
            }
            data={allBillByMonth}
            type={"revenue"}
            month={selectedDate}
          />
          <DashBoardCard
            title={"Đơn đặt bàn"}
            value={successedReserCard + canceledReserCard}
            icon={
              <div className="flex h-10 w-10 rounded-full bg-gradient-to-r  from-purple-400 to-pink-500 p-3">
                <FaCalculator size={18} color="white" />
              </div>
            }
            data={reservationStatusChart}
            type={"toalReser"}
            month={selectedDate}
          />
          <DashBoardCard
            title={"Đơn thành công"}
            value={successedReserCard}
            icon={
              <div className="flex h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 p-3">
                <TbTruckDelivery size={18} color="white" />
              </div>
            }
            data={reservationStatusChart}
            type={"successReser"}
            month={selectedDate}
          />
          <DashBoardCard
            title={"Đơn hủy"}
            value={canceledReserCard}
            icon={
              <div className="flex h-10 w-10 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 p-3">
                <FaSyncAlt size={18} color="white" />
              </div>
            }
            data={reservationStatusChart}
            type={"canceledReser"}
            month={selectedDate}
          />
        </div>

        <div class="grid grid-cols-4 gap-4">
          <div class="col-span-3 ">
            <RevenueChart
              allBillByMonth={allBillByMonth}
              month={selectedMonth}
              year={selectedDate.getFullYear()}
            />
          </div>
          <div class="col-span-1">
            <TotalResevationChart
              sixMonthRevenue={sixMonthRevenue}
              month={selectedMonth}
              year={selectedDate.getFullYear()}
            />
          </div>
          <div class="col-span-1 ">
            <FavorFoodChart
              top5Dishes={top5Dishes}
              month={selectedMonth}
              year={selectedDate.getFullYear()}
            />
          </div>
          <div class="col-span-3">
            <ReserVationChart
              reservationStatusChart={reservationStatusChart}
              month={selectedMonth}
              year={selectedDate.getFullYear()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

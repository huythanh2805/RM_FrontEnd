import BASE_URL from "@/configs";
import { toast } from "@/hooks/use-toast";
import { formatCurrency, formatDateNoTime, ServerUrl } from "@/utilities/utils";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaCalculator, FaMoneyBillAlt, FaSyncAlt } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import FavorFoodChart from "./charts/FavorFoodChart";
import ReserVationChart from "./charts/ReservationChart";
import RevenueChart from "./charts/RevenueChart";
import Top5UserOrderTable from "./charts/Top5UserOrderTable";
import DashBoardCard from "./DashBoardCard";
import DashBoardControl from "./DashBoardControl";
const Dashboard = () => {
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const [allBillByMonth, setAllBillByMonth] = useState([]);
  const [top5Dishes, setTop5Dishes] = useState([]);
  const [top5UserOrder, setTop5UserOrder] = useState([]);
  const [reservationStatusChart, setReservationStatusChart] = useState([]);

  const [revenueCard, setRevenueCard] = useState(0);
  const [canceledReserCard, setCanceledReserCard] = useState(0);
  const [successedReserCard, setSuccessedReserCard] = useState(0);

  useEffect(() => {
    const now = new Date();

    // Ngày đầu tiên của tháng hiện tại
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);

    // Ngày cuối cùng của tháng hiện tại
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    // Gán vào state
    setStartDate(new Date(firstDay)); // Tạo bản sao của đối tượng
    setEndDate(new Date(lastDay));    // Tạo bản sao của đối tượng
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
    const fetData = async () => {
      if (!startDate || !endDate) return;
      if (new Date(startDate) > new Date(endDate))
        return toast({
          variant: "destructive",
          title: "Thời gian bắt đầu không thể lớn hơn thời gian kết thúc",
        });;
      const res = await fetch(`${ServerUrl}/api/dashboard/revenue`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ startDate: new Date(startDate), endDate: new Date(endDate) }),
      });
      const data = await res.json();
      if (!res.ok) {
        return toast({
          variant: "destructive",
          title: data.message,
        });
      }
      setAllBillByMonth(data);
      const total = data.reduce((sum, bill) => (sum += bill.total_money), 0);
      setRevenueCard(total);
    };
    fetData();
  }, [startDate, endDate]);
  // Get top 5 dishes
  useEffect(() => {
    const fetData = async () => {
      if (!startDate || !endDate) return;
      if (new Date(startDate) > new Date(endDate))
        return toast({
          variant: "destructive",
          title: "Thời gian bắt đầu không thể lớn hơn thời gian kết thúc",
        });;
      const res = await fetch(
        `${ServerUrl}/api/dashboard/top5`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ startDate: new Date(startDate), endDate: new Date(endDate) }),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        toast({
          variant: "destructive",
          title: data.message,
        });
      }
      setTop5Dishes(data);
    };
    fetData();
  }, [startDate, endDate]);
  // Get top 5 user
  useEffect(() => {
    const fetData = async () => {
      if (!startDate || !endDate) return;
      if (new Date(startDate) > new Date(endDate))
        return toast({
          variant: "destructive",
          title: "Thời gian bắt đầu không thể lớn hơn thời gian kết thúc",
        });;
      const res = await fetch(
        `${ServerUrl}/api/dashboard/top5User`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ startDate: new Date(startDate), endDate: new Date(endDate) }),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        toast({
          variant: "destructive",
          title: data.message,
        });
      }
      setTop5UserOrder(data);
    };
    fetData();
  }, [startDate, endDate]);
  // Get reservation Status chart
  useEffect(() => {
    const fetData = async () => {
      if (!startDate || !endDate) return;
      if (new Date(startDate) > new Date(endDate))
        return toast({
          variant: "destructive",
          title: "Thời gian bắt đầu không thể lớn hơn thời gian kết thúc",
        });;
      const res = await fetch(
        `${ServerUrl}/api/dashboard/reservationState`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ startDate: new Date(startDate), endDate: new Date(endDate) }),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        toast({
          variant: "destructive",
          title: data.message,
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
  }, [startDate, endDate]);
  return (

    <div className="px-5">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-4">
          <p className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 via-teal-400 to-purple-500 text-transparent bg-clip-text drop-shadow-md">
            Thống Kê
          </p>
        </div>


        <DashBoardControl
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
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
        />
      </div>

      <div class="grid grid-cols-4 gap-4">
        <div class="col-span-3 ">
          <RevenueChart
            allBillByMonth={allBillByMonth}
            startTime={formatDateNoTime(startDate)}
            endTime={formatDateNoTime(endDate)}
          />
        </div>
        <div class="col-span-1">
          <Top5UserOrderTable top5UserOrder={top5UserOrder} />
        </div>
        <div class="col-span-1 ">
          <FavorFoodChart
            top5Dishes={top5Dishes}
            startTime={formatDateNoTime(startDate)}
            endTime={formatDateNoTime(endDate)}
          />
        </div>
        <div class="col-span-3">
          <ReserVationChart
            reservationStatusChart={reservationStatusChart}
            startTime={formatDateNoTime(startDate)}
            endTime={formatDateNoTime(endDate)}
          />
        </div>
      </div>
    </div>

  );
};

export default Dashboard;

import { Input } from "@/components/ui/input";
import { useCart } from "@/contexts/CartProvider";
import { useThemeContext } from "@/contexts/ThemeProvider";
import { toast } from "@/hooks/use-toast";
import { useFetchData } from "@/hooks/useFetchData";
import { usePostData } from "@/hooks/usePostData";
import { ServerUrl } from "@/utilities/utils";
import { motion } from "framer-motion";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { FaCalendarCheck, FaPhoneAlt, FaUser } from "react-icons/fa";
import { FaPerson } from "react-icons/fa6";
import { IoIosTime } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import ButtonCustome from "../ButtonCustome";
import { ComboBoxComponent } from "./ComboBoxComponent";

const imgAnimation = {
  hidden: { x: -200, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.5 } },
};

const ReservationForm = () => {
  const { colorCode } = useThemeContext();
  const { cart, clearCart } = useCart();
  const [personCount, setPersonCount] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userName, setUserName] = useState("");
  const [datePicker, setDatePicker] = useState();
  const [timePicker, setTimePicker] = useState();
  const [loading, setLoading] = useState(false);
  const [couponValue, setCouponValue] = useState("");
  const [userDiscounts, setUserDiscounts] = useState([]);
  const navigate = useNavigate();
  const [decodedToken, setDecodeToken] = useState(() => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    return jwtDecode(token);
  });
  const { data: discountData } = useFetchData(
    `${ServerUrl}/api/userDiscount/reservation/client/getAvailableStatus/${decodedToken?.id}`
  );
  useEffect(() => {
    if (discountData) setUserDiscounts(discountData);
  }, [discountData]);

  const combinedDateTime = (date, time) => {
    const fomartedDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      time.getHours(),
      time.getMinutes()
    );
    return fomartedDate;
  };
  const handleClick = async () => {
    if (couponValue || couponValue !== "") {
      console.log(cart);
      const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
      const discount = userDiscounts.find((item) => item._id === couponValue);

      if (discount && discount.discountId.minOrderValue > totalPrice) {
        return toast({
          variant: "destructive",
          title: `Số tiền tối thiểu của mã là ${discount.discountId.minOrderValue}`,
        });
      }
    }

    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    if (!token || !decodedToken.id)
      return toast({
        variant: "destructive",
        title: "Bạn cần đăng nhập trước khi đặt bàn",
      });
    if (!datePicker || !timePicker)
      return toast({
        variant: "destructive",
        title: "Bạn chưa chọn thời gian",
      });
    if (!userName || !phoneNumber)
      return toast({
        variant: "destructive",
        title: "Bạn chưa điền đầy đủ thông tin",
      });
    const codeGen = `MD${Math.floor(100000 + Math.random() * 900000)}`;
    const startTime = combinedDateTime(datePicker, timePicker);
    const isPayment = cart.length > 0 ? false : true;
    const status = cart.length > 0 ? "ISPAYMENT" : "ISWAITING";
    const postData = {
      startTime,
      dishs: cart,
      user_id: decodedToken.id,
      guests_count: personCount,
      phoneNumber,
      userName,
      couponValue: couponValue && couponValue !== "" ? couponValue : null,
      code: codeGen,
      isPayment,
      status,
    };

    try {
      // const { message } = await usePostData(
      //   `${ServerUrl}/api/reservations/v2/client`,
      //   postData
      // );
      // if (message) {
      //   setUserName("");
      //   setPhoneNumber("");
      //   setPersonCount(1);
      //   setDatePicker(null);
      //   setTimePicker(null);
      //   setCouponValue("");
      //   clearCart();
      //   toast({ variant: "success", title: message });
      //   setUserDiscounts(preVal=>[...preVal.map(item=>item._id === couponValue ? {...item, status: 'USED'} : item)])
      // }
      setLoading(true);
      const { message } = await usePostData(`${ServerUrl}/api/reservations/v2/client`, postData);
      if (cart.length > 0) {
        const existingReservations = JSON.parse(localStorage.getItem("reservationDetails")) || [];
        if (Array.isArray(existingReservations)) {
          existingReservations.push(postData);
          localStorage.setItem("reservationDetails", JSON.stringify(existingReservations));
        }
        navigate(`/payment?code=${codeGen}`);
        clearCart();
      } else {
        if (message) {
          setUserName("");
          setPhoneNumber("");
          setPersonCount(1);
          setDatePicker(null);
          setTimePicker(null);
          setCouponValue("");
          clearCart();
          toast({ variant: "success", title: message });
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="pt-10 w-full">
        <div className="relative w-full flex flex-col lg:flex-row justify-between items-center lg:items-start gap-10 px-6 py-8 lg:px-10 lg:py-12 border border-gray-200 shadow-lg rounded-md bg-white">
          <motion.div
            className="relative flex-1 hidden lg:block"
            initial="hidden"
            animate="visible"
            variants={imgAnimation}
          >
            <img
              src="/imgs/home3-deco-1.png"
              alt="Chef"
              className="absolute -left-[10px] -translate-y-7 max-w-[250px] lg:max-w-[380px] transition-transform transform hover:scale-105 hover:-translate-x-5 hover:-translate-y-2"
            />
          </motion.div>
          <div className="w-full lg:w-2/3 flex-[2]">
            <p className="text-gray-800 text-center lg:text-left mb-6 newFont text-[18px] sm:text-[20px]">
              Chúng tôi rất vui được hỗ trợ bạn đặt chỗ trực tuyến thông qua hệ thống hiện đại của chúng tôi. Nếu bạn
              cần sự hỗ trợ hoặc có bất kỳ thắc mắc nào, đừng ngần ngại liên hệ với chúng tôi qua số điện thoại{" "}
              <span className="font-bold" style={{ color: colorCode }}>
                (012) 978 645 312
              </span>
              .
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative">
                <FaUser className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Họ và Tên"
                  className="pl-10 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
              <div className="relative">
                <FaPhoneAlt className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Số điện thoại"
                  className="pl-10 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
              <div className="relative">
                <FaPerson className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type="number"
                  min={1}
                  value={personCount}
                  onChange={(e) => {
                    const value = parseInt(e.target.value, 10);
                    if (!isNaN(value) && value > 0 && value <= 20) {
                      setPersonCount(value);
                    } else if (e.target.value === "") {
                      setPersonCount("");
                    }
                  }}
                  onBlur={() => {
                    if (!personCount) setPersonCount(1);
                  }}
                  placeholder="Số người"
                  className="pl-10 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>

              {/* date picker */}
              <div className="relative w-full border border-[#e5e7eb]-1 rounded-md">
                <FaCalendarCheck className="absolute top-3 left-3 min-h-5 min-w-5 text-gray-400" />
                <DatePicker
                  className="w-full bg-transparent focus:outline-none px-10 py-2 border-none"
                  placeholderText="Chọn ngày"
                  selected={datePicker}
                  minDate={new Date()}
                  onChange={(date) => setDatePicker(date)}
                  dateFormat={"dd/MM/yyyy"}
                />
              </div>

              <ComboBoxComponent
                userDiscounts={userDiscounts}
                couponValue={couponValue}
                setCouponValue={setCouponValue}
              />

              <div className="relative w-full border border-[#e5e7eb]-1 rounded-md">
                <IoIosTime className="absolute top-3 left-3 min-h-5 min-w-5 text-gray-400" />
                <DatePicker
                  className="w-full bg-transparent focus:outline-none px-10 py-2 border-none"
                  placeholderText="Chọn giờ"
                  selected={timePicker}
                  onChange={(time) => setTimePicker(time)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Giờ"
                  dateFormat="hh:mm aa"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <ButtonCustome buttonText="Đặt Bàn" handleClick={handleClick} loading={loading} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationForm;

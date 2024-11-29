import { Input } from "@/components/ui/input";
import { FaCalendarCheck, FaPhoneAlt, FaUser } from "react-icons/fa";
import { FaPerson } from "react-icons/fa6";
import { IoIosTime, IoMdArrowDropdown } from "react-icons/io";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import ButtonCustome from "../ButtonCustome";
import { useThemeContext } from "@/contexts/ThemeProvider";
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import { toast } from "@/hooks/use-toast";
import jwtDecode from "jwt-decode";
import { usePostData } from "@/hooks/usePostData";
import { ServerUrl } from "@/utilities/utils";
import { useCart } from "@/contexts/CartProvider";

const ReservationForm = () => {
  const { colorCode } = useThemeContext();
  const { cart, clearCart } = useCart();
  const [personCount, setPersonCount] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userName, setUserName] = useState("");
  const [datePicker, setDatePicker] = useState();
  const [timePicker, setTimePicker] = useState();
  const [loading, setLoading] = useState(false);

  // Thiết lập animation cho hình ảnh
  const imgAnimation = {
    hidden: { x: -200, opacity: 0 }, // Vị trí ban đầu bên trái
    visible: { x: 0, opacity: 1, transition: { duration: 0.5 } }, // Vị trí cuối cùng
  };

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

    const startTime = combinedDateTime(datePicker, timePicker);
    const postData = {
      startTime,
      dishs: cart,
      user_id: decodedToken.id,
      guests_count: personCount,
      phoneNumber,
      userName,
    };

    try {
      setLoading(true);
      const { message } = await usePostData(
        `${ServerUrl}/api/reservations/v2/client`,
        postData
      );
      if (message) {
        setUserName("");
        setPhoneNumber("");
        setPersonCount(1);
        setDatePicker(null);
        setTimePicker(null);
        clearCart();
        toast({ variant: "success", title: message });
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div
        className="text-xl font-semibold mb-2 flex justify-center items-center"
        style={{ color: colorCode }}
      >
        <div
          className="border-t w-12 mr-2"
          style={{ borderColor: colorCode }}
        />
        ĐẶT BÀN
        <div
          className="border-t w-12 ml-2"
          style={{ borderColor: colorCode }}
        />
      </div>
      <div className="pt-10 w-full">
        <div className="relative w-full flex flex-col lg:flex-row justify-between items-start gap-10 px-10 py-12 border border-gray-200 shadow-lg rounded-md bg-white">
          <motion.div
            className="relative flex-1 hidden lg:block"
            initial="hidden"
            animate="visible"
            variants={imgAnimation}
          >
            <img
              src="/imgs/home3-deco-1.png"
              alt="Chef"
              className="absolute -left-[10px] -translate-y-7 max-w-[380px] transition-transform transform hover:scale-105 hover:-translate-x-5 hover:-translate-y-2" // Hiệu ứng hover
            />
          </motion.div>

          {/* Form */}
          <div className="w-full lg:w-2/3 flex-[2]">
            <p className="text-gray-800 text-center lg:text-left mb-6 newFont text-[20px]">
              Chúng tôi rất vui được hỗ trợ bạn đặt chỗ trực tuyến thông qua hệ
              thống hiện đại và tiện lợi của chúng tôi. <br /> Nếu bạn cần sự hỗ
              trợ hoặc có bất kỳ thắc mắc nào, đừng ngần ngại liên hệ với chúng
              tôi qua số điện thoại{" "}
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="relative">
                    <FaPerson className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      value={`${personCount} người`}
                      className="cursor-pointer pl-10 focus-visible:ring-0 focus-visible:ring-offset-0"
                      readOnly
                    />
                    <IoMdArrowDropdown className="absolute right-3 top-3 h-5 w-5 text-gray-400" />{" "}
                    {/* Mũi tên dropdown */}
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {[1, 2, 3, 4, 5, 6].map((count) => (
                    <DropdownMenuItem
                      key={count}
                      onClick={() => setPersonCount(count)}
                    >
                      {count} người
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* date picker */}
              <div className="relative w-full border border-[#e5e7eb]-1 rounded-md">
                <FaCalendarCheck className="absolute top-3 left-3 min-h-5 min-w-5 text-gray-400" />
                <DatePicker
                  className="w-full md:min-w-[380x] sm:min-w-[333px] lg:min-w-[333px] xl:min-w-[463px] bg-transparent focus:outline-none px-10 py-2 border-none"
                  placeholderText="Chọn ngày"
                  selected={datePicker}
                  minDate={new Date()}
                  onChange={(date) => setDatePicker(date)}
                  dateFormat={"dd/MM/yyyy"}
                />
              </div>
              {/* time picker */}
              <div className="relative w-full border border-[#e5e7eb]-1 rounded-md">
                <IoIosTime className="absolute top-3 left-3 min-h-5 min-w-5 text-gray-400" />
                <DatePicker
                  className="w-full md:min-w-[380px] sm:min-w-[333px] lg:min-w-[333px] xl:min-w-[463px] bg-transparent focus:outline-none px-10 py-2 border-none"
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
              <ButtonCustome
                buttonText="Đặt Bàn"
                handleClick={handleClick}
                loading={loading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationForm;

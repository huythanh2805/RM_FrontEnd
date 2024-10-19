import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaCalendarAlt, FaPhoneAlt, FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaPerson } from "react-icons/fa6";
import { GoClockFill } from "react-icons/go";
import { IoMdArrowDropdown } from "react-icons/io";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { format } from "date-fns"; // format date
import { vi } from "date-fns/locale"; // Import locale tiếng Việt
import ButtonCustome from "../ButtonCustome";
import { useThemeContext } from "@/contexts/ThemeProvider";
import { motion } from "framer-motion";

const ReservationForm = () => {
  const [personCount, setPersonCount] = useState(1);
  const { colorCode } = useThemeContext();
  const [date, setDate] = useState();
  const [time, setTime] = useState("7:00 AM");
  const availableTimes = [
    "7:00 AM",
    "7:30 AM",
    "8:00 AM",
    "8:30 AM",
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
    "4:00 PM",
    "4:30 PM",
    "5:00 PM",
    "5:30 PM",
    "6:00 PM",
    "6:30 PM",
    "7:00 PM",
    "7:30 PM",
    "8:00 PM",
    "8:30 PM",
  ];

  // Thiết lập animation cho hình ảnh
  const imgAnimation = {
    hidden: { x: -200, opacity: 0 }, // Vị trí ban đầu bên trái
    visible: { x: 0, opacity: 1, transition: { duration: 0.5 } }, // Vị trí cuối cùng
  };

  return (
    <div className="w-full">
      <div className="text-xl font-semibold mb-2 flex justify-center items-center" style={{ color: colorCode }}>
        <div className="border-t w-12 mr-2" style={{ borderColor: colorCode }} />
        ĐẶT BÀN
        <div className="border-t w-12 ml-2" style={{ borderColor: colorCode }} />
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
              src="https://sun-themes.com/html/fooday/assets/images/pages/home3-deco-1.png"
              alt="Chef"
              className="absolute -left-[150px] -translate-y-7 max-w-[500px] transition-transform transform hover:scale-105 hover:-translate-x-5 hover:-translate-y-2"  // Hiệu ứng hover
            />
          </motion.div>

          {/* Form */}
          <div className="w-full lg:w-2/3 flex-[2]">
            <p className="text-gray-800 text-center lg:text-left mb-6 newFont text-[20px]">
              Chúng tôi rất vui được hỗ trợ bạn đặt chỗ trực tuyến thông qua hệ thống hiện đại và tiện lợi của chúng tôi. <br /> Nếu bạn cần sự hỗ trợ hoặc có bất kỳ thắc mắc nào, đừng ngần ngại liên hệ với chúng tôi qua số điện thoại{" "}
              <span className="font-bold" style={{ color: colorCode }}> 666-88888</span>.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative">
                <FaUser className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input placeholder="Họ và Tên" className="pl-10 focus-visible:ring-0 focus-visible:ring-offset-0" />
              </div>
              <div className="relative">
                <MdEmail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input placeholder="Email" type="email" className="pl-10 focus-visible:ring-0 focus-visible:ring-offset-0" />
              </div>
              <div className="relative">
                <FaPhoneAlt className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input placeholder="Số điện thoại" className="pl-10 focus-visible:ring-0 focus-visible:ring-offset-0" />
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

              {/* Date picker */}
              <div className="relative">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className="w-full justify-start pl-10 text-left font-normal"
                    >
                      <FaCalendarAlt className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      {date ? (
                        format(date, "PPP", { locale: vi })
                      ) : (
                        <span>Chọn ngày</span>
                      )}{" "}
                      {/* Sử dụng locale tiếng Việt */}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Time select dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="relative">
                    <GoClockFill className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      value={time}
                      className="cursor-pointer pl-10"
                      readOnly
                    />
                    <IoMdArrowDropdown className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="max-h-32 overflow-y-auto">
                  {availableTimes.map((availableTime) => (
                    <DropdownMenuItem
                      key={availableTime}
                      onClick={() => setTime(availableTime)}
                    >
                      {availableTime}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <div className="col-span-2">
                <textarea
                  placeholder="Nhập ghi chú ..."
                  className="w-full h-24 p-3 border rounded-md focus-visible:outline-none"
                />
              </div>
              <div className="col-span-2">
                <ButtonCustome buttonText="Đặt Bàn" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationForm;

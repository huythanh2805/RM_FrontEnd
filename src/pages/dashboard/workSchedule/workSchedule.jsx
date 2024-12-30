import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const WorkSchedule = () => {
  const [month, setMonth] = useState("");
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [scheduleData, setScheduleData] = useState({});

  // Set default month and year to current date on initial render
  useEffect(() => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    setMonth(`${currentYear}-${currentMonth < 10 ? "0" : ""}${currentMonth}`);
    fetchDaysInMonth(currentMonth, currentYear);
  }, []);

  // Calculate number of days in the current month
  const fetchDaysInMonth = (month, year) => {
    const days = new Date(year, month, 0).getDate();
    const datesArray = Array.from({ length: days }, (_, i) => i + 1);
    setDaysInMonth(datesArray);
  };

  const handleOpenModal = (date) => {
    setSelectedDate(date);
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
    setSelectedDate(null);
    setShiftData({ morning: "", afternoon: "", evening: "" });
  };

  const handleMonthChange = (e) => {
    const [year, month] = e.target.value.split("-");
    setMonth(e.target.value);
    fetchDaysInMonth(Number(month), Number(year));
  };

  return (
    <div className="w-full mx-auto p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-4">Quản lý lịch làm việc</h1>

      {/* Select Month */}
      <span className="font-bold">Chọn tháng:</span>
      <div className="mb-4 flex justify-between">
        <label className="block text-lg font-medium mb-2">
          <input
            type="month"
            value={month}
            onChange={handleMonthChange}
            className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </label>
        <div className="space-x-2">
          <Link to="/admin/listWorkSchedule">
            <button className="px-2 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition">
              Danh sách lịch làm việc
            </button>
          </Link>
          <Link to="/admin/addWorkSchedule">
            <button className="px-2 py-3 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition">
              Thêm lịch làm việc +
            </button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
        {daysInMonth.map((day) => (
          <div
            key={day}
            className="border border-gray-300 py-4 px-6 rounded-lg cursor-pointer hover:bg-gray-100 transition"
            onClick={() => handleOpenModal(day)}
          >
            <div className="mb-2">
              <div className="font-bold">
                Ngày {day}/{month.split("-")[1]}
              </div>
            </div>
            <div className="mt-1">
              <p className="py-2">
                - Ca sáng:{" "}
                <span className="bg-gray-200 text-gray-800 py-1 px-2 rounded-md">
                  Lịch trống
                </span>
              </p>
              <p className="py-2">
                - Ca chiều:{" "}
                <span className="bg-green-200 text-green-800 py-1 px-2 rounded-md">
                  Đang phục vụ (2)
                </span>
              </p>
              <p className="py-2">
                - Ca tối:{" "}
                <span className="bg-gray-200 text-gray-800 py-1 px-2 rounded-md">
                  Lịch trống
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Custom */}
      {modalIsOpen && (
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center px-4"
          onClick={() => handleCloseModal()}
        >
          <div className="bg-white p-6 rounded-lg w-[400px]">
            <h2 className="text-2xl font-semibold mb-4">
              Lịch làm việc ngày {selectedDate}/{month.split("-")[1]}:
            </h2>

            <div className="mb-4">
              <label className="block text-lg font-medium mb-2">Ca sáng:</label>
              <div>
                <p>- Trống</p>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-lg font-medium mb-2">
                Ca chiều:
              </label>
              <div>
                <p>
                  - Tên nhân viên 1 |{" "}
                  <span className="text-[#727272] font-bold">
                    Vị trí làm việc
                  </span>
                </p>
                <p>- Tên nhân viên 2</p>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-lg font-medium mb-2">Ca tối:</label>
              <div>
                <p>- Trống</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkSchedule;

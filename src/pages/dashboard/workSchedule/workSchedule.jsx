import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const WorkSchedule = () => {
  const [month, setMonth] = useState("");
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // Set default month and year to current date on initial render
  useEffect(() => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // getMonth() returns 0-11, so add 1 for the actual month
    const currentYear = currentDate.getFullYear();
    setMonth(`${currentYear}-${currentMonth < 10 ? "0" : ""}${currentMonth}`);

    // Calculate number of days in the current month
    const days = new Date(currentMonth, currentYear, 0).getDate();
    const datesArray = Array.from({ length: days }, (_, i) => i + 1);

    setDaysInMonth(datesArray);
  }, []);

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
    setMonth(e.target.value);
    const [month, year] = e.target.value.split("-");
    const days = new Date(month, year, 0).getDate();
    const datesArray = Array.from({ length: days }, (_, i) => i + 1);
    setDaysInMonth(datesArray);
  };

  return (
    <div className="w-full mx-auto p-4 md:p-6 lg:p-8">
      <div className=" align-center">
        <h1 className="text-3xl font-bold mb-4">Quản lý lịch làm việc</h1>
      </div>

      {/* Select Month */}
      <span className="font-bold">Chọn tháng:</span>
      <div className="mb-4 flex justify-between">
        <label className="block text-lg font-medium mb-2">
          <input
            type="month"
            value={month}
            onChange={handleMonthChange}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </label>
        <Link to={"/admin/addWorkSchedule"}>
          <div className="p-3 mt-2 text-green-800 bg-green-200 hover:bg-green-300 rounded-md">
            Thêm lịch làm việc +
          </div>
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
        {daysInMonth.map((day) => (
          <div
            key={day}
            className="border border-gray-300 py-2 px-4 rounded-lg cursor-pointer hover:bg-gray-100"
            onClick={() => handleOpenModal(day)}
          >
            <div className="font-bold text-center border-b border-b-[#ccc] pb-1">
              <div className="flex justify-between">
                <div>Tuần:...</div>
                <div>
                  {day}/{month}
                </div>
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
                  Nhân viên đang làm (2)
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
              Lịch làm việc ngày {selectedDate} 
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
                  - Tô Xuân Tuyển |{" "}
                  <span className="text-[#727272] font-semibold">Giám đốc</span>
                </p>
                <p>- Trần Cao Sơn</p>
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

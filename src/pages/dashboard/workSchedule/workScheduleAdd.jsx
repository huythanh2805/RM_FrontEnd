import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const WorkScheduleAdd = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isClearable] = useState(true);

  const [month, setMonth] = useState("");
  const [week1, setWeek1] = useState();
  const [week2, setWeek2] = useState();
  const [week3, setWeek3] = useState();
  const [week4, setWeek4] = useState();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/employees`
        );

        if (Array.isArray(response.data)) {
          // Lọc nhân viên chưa bị xóa (isDelete == false)
          const activeEmployees = response.data.filter(
            (item) => !item.isDelete
          );

          setEmployees(
            activeEmployees.map((employee) => ({
              value: employee._id,
              label: employee.name,
            }))
          );

          console.log("Active employees:", activeEmployees);
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngừng load lại trang khi không nhập đầy đủ thông tin

    if (!selectedEmployee || !month) {
      toast({
        variant: "destructive",
        title: "Vui lòng chọn đầy đủ thông tin!",
      });
      return;
    }

    try {
      const newSchedule = {
        employee_id: selectedEmployee.value,
        month,
        week_1: week1,
        week_2: week2,
        week_3: week3,
        week_4: week4,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/workSchedules`,
        newSchedule
      );

      toast({ variant: "success", title: "Thêm ca làm thành công!" });
      console.log("OK", response.data);
    } catch (error) {
      console.error("Lỗi:", error);

      if (error.response?.status === 400) {
        // Thông báo cụ thể nếu nhân viên đã có ca làm
        const message = error.response.data.message || "";
        if (message.includes("already has a work schedule")) {
          toast({
            variant: "destructive",
            title: "Thêm ca làm thất bại!",
            description: `Nhân viên "${selectedEmployee.label}" đã có ca làm trong tháng ${month}. Vui lòng kiểm tra lại.`,
          });
        } else {
          // Trường hợp khác
          toast({
            variant: "destructive",
            title: "Thêm ca làm thất bại!",
            description: message || "Đã xảy ra lỗi.",
          });
        }
      } else {
        // Xử lý các lỗi khác
        toast({
          variant: "destructive",
          title: "Thêm ca làm thất bại!",
          description: "Đã xảy ra lỗi trong quá trình thêm ca làm.",
        });
      }
    }
  };

  return (
    <div className="max- mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-[32px] font-semibold mb-4">Thêm ca làm</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="ten-nhan-vien"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Tên nhân viên
          </label>
          <Select
            id="ten-nhan-vien"
            name="ten-nhan-vien"
            options={employees}
            value={selectedEmployee}
            isClearable={isClearable}
            onChange={setSelectedEmployee}
            placeholder="Chọn tên nhân viên"
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="thang"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Tháng
          </label>
          <input
            type="month"
            id="thang"
            name="thang"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="block w-60 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {[week1, week2, week3, week4].map((week, index) => (
          <div className="mb-4" key={index}>
            <label
              htmlFor={`tuan-${index + 1}`}
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Tuần {index + 1}
            </label>

            <select
              id={`tuan-${index + 1}`}
              name={`tuan-${index + 1}`}
              value={week}
              onChange={(e) => {
                if (index === 0) setWeek1(e.target.value);
                if (index === 1) setWeek2(e.target.value);
                if (index === 2) setWeek3(e.target.value);
                if (index === 3) setWeek4(e.target.value);
              }}
              className="block w-32 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option>Chọn ca làm</option>
              <option value="1">Ca Sáng</option>
              <option value="2">Ca Chiều</option>
              <option value="3">Ca Tối</option>
            </select>
          </div>
        ))}

        <div className="flex justify-end space-x-2">
          <Link
            to="/admin/workSchedule"
            className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md text-sl font-semibold hover:bg-gray-300"
          >
            Quay lại
          </Link>

          <button
            type="submit"
            className="bg-green-200 text-green-800 px-6 py-2 rounded-md text-sl font-semibold hover:bg-green-300 transition"
          >
            Thêm +
          </button>
        </div>
      </form>
    </div>
  );
};

export default WorkScheduleAdd;

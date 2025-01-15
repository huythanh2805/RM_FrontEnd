import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { toast } from "@/hooks/use-toast";
import { Link, useNavigate, useParams } from "react-router-dom";

const WorkScheduleUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [month, setMonth] = useState("");
  const [weeks, setWeeks] = useState(["", "", "", ""]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Lấy danh sách nhân viên
        const employeesResponse = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/employees`
        );
        const activeEmployees = employeesResponse.data.filter(
          (employee) => employee.employStatus === "ACTIVE"
        );
        setEmployees(
          activeEmployees.map((employee) => ({
            value: employee._id,
            label: employee.name,
          }))
        );
    
        // Lấy thông tin lịch làm việc của nhân viên
        const scheduleResponse = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/workSchedules/${id}`
        );
        const schedule = scheduleResponse.data;
    
        setSelectedEmployee({
          value: schedule.employee_id._id,
          label: schedule.employee_id.name,
        });
        setMonth(schedule.month);
        setWeeks([schedule.week_1 || "", schedule.week_2 || "", schedule.week_3 || "", schedule.week_4 || ""]);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast({
          variant: "destructive",
          title: "Lỗi",
          description: "Không thể lấy thông tin lịch làm việc!",
        });
      }
    };
    

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedEmployee || !month) {
      toast({
        variant: "destructive",
        title: "Vui lòng chọn đầy đủ thông tin!",
      });
      return;
    }

    const selectedDate = new Date(`${month}-01`);
    const currentDate = new Date();
    if (selectedDate < new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)) {
      toast({
        variant: "destructive",
        title: "Tháng đã qua!",
        description: "Không thể sửa ca làm trong thời gian đã qua.",
      });
      return;
    }

    try {
      const updatedSchedule = {
        employee_id: selectedEmployee.value,
        month,
        week_1: weeks[0] || null,
        week_2: weeks[1] || null,
        week_3: weeks[2] || null,
        week_4: weeks[3] || null,
      };

      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/workSchedules/${id}`,
        updatedSchedule
      );

      toast({ variant: "success", title: "Cập nhật ca làm thành công!" });
      navigate("/admin/listworkSchedule");
    } catch (error) {
      console.error("Lỗi:", error);

      if (error.response?.status === 400) {
        const message = error.response.data.message || "";
        if (message.includes("already has a work schedule")) {
      toast({
        variant: "destructive",
        title: "Cập nhật ca làm thất bại!",
            description: `Nhân viên "${selectedEmployee.label}" đã có ca làm trong tháng ${month}. Vui lòng kiểm tra lại.`,
          });
        } else {
          toast({
            variant: "destructive",
            title: "Cập nhật ca làm thất bại!",
            description: message || "Đã xảy ra lỗi.",
          });
        }
      } else {
        toast({
          variant: "destructive",
          title: "Cập nhật ca làm thất bại!",
          description: "Đã xảy ra lỗi trong quá trình cập nhật ca làm.",
      });
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">Cập nhật ca làm</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="ten-nhan-vien" className="block text-sm font-medium text-gray-700 mb-2">
            Tên nhân viên
          </label>
          <Select
            id="ten-nhan-vien"
            name="ten-nhan-vien"
            options={employees}
            value={selectedEmployee}
            onChange={setSelectedEmployee}
            isClearable={true}
            placeholder="Chọn tên nhân viên"
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="thang" className="block text-sm font-medium text-gray-700 mb-2">
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

        {weeks.map((week, index) => (
          <div className="mb-4" key={index}>
            <label htmlFor={`tuan-${index + 1}`} className="block text-sm font-medium text-gray-700 mb-2">
              Tuần {index + 1}
            </label>
            <select
              id={`tuan-${index + 1}`}
              name={`tuan-${index + 1}`}
              value={week}
              onChange={(e) => {
                const updatedWeeks = [...weeks];
                updatedWeeks[index] = e.target.value;
                setWeeks(updatedWeeks);
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
            to="/admin/listworkSchedule"
            className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md text-sm font-semibold hover:bg-gray-300"
          >
            Quay lại
          </Link>

          <button
            type="submit"
            className="bg-green-200 text-green-800 px-6 py-2 rounded-md text-sm font-semibold hover:bg-green-300 transition"
          >
            Cập Nhật
          </button>
        </div>
      </form>
    </div>
  );
};

export default WorkScheduleUpdate;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { Link, useNavigate, useParams } from "react-router-dom";

const WorkScheduleUpdate = () => {
  const { id } = useParams();
  const [selectedEmployee, setSelectedEmployee] = useState();
  const [month, setMonth] = useState("");
  const [weeks, setWeeks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorkSchedule = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/workSchedules/${id}`
        );
        const schedule = response.data;
        setSelectedEmployee({
          value: schedule.employee_id._id,
          label: schedule.employee_id.name,
        });
        setMonth(schedule.month);
        setWeeks([
          schedule.week_1,
          schedule.week_2,
          schedule.week_3,
          schedule.week_4,
        ]);
      } catch (error) {
        console.error("Error fetching work schedule:", error);
        toast({
          variant: "destructive",
          title: "Lỗi",
          description: "Không thể lấy thông tin lịch làm việc!",
        });
      }
    };

    fetchWorkSchedule();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // không load lại trang khi submit chưa đủ thông tin

    if (!month) {
      toast({
        variant: "destructive",
        title: "Vui lòng chọn đầy đủ thông tin!",
      });
      return;
    }

    try {
      const updatedSchedule = {
        month,
        week_1: weeks[0],
        week_2: weeks[1],
        week_3: weeks[2],
        week_4: weeks[3],
      };

      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/workSchedules/${id}`,
        updatedSchedule
      );
      toast({ variant: "success", title: "Cập nhật ca làm thành công!" });
      console.log("OK", response.data);
      navigate("/admin/listworkSchedule");
    } catch (error) {
      console.error("Lỗi:", error);
      toast({
        variant: "destructive",
        title: "Cập nhật ca làm thất bại!",
      });
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
      <h1 className="text-[32px] font-semibold mb-4">Cập nhật ca làm </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tên nhân viên
          </label>
          {selectedEmployee && (
            <p className="block text-xl font-medium text-gray-500">
              {selectedEmployee.label}
            </p>
          )}
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

        {weeks.map((week, index) => (
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
              onChange={(e) =>
                setWeeks((prevWeeks) => {
                  const newWeeks = [...prevWeeks];
                  newWeeks[index] = e.target.value;
                  return newWeeks;
                })
              }
              className="block w-32 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Chọn ca làm</option>
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

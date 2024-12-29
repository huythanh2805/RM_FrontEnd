import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";

const WorkScheduleAdd = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [month, setMonth] = useState("");
  const [week1, setWeek1] = useState(1);
  const [week2, setWeek2] = useState(1);
  const [week3, setWeek3] = useState(1);
  const [week4, setWeek4] = useState(1);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/employees`
        );
        console.log("Employees data:", response.data);
        if (Array.isArray(response.data)) {
          setEmployees(
            response.data.map((employee) => ({
              value: employee._id,
              label: employee.name,
            }))
          );
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchEmployees();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); // ngưng load lại trang khi không nhập đầy đủ thông tin
    if (!selectedEmployee || !month) {
      alert("Vui lòng chọn đầy đủ thông tin!");
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

      alert("Thêm ca làm thành công!");
      console.log("OK", response.data);
    } catch (error) {
      console.error("Loi", error);
      alert("Thêm ca làm thất bại!");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 mt-20 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">
        Thêm ca làm
      </h2>
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
            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="1">Ca 1</option>
              <option value="2">Ca 2</option>
              <option value="3">Ca 3</option>
            </select>
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Thêm Nhân Viên
        </button>
      </form>
    </div>
  );
};

export default WorkScheduleAdd;

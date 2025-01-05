import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const EmployeeAdd = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    axios
      .post(`${import.meta.env.VITE_API_BASE_URL}/employees`, data)
      .then(() => {
        navigate("/admin/employees");
        toast({ variant: "success", title: "Thêm nhân viên thành công!" });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="w-full min-h-screen bg-[#f5f6fa]">
      <div className="px-5 py-2">
        <h2 className="text-[32px] font-semibold mb-4">Thêm nhân viên</h2>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              Tên nhân viên:
            </label>
            <input
              type="text"
              className={`mt-1 block w-full px-4 py-2 border ${
                errors.name
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300 focus:border-gray-500"
              } rounded-md shadow-sm focus:outline-none`}
              {...register("name", {
                required: "Tên là bắt buộc",
                minLength: {
                  value: 3,
                  message: "Tên phải có ít nhất 3 ký tự",
                },
              })}
            />
            {errors.name && (
              <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="gender"
              className="text-sm font-medium text-gray-700"
            >
              Giới tính:
            </label>
            <select
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none"
              {...register("gender", { required: "Giới tính là bắt buộc" })}
            >
              <option value="">Chọn giới tính</option>
              <option value="MALE">Nam</option>
              <option value="FEMALE">Nữ</option>
            </select>
            {errors.gender && (
              <p className="mt-2 text-sm text-red-600">
                {errors.gender.message}
              </p>
            )}
          </div>

         
          <div>
            <label
              htmlFor="phoneNumber"
              className="text-sm font-medium text-gray-700"
            >
              Số điện thoại:
            </label>
            <input
              type="text"
              className={`mt-1 block w-full px-4 py-2 border ${
                errors.phoneNumber
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300 focus:border-gray-500"
              } rounded-md shadow-sm focus:outline-none`}
              {...register("phoneNumber", {
                required: "Số điện thoại là bắt buộc",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Số điện thoại không hợp lệ",
                },
              })}
            />
            {errors.phoneNumber && (
              <p className="mt-2 text-sm text-red-600">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="workPosition"
              className="text-sm font-medium text-gray-700"
            >
              Vị trí công việc:
            </label>
            <select
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none"
              {...register("workPosition", {
                required: "Vị trí công việc là bắt buộc",
              })}
            >
              <option >Chọn vị trí</option>
              <option >Bếp trưởng</option>
              <option >Phụ bếp</option>
              <option >Nhân viên phục vụ</option>
              <option >Quản lý nhà hàng</option>
              <option >Lễ tân</option>
            </select>
            {errors.workPosition && (
              <p className="mt-2 text-sm text-red-600">
                {errors.workPosition.message}
              </p>
            )}
          </div>

          <div className="flex justify-end space-x-2">
            <Link
              to="/admin/employees"
              className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md text-sm font-semibold hover:bg-gray-300"
            >
              Quay lại
            </Link>

            <button
              type="submit"
              className="bg-green-200 text-green-800 px-6 py-2 rounded-md text-sm font-semibold hover:bg-green-300 transition"
            >
              Thêm +
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeAdd;

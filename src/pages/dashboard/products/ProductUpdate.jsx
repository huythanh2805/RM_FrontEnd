import { useUpdateSeller } from "@/hooks/dashboard/sellers/useUpdate";
import { Link } from "react-router-dom";

export const ProductUpdate = () => {
  const { register, onSubmit, handleSubmit, errors } = useUpdateSeller();

  return (
    <div className="w-full min-h-screen bg-[#f5f6fa]">
      <div className="px-5 py-2 ">
        <h2 className="text-[32px] font-semibold mb-4">Chỉnh sửa nhà cung cấp</h2>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              Tên nhà cung cấp:
            </label>
            <input
              type="text"
              className={`mt-1 block w-full px-4 py-2 border ${
                errors.name ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-gray-500"
              } rounded-md shadow-sm focus:outline-none`}
              {...register("name", {
                required: "Tên là bắt buộc",
                minLength: {
                  value: 3,
                  message: "Tên phải có ít nhất 3 ký tự",
                },
              })}
            />
            {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>}
          </div>
          <div>
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              Mã nhà cung cấp:
            </label>
            <input
              type="text"
              className={`mt-1 block w-full px-4 py-2 border ${
                errors.name ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-gray-500"
              } rounded-md shadow-sm focus:outline-none`}
              {...register("code", {
                required: "Tên là bắt buộc",
                minLength: {
                  value: 3,
                  message: "Tên phải có ít nhất 3 ký tự",
                },
              })}
            />
            {errors.code && <p className="mt-2 text-sm text-red-600">{errors.code.message}</p>}
          </div>
          <div>
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              Email:
            </label>
            <input
              type="text"
              className={`mt-1 block w-full px-4 py-2 border ${
                errors.name ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-gray-500"
              } rounded-md shadow-sm focus:outline-none`}
              {...register("email", {
                required: "Tên là bắt buộc",
                minLength: {
                  value: 3,
                  message: "Tên phải có ít nhất 3 ký tự",
                },
              })}
            />
            {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="phoneNumber" className="text-sm font-medium text-gray-700">
              Số điện thoại:
            </label>
            <input
              type="text"
              className={`mt-1 block w-full px-4 py-2 border ${
                errors.phoneNumber ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-gray-500"
              } rounded-md shadow-sm focus:outline-none`}
              {...register("phone", {
                required: "Số điện thoại là bắt buộc",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Số điện thoại không hợp lệ",
                },
              })}
            />
            {errors.phone && <p className="mt-2 text-sm text-red-600">{errors.phone.message}</p>}
          </div>
          <div>
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              Địa chỉ:
            </label>
            <input
              type="text"
              className={`mt-1 block w-full px-4 py-2 border ${
                errors.name ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-gray-500"
              } rounded-md shadow-sm focus:outline-none`}
              {...register("address", {
                required: "Tên là bắt buộc",
                minLength: {
                  value: 3,
                  message: "Tên phải có ít nhất 3 ký tự",
                },
              })}
            />
            {errors.address && <p className="mt-2 text-sm text-red-600">{errors.address.message}</p>}
          </div>
          <div>
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              Mô tả:
            </label>
            <input
              type="text"
              className={`mt-1 block w-full px-4 py-2 border ${
                errors.name ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-gray-500"
              } rounded-md shadow-sm focus:outline-none`}
              {...register("description", {
                required: "Tên là bắt buộc",
                minLength: {
                  value: 3,
                  message: "Tên phải có ít nhất 3 ký tự",
                },
              })}
            />
            {errors.description && <p className="mt-2 text-sm text-red-600">{errors.description.message}</p>}
          </div>

          <div className="flex justify-end space-x-2">
            <Link
              to="/admin/employees"
              className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md text-sm font-semibold hover:bg-gray-300 "
            >
              Quay lại
            </Link>

            <button
              type="submit"
              className="bg-blue-200 text-blue-800 px-6 py-2 rounded-md text-sm font-semibold hover:bg-blue-300 transition"
            >
              Cập nhật
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

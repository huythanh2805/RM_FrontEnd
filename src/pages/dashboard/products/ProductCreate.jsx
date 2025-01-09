import { useCreateProducts } from "@/hooks/dashboard/products/useCreate";
import { UNITS } from "@/utilities/const";
import { Link } from "react-router-dom";

export const ProductCreate = () => {
  const { register, onSubmit, handleSubmit, errors } = useCreateProducts();

  return (
    <div className="w-full min-h-screen bg-[#f5f6fa]">
      <div className="px-5 py-2">
        <h2 className="text-[32px] font-semibold mb-4">Thêm thực phẩm</h2>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="code" className="text-sm font-medium text-gray-700">
              Mã sản phẩm:
            </label>
            <input
              type="text"
              className={`mt-1 block w-full px-4 py-2 border ${errors.code ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-gray-500"
                } rounded-md shadow-sm focus:outline-none`}
              {...register("code", {
                required: "Mã sp là bắt buộc",
              })}
            />
            {errors.code && <p className="mt-2 text-sm text-red-600">{errors.code.message}</p>}
          </div>
          <div>
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              Tên sản phẩm:
            </label>
            <input
              type="text"
              className={`mt-1 block w-full px-4 py-2 border ${errors.name ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-gray-500"
                } rounded-md shadow-sm focus:outline-none`}
              {...register("name", {
                required: "Tên là bắt buộc",
              })}
            />
            {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>}
          </div>
          <div>
            <label htmlFor="category" className="text-sm font-medium text-gray-700">
              Loại sản phẩm:
            </label>
            <input
              type="text"
              className={`mt-1 block w-full px-4 py-2 border ${errors.category ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-gray-500"
                } rounded-md shadow-sm focus:outline-none`}
              {...register("category", {
                required: "Tên là bắt buộc",
                minLength: {
                  value: 3,
                  message: "Tên phải có ít nhất 3 ký tự",
                },
              })}
            />
            {errors.category && <p className="mt-2 text-sm text-red-600">{errors.category.message}</p>}
          </div>
          <div>
            <label htmlFor="unit" className="text-sm font-medium text-gray-700">
              Đơn vị tính:
            </label>
            <select
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none"
              {...register("unit", {
                required: "Đơn vị là bắt buộc",
              })}
            >
              {UNITS?.map((item) => {
                return <option value={item}>{item}</option>;
              })}
            </select>
            {errors.unit && <p className="mt-2 text-sm text-red-600">{errors.unit.message}</p>}
          </div>
          <div className="flex justify-end space-x-2">
            <Link
              to="/admin/products"
              className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md text-sm font-semibold hover:bg-gray-300"
            >
              Quay lại
            </Link>

            <button
              type="submit"
              className="bg-green-200 text-green-800 px-6 py-2 rounded-md text-sm font-semibold hover:bg-green-300 transition"
            >
              Tạo mới +
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

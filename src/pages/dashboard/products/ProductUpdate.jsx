import { useUpdateProducts } from "@/hooks/dashboard/products/useUpdate";
import { UNITS } from "@/utilities/const";
import { Link } from "react-router-dom";

export const ProductUpdate = () => {
  const { register, onSubmit, handleSubmit, errors } = useUpdateProducts();

  return (
    <div className="w-full min-h-screen bg-[#f5f6fa]">
      <div className="px-5 py-2 ">
        <h2 className="text-[32px] font-semibold mb-4">Chỉnh sửa thực phẩm</h2>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="code" className="text-sm font-medium text-gray-700">
              Mã sản phẩm:
            </label>
            <input
              type="text"
              className={`mt-1 block w-full px-4 py-2 border ${
                errors.code ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-gray-500"
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
              className={`mt-1 block w-full px-4 py-2 border ${
                errors.name ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-gray-500"
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
              className={`mt-1 block w-full px-4 py-2 border ${
                errors.category ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-gray-500"
              } rounded-md shadow-sm focus:outline-none`}
              {...register("category", {
                required: "Loại sản phẩm là bắt buộc",
              })}
            />
            {errors.category && <p className="mt-2 text-sm text-red-600">{errors.category.message}</p>}
          </div>

          <div>
            <label htmlFor="price" className="text-sm font-medium text-gray-700">
              Giá:
            </label>
            <input
              type="text"
              className={`mt-1 block w-full px-4 py-2 border ${
                errors.price ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-gray-500"
              } rounded-md shadow-sm focus:outline-none`}
              {...register("price", {
                required: "Giá sp là bắt buộc",
                pattern: {
                  value: /^[0-9]{10}$/,
                },
              })}
            />
            {errors.price && <p className="mt-2 text-sm text-red-600">{errors.price.message}</p>}
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
          <div>
            <label htmlFor="expiryDate" className="text-sm font-medium text-gray-700">
              Ngày hết hạn:
            </label>
            <input
              type="date"
              className={`mt-1 block w-full px-4 py-2 border ${
                errors.expiryDate ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-gray-500"
              } rounded-md shadow-sm focus:outline-none`}
              {...register("expiryDate", {
                required: "Ngày hết hạn là bắt buộc",
              })}
            />
            {errors.expiryDate && <p className="mt-2 text-sm text-red-600">{errors.expiryDate.message}</p>}
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

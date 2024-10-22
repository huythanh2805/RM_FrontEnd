import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const CategoryAdd = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onsubmit = (data) => {
    axios
      .post("http://localhost:1111/categories", data)
      .then(() => {
        navigate("/dashboard/categories");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="w-full min-h-screen bg-[#f5f6fa]">
        <div className="px-5 py-2 ">
          <h2 className="text-[32px] font-semibold mb-4">Thêm danh mục</h2>
          <form className="space-y-6" onSubmit={handleSubmit(onsubmit)}>
            <div>
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-700"
              >
                Tên danh mục:
              </label>
              <input
                type="text"
                className={`mt-1 block w-full px-4 py-2 border ${
                  errors.name
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-300 focus:border-gray-500"
                } rounded-md shadow-sm focus:outline-none`}
                {...register("name", {
                  required: "Vui lòng nhập tên danh mục"
                })}
              />
              {errors.name && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="desc"
                className="text-sm font-medium text-gray-700"
              >
                Mô tả:
              </label>
              <input
                type="text"
                className={`mt-1 block w-full px-4 py-2 border ${
                  errors.desc
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-300 focus:border-gray-500"
                } rounded-md shadow-sm focus:outline-none`}
                {...register("desc")}
              />
            </div>

            {/* Checkbox isShow */}
            <div>
              <div className="flex items-center">
                <label
                  htmlFor="isShow"
                  className="text-sm font-medium text-gray-700"
                >
                  Có sẵn
                </label>
                <input
                  type="checkbox"
                  className="ml-2 w-4 h-4"
                  {...register("isShow")}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Link
                to="/dashboard/categories"
                className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md text-sm font-semibold hover:bg-gray-300 "
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
    </>
  );
};

export default CategoryAdd;

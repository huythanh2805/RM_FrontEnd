import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import Navbar from "@/components/Admin/Navbar";

const CategoryUpdate = () => {
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:1111/categories/${id}`)
      .then((res) => {
        //   console.log("Data", res);
        setValue("name", res.data.name);
        setValue("desc", res.data.desc);
        setValue("isShow", res.data.isShow);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setValue]);

  const onsubmit = (data) => {
    axios
      .put(`http://localhost:1111/categories/${id}`, data)
      .then(() => {
        navigate("/admin/categories");
        toast({ variant: "success", title: "Cập nhật danh mục thành công" });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="w-full min-h-screen bg-[#f9fafb]">
        <Navbar />
        
        <div className="px-5 py-5">
          <h2 className="text-3xl font-semibold mb-4">Cập nhật danh mục</h2>
          <form className="space-y-6" onSubmit={handleSubmit(onsubmit)}>
            <div>
              <label
                htmlFor="name"
                className="text-sl font-medium text-gray-700"
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
                  required: "Name is required",
                  minLength: {
                    value: 3,
                    message: "Name must be at least 3 characters long",
                  },
                })}
              />
              {errors.name && (
                <p className="mt-2 text-sl text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="desc"
                className="text-sl font-medium text-gray-700"
              >
                Mô tả:
              </label>
              <textarea
                className="mt-1 block h-32 w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none"
                {...register("desc")}
              />
            </div>

            {/* Checkbox isShow */}
            <div>
              <div className="flex items-center">
                <label
                  htmlFor="isShow"
                  className="text-sl font-medium text-gray-700"
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
                to="/admin/categories"
                className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md text-sl font-semibold hover:bg-gray-300 "
              >
                Quay lại
              </Link>

              <button
                type="submit"
                className="bg-blue-200 text-blue-800 px-6 py-2 rounded-md text-sl font-semibold hover:bg-blue-300 transition"
              >
                Cập nhật
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CategoryUpdate;

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FaRegImage, FaTimes } from "react-icons/fa";
import BASE_URL from "@/configs";
import CLOUDINARY_URL from "@/configs/cloudinary_api";

const DishUpdate = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams(); // Lấy ID từ URL

  useEffect(() => {
    axios
      .get(BASE_URL + `/categories`)
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.error(err);
      });

    axios
      .get(BASE_URL + `/dishes/${id}`)
      .then((res) => {
        const dish = res.data;
        setImages(dish.images || []); // Cập nhật ảnh đã có
        setValue("name", dish.name);
        setValue("price", dish.price);
        setValue("category_id", dish.category_id?._id);
        setValue("desc", dish.desc);
        setValue("isShow", dish.isShow);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id, setValue]);

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "rm-file");

    const response = await axios.post(CLOUDINARY_URL, formData);
    return response.data.secure_url;
  };

  // Hàm xử lý khi người dùng chọn ảnh
  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    const uploadedImages = await Promise.all(
      files.map((file) => uploadImage(file))
    );
    setImages((prevImages) => [...prevImages, ...uploadedImages]);
  };

  // Hàm xoá ảnh
  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const onSubmit = async (data) => {
    try {
      const formData = {
        ...data,
        images,
      };

      await axios.put(BASE_URL + `/dishes/${id}`, formData);
      navigate("/dashboard/dishes");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#f5f6fa]">
      <div className="px-5 py-2">
        <h2 className="text-[32px] font-semibold mb-4">Cập nhật món ăn</h2>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Tên món ăn */}
          <div>
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              Tên món ăn:
            </label>
            <input
              type="text"
              className={`mt-1 block w-full px-4 py-2 border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none`}
              {...register("name", {
                required: "Vui lòng nhập tên món ăn",
              })}
            />
            {errors.name && (
              <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          {/* Giá bán */}
          <div>
            <label
              htmlFor="price"
              className="text-sm font-medium text-gray-700"
            >
              Giá bán:
            </label>
            <input
              type="number"
              className={`mt-1 block w-full px-4 py-2 border ${
                errors.price ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none`}
              {...register("price", {
                required: "Vui lòng nhập giá món",
                min: {
                  value: 1,
                  message: "Giá món phải lớn hơn 1",
                },
              })}
            />
            {errors.price && (
              <p className="mt-2 text-sm text-red-600">
                {errors.price.message}
              </p>
            )}
          </div>

          {/* Danh mục */}
          <div>
            <label
              htmlFor="category"
              className="text-sm font-medium text-gray-700"
            >
              Danh mục:
            </label>
            <select
              className={`mt-1 block w-full px-4 py-2 border ${
                errors.category_id ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none`}
              {...register("category_id", { required: "Category is required" })}
            >
              <option value="">Chọn danh mục</option>
              {categories.map((cate) => (
                <option key={cate._id} value={cate._id}>
                  {cate.name}
                </option>
              ))}
            </select>
            {errors.category_id && (
              <p className="mt-2 text-sm text-red-600">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Hình ảnh món ăn */}
          <div>
            <input
              type="file"
              id="images"
              className="hidden"
              accept="image/*"
              multiple
              onChange={handleImageChange}
            />
            <div className="mt-4">
              {images.length === 0 ? (
                <label htmlFor="images" className="cursor-pointer">
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    Ảnh món ăn:
                  </p>
                  <div className="flex items-center justify-center w-24 h-24 border-2 border-gray-400 border-dashed rounded bg-white">
                    <FaRegImage size={40} className="text-gray-600" />
                  </div>
                </label>
              ) : (
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    Ảnh món ăn:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {images.map((url, index) => (
                      <div key={index} className="relative">
                        <img
                          src={url}
                          alt={`Uploaded ${index}`}
                          className="w-24 h-24 object-cover rounded"
                        />
                        <button
                          type="button"
                          className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-1"
                          onClick={() => handleRemoveImage(index)}
                        >
                          <FaTimes />
                        </button>
                      </div>
                    ))}

                    {/* Nút thêm hình ảnh */}
                    <label htmlFor="images" className="cursor-pointer">
                      <div className="flex items-center justify-center w-24 h-24 border-2 border-gray-400 border-dashed rounded bg-white">
                        <FaRegImage size={40} className="text-gray-600" />
                      </div>
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mô tả */}
          <div>
            <label htmlFor="desc" className="text-sm font-medium text-gray-700">
              Mô tả:
            </label>
            <textarea
              className="mt-1 block h-32 w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none"
              {...register("desc")}
            />
          </div>

          {/* isShow */}
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
              to="/dashboard/dishes"
              className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md text-sm font-semibold hover:bg-gray-300"
            >
              Quay lại
            </Link>

            <button
              type="submit"
              className="bg-green-200 text-green-800 px-6 py-2 rounded-md text-sm font-semibold hover:bg-green-300 transition"
            >
              Cập nhật
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DishUpdate;

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FaPlus, FaRegImage, FaTimes } from "react-icons/fa";
import BASE_URL from "@/configs";
import CLOUDINARY_URL from "@/configs/cloudinary_api";
import { toast } from "@/hooks/use-toast";
import Pagination from "@/components/Pagination";

const SetComboUpdate = () => {
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [dishes, setDishes] = useState([]);
  const [isMenu, setIsMenu] = useState(false);
  const [selectDish, setSelectDish] = useState([]);
  const [dishImage, setDishImage] = useState([]);
  const [images, setImages] = useState([]);
  const [imagesErr, setImagesErr] = useState(false);
  const [selectDishErr, setSelectDishErr] = useState(false);
  const [imagesUpload, setImagesUpload] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 9;
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${BASE_URL}/setCombos/${id}`)
      .then((res) => {
        // console.log(res.data);

        const combo = res.data;
        setValue("name", combo.name);
        setValue("price", combo.price);
        setValue("desc", combo.desc);
        setValue("isShow", combo.isShow);
        setImages(combo.images);

        // Kiểm tra nếu setComboProducts không rỗng và lấy mảng dishes từ phần tử đầu tiên
        if (combo.setComboProducts && combo.setComboProducts.length > 0) {
          const dishes = combo.setComboProducts[0].dishes;
          setSelectDish(dishes.map((dish) => dish._id)); // Lưu _id của các món ăn
          //   console.log(dishes);
          const selectedDishImages = dishes.map((dish) => dish.images[0]);
          setDishImage(selectedDishImages); // Lưu hình ảnh của món ăn
        }
      })
      .catch((err) => console.error(err));

    axios
      .get(BASE_URL + `/dishes`)
      .then((res) => {
        setDishes(res.data.filter((item) => item.isShow == true));
        // console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id, setValue]);

  // Phân trang
  const startIndex = (currentPage - 1) * itemPerPage;
  const currentItems = dishes.slice(startIndex, startIndex + itemPerPage);
  const pageCount = Math.ceil(dishes.length / itemPerPage);

  const handlePageClick = (e) => {
    setCurrentPage(e.selected + 1);
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "rm-file");

    const response = await axios.post(CLOUDINARY_URL, formData);
    return response.data.secure_url;
  };

  const handleImageChange = async (e) => {
    setImagesUpload(true);

    const files = Array.from(e.target.files);
    const uploadedImages = await Promise.all(
      files.map((file) => uploadImage(file))
    );

    setImages((prevImages) => [...prevImages, ...uploadedImages]);
    setImagesUpload(false);
    setImagesErr(false);
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleOpenMenu = () => setIsMenu(true);

  const handleCloseMenu = () => {
    setSelectDish([]);
    setDishImage([]);
    setIsMenu(false);
  };

  const handleSelectDish = (dishId) => {
    setSelectDishErr(false);
    setSelectDish((prev) =>
      prev.includes(dishId)
        ? prev.filter((id) => id !== dishId)
        : [...prev, dishId]
    );
  };

  const handleConfirmDish = () => {
    const selectedDish = dishes.filter((dish) => selectDish.includes(dish._id));
    const selectedImages = selectedDish.map((dish) => dish.images[0]);
    setDishImage(selectedImages);
    setIsMenu(false);
  };

  const onSubmit = async (data) => {
    try {
      if (images.length === 0) {
        setImagesErr(true);
        return;
      }

      if (selectDish.length === 0) {
        setSelectDishErr(true);
        return;
      }

      const formData = {
        ...data,
        images,
        dishes: selectDish,
      };

      await axios.put(`${BASE_URL}/setCombos/${id}`, formData);
      navigate("/admin/setCombos");
      toast({ variant: "success", title: "Cập nhật combo thành công!" });
    } catch (error) {
      console.error(error);
      toast({ variant: "destructive", title: error.response.data.message });
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#f9fafb]">
      <div className="px-5 py-5">
        <h2 className="text-3xl font-semibold mb-4">Cập nhật combo</h2>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Tên combo */}
          <div>
            <label htmlFor="name" className="text-sl font-medium text-gray-700">
              Tên combo:
            </label>
            <input
              type="text"
              className={`mt-1 block w-full px-4 py-2 border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none`}
              {...register("name", {
                required: "Vui lòng nhập tên combo",
              })}
            />
            {errors.name && (
              <p className="mt-2 text-sl text-red-600">{errors.name.message}</p>
            )}
          </div>

          {/* Giá bán */}
          <div>
            <label
              htmlFor="price"
              className="text-sl font-medium text-gray-700"
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
              <p className="mt-2 text-sl text-red-600">
                {errors.price.message}
              </p>
            )}
          </div>

          {/* Hình ảnh combo */}
          <div>
            <p className="text-sl font-medium text-gray-700">Ảnh combo:</p>
            <input
              type="file"
              id="images"
              className="hidden"
              accept="image/*"
              multiple
              onChange={handleImageChange}
            />
            <div className="mt-2">
              {imagesUpload && (
                <div className="w-52 my-2 px-3 py-1 text-sl font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse">
                  Đang tải ảnh lên...
                </div>
              )}

              {images.length === 0 ? (
                <label htmlFor="images" className="cursor-pointer">
                  <div
                    className={`flex items-center justify-center w-24 h-24 border-2  ${
                      imagesErr ? "border-red-400" : "border-gray-400"
                    } border-dashed rounded bg-white`}
                  >
                    <FaRegImage
                      size={40}
                      className={imagesErr ? "text-red-600" : "text-gray-600"}
                    />
                  </div>
                </label>
              ) : (
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
                    <div
                      className={`flex items-center justify-center w-24 h-24 border-2  ${
                        imagesErr ? "border-red-400" : "border-gray-400"
                      } border-dashed rounded bg-white`}
                    >
                      <FaRegImage
                        size={40}
                        className={imagesErr ? "text-red-600" : "text-gray-600"}
                      />
                    </div>
                  </label>
                </div>
              )}

              {imagesErr && (
                <p className="mt-2 text-sl text-red-600">
                  {imagesErr ? "Vui lòng tải lên ít nhất 1 ảnh" : ""}
                </p>
              )}
            </div>
          </div>

          {/* Món ăn trong combo */}
          <div>
            <p className="text-sl font-medium text-gray-700">
              Món ăn trong combo:
            </p>
            {dishImage.length !== 0 ? (
              <div className="flex flex-wrap gap-2">
                {dishImage.map((url, index) => (
                  <div key={index} className="relative mt-2">
                    <img
                      src={url}
                      alt={`Uploaded ${index}`}
                      className="w-24 h-24 object-cover rounded"
                    />
                  </div>
                ))}

                {/* Nút hình ảnh */}
                <div
                  className={`flex items-center justify-center mt-2 w-24 h-24 border-2 border-gray-400 border-dashed rounded bg-white`}
                  onClick={() => handleOpenMenu()}
                >
                  <FaPlus
                    size={40}
                    className={imagesErr ? "text-red-600" : "text-gray-600"}
                  />
                </div>
              </div>
            ) : (
              <div
                className={`flex items-center justify-center mt-2 w-24 h-24 border-2 ${
                  selectDishErr ? "border-red-400" : "border-gray-400"
                } border-dashed rounded bg-white`}
                onClick={() => handleOpenMenu()}
              >
                <FaPlus
                  size={40}
                  className={selectDishErr ? "text-red-600" : "text-gray-600"}
                />
              </div>
            )}

            {selectDishErr && (
              <p className="mt-2 text-sl text-red-600">
                Vui lòng chọn ít nhất một món ăn trong combo.
              </p>
            )}

            {/* Modal Menu */}
            {isMenu && (
              <div className="bg-[#75767a] fixed inset-0 z-50 bg-opacity-50 flex justify-center items-center">
                <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-[600px]">
                  <p className="text-center text-xl font-semibold mb-6">Menu</p>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {currentItems.map((dish) => (
                      <div
                        key={dish._id}
                        className={`p-2 border rounded-lg hover:shadow-lg transition ${
                          selectDish.includes(dish._id)
                            ? "border-green-500"
                            : "border-gray-200"
                        }`}
                      >
                        <div onClick={() => handleSelectDish(dish._id)}>
                          <img
                            src={dish.images[0]}
                            alt={dish.name}
                            className={`w-full h-24 object-cover rounded-lg mb-2 ${
                              selectDish.includes(dish._id) ? "opacity-50" : ""
                            }`}
                          />
                          <p className="text-center text-sm font-medium truncate">
                            {selectDish.includes(dish._id)
                              ? "Đã chọn"
                              : dish.name}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center mb-4">
                    {/* Phân trang */}
                    <Pagination
                      pageCount={pageCount}
                      onPageChange={handlePageClick}
                    />
                  </div>
                  <div className="flex justify-between items-center gap-4">
                    <button
                      className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
                      onClick={() => handleCloseMenu()}
                    >
                      Hủy bỏ
                    </button>
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                      onClick={handleConfirmDish}
                    >
                      Xác nhận
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mô tả */}
          <div>
            <label htmlFor="desc" className="text-sl font-medium text-gray-700">
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
              to="/admin/setCombos"
              className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md text-sl font-semibold hover:bg-gray-300"
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
  );
};

export default SetComboUpdate;

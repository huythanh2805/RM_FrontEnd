import Navbar from "@/components/Admin/Navbar";
import { useUser } from "@/hooks/dashboard/useAccount";
import { yupResolver } from "@hookform/resolvers/yup";
import { Camera } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as Yup from "yup";

const UserAdd = () => {
  // Định nghĩa schema validation với yup
  const validationSchema = Yup.object({
    userName: Yup.string().required("Vui lòng nhập họ tên"),
    email: Yup.string()
      .email("Email không hợp lệ")
      .required("Vui lòng nhập email"),
    password: Yup.string().required("Vui lòng nhập mật khẩu"),
    phoneNumber: Yup.string()
      .required("Vui lòng nhập số điện thoại")
      .matches(/^[0-9]+$/, "Số điện thoại chỉ được chứa chữ số"),
    address: Yup.string().required("Vui lòng nhập địa chỉ"),
  });

  // Khởi tạo form với react-hook-form và yupResolver để áp dụng schema validation
  const form = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      userName: "",
      email: "",
      password: "",
      phoneNumber: "",
      address: "",
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;
  const { handleImageChange, handleAdd, selectedImage, isLoading } = useUser(
    null,
    form
  );

  const onSubmit = (data) => {
    handleAdd(data);
  };

  return (
    <div className="w-full min-h-screen bg-[#f9fafb]">
      <Navbar />

      <div className="px-5 py-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <p className="text-2xl font-semibold mb-4">Thêm mới tài khoản</p>

          <div className="flex gap-16 mt-9">
            <div className="flex flex-col items-center">
              <div className="w-48 h-48 bg-gray-100 rounded-full flex items-center justify-center mb-4 overflow-hidden">
                {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt="Selected"
                    className="w-full h-full object-cover rounded-full"
                    style={{ maxWidth: "100%", maxHeight: "100%" }}
                  />
                ) : (
                  <label className="cursor-pointer flex flex-col items-center">
                    <Camera className="w-12 h-12 text-gray-400" />
                    <span className="text-sm text-gray-500 mt-2">
                      Upload photo
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                )}
              </div>
              <label className="cursor-pointer">
                <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                  Change Photo
                </span>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleImageChange}
                  accept="image/*"
                />
              </label>
              <div className="text-xs text-gray-500 text-center mt-3">
                Allowed *.jpeg, *.jpg, *.png, *.gif
                <br />
                max size of 3 Mb
              </div>
            </div>

            <div className="space-y-6 w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="userName">Họ tên</label>
                  <input
                    type="text"
                    id="userName"
                    {...register("userName")}
                    placeholder="Username"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.userName && (
                    <p className="text-red-500 text-sm">
                      {errors.userName.message}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    {...register("email")}
                    placeholder="Email address"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="password">Mật khẩu</label>
                  <input
                    type="password"
                    id="password"
                    {...register("password")}
                    placeholder="Password"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="phoneNumber">Số điện thoại</label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    {...register("phoneNumber")}
                    placeholder="Enter phone number"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-sm">
                      {errors.phoneNumber.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="address">Địa chỉ</label>
                <input
                  type="text"
                  id="address"
                  {...register("address")}
                  placeholder="Address"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors.address && (
                  <p className="text-red-500 text-sm">
                    {errors.address.message}
                  </p>
                )}
              </div>

              <div className="flex justify-end mt-8">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-green-200 text-green-800 px-6 py-2 rounded-md text-sl font-semibold hover:bg-green-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Đang xử lý..." : "Thêm mới"}
                </button>
                <Link
                  to="/admin/users"
                  className="ml-2 px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                >
                  Quay lại
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserAdd;

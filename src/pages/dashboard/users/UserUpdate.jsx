import { useUser } from "@/hooks/dashboard/useAccount";
import { Camera } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";

const UserUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      userName: "",
      email: "",
      phoneNumber: "",
      address: "",
    },
  });

  const { register, handleSubmit, setValue } = form;

  const { selectedImage, handleImageChange, user, error, isUserLoading, handleUpdate } = useUser(id, setValue);

  const onSubmit = (data) => {
    handleUpdate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-2 mt-11">
      <div className="text-2xl font-semibold mb-4">Cập nhật tài khoản</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-9">
        <div className="flex flex-col items-center">
          <div className="w-48 h-48 bg-gray-100 rounded-full flex items-center justify-center mb-4 overflow-hidden">
            {selectedImage ? (
              <img src={selectedImage} alt="User" className="w-full h-full object-cover" />
            ) : user?.image ? (
              <img src={user.image} alt="User" className="w-full h-full object-cover" />
            ) : (
              <label className="cursor-pointer flex flex-col items-center">
                <Camera className="w-12 h-12 text-gray-400" />
                <span className="text-sm text-gray-500 mt-2">Upload photo</span>
                <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
              </label>
            )}
          </div>
          <label className="cursor-pointer">
            <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              Change Photo
            </span>
            <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
          </label>
          <div className="text-xs text-gray-500 text-center mt-2">
            Allowed *.jpeg, *.jpg, *.png, *.gif
            <br />
            max size of 3 Mb
          </div>
        </div>
        {/* Form Fields Section */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="userName">Họ tên</label>
              <input
                type="text"
                id="userName"
                {...register("userName")}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent border-gray-300"
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                {...register("email")}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent border-gray-300"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="password">Mật khẩu</label>
              <input
                type="password"
                id="password"
                {...register("password")}
                placeholder="Password (leave blank to keep current)"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="phoneNumber">Số điện thoại</label>
              <input
                type="tel"
                id="phoneNumber"
                {...register("phoneNumber")}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent border-gray-300"
              />
            </div>
          </div>

          <div>
            <label htmlFor="address">Địa chỉ</label>
            <input
              type="text"
              id="address"
              {...register("address")}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Buttons Section */}
      <div className="flex justify-end mt-8">
        <button
          type="submit"
          disabled={isUserLoading}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isUserLoading ? "Đang xử lý..." : "Cập nhật"}
        </button>
        <Link to="/dashboard/users" className="ml-2 px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">
          Quay lại
        </Link>
      </div>

      {error && <div className="text-red-500 mt-2">{error}</div>}
    </form>
  );
};

export default UserUpdate;

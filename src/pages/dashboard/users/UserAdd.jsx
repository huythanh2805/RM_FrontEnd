import { useUser } from "@/hooks/dashboard/useAccount";
import { Camera } from "lucide-react";

const UserAdd = () => {
  const { register, error, success, isLoading, handleImageChange, onSubmit, handleSubmit, selectedImage } = useUser();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-2 mt-11">
      <div className="text-2xl font-semibold mb-4">Thêm mới tài khoản</div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-9">
        {/* Left Column - Photo Upload */}
        <div className="flex flex-col items-center">
          <div className="w-48 h-48 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            {selectedImage ? (
              <img src={selectedImage} alt="Selected" className="w-full h-full object-cover rounded-full" />
            ) : (
              <label className="cursor-pointer flex flex-col items-center">
                <Camera className="w-12 h-12 text-gray-400" />
                <span className="text-sm text-gray-500 mt-2">Upload photo</span>
                <input type="file" className="hidden" onChange={handleImageChange} />
              </label>
            )}
          </div>
          <div className="text-xs text-gray-500 text-center">
            Allowed *.jpeg, *.jpg, *.png, *.gif
            <br />
            max size of 3 Mb
          </div>
        </div>

        {/* Right Column - Form Fields */}
        <div className="space-y-6">
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
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-8">
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Đang xử lý..." : "Thêm mới"}
        </button>
      </div>

      {error && <div className="text-red-500 mt-2">{error}</div>}
      {success && <div className="text-green-500 mt-2">{success}</div>}
    </form>
  );
};

export default UserAdd;

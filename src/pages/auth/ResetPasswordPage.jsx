import { useResetPassword } from "@/hooks/auth/useResetPassword";
import { Link } from "react-router-dom";

export const ResetPasswordPage = () => {
  const { newPassword, setNewPassword, confirmPassword, setConfirmPassword, message, error, loading, resetPassword } =
    useResetPassword();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = window.location.pathname.split("/").pop(); // Lấy token từ URL
    await resetPassword(token, newPassword); // Gọi hàm với token và mật khẩu mới
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Đặt lại mật khẩu
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="new-password" className="block text-sm font-medium leading-6 text-gray-900">
              Mật khẩu mới
            </label>
            <div className="mt-2">
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Nhập mật khẩu mới"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium leading-6 text-gray-900">
              Xác nhận mật khẩu mới
            </label>
            <div className="mt-2">
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Xác nhận mật khẩu mới"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {loading ? "Đang đặt lại..." : "Đặt lại mật khẩu"}
            </button>
          </div>
          {error && ( // Hiển thị thông báo lỗi nếu có
            <div className="mt-2 text-red-600">{error}</div>
          )}
          {message && <p className="mt-2 text-green-600">{message}</p>}
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Quay lại trang&nbsp;
          <Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
};

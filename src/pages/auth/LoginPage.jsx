import { useGoogleLogin } from "@/hooks/auth/useGoogleLogin";
import { useLogin } from "@/hooks/auth/useLogin";
import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { Link } from "react-router-dom";

export const LoginPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { register, handleSubmit, handleLoginSubmit, error } = useLogin(setIsLoggedIn);
  const { onSuccess, onError } = useGoogleLogin();
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Đăng nhập tài khoản của bạn
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit(handleLoginSubmit)}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email
            </label>
            <div className="mt-2">
              <input
                type="email"
                {...register("email")}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Mật khẩu
              </label>
              <div className="text-sm">
                <Link to="/forgot-password" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Quên mật khẩu ?
                </Link>
              </div>
            </div>
            <div className="mt-2">
              <input
                type="password"
                {...register("password")}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Đăng nhập
            </button>
          </div>
          {error && ( // Hiển thị thông báo lỗi nếu có
            <div className="mt-2 text-red-600">{error}</div>
          )}
        </form>
        <div className="relative mt-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">hoặc</span>
          </div>
        </div>{" "}
        <br />
        <div className="flex items-center justify-center">
          <GoogleLogin onSuccess={onSuccess} onError={onError}></GoogleLogin>
        </div>
        <p className="mt-10 text-center text-sm text-gray-500">
          Bạn chưa có tài khoản?&nbsp;
          <Link to="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Đăng kí ngay
          </Link>
        </p>
      </div>
    </div>
  );
};

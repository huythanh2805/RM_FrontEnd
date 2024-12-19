import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartProvider";
import { Check } from "lucide-react";

function ThanksPage() {
  const { clearCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="px-2 py-2 rounded-full border-[6px] border-green-500">
            <Check width={85} height={85} className="text-green-500" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Thanh toán thành công!
        </h1>
        <p className="text-gray-900 mb-4">
          Cảm ơn bạn đã đặt bàn tại nhà hàng của chúng tôi.
        </p>
        <p className="text-sm italic text-gray-600 mb-6">
          Chúng tôi đã xác nhận thanh toán và sẽ sớm liên hệ để xác nhận đặt bàn.
        </p>
        <div className="flex justify-center">
          <button
            onClick={() => navigate("/")}
            className="rounded-full py-2 px-4 flex items-center bg-[#ffe6dc] justify-center transition-all duration-500 hover:bg-[#ffcbb3]"
          >
            <span className="font-semibold text-base leading-6 text-[#fb6340]">Quay về trang chủ</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 22 22"
              fill="none"
              className="ml-1"
            >
              <path
                d="M8.25324 5.49609L13.7535 10.9963L8.25 16.4998"
                stroke="#fb6340"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ThanksPage;

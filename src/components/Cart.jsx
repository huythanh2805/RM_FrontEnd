import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/contexts/CartProvider";
import { formatCurrency } from "@/utilities/utils";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

const Cart = () => {
  const [isClient, setIsClient] = useState(false);
  const router = useNavigate();
  const { cart, updateQuantity, removeItem } = useCart();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleMinus = (dish_id, quantity) => {
    if (quantity < 1) removeItem(dish_id);
    updateQuantity(dish_id, quantity);
  };
  const handlePlus = (dish_id, quantity) => {
    updateQuantity(dish_id, quantity);
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );
  const totalOrderedFood = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Sheet>
      <SheetTrigger>
        <div className="relative btnCustom dark:btnCustom_dark px-2 py-2">
          <ShoppingCart
            width={30}
            strokeWidth={"1.5px"}
            height={30}
            className="cursor-pointer"
          />
          {isClient && (
            <p className="absolute top-0 translate-x-[-60%] translate-y-[-50%] text-white bg-red-1 font-medium w-5 h-5 rounded-full flex items-center justify-center">
              {totalOrderedFood}
            </p>
          )}
        </div>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-full md:max-w-[640px] h-screen border-none">
        <div className="bg-light-bg_2 dark:bg-dark-bg_2 text-light-text dark:text-dark-text w-full h-screen p-2 sm:p-4">
          <div className="flex items-center gap-1 mb-4">
            <h2 className="text-lg sm:text-xl font-bold">Giỏ hàng</h2>
            <span className="text-lg sm:text-xl font-semibold text-red-500">
              ({totalOrderedFood})
            </span>
          </div>

          <div className="space-y-2 sm:space-y-4">
            {cart.map((item) => (
              <div
                key={item.dish_id}
                className="flex items-start gap-2 sm:gap-4 border-b pb-2 sm:pb-4"
              >
                {/* Hình ảnh sản phẩm */}
                <img
                  src={item?.image}
                  alt={item.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover"
                />
                {/* Thông tin sản phẩm */}
                <div className="flex-1">
                  <h3 className="text-sm sm:text-lg font-medium truncate">
                    {item.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    {formatCurrency(item.price)}
                  </p>
                  {/* Nút tăng giảm số lượng */}
                  <div className="flex items-center mt-2 gap-1 sm:gap-2">
                    <button
                      onClick={() =>
                        handleMinus(item.dish_id, item.quantity - 1)
                      }
                      className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded bg-gray-200 dark:bg-gray-700 hover:scale-95"
                    >
                      -
                    </button>
                    <span className="text-sm sm:text-base">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        handlePlus(item.dish_id, item.quantity + 1)
                      }
                      className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded bg-gray-200 dark:bg-gray-700 hover:scale-95"
                    >
                      +
                    </button>
                  </div>
                </div>
                {/* Giá và nút xóa */}
                <div className="flex flex-col items-end">
                  <p className="text-sm sm:text-lg font-semibold">
                    {formatCurrency(item.quantity * item.price)}
                  </p>
                  <button
                    onClick={() => removeItem(item.dish_id)}
                    className="text-red-500 mt-1 text-xs sm:text-sm hover:underline"
                  >
                    Xóa
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Tổng giá */}
          <div className="flex justify-between items-center mt-4 sm:mt-6">
            <h3 className="text-lg sm:text-xl font-medium">Tổng cộng:</h3>
            <p className="text-lg sm:text-xl text-red-500 font-bold">
              {formatCurrency(totalPrice)}
            </p>
          </div>

          {/* Nút điều hướng */}
          <div className="w-full flex gap-4 mt-6">
            <SheetClose asChild className="flex-1">
              <button className="w-full px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-black font-medium text-center">
                Đóng
              </button>
            </SheetClose>

            <SheetClose asChild className="flex-1">
              <button
                onClick={() => router("/reservation")}
                className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-[#fb6340] to-[#ff8252] text-white font-medium text-center hover:scale-95 transition-transform"
              >
                Tạo đơn
              </button>
            </SheetClose>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;

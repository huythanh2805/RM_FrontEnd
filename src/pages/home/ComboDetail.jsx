import ButtonCustome from "@/components/ButtonCustome";
import BASE_URL from "@/configs";
import { useThemeContext } from "@/contexts/ThemeProvider";
import { formatCurrency } from "@/utilities/utils";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import FeedbackCombo from "@/components/FeedbackCombo";

const ComboDetail = () => {
  const { id } = useParams();
  const { colorCode } = useThemeContext();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("REVIEWS");
  const [combo, setCombo] = useState(null);
  const [dishInCombo, setDishInCombo] = useState([]);

  useEffect(() => {
    axios
      .get(BASE_URL + "/setCombos/" + id)
      .then((res) => {
        console.log("here", res.data);
        setCombo(res.data);
        setDishInCombo(res.data.setComboProducts);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => quantity > 1 && setQuantity(quantity - 1);

  //   const handleAddToCart = (combo) => {
  //     toast({
  //       variant: "success",
  //       title: "Thêm thành công" + " " + combo.name,
  //     });
  //     addItem({
  //       combo_id: combo._id,
  //       name: combo.name,
  //       price: combo.price,
  //       image: combo.images[0],
  //       quantity: quantity,
  //       type: "combo",
  //     });
  //     setQuantity(1);
  //   };

  return (
    <div className="w-full">
      <div className="container mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <img
              src={
                combo?.images && combo.images.length > 0
                  ? combo?.images[0]
                  : "default-image.jpg"
              }
              alt={combo?.name}
              className="rounded-sm shadow-lg w-[600px] h-[450px] object-cover"
            />
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl font-semibold">{combo?.name}</h1>
            <p className="text-[30px] font-bold" style={{ color: colorCode }}>
              {formatCurrency(combo?.price || 0)}
            </p>
            <div className="space-y-2">
              <p className="text-gray-500 text-lg">{combo?.desc}</p>
            </div>
            <div className="grid grid-cols-5 gap-4 mb-4 w-full">
              {dishInCombo[0]?.dishes.map((dish, index) => (
                <div key={index} className="w-full">
                  <h3
                    className="text-lg font-semibold mb-2 truncate cursor-pointer"
                    title={dish.name}
                  >
                    {dish.name}
                  </h3>
                  <img
                    src={dish.images[0]}
                    alt={dish.name}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                </div>
              ))}
            </div>

            <div className="flex items-center mt-4 space-x-2">
              <div className="flex items-center border rounded-md">
                <button
                  onClick={decreaseQuantity}
                  className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700"
                >
                  -
                </button>
                <input
                  type="text"
                  value={quantity}
                  readOnly
                  className="w-12 text-center border-l border-r"
                />
                <button
                  onClick={increaseQuantity}
                  className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700"
                >
                  +
                </button>
              </div>
              <ButtonCustome
                buttonText="Thêm vào giỏ hàng"
                // handleClick={() => handleAddToCart(combo)}
              />
            </div>
            <hr />
            <div className="flex space-x-4 mt-4">
              <div className="mt-2 font-bold text-lg">Chia sẻ</div>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center"
              >
                <FaFacebookF className="text-xl text-blue-700" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center"
              >
                <FaTwitter className="text-xl text-blue-700" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center"
              >
                <FaInstagram className="text-xl text-pink-700" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center"
              >
                <FaYoutube className="text-xl text-red-700" />
              </a>
            </div>
          </div>
        </div>

        {/* Tabs Mô tả và Đánh giá */}
        <div className="mt-8">
          <div className="border-b flex space-x-8">
            <button
              onClick={() => setActiveTab("REVIEWS")}
              className={`px-4 py-2 ${
                activeTab === "REVIEWS"
                  ? "text-orange-500 border-b-2 border-orange-500"
                  : "text-gray-500"
              }`}
            >
              NHẬN XÉT & ĐÁNH GIÁ
            </button>
            <button
              onClick={() => setActiveTab("DESCRIPTIONS")}
              className={`px-4 py-2 ${
                activeTab === "DESCRIPTIONS"
                  ? "text-orange-500 border-b-2 border-orange-500"
                  : "text-gray-500"
              }`}
            >
              MÔ TẢ
            </button>
          </div>

          {/* Nội dung tab */}
          <div className="mt-4 text-gray-700">
            {activeTab === "REVIEWS" ? (
              <FeedbackCombo />
            ) : (
              <p className="text-lg">{combo.desc}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComboDetail;

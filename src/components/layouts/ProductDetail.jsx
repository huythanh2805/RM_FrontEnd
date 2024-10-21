import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import ButtonCustome from "../ButtonCustome";
import ReactStars from "react-rating-stars-component";
import { useThemeContext } from "@/contexts/ThemeProvider";

const dishes = [
  {
    id: 1,
    name: "Mexico Beafsteak Potato Fly",
    chef: "Don Joe",
    price: "$25.0",
    imageUrl:
      "https://sun-themes.com/html/fooday/assets/images/product/product-full-02.jpg",
    rating: 4,
    reviews: [
      {
        id: 1,
        name: "Alice",
        comment: "Delicious and well presented!",
        date: "2024-10-20",
        avatar: "https://nguoinoitieng.tv/images/nnt/98/0/bdio.jpg",
      },
      {
        id: 2,
        name: "Bob",
        comment: "Great flavors and fresh ingredients.",
        date: "2024-10-19",
        avatar: "https://nguoinoitieng.tv/images/nnt/98/0/bdio.jpg",
      },
      {
        id: 3,
        name: "Charlie",
        comment: "One of the best meals I've had!",
        date: "2024-10-18",
        avatar: "https://nguoinoitieng.tv/images/nnt/98/0/bdio.jpg",
      },
    ],
  },
  {
    id: 2,
    name: "Mexico Beafsteak Potato",
    chef: "Don Joe",
    price: "$5.0",
    imageUrl:
      "https://sun-themes.com/html/fooday/assets/images/product/product-2e.jpg",
    rating: 4,
    reviews: [],
  },
  {
    id: 3,
    name: "Madagasca Lopster Tasty",
    chef: "Don Joe",
    price: "$20.0",
    imageUrl:
      "https://sun-themes.com/html/fooday/assets/images/product/product-2e.jpg",
    rating: 4.2,
    reviews: [],
  },
];

const ProductDetail = () => {
  const { id } = useParams();
  const dish = dishes.find((d) => d.id === parseInt(id));
  const { colorCode } = useThemeContext();

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("DESCRIPTIONS");
  const [userRating, setUserRating] = useState(0); // Trạng thái cho rating của người dùng
  const [userComment, setUserComment] = useState(""); // Trạng thái cho bình luận của người dùng

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => quantity > 1 && setQuantity(quantity - 1);

  const handleRatingChange = (newRating) => {
    setUserRating(newRating); // Cập nhật rating khi người dùng chọn
  };

  const handleCommentChange = (event) => {
    setUserComment(event.target.value); // Cập nhật bình luận của người dùng
  };

  const handleSubmitReview = () => {
    // Cập nhật danh sách đánh giá (giả lập, không thay đổi dữ liệu gốc)
    const newReview = {
      id: dish.reviews.length + 1,
      name: "You", // Tên giả lập
      comment: userComment,
      date: new Date().toISOString().split('T')[0], // Ngày hiện tại
      rating: userRating,
    };
    dish.reviews.push(newReview); // Thêm đánh giá mới vào danh sách
    setUserComment(""); // Reset bình luận sau khi gửi
    setUserRating(0); // Reset rating sau khi gửi
  };

  return (
    <div className="container mx-auto p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <img
            src={dish.imageUrl}
            alt={dish.name}
            className="rounded-sm shadow-lg w-full object-cover"
          />
        </div>

        {/* Thông tin sản phẩm */}
        <div className="space-y-4">
          <h1 className="text-3xl font-semibold">{dish.name}</h1>
          <p className="text-xl font-bold" style={{ color: colorCode }}>
            {dish.price}
          </p>

          <div className="">
            <span className="text-gray-500">Chef: </span>
            <span style={{ color: colorCode }}>{dish.chef}</span>
            <div className="flex items-center space-x-1">
              <ReactStars
                count={5}
                onChange={handleRatingChange}
                size={24}
                activeColor="#ffd700"
                value={dish.rating} // Hiển thị rating hiện tại
              />
              <span>({dish.reviews.length} Reviews)</span>
            </div>
          </div>

          <p className="text-gray-700">
            {/* Mô tả sản phẩm*/}
            Turnip greens yarrow ricebean rutabaga endive cauliflower sea
            lettuce kohlrabi...
          </p>

          {/* Tăng/giảm số lượng và nút Đặt Bàn */}
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
            <ButtonCustome buttonText="Thêm vào giỏ hàng" />
          </div>

          <div className="flex space-x-4 mt-4">
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

      {/* Tabs: Mô tả và Đánh giá */}
      <div className="mt-8">
        <div className="border-b flex space-x-8">
          <button
            onClick={() => setActiveTab("DESCRIPTIONS")}
            className={`px-4 py-2 ${
              activeTab === "DESCRIPTIONS"
                ? "text-orange-500 border-b-2 border-orange-500"
                : "text-gray-500"
            }`}
          >
            DESCRIPTIONS
          </button>
          <button
            onClick={() => setActiveTab("REVIEWS")}
            className={`px-4 py-2 ${
              activeTab === "REVIEWS"
                ? "text-orange-500 border-b-2 border-orange-500"
                : "text-gray-500"
            }`}
          >
            REVIEWS
          </button>
        </div>

        {/* Nội dung theo tab hiện tại */}
        <div className="mt-4 text-gray-700">
          {activeTab === "DESCRIPTIONS" ? (
            "Turnip greens yarrow ricebean rutabaga endive cauliflower sea lettuce kohlrabi..."
          ) : (
            <div>
              {dish.reviews.map((review) => (
                <div key={review.id} className="mb-4 flex items-start">
                  <img
                    src={review.avatar}
                    alt={`${review.name}'s avatar`}
                    className="w-10 h-10 rounded-full mr-2"
                  />
                  <div>
                    <div className="flex items-center">
                      <span className="font-semibold">{review.name}</span>
                      <span className="text-gray-500 text-sm ml-2">
                        {review.date}
                      </span>
                    </div>
                    <ReactStars
                      count={5}
                      value={review.rating} // Hiển thị rating của bình luận
                      size={24}
                      edit={false} // Không cho phép chỉnh sửa rating
                      activeColor="#ffd700"
                    />
                    <p>{review.comment}</p>
                  </div>
                </div>
              ))}

              {/* Form đánh giá mới */}
              <div className="mt-4">
                <h3 className="font-semibold">Đánh giá của bạn:</h3>
                <ReactStars
                  count={5}
                  onChange={handleRatingChange}
                  size={24}
                  activeColor="#ffd700"
                  value={userRating} // Hiển thị rating của người dùng
                />
                <textarea
                  value={userComment}
                  onChange={handleCommentChange}
                  placeholder="Nhập bình luận của bạn..."
                  className="mt-2 p-2 border rounded w-full"
                />
                <button
                  onClick={handleSubmitReview}
                  className="mt-2 text-white px-4 py-2 rounded"
                  style={{ backgroundColor: colorCode }}
                >
                  Gửi Đánh Giá
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

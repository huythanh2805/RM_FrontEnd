import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import ButtonCustome from "../ButtonCustome";
import { useThemeContext } from "@/contexts/ThemeProvider";
import axios from "axios";

const ProductDetail = () => {
    const { id } = useParams();
    const { colorCode } = useThemeContext();
    const [dish, setDish] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState("DESCRIPTIONS");

    useEffect(() => {
        const fetchDish = async () => {
            try {
                const response = await axios.get(`http://localhost:1111/dishes/${id}`);
                setDish(response.data.data);
            } catch (error) {
                console.error("Error fetching dish data:", error);
            }
        };
        fetchDish();
    }, [id]);

    const increaseQuantity = () => setQuantity(quantity + 1);
    const decreaseQuantity = () => quantity > 1 && setQuantity(quantity - 1);

    if (!dish) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <img
                        src={dish.images && dish.images.length > 0 ? dish.images[0] : 'default-image.jpg'}
                        alt={dish.name}
                        className="rounded-sm shadow-lg w-[600px] h-[450px] object-cover"
                    />
                </div>

                {/* Thông tin sản phẩm */}
                <div className="space-y-4">
                    <h1 className="text-3xl font-semibold">{dish.name}</h1>
                    <p className="text-xl font-bold" style={{ color: colorCode }}>
                        {dish.price}₫
                    </p>

                    <div className="space-y-2">
                        <p className="text-gray-500">{dish.desc}</p>
                    </div>

                    <p className="text-gray-700">
                        {dish.description}
                    </p>

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
                    <hr />
                    <div className="flex space-x-4 mt-4">
                        <div className="mt-2 font-bold">
                            Chia sẻ
                        </div>
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
                        className={`px-4 py-2 ${activeTab === "DESCRIPTIONS" ? "text-orange-500 border-b-2 border-orange-500" : "text-gray-500"}`}
                    >
                        MÔ TẢ
                    </button>
                    <button
                        onClick={() => setActiveTab("REVIEWS")}
                        className={`px-4 py-2 ${activeTab === "REVIEWS" ? "text-orange-500 border-b-2 border-orange-500" : "text-gray-500"}`}
                    >
                        ĐÁNH GIÁ
                    </button>
                </div>

                {/* Nội dung theo tab hiện tại */}
                <div className="mt-4 text-gray-700">
                    {activeTab === "DESCRIPTIONS" ? (
                        <p>{dish.desc}</p>
                    ) : (
                        <div>
                            {dish.reviews && dish.reviews.length > 0 ? (
                                dish.reviews.map((review) => (
                                    <div key={review.id} className="mb-4 flex items-start">
                                        <img
                                            src={review.avatar}
                                            alt={`${review.name}'s avatar`}
                                            className="w-10 h-10 rounded-full mr-2"
                                        />
                                        <div>
                                            <div className="flex items-center">
                                                <span className="font-semibold">{review.name}</span>
                                                <span className="text-gray-500 text-sm ml-2">{review.date}</span>
                                            </div>
                                            <p>{review.comment}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No reviews yet.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;

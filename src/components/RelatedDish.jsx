import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useThemeContext } from "@/contexts/ThemeProvider";

const RelatedDishes = ({ dishId }) => {
  const [relatedDishes, setRelatedDishes] = useState([]);
  const { colorCode } = useThemeContext();

  useEffect(() => {
    const fetchRelatedDishes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1111/dishes/${dishId}/related`
        );
        setRelatedDishes(response.data);
      } catch (error) {
        console.error("Error fetching related dishes:", error);
      }
    };

    fetchRelatedDishes();
  }, [dishId]);

  if (relatedDishes.length === 0) {
    return <p className="text-center text-gray-500">Không có món ăn liên quan.</p>;
  }

  return (
    <div className="related-dishes py-8 relative">
      <div
            className="text-xl font-semibold mb-2 mt-8 flex justify-center items-center"
            style={{ color: colorCode }}
          >
            <div
              className="border-t w-12 mr-2"
              style={{ borderColor: colorCode }}
            />
            MÓN ĂN LIÊN QUAN
            <div
              className="border-t w-12 ml-2"
              style={{ borderColor: colorCode }}
            />
          </div>

      {/* Container hiển thị sản phẩm */}
      <div className="flex justify-center items-center gap-4 mt-10">
        {relatedDishes.map((dish) => (
          <div
            key={dish._id}
            className="dish-card shadow-md rounded-lg overflow-hidden w-[300px]"
          >
            <Link to={`/dishes/${dish._id}`}>
              <img
                src={dish.images[0] || "default-image.jpg"}
                alt={dish.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-gray-700">
                  {dish.name}
                </h3>
                <p className="text-orange-500 font-bold mt-2">
                  {dish.price}₫
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedDishes;

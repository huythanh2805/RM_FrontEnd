import { useThemeContext } from "@/contexts/ThemeProvider";
import { formatCurrency } from "@/utilities/utils";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const RelatedDishes = ({ dishId }) => {
  const [relatedDishes, setRelatedDishes] = useState([]);
  const { colorCode } = useThemeContext();

  useEffect(() => {
    const fetchRelatedDishes = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/dishes/${dishId}/related`);
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
      <div className="text-xl font-semibold mb-2 mt-8 flex justify-center items-center" style={{ color: colorCode }}>
        <div className="border-t w-12 mr-2" style={{ borderColor: colorCode }} />
        GỢI Ý MÓN ĂN
        <div className="border-t w-12 ml-2" style={{ borderColor: colorCode }} />
      </div>

      <div className="flex justify-center items-center gap-4 mt-10">
        {relatedDishes.map((dish) => (
          <div key={dish._id} className="dish-card shadow-md rounded-md overflow-hidden w-[300px]">
            <Link to={`/dishes/${dish._id}`}>
              <img
                src={dish.images[0] || "default-image.jpg"}
                alt={dish.name}
                className="w-full h-[250px] object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-gray-700">{dish.name}</h3>
                <p className="text-orange-500 font-bold text-[20px] mt-2">{formatCurrency(dish.price)}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedDishes;

import { useThemeContext } from "@/contexts/ThemeProvider";
import { formatCurrency } from "@/utilities/utils";
import { motion } from "framer-motion";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
// import ReactStars from "react-rating-stars-component";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import BASE_URL from "@/configs";

function MenuItem({ item, onCLick }) {
  const { colorCode } = useThemeContext();
  const [totalFeedback, setTotalFeedback] = useState(0);

  useEffect(() => {
    const fetchTotalFeedback = () => {
      axios
        .get(BASE_URL + `/feedbacks/dish/${item._id}`)
        .then((res) => {
          if (res.data.feedbacks.length > 0) {
            const listFeedback = res.data.feedbacks.filter(
              (item) => item.isShow
            );

            setTotalFeedback(listFeedback.length);
          } else {
            setTotalFeedback(0);
          }
        })
        .catch((err) => {
          console.error(err);
          setTotalFeedback(0);
        });
    };

    const fetchTotalFeedbackForCombo = () => {
      axios
        .get(BASE_URL + `/feedbacks/combo/${item.combo_id}`)
        .then((res) => {
          if (res.data.feedbacks.length > 0) {
            const listFeedback = res.data.feedbacks.filter(
              (item) => item.isShow
            );

            setTotalFeedback(listFeedback.length);
          } else {
            setTotalFeedback(0);
          }
        })
        .catch((err) => {
          console.error(err);
          setTotalFeedback(0);
        });
    };

    fetchTotalFeedback();
    fetchTotalFeedbackForCombo();
  }, [item._id, item.combo_id]);

  return (
    <div
      key={item._id}
      className="max-w-full sm:max-w-[320px] md:max-w-[768px] lg:max-w-[900px] relative group rounded-lg shadow-lg overflow-hidden bg-white w-full"
    >
      <div className="relative overflow-hidden">
        <img
          src={item.images[0]}
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
          alt={item.name}
        />
        <div className="absolute inset-0 bg-gray-400 bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="flex space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="p-2 text-white rounded-full"
              style={{ backgroundColor: colorCode }}
              onClick={() => onCLick(item)}
            >
              <FaShoppingCart />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Thông tin món ăn */}
      <div className="p-4 relative">
        <Link
          to={
            item?.type == "combo"
              ? `/combos/${item.combo_id}`
              : `/dishes/${item._id}`
          }
        >
          <h3 className="text-lg font-bold cursor-pointer" style={{ color: colorCode }}>
            {item.name}
            {item?.type === "combo" && (
              <span className="px-2 text-gray-1">(Combo)</span>
            )}
          </h3>
        </Link>
        <p className="text-sm text-gray-600 text-ellipsis truncate">
          {item.desc}
        </p>

        {/* Giá và đánh giá */}
        <div className="flex justify-between items-center mt-4">
          <span className="text-xl font-bold" style={{ color: colorCode }}>
            {formatCurrency(item.price)}
          </span>
          {/* <p className="text-sm font-medium text-gray-700">
            <span className="text-gray-500">
              {totalFeedback > 0 ? "Lượt đánh giá: " : "Chưa có đánh giá"}
            </span>
            <span className="font-semibold">
              {totalFeedback > 0 ? totalFeedback : ""}
            </span>
          </p> */}
        </div>
        <div className="absolute inset-x-0 bottom-0 flex justify-center items-center">
          <div
            className="h-1 w-0 transition-all duration-500 group-hover:w-full"
            style={{ backgroundColor: colorCode }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default MenuItem;

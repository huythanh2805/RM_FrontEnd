import BASE_URL from "@/configs";
import { formatCurrency } from "@/utilities/utils";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const DishDetail = () => {
  const { id } = useParams();
  const [dataDish, setDataDish] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(BASE_URL + "/dishes/" + id)
      .then((res) => {
        console.log(res.data);
        setDataDish(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Xác nhận xóa ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(BASE_URL + `/dishes/${id}`)
          .then(() => {
            Swal.fire({
              title: "Đã xóa!",
              text: "Món ăn đã được xóa thành công.",
              icon: "success",
            });
            navigate("/admin/dishes");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  return (
    <div className="w-full min-h-screen bg-[#f5f6fa]">
      <div className="px-5 py-2">
        <h2 className="text-[32px] font-semibold mb-4">Chi tiết món ăn</h2>
        {dataDish ? (
          <div className="flex flex-wrap -mx-4">
            {/* Product Images */}
            <div className="w-full md:w-1/3 px-4">
              <img
                src={dataDish.images[0]}
                alt=""
                className="w-96 h-96 object-cover rounded-lg shadow-md mb-4"
                id="mainImage"
              />

              <div className="flex gap-4 py-4 overflow-x-auto">
                {dataDish.images.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt=""
                    className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                    onClick={() =>
                      (document.getElementById("mainImage").src = src)
                    }
                  />
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="w-full md:w-2/3 md:pl-8">
              <h2 className="text-3xl font-bold mb-2">{dataDish?.name}</h2>
              <p className="text-gray-600 mb-4">
                Danh mục: {dataDish?.category_id?.name}
              </p>
              <div className="mb-4">
                <span className="text-2xl font-bold mr-2">
                  {formatCurrency(dataDish?.price)}
                </span>
                {/* <span className="text-gray-500 line-through">$00000</span> */}
              </div>

              {/* Đánh giá */}
              {/* <div className="flex items-center mb-4">
                {Array.from({ length: 5 }).map((_, index) => (
                  <svg
                    key={index}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6 text-yellow-500"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      clipRule="evenodd"
                    />
                  </svg>
                ))}
                <span className="ml-2 text-gray-600">4.5 (120 reviews)</span>
              </div> */}

              {/* Mô tả */}
              <p className="text-gray-700 mb-6">{dataDish.desc}</p>

              <div className="mb-6">
                <div className="text-sm font-medium text-gray-700 mb-1">
                  Trạng thái:
                  {dataDish.isShow ? (
                    <span className="bg-green-200 text-green-600 px-2 py-0.5 rounded-sm ml-2">
                      Có sẵn
                    </span>
                  ) : (
                    <span className="bg-gray-200 text-gray-600 px-2 py-0.5 rounded-sm ml-2">
                      Hết hàng
                    </span>
                  )}
                </div>
              </div>

              <div className="flex space-x-4 mb-6">
                <Link to={`/admin/dishes/${dataDish._id}/update`}>
                  <div className="bg-indigo-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-indigo-700">
                    Cập nhật
                  </div>
                </Link>

                <div onClick={() => handleDelete(dataDish._id)}>
                  <div className="bg-red-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-red-700 cursor-pointer">
                    Xóa
                  </div>
                </div>

                <Link to={`/admin/dishes`}>
                  <div className="bg-gray-200 flex gap-2 items-center text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300">
                    Quay lại
                  </div>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default DishDetail;

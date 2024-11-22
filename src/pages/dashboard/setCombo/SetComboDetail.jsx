import BASE_URL from "@/configs";
import { formatCurrency } from "@/utilities/utils";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const SetComboDetail = () => {
  const { id } = useParams();
  const [dataCombo, setDataCombo] = useState();
  const [dishInCombo, setDishInCombo] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(BASE_URL + "/setCombos/" + id)
      .then((res) => {
        setDishInCombo(res.data.setComboProducts);
        setDataCombo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Xác nhận xóa?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(BASE_URL + `/setCombos/${id}`)
          .then(() => {
            Swal.fire({
              title: "Đã xóa!",
              text: "Combo đã được xóa thành công.",
              icon: "success",
            });
            navigate("/admin/setCombos");
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
        <h2 className="text-[32px] font-semibold mb-4">Chi tiết combo</h2>
        {dataCombo ? (
          <div className="flex flex-wrap -mx-4">
            {/* Product Images */}
            <div className="w-full md:w-1/3 px-4">
              <img
                src={dataCombo.images[0]}
                alt=""
                className="w-96 h-96 object-cover rounded-lg shadow-md mb-4"
                id="mainImage"
              />

              <div className="flex gap-4 py-4 overflow-x-auto">
                {dataCombo.images.map((src, index) => (
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
              <h2 className="text-3xl font-bold mb-3">{dataCombo?.name}</h2>
              <p className="text-gray-700 mb-3">{dataCombo.desc}</p>
              <div className="grid grid-cols-6 gap-4 mb-4">
                {dishInCombo[0]?.dishes.map((dish) => (
                  <div key={dish._id}>
                    <h3 className="text-lg font-semibold mb-2">{dish.name}</h3>
                    <img
                      src={dish.images[0]}
                      alt={dish.name}
                      className="w-24 h-24 object-cover rounded-md"
                    />
                    <p className="mt-2">{formatCurrency(dish.price)}</p>
                  </div>
                ))}
              </div>

              <div className="mb-4">
                <div className="text-sl font-medium text-gray-700 mb-1">
                  Trạng thái:
                  {dataCombo.isShow ? (
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

              <div className="mb-4">
                <span className="text-2xl font-bold mr-2">
                  {formatCurrency(dataCombo?.price)}
                </span>
              </div>

              <div className="flex space-x-4 mb-6">
                <Link to={`/admin/setCombos/${dataCombo._id}/update`}>
                  <div className="bg-indigo-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-indigo-700">
                    Cập nhật
                  </div>
                </Link>

                <div onClick={() => handleDelete(dataCombo._id)}>
                  <div className="bg-red-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-red-700 cursor-pointer">
                    Xóa
                  </div>
                </div>

                <Link to={`/admin/setCombos`}>
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

export default SetComboDetail;

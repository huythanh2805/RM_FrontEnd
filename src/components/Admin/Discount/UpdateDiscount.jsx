import React from "react";
import DiscountForm from "./DiscountForm";
import Navbar from "../Navbar";
import { useParams } from "react-router-dom";
import { useFetchData } from "@/hooks/useFetchData";
import { ServerUrl } from "@/utilities/utils";

function UpdateDiscount() {
    const {id} = useParams()
    const { data: discount } = useFetchData(`${ServerUrl}/api/discount/${id}`);
    console.log(discount)
  return (
    <div className="w-full min-h-screen bg-[#f9fafb]">
      <Navbar />

      <div className="px-5 py-5">
        <p className="text-3xl font-semibold text-gray-800">
          Tạo phiếu giảm giá
        </p>

        <div className="flex flex-col gap-5 w-full h-full">
          <div className="w-full rounded-md flex justify-start flex-col">
            <div className="w-full py-6">
              {
                discount && id &&
                <DiscountForm
                discount={discount}
                id={id}
                />
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateDiscount;

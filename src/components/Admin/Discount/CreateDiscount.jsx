import DiscountForm from "./DiscountForm";


function CreateDiscount() {
  return (
    <div className="w-full min-h-screen bg-[#f9fafb]">


      <div className="px-5 py-5">
        <p className="text-3xl font-semibold text-gray-800">
          Tạo phiếu giảm giá
        </p>

        <div className="flex flex-col gap-5 w-full h-full">
          <div className="w-full rounded-md flex justify-start flex-col">
            <div className="w-full py-6">
              <DiscountForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateDiscount;

import Navbar from "@/components/Admin/Navbar";
import { useDetailImportNotes } from "@/hooks/dashboard/import-notes/useDetail";
import { formatCurrency } from "@/utilities/utils";
import { Link } from "react-router-dom";

export const ImportNotesDetail = () => {
  const { importNotesData } = useDetailImportNotes();

  if (!importNotesData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full min-h-screen bg-[#f5f6fa]">
      <Navbar />

      {/* Thông tin đặt bàn */}
      <div className="px-5 py-4">
        <p className="text-[32px] font-semibold mb-4">Thông tin phiếu xuất</p>
        <div className="rounded-xl bg-white border border-[#d5d5d5]">
          <table className="min-w-full table-auto text-left">
            <tbody>
              <tr className="border-b">
                <th className="py-4 px-6 text-gray-700 font-semibold">Mã phiếu</th>
                <td className="py-4 px-6 text-gray-600">{importNotesData?.code}</td>
              </tr>
              <tr className="border-b">
                <th className="py-4 px-6 text-gray-700 font-semibold">Người tạo</th>
                <td className="py-4 px-6 text-gray-600">{importNotesData?.number_of_seats}</td>
              </tr>
              <tr>
                <th className="py-4 px-6 text-gray-700 font-semibold">Thời gian tạo</th>
                <td className="py-4 px-6 text-gray-600">{importNotesData.createdAt}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Thông tin chi tiết hóa đơn */}
      <div className="px-5 py-4">
        <p className="text-[32px] font-semibold mb-4">Chi tiết phiếu xuất</p>
        <div className="overflow-x-auto rounded-xl border border-[#d5d5d5]">
          <table className="min-w-full bg-white table-auto">
            <thead className="border-b border-[#d5d5d5] text-sl font-semibold text-[#202224] uppercase tracking-wider  text-center">
              <tr>
                <th className="py-3 px-4 lg:px-6 text-center">STT</th>
                <th className="py-3 px-4 lg:px-6">Mã SP</th>
                <th className="py-3 px-4 lg:px-6">Tên SP</th>
                <th className="py-3 px-4 lg:px-6 text-center">Giá</th>
                <th className="py-3 px-4 lg:px-6 text-center">Số lượng</th>
                <th className="py-3 px-4 lg:px-6 text-center">Tổng</th>
              </tr>
            </thead>
            <tbody>
              {importNotesData?.products?.map((product, index) => (
                <tr
                  className="bg-white border-b border-[#d5d5d5] hover:bg-gray-50 transition text-center"
                  key={product._id}
                >
                  <td className="py-4 px-6 text-sl font-medium text-[#202224] w-[100px]">{index + 1}</td>
                  <td className="py-4 px-6 text-sl font-medium text-[#202224]">{product?.code}</td>
                  <td className="py-4 px-6 text-sl font-medium text-[#202224]">{product?.name}</td>
                  <td className="py-4 px-6 text-sl text-center">{formatCurrency(product?.price)}</td>
                  <td className="py-4 px-6 text-sl text-center">{product?.quantity}</td>
                  <td className="py-4 px-6 text-sl text-center">
                    {formatCurrency(product?.price * product?.quantity)}
                  </td>
                </tr>
              ))}

              <tr>
                <td className="table-cell py-4 px-6 font-semibold text-right" colSpan={5}>
                  Tổng sản phẩm:
                </td>
                <td className="font-semibold">{importNotesData?.products?.length} sản phẩm</td>
              </tr>
              <tr>
                <td className="table-cell py-4 px-6 font-semibold text-right" colSpan={5}>
                  Tổng tiền:
                </td>
                <td className="font-semibold">{formatCurrency(importNotesData.total)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-4 flex justify-between items-center">
        <Link to={`/admin/export-notes`}>
          <div className="bg-gray-200 flex text-sl gap-2 items-center text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300">
            Quay lại
          </div>
        </Link>
      </div>
    </div>
  );
};

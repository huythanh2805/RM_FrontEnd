import Pagination from "@/components/Pagination";
import { useHistoryTakeInventory } from "@/hooks/dashboard/stocks/useHistoryTakeInventory";
import { formatCurrency, formatDate, formatDateNoTime } from "@/utilities/utils"; // Giả sử bạn có các hàm này
import ExcelJS from "exceljs";
import { useState } from "react";
const EXPORT_NOTES_TYPE = {
    INTERNAL: "Nội bộ",
    RETURN: "Hoàn trả",
    ADJUSTMENT: "Điều chỉnh số lượng",
    EXPIRED: "Hết hạn",
};

export const HistoryTakeInventory = () => {
    const { listTakeInventoryData, isLoading, error } = useHistoryTakeInventory();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Pagination logic
    const totalItems = listTakeInventoryData?.length || 0;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = listTakeInventoryData?.slice(startIndex, startIndex + itemsPerPage);

    // Export to Excel
    const exportToExcel = async () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Phiếu Xuất");

        // Định nghĩa tiêu đề
        worksheet.columns = [
            { header: "Mã phiếu xuất", key: "code", width: 15 },
            { header: "Số lượng SP", key: "productCount", width: 12 },
            { header: "Tổng tiền", key: "total", width: 15 },
            { header: "Thời gian tạo", key: "createdAt", width: 20 },
            { header: "Loại phiếu xuất", key: "type", width: 20 },
            { header: "Người tạo", key: "createdBy", width: 15 },
            { header: "Tên Sản phẩm", key: "productName", width: 25 },
            { header: "Số lượng", key: "quantity", width: 10 },
        ];

        // Định dạng tiêu đề
        worksheet.getRow(1).font = { bold: true };
        worksheet.getRow(1).alignment = { vertical: "middle", horizontal: "center" };
        worksheet.getRow(1).eachCell((cell) => {
            cell.border = {
                top: { style: "thin" },
                left: { style: "thin" },
                bottom: { style: "thin" },
                right: { style: "thin" },
            };
        });

        let currentRowIndex = 2; // Bắt đầu từ dòng 2
        filteredExportNotes.forEach((note) => {
            const startRow = currentRowIndex; // Dòng đầu tiên của nhóm sản phẩm

            // Lặp qua từng sản phẩm
            note.stocks?.forEach((stock) => {
                worksheet.addRow({
                    code: note.code,
                    productCount: note.stocks.length,
                    total: formatCurrency(note?.total),
                    createdAt: formatDate(note.createdAt),
                    type: EXPORT_NOTES_TYPE[note?.type] || "Không xác định",
                    createdBy: note?.createdBy?.userName,
                    productName: stock?.stock?.product?.name || "N/A",
                    quantity: stock?.quantity,
                });
                currentRowIndex++;
            });

            // Hợp nhất các ô cho nhóm sản phẩm
            worksheet.mergeCells(`A${startRow}:A${currentRowIndex - 1}`); // Mã phiếu xuất
            worksheet.mergeCells(`B${startRow}:B${currentRowIndex - 1}`); // Số lượng SP
            worksheet.mergeCells(`C${startRow}:C${currentRowIndex - 1}`); // Tổng tiền
            worksheet.mergeCells(`D${startRow}:D${currentRowIndex - 1}`); // Thời gian tạo
            worksheet.mergeCells(`E${startRow}:E${currentRowIndex - 1}`); // Loại phiếu xuất
            worksheet.mergeCells(`F${startRow}:F${currentRowIndex - 1}`); // Người tạo
        });

        // Thêm đường viền cho toàn bộ các ô
        worksheet.eachRow((row) => {
            row.eachCell((cell) => {
                cell.border = {
                    top: { style: "thin" },
                    left: { style: "thin" },
                    bottom: { style: "thin" },
                    right: { style: "thin" },
                };
                cell.alignment = { vertical: "middle", horizontal: "center" };
            });
        });

        // Xuất file
        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "DanhSachPhieuXuat.xlsx";
        link.click();
    };


    if (error) return <p className="text-center text-red-600">Error loading export notes list.</p>;
    return (
        <div className="w-full min-h-screen">
            <div className="px-5 py-5">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-3xl font-semibold text-gray-800">Lịch sử kiểm kê</h1>
                    <div className="flex items-center gap-2">
                        <button onClick={exportToExcel} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                            Xuất Excel
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto rounded-xl border border-[#d5d5d5]">
                    <table className="min-w-full bg-white">
                        <thead className="border-b border-[#d5d5d5] text-left text-sl font-semibold text-[#202224] uppercase tracking-wider">
                            <tr>
                                <th className="lg:table-cell py-3 px-6 text-sl font-semibold text-gray-700 text-center">STT</th>
                                <th className="py-3 px-6 text-left text-sl font-semibold text-gray-700">Thông tin sản phẩm</th>
                                <th className="py-3 px-6 text-left text-sl font-semibold text-gray-700">Giá SP</th>
                                <th className="py-3 px-6 text-left text-sl font-semibold text-gray-700">Số lượng</th>
                                <th className="py-3 px-6 text-left text-sl font-semibold text-gray-700">Ngày hết hạn</th>
                                <th className="py-3 px-6 text-left text-sl font-semibold text-gray-700">Người kiểm kê</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems?.map((takeInventory, index) => (
                                <tr key={takeInventory._id} className="bg-white border-b border-[#d5d5d5] hover:bg-gray-50 transition">
                                    <td className="py-3 px-6 text-sl text-gray-800 break-words font-medium text-center">
                                        {index + 1 + startIndex}
                                    </td>
                                    <td className="py-3 px-6 text-sl text-gray-800 break-words">
                                        <div>{takeInventory?.stock?.product?.code}</div>
                                        <div>{takeInventory?.stock?.product?.name}</div>
                                    </td>
                                    <td className="py-3 px-6 text-sl text-gray-800 break-words">
                                        {formatCurrency(takeInventory?.stock?.price)}
                                    </td>
                                    <td className="py-3 px-6 text-sl text-gray-800 break-words">
                                        {takeInventory?.lastQuantity !== takeInventory?.newQuantity
                                            ? `${takeInventory?.lastQuantity} → ${takeInventory?.newQuantity}`
                                            : takeInventory?.lastQuantity}
                                    </td>
                                    <td className="py-3 px-6 text-sl text-gray-800 break-words">
                                        {takeInventory?.lastExpiryDate !== takeInventory?.newExpiryDate
                                            ? `${formatDateNoTime(takeInventory?.lastExpiryDate)} → ${formatDateNoTime(
                                                takeInventory?.newExpiryDate
                                            )}`
                                            : formatDateNoTime(takeInventory?.lastExpiryDate)}
                                    </td>
                                    <td className="py-3 px-6 text-sl text-gray-800 break-words">{takeInventory?.createdBy?.userName}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {totalPages > 1 && <Pagination pageCount={totalPages} onPageChange={(e) => setCurrentPage(e.selected + 1)} />}
            </div>
        </div>
    );
};

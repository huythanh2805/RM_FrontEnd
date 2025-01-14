import Pagination from "@/components/Pagination";
import { useList } from "@/hooks/dashboard/export-notes/useList";
import { formatCurrency, formatDate } from "@/utilities/utils"; // Giả sử bạn có các hàm này
import ExcelJS from "exceljs";
import { debounce } from "lodash";
import { useMemo, useState } from "react";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
const EXPORT_NOTES_TYPE = {
  INTERNAL: "Nội bộ",
  RETURN: "Hoàn trả",
  ADJUSTMENT: "Điều chỉnh số lượng",
  EXPIRED: "Hết hạn",
};

export const ExportNotesList = () => {
  const { exportNotesData, isLoading, error, deleteExportNotes } = useList();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [filterCreator, setFilterCreator] = useState("");
  const [filterType, setFilterType] = useState("");
  const itemsPerPage = 10;

  // Debounced search value
  const handleSearchValueDebounced = debounce((value) => setSearchValue(value), 300);

  const handleSearchValue = (e) => {
    handleSearchValueDebounced(e.target.value);
  };

  const handleFilterCreator = (e) => setFilterCreator(e.target.value);
  const handleFilterType = (e) => setFilterType(e.target.value);

  // Data filtering logic
  const filteredExportNotes = exportNotesData?.filter((exportNotes) => {
    const matchesCode = exportNotes?.code?.toLowerCase().includes(searchValue.toLowerCase());
    const matchesCreator = filterCreator === "" || exportNotes?.createdBy?.userName === filterCreator;
    const matchesType = filterType === "" || exportNotes?.type === filterType;
    return matchesCode && matchesCreator && matchesType;
  });

  // Pagination logic
  const totalItems = filteredExportNotes?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredExportNotes?.slice(startIndex, startIndex + itemsPerPage);

  // Unique creators for filtering
  const uniqueCreators = useMemo(() => {
    const creators = exportNotesData?.map((note) => note?.createdBy?.userName).filter(Boolean);
    return [...new Set(creators)];
  }, [exportNotesData]);

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
      { header: "Giá nhập", key: "price", width: 10 },
      { header: "Thành tiền", key: "totalProduct", width: 10 },
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
          price: formatCurrency(stock?.price),
          totalProduct: formatCurrency(stock?.quantity * stock?.price),
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

  if (isLoading) return <p className="text-center text-blue-600">Loading...</p>;
  if (error) return <p className="text-center text-red-600">Error loading export notes list.</p>;

  return (
    <div className="w-full min-h-screen">
      <div className="px-5 py-5">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-semibold text-gray-800">Danh sách phiếu xuất</h1>
          <div className="flex items-center gap-2">
            <Link to="/admin/export-notes/create">
              <div className="bg-green-200 text-green-800 px-6 py-2 rounded-md text-sl font-semibold hover:bg-green-300 transition">
                Thêm mới +
              </div>
            </Link>
            <button
              onClick={exportToExcel}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Xuất Excel
            </button>
          </div>
        </div>

        {/* Bộ lọc và tìm kiếm */}
        <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Tìm kiếm mã phiếu xuất..."
            className="border border-gray-300 p-2 rounded-md"
            onChange={handleSearchValue}
          />
          <select className="border border-gray-300 p-2 rounded-md" onChange={handleFilterCreator}>
            <option value="">Lọc theo người tạo</option>
            {uniqueCreators.map((creator, index) => (
              <option key={index} value={creator}>
                {creator}
              </option>
            ))}
          </select>
          <select className="border border-gray-300 p-2 rounded-md" onChange={handleFilterType}>
            <option value="">Lọc theo loại phiếu xuất</option>
            {Object.entries(EXPORT_NOTES_TYPE).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto rounded-xl border border-[#d5d5d5]">
          <table className="min-w-full bg-white">
            <thead className="border-b border-[#d5d5d5] text-left text-sl font-semibold text-[#202224] uppercase tracking-wider">
              <tr>
                <th className="hidden lg:table-cell py-3 px-6 text-sl font-semibold text-gray-700 text-center">STT</th>
                <th className="py-3 px-6 text-left text-sl font-semibold text-gray-700">Mã phiếu</th>
                <th className="py-3 px-6 text-left text-sl font-semibold text-gray-700">Số lượng SP</th>
                <th className="py-3 px-6 text-left text-sl font-semibold text-gray-700">Tổng tiền</th>
                <th className="py-3 px-6 text-left text-sl font-semibold text-gray-700">Thời gian tạo</th>
                <th className="py-3 px-6 text-left text-sl font-semibold text-gray-700">Loại phiếu xuất</th>
                <th className="py-3 px-6 text-left text-sl font-semibold text-gray-700">Người tạo</th>
                <th className="py-3 px-6 text-left text-sl font-semibold text-gray-700">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {currentItems?.map((exportNotes, index) => (
                <tr key={exportNotes._id} className="bg-white border-b border-[#d5d5d5] hover:bg-gray-50 transition">
                  <td className="py-3 px-6 text-sl text-gray-800 break-words font-medium text-center">
                    {index + 1 + startIndex}
                  </td>
                  <td className="py-3 px-6 text-sl text-gray-800 break-words">{exportNotes?.code}</td>
                  <td className="py-3 px-6 text-sl text-gray-800 break-words">{exportNotes?.stocks?.length}</td>
                  <td className="py-3 px-6 text-sl text-gray-800 break-words">{formatCurrency(exportNotes?.total)}</td>
                  <td className="py-3 px-6 text-sl text-gray-800 break-words">{formatDate(exportNotes?.createdAt)}</td>
                  <td className="py-3 px-6 text-sl text-gray-800 break-words">
                    {EXPORT_NOTES_TYPE[exportNotes?.type] || "Không xác định"}
                  </td>
                  <td className="py-3 px-6 text-sl text-gray-800 break-words">{exportNotes?.createdBy?.userName}</td>
                  <td className="py-3 px-6 text-sl flex items-center gap-3 justify-center">
                    <div className="flex justify-center gap-3">
                      <Link to={`/admin/export-notes/${exportNotes?._id}`}>
                        <div className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded-lg text-sl font-semibold hover:bg-yellow-300 transition">
                          <FaEye size={18} />
                        </div>
                      </Link>
                    </div>
                  </td>
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

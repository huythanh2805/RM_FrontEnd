import Pagination from "@/components/Pagination";
import { useList } from "@/hooks/dashboard/import-notes/useList";
import { formatCurrency, formatDateNoTime } from "@/utilities/utils";
import ExcelJS from "exceljs";
import { debounce } from "lodash";
import { useMemo, useState } from "react";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
export const ImportNotesList = () => {
  const { importNotesData, isLoading, error } = useList();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [searchValue, setSearchValue] = useState("");
  const [filterSupplier, setFilterSupplier] = useState("");
  const [filterCreator, setFilterCreator] = useState("");
  const [startDate, setStartDate] = useState(""); // Ngày bắt đầu
  const [endDate, setEndDate] = useState(""); // Ngày kết thúc

  const handleSearchValueDebounced = debounce((value) => {
    setSearchValue(value);
  }, 300);

  const handleSearchValue = (e) => {
    handleSearchValueDebounced(e.target.value);
  };

  const handleFilterSupplier = (e) => setFilterSupplier(e.target.value);
  const handleFilterCreator = (e) => setFilterCreator(e.target.value);

  // Lọc dữ liệu dựa trên tìm kiếm, nhà cung cấp, người tạo và khoảng thời gian
  const filteredImportNotes = useMemo(() => {
    return importNotesData?.filter((note) => {
      const matchesCode = note?.code?.toLowerCase().includes(searchValue.toLowerCase());
      const matchesSupplier = !filterSupplier || note?.seller?.name === filterSupplier;
      const matchesCreator = !filterCreator || note?.createdBy?.userName === filterCreator;
      const matchesDate =
        (!startDate || new Date(note.createdAt).setHours(0, 0, 0, 0) >= new Date(startDate).setHours(0, 0, 0, 0)) &&
        (!endDate || new Date(note.createdAt).setHours(23, 59, 59, 999) <= new Date(endDate).setHours(23, 59, 59, 999));

      return matchesCode && matchesSupplier && matchesCreator && matchesDate;
    });
  }, [importNotesData, searchValue, filterSupplier, filterCreator, startDate, endDate]);

  // Tính tổng số tiền của các phiếu nhập sau khi lọc
  const totalAmount = useMemo(() => {
    return filteredImportNotes?.reduce((sum, note) => sum + (note?.total || 0), 0);
  }, [filteredImportNotes]);

  // Phân trang
  const totalItems = filteredImportNotes?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredImportNotes?.slice(startIndex, startIndex + itemsPerPage);

  // Lấy danh sách nhà cung cấp và người tạo duy nhất
  const uniqueSuppliers = useMemo(() => {
    const suppliers = importNotesData?.map((note) => note?.seller?.name).filter(Boolean);
    return [...new Set(suppliers)];
  }, [importNotesData]);

  const uniqueCreators = useMemo(() => {
    const creators = importNotesData?.map((note) => note?.createdBy?.userName).filter(Boolean);
    return [...new Set(creators)];
  }, [importNotesData]);

  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Danh sách phiếu nhập");

    // Định nghĩa tiêu đề
    const columns = [
      { header: "Mã phiếu nhập", key: "code", width: 15 },
      { header: "Số lượng SP", key: "productCount", width: 12 },
      { header: "Nhà cung cấp", key: "seller", width: 20 },
      { header: "Tổng tiền", key: "total", width: 15 },
      { header: "Người tạo", key: "createdBy", width: 15 },
      { header: "Thời gian tạo", key: "createdAt", width: 20 },
      { header: "Tên Sản phẩm", key: "productName", width: 25 },
      { header: "Số lượng", key: "quantity", width: 10 },
      { header: "Thành tiền", key: "amount", width: 15 },
    ];
    worksheet.columns = columns;

    let currentRowIndex = 2;
    currentItems.forEach((note) => {
      const startRow = currentRowIndex;
      note.products?.forEach((product) => {
        worksheet.addRow({
          code: note.code,
          productCount: note.products.length,
          seller: note?.seller?.name,
          total: formatCurrency(note?.total),
          createdBy: note?.createdBy?.userName,
          createdAt: formatDateNoTime(note.createdAt),
          productName: product?.product?.name,
          quantity: product?.quantity,
          amount: formatCurrency(product?.quantity * product?.price) || "",
        });
        currentRowIndex++;
      });

      // Hợp nhất các ô cho nhóm sản phẩm
      worksheet.mergeCells(`A${startRow}:A${currentRowIndex - 1}`);
      worksheet.mergeCells(`B${startRow}:B${currentRowIndex - 1}`);
      worksheet.mergeCells(`C${startRow}:C${currentRowIndex - 1}`);
      worksheet.mergeCells(`D${startRow}:D${currentRowIndex - 1}`);
      worksheet.mergeCells(`E${startRow}:E${currentRowIndex - 1}`);
      worksheet.mergeCells(`F${startRow}:F${currentRowIndex - 1}`);
    });
    worksheet.eachRow((row) => {
      row.eachCell((cell) => {
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });
    });

    // Xuất file
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "DanhSachPhieuNhap.xlsx";
    link.click();
  };

  return (
    <div className="w-full min-h-screen bg-[#f9fafb]">
      <div className="px-5 py-5">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-semibold text-gray-800">Danh sách phiếu nhập</h1>
          <div className="flex items-center gap-4">
            <Link to="/admin/import-notes/create">
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

        {/* Bộ lọc */}
        <div className="mb-4 grid grid-cols-1 md:grid-cols-5 gap-4">
          <input
            type="text"
            placeholder="Tìm kiếm mã phiếu..."
            className="border border-gray-300 p-2 rounded-md"
            onChange={handleSearchValue}
          />
          <select
            className="border border-gray-300 p-2 rounded-md"
            onChange={handleFilterSupplier}
          >
            <option value="">Lọc theo nhà cung cấp</option>
            {uniqueSuppliers.map((supplier, index) => (
              <option key={index} value={supplier}>
                {supplier}
              </option>
            ))}
          </select>
          <select
            className="border border-gray-300 p-2 rounded-md"
            onChange={handleFilterCreator}
          >
            <option value="">Lọc theo người tạo</option>
            {uniqueCreators.map((creator, index) => (
              <option key={index} value={creator}>
                {creator}
              </option>
            ))}
          </select>
          <input
            type="date"
            className="border border-gray-300 p-2 rounded-md"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            className="border border-gray-300 p-2 rounded-md"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto rounded-xl border border-[#d5d5d5]">
          <table className="min-w-full bg-white">
            <thead className="border-b border-[#d5d5d5] text-left text-sl font-semibold text-[#202224] uppercase tracking-wider">
              <tr>
                <th className="hidden lg:table-cell py-3 px-6 text-sl font-semibold text-gray-700 text-center">STT</th>
                <th className="py-3 px-6 text-left text-sl font-semibold text-gray-700">Mã phiếu</th>
                <th className="py-3 px-6 text-left text-sl font-semibold text-gray-700">Số lượng SP</th>
                <th className="py-3 px-6 text-left text-sl font-semibold text-gray-700">Nhà cung cấp</th>
                <th className="py-3 px-6 text-left text-sl font-semibold text-gray-700">Tổng tiền</th>
                <th className="py-3 px-6 text-left text-sl font-semibold text-gray-700">Người tạo</th>
                <th className="py-3 px-6 text-left text-sl font-semibold text-gray-700">Thời gian tạo</th>
                <th className="py-3 px-6 text-left text-sl font-semibold text-gray-700">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {currentItems?.map((importNotes, index) => (
                <tr key={importNotes._id} className="bg-white border-b border-[#d5d5d5] hover:bg-gray-50 transition">
                  <td className="py-3 px-6 text-sl text-gray-800 break-words font-medium text-center">
                    {index + 1 + startIndex}
                  </td>
                  <td className="py-3 px-6 text-sl text-gray-800 break-words">{importNotes?.code}</td>
                  <td className="py-3 px-6 text-sl text-gray-800 break-words">{importNotes?.products?.length}</td>
                  <td className="py-3 px-6 text-sl text-gray-800 break-words">{importNotes?.seller?.name}</td>
                  <td className="py-3 px-6 text-sl text-gray-800 break-words">{formatCurrency(importNotes?.total)}</td>
                  <td className="py-3 px-6 text-sl text-gray-800 break-words">{importNotes?.createdBy?.userName}</td>
                  <td className="py-3 px-6 text-sl text-gray-800 break-words">{formatDateNoTime(importNotes?.createdAt)}</td>
                  <td className="py-3 px-6 text-sl flex items-center gap-3">
                    <div className="flex justify-center gap-3">
                      <Link to={`/admin/import-notes/${importNotes?._id}`}>
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

        <div className="mb-4 m-4">
          <h3 className="text-xl font-bold">
            Tổng số tiền nhập : <span className="text-red-600">{formatCurrency(totalAmount)}</span>
          </h3>
        </div>
        {/* Phân trang */}
        {totalPages > 1 && <Pagination pageCount={totalPages} onPageChange={(e) => setCurrentPage(e.selected + 1)} />}
      </div>
    </div>
  );
};

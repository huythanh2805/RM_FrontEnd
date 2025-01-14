import BASE_URL from "@/configs";
import { formatCurrency } from "@/utilities/utils";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa"; // Import icon
import { useNavigate, useParams } from "react-router-dom"; // Thêm useNavigate
import * as XLSX from "xlsx";

const ProductHistory = () => {
    const { productId } = useParams();
    const navigate = useNavigate(); // Khởi tạo useNavigate
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Bộ lọc
    const [filterType, setFilterType] = useState("");
    const [filterCreator, setFilterCreator] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [uniqueCreators, setUniqueCreators] = useState([]);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await axios.get(BASE_URL + "/api/products/" + productId + "/history");
                setHistory(response.data);
                const creators = response.data.map((entry) => entry.createdBy).filter((creator) => creator);
                setUniqueCreators([...new Set(creators)]);
            } catch (err) {
                setError("Lỗi khi tải lịch sử nhập xuất.");
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, [productId]);

    const filteredHistory = history.filter((entry) => {
        const entryDate = new Date(entry.date);
        const matchesType = filterType === "" || entry.type === filterType;
        const matchesCreator = filterCreator === "" || entry.createdBy === filterCreator;
        const matchesStartDate = !startDate || entryDate >= new Date(startDate);
        const matchesEndDate =
            !endDate || entryDate <= new Date(new Date(endDate).setHours(23, 59, 59));

        return matchesType && matchesCreator && matchesStartDate && matchesEndDate;
    });

    const exportToExcel = () => {
        const excelData = filteredHistory.map((entry) => ({
            Ngày: new Date(entry.date).toLocaleDateString(),
            "Loại giao dịch": entry.type === "IMPORT" ? "Nhập" : "Xuất",
            "Tên sản phẩm": entry.productName,
            "Số lượng": entry.quantity,
            "Giá": formatCurrency(entry.price),
            "Người tạo": entry.createdBy || "N/A",
        }));

        const worksheet = XLSX.utils.json_to_sheet(excelData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Lịch sử giao dịch");
        XLSX.writeFile(workbook, "Lich_su_giao_dich.xlsx");
    };

    if (loading) return <p className="text-center text-blue-600">Loading...</p>;
    if (error) return <p className="text-center text-red-600">{error}</p>;

    return (
        <div className="w-full min-h-screen p-5">
            {/* Tiêu đề với nút quay lại */}
            <div className="flex items-center gap-3 mb-5">
                <button
                    onClick={() => navigate(-1)} // Quay lại trang trước
                    className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition"
                >
                    <FaArrowLeft size={20} />
                </button>
                <h1 className="text-3xl font-semibold">Lịch sử nhập xuất</h1>
            </div>

            {/* Bộ lọc */}
            <div className="mb-5 flex justify-between">
                <div className="flex gap-4">
                    {/* Dropdown để lọc loại giao dịch */}
                    <div>
                        <label htmlFor="filterType" className="mr-2 font-semibold">Loại giao dịch:</label>
                        <select
                            id="filterType"
                            className="border border-gray-300 p-2 rounded-md"
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                        >
                            <option value="">Tất cả</option>
                            <option value="IMPORT">Nhập</option>
                            <option value="EXPORT">Xuất</option>
                        </select>
                    </div>

                    {/* Dropdown để lọc người tạo */}
                    <div>
                        <label htmlFor="filterCreator" className="mr-2 font-semibold">Người tạo:</label>
                        <select
                            id="filterCreator"
                            className="border border-gray-300 p-2 rounded-md"
                            value={filterCreator}
                            onChange={(e) => setFilterCreator(e.target.value)}
                        >
                            <option value="">Tất cả</option>
                            {uniqueCreators.map((creator, index) => (
                                <option key={index} value={creator}>
                                    {creator}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Lọc theo thời gian */}
                    <div>
                        <label htmlFor="startDate" className="mr-2 font-semibold">Từ ngày:</label>
                        <input
                            type="date"
                            id="startDate"
                            className="border border-gray-300 p-2 rounded-md"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="endDate" className="mr-2 font-semibold">Đến ngày:</label>
                        <input
                            type="date"
                            id="endDate"
                            className="border border-gray-300 p-2 rounded-md"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>
                </div>

                {/* Nút Xuất Excel */}
                <div>
                    <button
                        onClick={exportToExcel}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        Xuất Excel
                    </button>
                </div>
            </div>

            {/* Bảng lịch sử */}
            <table className="w-full border-collapse border border-gray-300 bg-white">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">Ngày</th>
                        <th className="border border-gray-300 px-4 py-2">Loại giao dịch</th>
                        <th className="border border-gray-300 px-4 py-2">Số lượng</th>
                        <th className="border border-gray-300 px-4 py-2">Giá</th>
                        <th className="border border-gray-300 px-4 py-2">Người tạo</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredHistory.map((entry, index) => (
                        <tr key={index} className="text-center">
                            <td className="border border-gray-300 px-4 py-2">
                                {new Date(entry.date).toLocaleDateString()}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {entry.type === "IMPORT" ? "Nhập" : "Xuất"}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">{entry.quantity}</td>
                            <td className="border border-gray-300 px-4 py-2">{formatCurrency(entry.price)}</td>
                            <td className="border border-gray-300 px-4 py-2">{entry.createdBy || "N/A"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductHistory;

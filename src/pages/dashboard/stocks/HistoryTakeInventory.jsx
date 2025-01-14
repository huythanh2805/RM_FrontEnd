import Pagination from "@/components/Pagination";
import { useHistoryTakeInventory } from "@/hooks/dashboard/stocks/useHistoryTakeInventory";
import { formatCurrency, formatDateNoTime } from "@/utilities/utils";
import { Button, DatePicker, Input } from "antd";
import { useState } from "react";

export const HistoryTakeInventory = () => {
    const { listTakeInventoryData, isLoading, error } = useHistoryTakeInventory();
    const [currentPage, setCurrentPage] = useState(1);
    const [filterDate, setFilterDate] = useState(null);
    const [filterUser, setFilterUser] = useState("");
    const itemsPerPage = 10;

    // Lọc dữ liệu
    const filteredData = listTakeInventoryData?.filter((item) => {
        const isDateMatch = filterDate
            ? new Date(item.createdAt).toDateString() === new Date(filterDate).toDateString()
            : true;
        const isUserMatch = filterUser
            ? item.createdBy?.userName?.toLowerCase().includes(filterUser.toLowerCase())
            : true;

        return isDateMatch && isUserMatch;
    });

    // Phân trang
    const totalItems = filteredData?.length || 0;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = filteredData?.slice(startIndex, startIndex + itemsPerPage);

    if (error) return <p className="text-center text-red-600">Error loading export notes list.</p>;
    return (
        <div className="w-full min-h-screen">
            <div className="px-5 py-5">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-3xl font-semibold text-gray-800">Lịch sử kiểm kê</h1>
                </div>

                {/* Bộ lọc */}
                <div className="flex items-center space-x-4 mb-4">
                    <DatePicker
                        placeholder="Chọn ngày kiểm kê"
                        onChange={(date) => setFilterDate(date?.toDate() || null)}
                    />
                    <Input
                        placeholder="Tìm kiếm theo người kiểm kê"
                        value={filterUser}
                        onChange={(e) => setFilterUser(e.target.value)}
                    />
                    <Button
                        onClick={() => {
                            setFilterDate(null);
                            setFilterUser("");
                        }}
                    >
                        Xóa bộ lọc
                    </Button>
                </div>

                {/* Bảng lịch sử */}
                <div className="overflow-x-auto rounded-xl border border-[#d5d5d5]">
                    <table className="min-w-full bg-white">
                        <thead className="border-b border-[#d5d5d5] text-left text-sl font-semibold text-[#202224] uppercase tracking-wider">
                            <tr>
                                <th className="lg:table-cell py-3 px-6 text-sl font-semibold text-gray-700 text-center">STT</th>
                                <th className="py-3 px-6 text-left text-sl font-semibold text-gray-700">Thông tin sản phẩm</th>
                                <th className="py-3 px-6 text-left text-sl font-semibold text-gray-700">Giá SP</th>
                                <th className="py-3 px-6 text-left text-sl font-semibold text-gray-700">Số lượng</th>
                                <th className="py-3 px-6 text-left text-sl font-semibold text-gray-700">Ngày hết hạn</th>
                                <th className="py-3 px-6 text-left text-sl font-semibold text-gray-700">Ngày kiểm kê</th>
                                <th className="py-3 px-6 text-left text-sl font-semibold text-gray-700">Người kiểm kê</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems?.map((takeInventory, index) => (
                                <tr
                                    key={takeInventory._id}
                                    className="bg-white border-b border-[#d5d5d5] hover:bg-gray-50 transition"
                                >
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
                                    <td className="py-3 px-6 text-sl text-gray-800 break-words">
                                        {formatDateNoTime(takeInventory?.createdAt)}
                                    </td>
                                    <td className="py-3 px-6 text-sl text-gray-800 break-words">
                                        {takeInventory?.createdBy?.userName}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {totalPages > 1 && (
                    <Pagination pageCount={totalPages} onPageChange={(e) => setCurrentPage(e.selected + 1)} />
                )}
            </div>
        </div>
    );
};

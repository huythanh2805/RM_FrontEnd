import {
    Card,
    CardContent,
    CardTitle
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useList } from "@/hooks/dashboard/stocks/useList";
import {
    Clock
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

const calculateTimeLeft = (expiryDate) => {
    if (!expiryDate) return { text: "Không xác định", color: "text-gray-500" };

    const now = new Date();
    const expiry = new Date(expiryDate);
    const timeDifference = expiry - now;

    if (timeDifference < 0) return { text: "Đã hết hạn", color: "text-red-600" };

    const daysLeft = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hoursLeft = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutesLeft = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

    if (daysLeft > 0) {
        return {
            text: `${daysLeft} ngày ${hoursLeft} giờ nữa hết hạn`,
            color: daysLeft <= 2 ? "text-yellow-600" : "text-green-600",
        };
    }

    if (hoursLeft > 0) {
        return {
            text: `${hoursLeft} giờ ${minutesLeft} phút nữa hết hạn`,
            color: "text-yellow-600",
        };
    }

    return {
        text: `${minutesLeft} phút nữa hết hạn`,
        color: "text-yellow-600",
    };
};

export const StockListDashboard = () => {
    const { stocksData: initialStocksData, isLoading, error } = useList();
    const [stocksData, setStocksData] = useState([]);

    useEffect(() => {
        setStocksData(initialStocksData || []);
    }, [initialStocksData]);

    const nearlyExpiredStocks = useMemo(() => {
        return stocksData
            ?.filter((stock) => {
                const expiryDate = stock?.expiryDate ? new Date(stock?.expiryDate) : null;
                const now = new Date();
                return expiryDate && expiryDate >= now;
            })
            .sort((a, b) => new Date(a.expiryDate) - new Date(b.expiryDate))
            .slice(0, 7);
    }, [stocksData]);

    if (isLoading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    if (error) return <div className="flex items-center justify-center min-h-screen text-red-600">Error loading stocks list.</div>;

    return (
        <div className="mx-auto">
            <Card>
                <CardTitle className="text-xl font-bold text-gray-900 p-5">
                    Danh sách tồn kho sắp hết hạn
                </CardTitle>
                <CardContent>
                    {/* Table */}
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px] text-center">STT</TableHead>
                                    <TableHead>Mã SP</TableHead>
                                    <TableHead>Tên SP</TableHead>
                                    <TableHead>Số lượng tồn</TableHead>
                                    <TableHead>Hạn sử dụng</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {nearlyExpiredStocks?.map((stock, index) => (
                                    <TableRow key={stock._id}>
                                        <TableCell className="text-center">{index + 1}</TableCell>
                                        <TableCell>{stock?.product?.code}</TableCell>
                                        <TableCell>{stock?.product?.name}</TableCell>
                                        <TableCell>{stock?.quantity}</TableCell>
                                        <TableCell>
                                            <span className={`flex items-center gap-2 ${calculateTimeLeft(stock?.expiryDate).color}`}>
                                                <Clock className="h-4 w-4" />
                                                {calculateTimeLeft(stock?.expiryDate).text}
                                            </span>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    <div className="mt-4 flex justify-center">
                        <Link
                            to="/admin/stocks"
                            className="text-blue-600 underline hover:text-blue-800"
                        >
                            Xem thêm
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

import Pagination from "@/components/Pagination";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useList } from "@/hooks/dashboard/stocks/useList";
import { formatCurrency, formatDateNoTime } from "@/utilities/utils";
import { FileDown } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";

// Hàm tính toán thời gian còn lại đến ngày hết hạn
const calculateTimeLeft = (expiryDate) => {
  if (!expiryDate) return { text: "Không xác định", color: "text-gray-500" };

  const now = new Date();
  const expiry = new Date(expiryDate);
  const timeDifference = expiry - now;

  if (timeDifference < 0) return { text: "Đã hết hạn", color: "text-red-600" };

  const daysLeft = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hoursLeft = Math.floor(
    (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutesLeft = Math.floor(
    (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
  );

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

export const StockList = () => {
  const { stocksData: initialStocksData, isLoading, error } = useList();
  const [stocksData, setStocksData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterCode, setFilterCode] = useState("");
  const [searchName, setSearchName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [expiryFilter, setExpiryFilter] = useState("all");
  const itemsPerPage = 10;

  // Cập nhật stocksData khi initialStocksData thay đổi
  useEffect(() => {
    setStocksData(initialStocksData || []);
  }, [initialStocksData]);

  // Lọc dữ liệu
  const filteredStocks = useMemo(() => {
    return stocksData?.filter((stock) => {
      const matchesFilterCode = !filterCode || stock?.product?.code === filterCode;
      const matchesSearchName =
        !searchName ||
        stock?.product?.name?.toLowerCase().includes(searchName.toLowerCase());
      const matchesStartDate =
        !startDate || new Date(stock?.lastUpdated) >= new Date(startDate);
      const matchesEndDate =
        !endDate || new Date(stock?.lastUpdated) <= new Date(new Date(endDate).setHours(23, 59, 59, 999));

      const expiryDate = stock?.expiryDate ? new Date(stock?.expiryDate) : null;
      const now = new Date();
      const isExpired = expiryDate && expiryDate < now;
      const isNearlyExpired =
        expiryDate &&
        expiryDate >= now &&
        (expiryDate - now) / (1000 * 60 * 60 * 24) <= 2;

      const matchesExpiryFilter =
        !expiryFilter ||
        (expiryFilter === "all") ||
        (expiryFilter === "expired" && isExpired) ||
        (expiryFilter === "nearlyExpired" && isNearlyExpired);

      return (
        matchesFilterCode &&
        matchesSearchName &&
        matchesStartDate &&
        matchesEndDate &&
        matchesExpiryFilter
      );
    });
  }, [stocksData, filterCode, searchName, startDate, endDate, expiryFilter]);

  // Phân trang
  const totalItems = filteredStocks?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredStocks?.slice(startIndex, startIndex + itemsPerPage);

  // Xuất Excel
  const exportToExcel = () => {
    const excelData = filteredStocks?.map((stock) => ({
      "Mã sản phẩm": stock?.product?.code,
      "Tên sản phẩm": stock?.product?.name,
      "Số lượng tồn": stock?.quantity,
      "Giá tiền": formatCurrency(stock?.price),
      "Ngày hết hạn": stock?.expiryDate
        ? new Date(stock?.expiryDate).toLocaleDateString()
        : "Không xác định",
      "Ngày cập nhật": formatDateNoTime(stock?.lastUpdated),
    }));

    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Tồn kho");
    XLSX.writeFile(wb, "DanhSachTonKho.xlsx");
  };

  if (isLoading)
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen text-red-600">
        Error loading stocks list.
      </div>
    );

  return (
    <div className="mx-auto">
      <h1 className="text-3xl font-semibold text-gray-800 pb-5">Quản lý tồn kho</h1>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardDescription>
              Quản lý và theo dõi tình trạng hàng hóa trong kho
            </CardDescription>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={exportToExcel}
                    className="bg-green-500 hover:bg-green-600"
                  >
                    <FileDown className="h-4 w-4 mr-2" />
                    Xuất Excel
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Tải xuống danh sách tồn kho</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
            <Select value={expiryFilter} onValueChange={setExpiryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Lọc theo HSD" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="expired">Đã hết hạn</SelectItem>
                <SelectItem value="nearlyExpired">Sắp hết hạn</SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder="Tìm kiếm tên sản phẩm"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="pl-10"
            />
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <Input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          {/* Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>STT</TableHead>
                <TableHead>Mã phiếu nhập</TableHead>
                <TableHead>Mã SP</TableHead>
                <TableHead>Tên SP</TableHead>
                <TableHead>Số lượng tồn</TableHead>
                <TableHead>Hạn sử dụng</TableHead>
                <TableHead>Thời gian nhập</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentItems?.map((stock, index) => (
                <TableRow key={stock._id}>
                  <TableCell>{index + 1 + startIndex}</TableCell>
                  <TableCell> <Link to={`/admin/import-notes/${stock?.codeImport}`}>
                    <div style={{ color: "blue", textDecoration: "underline" }}>
                      {stock?.codeImport}
                    </div>

                  </Link></TableCell>
                  <TableCell>{stock?.product?.code}</TableCell>
                  <TableCell>{stock?.product?.name}</TableCell>
                  <TableCell>{stock?.quantity}</TableCell>
                  <TableCell>
                    <span className={calculateTimeLeft(stock?.expiryDate).color}>
                      {calculateTimeLeft(stock?.expiryDate).text}
                    </span>
                  </TableCell>
                  <TableCell>{formatDateNoTime(stock?.createdAt)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              pageCount={totalPages}
              onPageChange={(e) => setCurrentPage(e.selected + 1)}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};
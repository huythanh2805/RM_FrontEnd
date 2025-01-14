
import Pagination from "@/components/Pagination";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader
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
import {
  CalendarRange,
  Clock,
  FileDown,
  Search
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";

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

export const StockList = () => {
  const { stocksData: initialStocksData, isLoading, error } = useList();
  const [stocksData, setStocksData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterCode, setFilterCode] = useState("");
  const [searchName, setSearchName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [expiryFilter, setExpiryFilter] = useState("");
  const itemsPerPage = 10;

  useEffect(() => {
    setStocksData(initialStocksData || []);
  }, [initialStocksData, stocksData]);

  const filteredStocks = useMemo(() => {
    return stocksData?.filter((stock) => {
      const matchesFilterCode = !filterCode || stock?.product?.code === filterCode;
      const matchesSearchName = !searchName || stock?.product?.name?.toLowerCase().includes(searchName.toLowerCase());
      const matchesStartDate = !startDate || new Date(stock?.lastUpdated) >= new Date(startDate);
      const matchesEndDate = !endDate || new Date(stock?.lastUpdated) <= new Date(endDate);

      const expiryDate = stock?.expiryDate ? new Date(stock?.expiryDate) : null;
      const now = new Date();
      const isExpired = expiryDate && expiryDate < now;
      const isNearlyExpired = expiryDate && expiryDate >= now && (expiryDate - now) / (1000 * 60 * 60 * 24) <= 2;

      const matchesExpiryFilter =
        !expiryFilter ||
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

  const totalItems = filteredStocks?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredStocks?.slice(startIndex, startIndex + itemsPerPage);

  const exportToExcel = () => {
    const excelData = filteredStocks?.map((stock) => ({
      "Mã sản phẩm": stock?.product?.code,
      "Tên sản phẩm": stock?.product?.name,
      "Số lượng tồn": stock?.quantity,
      "Giá tiền": formatCurrency(stock?.price),
      "Ngày hết hạn": stock?.expiryDate ? new Date(stock?.expiryDate).toLocaleDateString() : "Không xác định",
      "Ngày cập nhật": formatDateNoTime(stock?.lastUpdated),
    }));

    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Tồn kho");
    XLSX.writeFile(wb, "DanhSachTonKho.xlsx");
  };

  if (isLoading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  if (error) return <div className="flex items-center justify-center min-h-screen text-red-600">Error loading stocks list.</div>;

  return (
    <div className="mx-auto">
      <h1 className="text-3xl font-semibold text-gray-800 pb-5">Quản lý tồn kho</h1>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardDescription>
                Quản lý và theo dõi tình trạng hàng hóa trong kho
              </CardDescription>
            </div>
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
            <Select value={filterCode} onValueChange={setFilterCode}>
              <SelectTrigger>
                <SelectValue placeholder="Chọn mã SP" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem> {/* Thay đổi từ "" thành "all" */}
                {filteredStocks &&
                  [...new Set(filteredStocks.map((stock) => stock?.product?.code))]
                    .filter(code => code) // Lọc bỏ các giá trị null/undefined/empty
                    .map((code) => (
                      <SelectItem key={code} value={code}>
                        {code}
                      </SelectItem>
                    ))}
              </SelectContent>
            </Select>
            {/* Và tương tự cho Select của expiryFilter */}
            <Select value={expiryFilter} onValueChange={setExpiryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Lọc theo HSD" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem> {/* Thay đổi từ "" thành "all" */}
                <SelectItem value="expired">Đã hết hạn</SelectItem>
                <SelectItem value="nearlyExpired">Sắp hết hạn</SelectItem>
              </SelectContent>
            </Select>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Tìm kiếm tên sản phẩm"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="relative">
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="pl-10"
              />
              <CalendarRange className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            </div>

            <div className="relative">
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="pl-10"
              />
              <CalendarRange className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            </div>
          </div>

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
                  <TableHead>Hành động</TableHead>

                </TableRow>
              </TableHeader>
              <TableBody>
                {currentItems?.map((stock, index) => (
                  <TableRow key={stock._id}>
                    <TableCell className="text-center">{index + 1 + startIndex}</TableCell>
                    <TableCell>{stock?.product?.code}</TableCell>
                    <TableCell>{stock?.product?.name}</TableCell>
                    <TableCell>{stock?.quantity}</TableCell>
                    <TableCell>
                      <span className={`flex items-center gap-2 ${calculateTimeLeft(stock?.expiryDate).color}`}>
                        <Clock className="h-4 w-4" />
                        {calculateTimeLeft(stock?.expiryDate).text}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Link to={`/admin/history-take-inventory/${stock._id}`}>
                        <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                          Lịch sử kiểm kê
                        </button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-4">
              <Pagination
                pageCount={totalPages}
                onPageChange={(e) => setCurrentPage(e.selected + 1)}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};


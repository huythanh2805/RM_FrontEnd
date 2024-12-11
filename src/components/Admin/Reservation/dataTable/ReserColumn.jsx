import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { formatDate, formatPhoneNumber } from "@/utilities/utils";

export const ReservationColumn = ({ updateTable, selectTable, cancelReser, confirmReser, completedReservation }) => {
  const columns = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
      size: 50,
      minSize: 50,
    },
    {
      accessorKey: "userName",
      header: "Tên khách",
      size: 200,
      minSize: 200,
      maxSize: 400,
      enableResizing: true,
    },
    {
      accessorKey: "table_id",
      header: "Bàn số",
      size: 100,
      minSize: 100,
      enableResizing: true,
      cell: ({ row }) => {
        const table = row.original.table_id?.name;
        return (
          <div className="flex flex-wrap gap-1">
            {table ? <h3>{table}</h3> : <div className="text-red-1">Chưa nhận bàn</div>}
          </div>
        );
      },
    },
    {
      accessorKey: "guests_count",
      header: () => <div className="w-full text-center">Số người</div>,
      cell: ({ row }) => <div className="w-full text-center">{row.original.guests_count}</div>,
      size: 100,
    },
    {
      accessorKey: "phoneNumber",
      header: "Số điện thoại",
      size: 200,
      minSize: 200,
      maxSize: 300,
      cell: ({ row }) => <div className="font-sans">{formatPhoneNumber(row.original.phoneNumber)}</div>,
    },
    {
      accessorKey: "isOrderedOnline",
      header: "Kiểu đặt",
      cell: ({ row }) => {
        const isOrderedOnline = row.original.isOrderedOnline;
        return isOrderedOnline ? <Badge>Online</Badge> : <Badge>Trực tiếp</Badge>;
      },
      size: 150,
    },
    {
      accessorKey: "createdAt",
      header: "Ngày tạo",
      cell: ({ row }) => formatDate(row.original.createdAt),
      size: 150,
      sortingFn: (a, b) => new Date(b.original.createdAt) - new Date(a.original.createdAt),
      sortDescFirst: true,
    },
    {
      accessorKey: "status",
      header: "Trạng thái",
      cell: ({ row }) => {
        const status = row.original.status;
        let stt;
        let colorText;
        if (status === "ISWAITING") {
          stt = "Đang chờ";
          colorText = "#f5365c";
        } else if (status === "SEATED") {
          stt = "Đang phục vụ";
          colorText = "#ff9800";
        } else if (status === "ISCOMFIRMED") {
          stt = "Đã xác nhận";
          colorText = "#f5365c";
        } else if (status === "COMPLETED") {
          stt = "Đã hoàn thành";
          colorText = "#fb6340";
        } else if (status === "ISPAYMENT") {
          stt = "Chờ thanh toán";
          colorText = "#0000FF";
        } else {
          stt = "Đã hủy";
          colorText = "#f5365c";
        }
        return <h4 style={{ color: colorText, fontSize: "18px" }}>{stt}</h4>;
      },
      filterFn: (row, id, value) => value.includes(row.getValue(id)),
      size: 150,
    },
    {
      accessorKey: "feature",
      header: "",
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <div>
            {status === "SEATED" && (
              <div className="flex items-center gap-2">
                <Button onClick={() => updateTable(row.original._id)} className="bg-yellow-1 hover:bg-yellow-1">
                  Đổi bàn
                </Button>
                <Button
                  onClick={() => completedReservation(row.original._id)}
                  className="bg-purple-1 hover:bg-purple-1"
                >
                  Tính tiền
                </Button>
              </div>
            )}
            {status === "ISCOMFIRMED" && (
              <Button onClick={() => selectTable(row.original._id)} className="bg-orange-1 hover:bg-orange-1">
                Nhận bàn
              </Button>
            )}
            {status === "ISWAITING" && (
              <div className="flex items-center gap-2">
                <Button onClick={() => cancelReser(row.original._id)} className="bg-red-1 hover:bg-red-1">
                  Hủy Đơn
                </Button>
                <Button onClick={() => confirmReser(row.original._id)} className="bg-green-1 hover:bg-green-1">
                  Xác nhận
                </Button>
              </div>
            )}
            {status === "ISPAYMENT" && (
              <div className="flex items-center gap-2">
                <Button onClick={() => cancelReser(row.original._id)} className="bg-red-1 hover:bg-red-1">
                  Hủy Đơn
                </Button>
                <Button onClick={() => confirmReser(row.original._id)} className="bg-green-1 hover:bg-green-1">
                  Xác nhận
                </Button>
              </div>
            )}
          </div>
        );
      },
      size: 150,
    },
  ];

  return columns;
};

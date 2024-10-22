
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { useNavigate } from "react-router-dom"
import { formatDate, formatPhoneNumber } from "@/utilities/utils"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const ReservationColumn = ({
  updateTable,
  selectTable,
  cancelReser,
  confirmReser
 }) => {

  const columns = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
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
      size: 50, //starting column size
      minSize: 50,
    },
    {
      accessorKey: "userName",
      header: "Tên khách",
      size: 200, //starting column size
      minSize: 200,
      maxSize:400,
      enableResizing: true
    },
    {
      accessorKey: "table_id",
      header: "Bàn số",
      size: 100, //starting column size
      minSize: 100,
      enableResizing: true,
      cell: ({ row }) => {
        const table = row.original.table_id?.name
        return (
          <div className="flex flex-wrap gap-1">
           {
            table ? (
              <h3>{table}</h3>
            ) : (
              <div className="text-red-1">Chưa nhận bàn</div>
            )
           }
          </div>
        )
      },
    },
    {
      accessorKey: "guests_count",
      header: ()=>(
        <div className="w-full text-center">
            Số người
        </div>
      ),
      cell: ({row})=>(
        <div className="w-full text-center">
           {row.original.guests_count}
        </div>
      ),
      size: 100, //starting column size
    },
    {
      accessorKey: "phoneNumber",
      header: "Số điện thoại",
      size: 200, //starting column size
      minSize: 200,
      maxSize:300,
      cell: ({row})=>{
        return <div className="font-sans">
            {formatPhoneNumber(row.original.phoneNumber)}
        </div>
      }
    },
    {
      accessorKey: "isOrderedOnline",
      header: "Kiểu đặt",
      cell: ({row})=>{
        const isOrderedOnline = row.original.isOrderedOnline
        return isOrderedOnline ?
        <Badge> Online </Badge>:
        <Badge> Trực tiếp </Badge>
      },
      size: 150, //starting column size
    },
    {
      accessorKey: "startTime",
      header: "Thời gian đặt bàn",
      cell: ({row})=>{
        const startTime = row.original.startTime
        return formatDate(startTime)
      },
      size: 150, //starting column size
    },
    {
      accessorKey: "status",
      header: "Trạng thái",
      cell: ({row})=>{
        const status = row.original.status
        let stt;
        let colorText;
         status === "ISWAITING" ? (stt = 'Đang chờ', colorText= '#f5365c'):
         status === "SEATED" ? (stt = 'Đang phục vụ', colorText= '#ff9800'):
         status === "ISCOMFIRMED" ? (stt = 'Đã xác nhận', colorText= '#f5365c'):
         status === "COMPLETED" ? (stt = 'Đã hoàn thành', colorText= '#fb6340'):
         (stt = 'Đã hủy', colorText= '#f5365c')
         
        return <h4 style={{color: colorText, fontSize: '18px'}}>{stt}</h4>
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
    },
      size: 150, //starting column size
    },
    {
      accessorKey: "feature",
      header: "",
      cell: ({row})=>{
        const table_id = row.original.table_id
        const status = row.original.status
        return <div>
          {
           status === "SEATED" && <Button onClick={()=>updateTable(row.original._id )}>Đổi bàn</Button>
          }
          {
           status === "ISCOMFIRMED" && <Button onClick={()=>selectTable(row.original._id )}>Nhận bàn</Button>
          }
          {
            status === "ISWAITING" && <div className="flex items-center gap-2">
              <Button onClick={()=>cancelReser(row.original._id)}>Hủy Đơn</Button>
              <Button onClick={()=>confirmReser(row.original._id)}>Xác nhận đơn</Button>
            </div>
          }
        </div>
      },
      size: 150, //starting column size
    },
  ]
  return columns
}
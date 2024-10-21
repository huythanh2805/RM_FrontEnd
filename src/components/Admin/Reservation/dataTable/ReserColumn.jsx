
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
import { formatDate } from "@/utilities/utils"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const ReservationColumn = ({
  reservations
 }) => {
//   const router = useNavigate(); 
//   const handleSelectTable = (reservation_id, type)=>{
//     router(`/dashboard/reservations?reservation_id=${reservation_id}&type=${type}`);
//   }
  // Columns to be returned
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
      size: 200, //starting column size
      minSize: 200,
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
      accessorKey: "party_size",
      header: "Số người",
      size: 100, //starting column size
    },
    {
      accessorKey: "payment_method",
      header: "Phương thức TT",
      size: 200, //starting column size
      minSize: 200,
      maxSize:600,
      cell: ({row})=>{
        const payment_method = row.original.payment_method
        if(payment_method === 'CASHPAYMENT' ){
          return <div>Tiền mặt</div>
        }else if(payment_method === 'BANKPAYMENT'){
          return <div>Chuyển khoản</div>
        }
      }
    },
    {
      accessorKey: "prepay",
      header: "Trả trước",
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
        status === "RESERVED" ? (stt = 'Đặt trước', colorText= ''):
         status === "SEATED" ? (stt = 'Đang phục vụ', colorText= '#ff9800'):
         status === "ISNOTPAID" ? (stt = 'Chưa thanh toán', colorText= '#f5365c'):
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
            !table_id ?
             <Button onClick={()=>handleSelectTable(row.original._id, "SELECT")}>Nhận bàn</Button>:
             (status == "RESERVED" || status === "SEATED") ?
             <Button onClick={()=>handleSelectTable(row.original._id , "RESELECT")}>Đổi bàn</Button>:
             <div></div>
          }
        </div>
      },
      size: 150, //starting column size
    },
  ]
  return columns
}

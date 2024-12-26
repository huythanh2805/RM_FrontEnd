import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  
import { formatCurrency, formatDate, getStatusMessage, ServerUrl } from "@/utilities/utils"
import { usePatchData } from "@/hooks/usePatchData"
import { toast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { Copy } from "lucide-react"
import { useState } from "react"
import jwtDecode from "jwt-decode"

function OrderFoodTable({orderFood, setActiveReservationStatus}) {
   const [decodedToken, setDecodeToken] = useState(()=>{
      const token = localStorage.getItem('token')
      return jwtDecode(token)
    })
  const handleChangeStatusDish = async (id,reservation_id, code, newStatus)=>{
    setActiveReservationStatus(pre=> ([
       ...pre.map(reservation=>({
         ...reservation,
         ordered_dishes: reservation.ordered_dishes.map(orderedDish=>(
          orderedDish._id === id ? {...orderedDish, status: newStatus} : orderedDish
         ))
       }))
      ]))
    const {success} = await usePatchData(`${ServerUrl}/api/orderedFood`, {
      orderedFoodId: id,
      newStatus,
      reservation_id,
      changer_id: decodedToken.id,
      code,
    })
    console.log({success})
    if(success) return toast({
      variant: "success",
      title: `Trạng thái đã đổi -> ${getStatusMessage(newStatus)}`
    })
    if(!success) return toast({
      variant: "destructive",
      title: `Cập nhật không thành công`
    })
  }
  const handleChangeStatusCombo = async (id, reservation_id, code, newStatus)=>{
    setActiveReservationStatus(pre=> ([
      ...pre.map(reservation=>({
        ...reservation,
        ordered_combos: reservation.ordered_combos.map(orderedCombo=>(
         orderedCombo._id === id ? {...orderedCombo, status: newStatus} : orderedCombo
        ))
      }))
     ]))
     const {success} = await usePatchData(`${ServerUrl}/api/orderedCombo`, {
      orderedFoodId: id,
      newStatus,
      reservation_id,
      changer_id: decodedToken.id,
      code,
     })
     console.log({success})
     if(success) return toast({
       variant: "success",
       title: `Trạng thái đã đổi -> ${getStatusMessage(newStatus)}`
     })
     if(!success) return toast({
       variant: "destructive",
       title: `Cập nhật không thành công`
     })
  }
  return (
    <Table className="w-[1250px]">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">STT</TableHead>
          <TableHead className="w-[50px]">Code</TableHead>
          <TableHead className="w-[350px]">Tên món</TableHead>
          <TableHead className="w-[100px] text-center">Số lượng</TableHead>
          <TableHead className="w-[180px] text-center">Trạng thái</TableHead>
          <TableHead className="w-[226px] text-center">Gọi món lúc</TableHead>
          <TableHead className="text-start">Thay đổi trạng thái</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {/* Hiển thị món ăn */}
        {orderFood.ordered_dishes &&
          orderFood.ordered_dishes?.map((item, index) => (
            <TableRow>
              <TableCell className="font-medium text-center">
                {index + 1}
              </TableCell>
              <TableCell className="text-center w-[50px]">
                <div
                 onClick={()=> {
                  toast({variant: 'info', title: `Copy thành công ${item.code}`})
                  navigator.clipboard.writeText(item.code)
                 }}
                 className="cursor-pointer group flex items-center gap-1">
                <p>{item.code}</p>
                <Copy width={15} height={15} className="opacity-0 group-hover:opacity-100" /> 
                </div>
              </TableCell>
              <TableCell className="overflow-hidden">
                <div className="flex items-center">
                  <div className="w-[60px] h-[60px] min-w-[60px] min-h-[60px] rounded-md flex items-center justify-center overflow-hidden">
                    <img
                      src={item.dish_id.images[0]}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col pl-2 ">
                    <p className="text-lg max-w-[250px] truncate">
                      {item.dish_id.name}
                    </p>
                    <p className="font-mono">
                      {formatCurrency(item.dish_id.price)}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-center">{item.quantity}</TableCell>
              <TableCell>
                <div
                  className={cn(
                    "w-full px-2 py-1 rounded-lg text-white text-center text-lg",
                    item.status === "ISPREPARED" && "bg-light-warning",
                    item.status === "ORDERED" && "bg-purple-1",
                    item.status === "ISCOMPLETED" && "bg-light-success ",
                    item.status === "ISCANCELED" && "bg-red-1"
                  )}
                >
                  {getStatusMessage(item.status)}
                </div>
              </TableCell>
              <TableCell className="text-center">
                {formatDate(item.createdAt)}
              </TableCell>
              <TableCell className="text-center">
                <Select
                  value={item.status}
                  onValueChange={(value) =>
                    handleChangeStatusDish(item._id, orderFood._id, item.code, value)
                  }
                >
                  <SelectTrigger className="w-[180px] focus-visible::border-none focus-visible:outline-none focus:ring-0 focus:ring-offset-0 focus:border-b-blue-1">
                    <SelectValue placeholder="Theme" className="" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ORDERED">Đã gọi</SelectItem>
                    <SelectItem value="ISPREPARED">Đang chuẩn bị</SelectItem>
                    <SelectItem value="ISCOMPLETED">Hoàn thành</SelectItem>
                    <SelectItem value="ISCANCELED">Đã hủy</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        {/* Hiển thị combo */}
        {orderFood.ordered_combos &&
          orderFood.ordered_combos?.map((item, index) => (
            <TableRow>
              <TableCell className="font-medium text-center">
                {index + orderFood.ordered_dishes?.length + 1}
              </TableCell>
              <TableCell className="text-center w-[50px]">
                <div
                onClick={()=> {
                  toast({variant: 'info', title: `Copy thành công ${item.code}`})
                  navigator.clipboard.writeText(item.code)
                  }}
                 className="cursor-pointer group flex items-center gap-1">
                <p>{item.code}</p>
                <Copy width={15} height={15} className="opacity-0 group-hover:opacity-100" /> 
                </div>
              </TableCell>
              <TableCell className="overflow-hidden">
                <div className="flex items-center">
                  <div className="w-[60px] h-[60px] min-w-[60px] min-h-[60px] rounded-md flex items-center justify-center overflow-hidden">
                    <img
                      src={item.setComboProduct_id.combo_id.images[0]}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col pl-2 ">
                    <p className="text-lg max-w-[250px] truncate">
                      {item.setComboProduct_id.combo_id.name}
                    </p>
                    <p className="font-mono">
                      {formatCurrency(item.setComboProduct_id.combo_id.price)}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-center">{item.quantity}</TableCell>
              <TableCell>
                <div
                  className={cn(
                    "w-full px-2 py-1 rounded-lg text-white text-center text-lg",
                    item.status === "ISPREPARED" && "bg-light-warning",
                    item.status === "ORDERED" && "bg-purple-1",
                    item.status === "ISCOMPLETED" && "bg-light-success ",
                    item.status === "ISCANCELED" && "bg-red-1"
                  )}
                >
                  {getStatusMessage(item.status)}
                </div>
              </TableCell>
              <TableCell className="text-center">
                {formatDate(item.createdAt)}
              </TableCell>
              <TableCell className="text-center">
                <Select
                  value={item.status}
                  onValueChange={(value) =>
                    handleChangeStatusCombo(item._id, orderFood._id, item.code,value)
                  }
                >
                  <SelectTrigger className="w-[180px] focus-visible::border-none focus-visible:outline-none focus:ring-0 focus:ring-offset-0 focus:border-b-blue-1">
                    <SelectValue placeholder="Theme" className="" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ORDERED">Đã gọi</SelectItem>
                    <SelectItem value="ISPREPARED">Đang chuẩn bị</SelectItem>
                    <SelectItem value="ISCOMPLETED">Hoàn thành</SelectItem>
                    <SelectItem value="ISCANCELED">Đã hủy</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  )
}

export default OrderFoodTable
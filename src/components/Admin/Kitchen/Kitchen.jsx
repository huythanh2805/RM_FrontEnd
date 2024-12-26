import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import UserList from "@/pages/dashboard/users/Userlist"
import { useFetchData } from "@/hooks/useFetchData"
import { ServerUrl } from "@/utilities/utils"
import Navbar from "../Navbar"
import OrderFoodTable from "./OrderFoodTable"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "antd"
function Kitchen() {
  const navigate = useNavigate()
  const [activeReservationStatus, setActiveReservationStatus] = useState([])
  const {data: activeReservations, loading} = useFetchData(`${ServerUrl}/api/reservations/v2/get-active-reservation`)
  useEffect(() => {
     if(activeReservations) setActiveReservationStatus(activeReservations)
  }, [activeReservations])
  const handleNavigateHistoryOrder = (reservation_id)=> {
    navigate(`/admin/order-history/${reservation_id}`)
  }
  if(loading) return <div>...Loading</div>
  return (
    <div className="w-full min-h-screen bg-[#f9fafb]">
      <Navbar />
      <div className="px-5 py-5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-3xl font-semibold text-gray-800">
            Danh sách đánh giá
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-[#d5d5d5]">
          <Table>
            <TableCaption>Các bàn đang ngồi ăn</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">STT</TableHead>
                <TableHead className="w-[300px]">Tên Khách</TableHead>
                <TableHead>Bàn số</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                 activeReservationStatus.map((item, index)=> {
                 return <TableRow key={item._id}>
                  <TableCell colSpan={3} className="p-0">
                   <Accordion type="single" collapsible>
                     <AccordionItem value="item-1">
                     <AccordionTrigger className="hover:no-underline pr-4">
                     <div className="font-medium flex items-center">
                     <div className="font-medium w-[100px] text-start px-4">{index + 1}</div>
                     <div className="font-medium w-[300px] text-start px-4">{item.userName}</div>
                     <div className="font-medium text-start px-4 flex-1">{item.table_id.name}</div>
                     </div>
                     </AccordionTrigger>
                       <AccordionContent className="px-10">
                         {/* Chèn bảng các món ăn được order vào */}
                         <OrderFoodTable orderFood={item} setActiveReservationStatus={setActiveReservationStatus} />
                          <div className="w-full flex justify-end">
                          <Button variant="link" onClick={()=> handleNavigateHistoryOrder(item._id)}>
                              Lịch sử đặt món
                          </Button>
                          </div>
                       </AccordionContent>
                     </AccordionItem>
                   </Accordion>
                  </TableCell>
                </TableRow>
                })
              }
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default Kitchen

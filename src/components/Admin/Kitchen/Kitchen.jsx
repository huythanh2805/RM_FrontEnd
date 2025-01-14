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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import UserList from "@/pages/dashboard/users/Userlist"
import { useFetchData } from "@/hooks/useFetchData"
import { checkIsRequiredToCancel, ServerUrl } from "@/utilities/utils"
import OrderFoodTable from "./OrderFoodTable"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, notification } from "antd"
import { IoIosNotifications } from "react-icons/io"
import { confirmCancel, getAllKitchenNotify, kitchenGetAllActiveReser } from "@/services/notificationService"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "@/hooks/use-toast"
import jwtDecode from "jwt-decode"
import { MdError } from "react-icons/md"
function Kitchen() {
  const navigate = useNavigate()
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const queryClient = useQueryClient();
  const [decodedToken, setDecodeToken] = useState(()=>{
        const token = localStorage.getItem('token')
        return jwtDecode(token)
      })

  const {
    data: activesReservations,
    error: activesReservationsError,
    loading: activesReservationsLoading,
  } = useQuery({
    queryKey: "activeReservations",
    queryFn: kitchenGetAllActiveReser,
  })
  const {
    data: kitchenNotifications,
    error: kitchenNotificationsError,
    loading: kitchenNotificationsLoading,
  } = useQuery({
    queryKey: "getAllKitchenNotify",
    queryFn: getAllKitchenNotify,
  })
  const mutation = useMutation({
    mutationFn: confirmCancel,
    onSuccess: () => {
      toast({
        variant: "success",
        title: "Bạn đã xác nhận thành công"
      })
    queryClient.invalidateQueries({queryKey: 'getAllKitchenNotify'})
    queryClient.invalidateQueries({queryKey: 'activeReservations'})
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Có gì đó lỗi với hàm xác nhận"
      })
    }
  })
  console.log(activesReservations)
  const handleConfirmCancel = (_id) => {
    mutation.mutate({_id, changer_id: decodedToken.id})
  }
  const handleNavigateHistoryOrder = (reservation_id)=> {
    navigate(`/admin/order-history/${reservation_id}`)
  }
  if(activesReservationsLoading) return <div>...Loading</div>
  return (
    <div className="w-full min-h-screen bg-[#f9fafb]">
      <div className="px-5 py-5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-3xl font-semibold text-gray-800">
            Danh sách đánh giá
          </p>
          {/* Thông báo */}
          <div className="relative cursor-pointer">
            <IoIosNotifications
              className="w-8 h-8 text-gray-600 hover:text-gray-800 transition"
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
            />
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
              {kitchenNotifications?.filter((notif) => !notif.isConfirmed).length}
            </span>
            {isNotificationOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg z-10 max-h-96 overflow-y-auto">
                <h3 className="text-lg font-semibold px-4 py-2 border-b text-gray-800">
                  Thông báo
                </h3>
                {kitchenNotificationsLoading ? (
                  <p className="px-4 py-2 text-sm text-gray-500">Đang tải...</p>
                ) : kitchenNotifications.length > 0 ? (
                  <ul className="py-2">
                    {kitchenNotifications.map((notification) => (
                      <Dialog>
                        <DialogTrigger className="w-full">
                          <li
                            key={notification._id}
                            className={`px-4 py-2 text-sm transition cursor-pointer ${
                              !notification.isConfirmed
                                ? "bg-gray-200"
                                : "bg-white"
                            }`}
                          >
                            <p className="font-semibold">
                              {notification.title}
                            </p>
                            <p className="text-gray-500 text-xs">
                              {notification.message}
                            </p>
                            <p className="text-gray-500 text-xs">
                              {new Date(notification.createdAt).toLocaleString(
                                "vi-VN",
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "numeric",
                                }
                              )}
                            </p>
                          </li>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Xác nhận hủy món</DialogTitle>
                            <DialogDescription>
                              <div className="flex flex-col">
                                <p className="text-black pt-1 pb-2 text-lg">
                                  {notification.message}
                                </p>
                                <div className="text-end">
                                  <DialogTrigger>
                                    <Button
                                      onClick={() =>
                                        handleConfirmCancel(notification._id)
                                      }
                                    >
                                      Xác nhận
                                    </Button>
                                  </DialogTrigger>
                                </div>
                              </div>
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                    ))}
                  </ul>
                ) : (
                  <p className="px-4 py-2 text-sm text-gray-500">
                    Không có thông báo nào.
                  </p>
                )}
              </div>
            )}
          </div>
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
              { activesReservations &&
               !activesReservationsError &&
                activesReservations.map((item, index) => {
                return (
                  <TableRow key={item._id}>
                    <TableCell colSpan={3} className="p-0">
                      <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                          <AccordionTrigger className="hover:no-underline pr-4">
                            <div className="font-medium flex items-center">
                              <div className="font-medium w-[100px] text-start px-4">
                                {index + 1}
                              </div>
                              <div className="font-medium w-[300px] text-start px-4">
                                {item.userName}
                              </div>
                            <div className="font-medium text-start px-4 flex-1">
                                {item.table_id?.name}
                              </div>
                              <div className="font-medium text-start px-4 ">
                                {
                                checkIsRequiredToCancel(item) &&
                                  <span class="relative flex h-5 w-5">
                                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-1 opacity-75 duration-2000"></span>
                                  <MdError  className="relative inline-flex rounded-full h-5 w-5 text-red-1 " />
                                 </span>
                                }
                              </div>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="px-10">
                            {/* Chèn bảng các món ăn được order vào */}
                            <OrderFoodTable
                              orderFood={item}
                            />
                            <div className="w-full flex justify-end">
                              <Button
                                variant="link"
                                onClick={() =>
                                  handleNavigateHistoryOrder(item._id)
                                }
                              >
                                Lịch sử đặt món
                              </Button>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default Kitchen

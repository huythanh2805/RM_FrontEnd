import { ArrowLeft, Home, Mail, MapPin, Printer } from "lucide-react"
import React, { useEffect, useRef, useState } from "react"
import { useReactToPrint } from "react-to-print"
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { FadeLoader } from "react-spinners"
import { Button } from "@/components/ui/button"
import { formatCurrency, formatDateAndTime, ServerUrl } from "@/utilities/utils"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "@/hooks/use-toast"
import Logo from "../../../public/images/logo.png"
const CompletedBill = () => {
  const router = useNavigate()
  const [bill, setBill] = useState()
  const [loading, setLoading] = useState(false)
  const [orderedFoods, setOrderedFoods] = useState([])

  // Get detail reservation
  const {billId} = useParams()
  useEffect(() => {
    const fetData = async () => {
      try {
        setLoading(true)
        const res = await fetch(ServerUrl + "/api/bills/" + billId, {
          method: "GET",
        })
        const data = await res.json()
        const bill = data.bill

        if (!res.ok) {
          return toast({
            variant: "destructive",
            title: "Can't get any data for bill!",
          })
        }
        setBill(bill)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        toast({
          variant: "destructive",
          title: "Something went wrong with get detail bill",
        })
      } finally {
        setLoading(false)
      }
    }
    fetData()
  }, [billId])

  // Print and download bill
  const contentToPrint = useRef(null)
  const handlePrint = useReactToPrint({
    documentTitle: "One Bill",
    onBeforePrint: () => console.log("before printing..."),
    onAfterPrint: () => console.log("after printing..."),
    removeAfterPrint: true,
  })
  return (
    <>
    {bill && (
    <div
     className="fixed top-0 left-0 h-full w-full flex items-center justify-center bg-black/35"
     >
        <div className="w-full h-full bg-light-bg_2 dark:bg-dark-bg_2 rounded-md px-3 py-4">
      {loading && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <FadeLoader
            color={"#11cdef"}
            loading={loading}
          />
        </div>
      )}
      {bill && !loading && (
        <div className="relative w-full h-full">
          <div className="flex items-center justify-between px-2 py-1">
            <div className="relative md:absolute top-0 left-0 md:py-4 md:px-3">
              <Button
                onClick={() => router("/dashboard/tables")}
                className="flex items-center gap-2 cursor-pointer hover:scale-95 transition-transform ease-in"
              >
                <p>
                  <ArrowLeft width={20} height={20} />
                </p>
                <h3 className="font-medium text-[19px] font-serif">Back</h3>
              </Button>
            </div>
            <div className="relative md:absolute top-0 right-0 md:py-4 md:px-3">
              <button
                onClick={(e) => {
                  e.preventDefault()
                  handlePrint(null, () => contentToPrint.current)
                }}
                className="flex items-center gap-2 cursor-pointer hover:scale-95 transition-transform ease-in"
              >
                <p>
                  <Printer width={20} height={20} />
                </p>
                <h3 className="font-medium text-[19px] font-serif">Print</h3>
              </button>
            </div>
          </div>
          <div
            ref={contentToPrint}
            className="mx-auto max-w-[794px] bg-light-bg dark:bg-dark-bg rounded-md px-3 pb-4"
          >
            {/* Header bill */}
            <div className="w-full flex justify-center">
              <div className="max-w-[200px] max-h-[160px] overflow-hidden">
                <img
                  alt="Logo"
                  src={Logo}
                  className="object-cover"
                />
              </div>
              <div className="py-3">
                <div className="w-full flex flex-col items-center justify-center px-5">
                  <h2 className="dark:text-dark-text text-[36px] font-medium font-serif">
                    Visit Us
                  </h2>
                  <div className="flex items-start py-2">
                    <MapPin className="text-light-text dark:text-dark-text min-w-[18px] shrink-0 px-1" />
                    <p className="text-light-textSoft dark:text-dark-textSoft text-[16px] text-center">
                      Trịnh Văn Bô, Phương Canh, Nam Từ Liêm, Hà Nội
                    </p>
                  </div>

                  <div className="flex items-start py-2">
                    <Home className="text-light-text dark:text-dark-text min-w-[18px] shrink-0 px-1" />
                    <p className="text-light-textSoft dark:text-dark-textSoft text-[16px] text-center">
                      Open 9:30 am - 11h30 pm
                    </p>
                  </div>

                  <div className="flex items-start py-2">
                    <Mail className="text-light-text dark:text-dark-text min-w-[18px] shrink-0 px-1" />
                    <p className="text-light-textSoft dark:text-dark-textSoft text-[16px] text-center">
                      goldrenFork@gmail.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Body */}
            <div className="border-double border-b-4 border-sky-500 my-4"></div>
            <div className="flex justify-between">
              <div className="flex gap-8 max-w-[390px]">
                <h1 className="min-w-fit text-[20px]">Bill to</h1>
                <div className="flex flex-col">
                  <p className="text-light-textSoft dark:text-dark-textSoft font-thin pb-2">
                    Tên:
                    <span className="text-light-text dark:text-dark-text font-medium px-3">
                      {bill.reservation_id.userName
                        ? bill.reservation_id.userName
                        : "Un-no"
                      }
                    </span>
                  </p>
                  <p className="text-light-textSoft dark:text-dark-textSoft font-thin pb-2">
                    Địa chỉ:
                    <span className="text-light-text dark:text-dark-text font-medium px-3">
                      {bill.reservation_id.detailAddress}
                    </span>
                  </p>
                  {bill.reservation_id.user_id?.email && (
                    <p className="text-light-textSoft dark:text-dark-textSoft font-thin pb-2">
                      Email:
                      <span className="text-light-text dark:text-dark-text font-medium px-3">
                        {bill.reservation_id.user_id?.email}
                      </span>
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col min-w-[200px]">
                <div className="w-full flex items-center justify-between pb-2">
                  <p className="text-light-textSoft dark:text-dark-textSoft font-thin">
                    Ngày:
                  </p>
                  <p>{formatDateAndTime(bill.reservation_id.startTime).day}</p>
                </div>
                <div className="w-full flex items-center justify-between pb-2">
                  <p className="text-light-textSoft dark:text-dark-textSoft font-thin">
                    Giờ:
                  </p>
                  <p>{formatDateAndTime(bill.reservation_id.startTime).time}</p>
                </div>
                <div className="w-full flex items-center justify-between pb-2">
                  <p className="text-light-textSoft dark:text-dark-textSoft font-thin">
                    Bàn:
                  </p>
                  <p>{bill.reservation_id.table_id?.name}</p>
                </div>
              </div>
            </div>
            <div className="border-dashed border-b-2 border-sky-500 my-4"></div>
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[200px]">Tên</TableHead>
                  <TableHead className="min-w-[100px]">Ảnh</TableHead>
                  <TableHead className="max-w-[100px] text-center">
                    Số lượng
                  </TableHead>
                  <TableHead className="text-right min-w-[135px]">
                    Thành tiền
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bill.billDetail_id.orderedDishes &&
                  bill.billDetail_id.orderedDishes.map((orderedFood) => (
                    <TableRow key={orderedFood._id}>
                      <TableCell className="font-medium">
                        <div className="flex flex-col leading-7 truncate">
                          <h2>{orderedFood.name}</h2>
                          <p className="text-light-textSoft dark:text-dark-textSoft font-thin">
                            {formatCurrency(orderedFood.price)}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <img
                          width={50}
                          height={50}
                          alt="dishImage"
                          src={orderedFood.images[0]}
                        />
                      </TableCell>
                      <TableCell>
                        <p className="text-center">{orderedFood.quantity}</p>
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(
                          orderedFood.quantity * orderedFood.price
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
              <TableFooter>
                <TableRow className="bg-light-bg dark:bg-dark-bg">
                  <TableCell colSpan={2} className="text-[20px] font-medium">
                    Tổng
                  </TableCell>
                  <TableCell colSpan={2} className="text-right">
                    {
                      bill.discounted_money ? formatCurrency(bill.discounted_money) : formatCurrency(bill.original_money)
                   
                    }
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </div>
      )}
    </div>
    </div>
        )
    }
    
    </>
  )
}
export default CompletedBill


import React, { useEffect, useState } from "react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import CurrencyInput from 'react-currency-input-field';
import { Check } from "lucide-react"
import { formatCurrency } from "@/utilities/utils"
import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Calculator = ({
  reservation_id,
  orderedFoods,
  setOrderedFoods,
  deleteOrderedFood,
  updateOrderedFood,
}) => {
  const [isPaid, setIsPaid] = useState(false)
  const [prePay, setPrePay] = useState(0)
  const [neededPaid, setNeededPaid] = useState(0)
  const [paidMoney, setPaidMoney] = useState(0)
  const [change, setChange] = useState(0)
  
  const totalPrice = orderedFoods.reduce((sum, item) => {
    return sum + item.quantity * item.dish_id.price
  }, 0)
  // Get prepay
  useEffect(() => {
    const fetData = async () => {
      try {
        const res = await fetch("/api/reservations/" + reservation_id, {
          method: "GET",
        })
        if (!res.ok) {
          return toast({
            variant: "destructive",
            title: "Something wrong with get prePay",
          })
        }
        const data = await res.json()
        const reservationDetail = data.reservationDetail 
        console.log('reservationDetail', reservationDetail)
        setPrePay(reservationDetail.prepay)
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Something wrong with get prePay",
        })
      }
    }
    fetData()
  }, [reservation_id])
  // calculate neededPaid and Check whenever paidMoney change to calculate client'change
  useEffect(()=>{
    setNeededPaid(totalPrice - prePay)
    setChange(paidMoney - neededPaid)
  },[paidMoney, totalPrice, prePay])
  // delete orderedFood
  const handleDeleteOrderedFood = async (e, orderedFood_id) => {
    e.preventDefault()
    const { res, data } = await deleteOrderedFood(orderedFood_id)
    if (
      res.status === 201 &&
      data.message === "Successfully" &&
      setOrderedFoods
    )
      setOrderedFoods((pre) => [
        ...pre.filter((orderedFood) => orderedFood._id !== orderedFood_id),
      ])
  }
  // Update orderedFood
  const handleMinus = async (orderedFood_id, quantity) => {
    if (quantity < 2) return
    const orderedFood = (await updateOrderedFood(
      orderedFood_id,
      quantity - 1
    )) 
    if (!setOrderedFoods) return
    setOrderedFoods((prevOrderedFoods) =>
      prevOrderedFoods.map((item) =>
        item._id === orderedFood_id ? { ...item, quantity: quantity - 1 } : item
      )
    )
  }
  const handlePlus = async (orderedFood_id, quantity) => {
    const orderedFood = (await updateOrderedFood(
      orderedFood_id,
      quantity + 1
    )) 
    if (!setOrderedFoods) return
    setOrderedFoods((prevOrderedFoods) =>
      prevOrderedFoods.map((item) =>
        item._id === orderedFood_id ? { ...item, quantity: quantity + 1 } : item
      )
    )
  }
  //  Format currency
  const handlePaidMoney = (value, name, values) => {
    setPaidMoney(value)
  }
  const handleGoBack = () => {
    router.back()
  }
  const handlePayment = ()=>{
    if(change < 0) {
      return toast({
        variant: "destructive",
        title: "Please pay all for bill",
      })
    }
    const fetchData = async () => {
      try {
        const res = await fetch("/api/reservations/completedBill", {
          method: "POST",
          body: JSON.stringify({reservation_id, total_money: totalPrice, paid_money: paidMoney })
        }) 
        const data = await res.json()
        if(res.status === 401){
          return toast({
            variant: "destructive",
            title: data.message,
          })
        }
        if (!res.ok) {
          return toast({
            variant: "destructive",
            title: "Something wrong with create Bill",
          })
        }
        const completedBill = data.completedBill
        // when create bill successfully, trigger thanks dialog
        setIsPaid(!isPaid)
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Something wrong with create Bill",
        })
      }
    }
    fetchData()
   
  }
  return (
    <div className="px-3 py-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[200px]">Tên</TableHead>
            <TableHead>Số lượng</TableHead>
            <TableHead className="text-right min-w-[135px]">
              Thành tiền
            </TableHead>
            <TableHead className="max-w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orderedFoods.map((orderedFood) => (
            <TableRow key={orderedFood._id}>
              <TableCell className="font-medium">
                <div className="flex flex-col leading-7 truncate">
                  <h2>{orderedFood.dish_id.title}</h2>
                  <p className="text-light-textSoft dark:text-dark-textSoft font-thin">
                    {formatCurrency(orderedFood.dish_id.price)}
                  </p>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      handleMinus(orderedFood._id, orderedFood.quantity)
                    }
                    className="px-3 py-2 text-white bg-blur_bg dark:bg-blur_bg rounded-lg cursor-pointer hover:scale-[80%] transition-all ease-in hover:shadow-button_shadow"
                  >
                    {" "}
                    -{" "}
                  </button>
                  <span>{orderedFood.quantity}</span>
                  <button
                    onClick={() =>
                      handlePlus(orderedFood._id, orderedFood.quantity)
                    }
                    className="px-3 py-2 text-white bg-blur_bg dark:bg-blur_bg rounded-lg cursor-pointer hover:scale-[80%] transition-all ease-in hover:shadow-button_shadow"
                  >
                    {" "}
                    +{" "}
                  </button>
                </div>
              </TableCell>
              
              <TableCell className="text-right">
                {formatCurrency(
                  orderedFood.quantity * orderedFood.dish_id.price
                )}
              </TableCell>
              <TableCell className="text-right max-w-[50px]">
                <button
                  onClick={(e) => handleDeleteOrderedFood(e, orderedFood._id)}
                  className="text-red-500"
                >
                  X
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow className="bg-light-bg_2 dark:bg-dark-bg_2">
            <TableCell colSpan={2} className="text-[20px] font-medium">
              Tổng
            </TableCell>
            <TableCell colSpan={2} className="text-right">
              {formatCurrency(totalPrice)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      <div className="w-full py-4 flex gap-5">
        <Button
          onClick={() => router.push('/dashboard/reservations')}
          className="flex-1 py-6 text-[17px] text-white dark:text-white bg-red-1 dark:bg-red-1 hover:scale-95 transition-transform duration-150 ease-linear"
        >
          Quay lại
        </Button>
        <Dialog>
          <DialogTrigger className="flex-1">
            <Button className="w-full py-6 text-[17px] text-white dark:text-white bg-green-1 dark:bg-green-1 hover:scale-95 transition-transform duration-150 ease-linear">
              Thanh toán
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text gap-0">
            <DialogHeader></DialogHeader>
            <div className="w-full flex items-center py-2">
              <p className="flex-1 h-full bg-light-bg_2 dark:bg-dark-bg_2 flex items-center justify-start px-2">
                Tổng tiền
              </p>
              <Input
                className=" flex-[2] rounded-none placeholder:text-light-textSoft dark:placeholder:text-dark-textSoft
                 placeholder:font-semibold dark:placeholder:font-semibold placeholder:text-[17px] dark:placeholder:text-[17px]"
                disabled
                type="number"
                placeholder={formatCurrency(totalPrice)}
              />
            </div>
            <div className="w-full flex items-center py-2">
              <p className="flex-1 h-full bg-light-bg_2 dark:bg-dark-bg_2 flex items-center justify-start px-2">
                Trả trước
              </p>
              <Input
                className=" flex-[2] rounded-none placeholder:text-light-textSoft dark:placeholder:text-dark-textSoft
                 placeholder:font-semibold dark:placeholder:font-semibold placeholder:text-[17px] dark:placeholder:text-[17px]"
                disabled
                type="number"
                placeholder={formatCurrency(prePay)}
              />
            </div>
            <div className="w-full flex items-center py-2">
              <p className="flex-1 h-full bg-light-bg_2 dark:bg-dark-bg_2 flex items-center justify-start px-2">
                Cần thanh toán
              </p>
              <Input
                className=" flex-[2] rounded-none placeholder:text-light-textSoft dark:placeholder:text-dark-textSoft
                 placeholder:font-semibold dark:placeholder:font-semibold placeholder:text-[17px] dark:placeholder:text-[17px]"
                disabled
                type="number"
                placeholder={formatCurrency(neededPaid)}
              />
            </div>
            <div className="w-full flex items-center py-2">
              <p className="flex-1 h-full bg-light-bg_2 dark:bg-dark-bg_2 flex items-center justify-start px-2">
                Khách trả
              </p>
              <CurrencyInput
                id="input-example"
                className="flex-[2] shadow-input_shadow focus-within:shadow-indigo-500/50 focus:border-none focus:outline-none px-2 py-2 bg-transparent dark:bg-transparent "
                name="input-name"
                placeholder="Please enter a number"
                decimalsLimit={2}
                suffix="₫"
                autoFocus
                groupSeparator="."
                value={paidMoney}
                onValueChange={(value, name, values) =>
                  handlePaidMoney(value, name, values)
                }
              />
            </div>
            <div className="w-full flex items-center py-2">
              <p className="flex-1 h-full bg-light-bg_2 dark:bg-dark-bg_2 flex items-center justify-start px-2">
                Tiền thừa
              </p>
              <Input
                className=" flex-[2] rounded-none placeholder:text-light-textSoft dark:placeholder:text-dark-textSoft
                 placeholder:font-semibold dark:placeholder:font-semibold placeholder:text-[17px] dark:placeholder:text-[17px]"
                disabled
                type="number"
                placeholder={formatCurrency(change)}
              />
            </div>
            <div className="flex items-center justify-end py-2 gap-5">
              <DialogClose asChild>
                <Button
                  className="bg-light-success dark:bg-dark-success hover:bg-light-success dark:hover:bg-dark-success 
                text-white dark:text-white hover:scale-90 transition-all ease-in"
                >
                  Đóng
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button
                onClick={()=>handlePayment()}
                className="bg-light-error dark:bg-dark-error hover:bg-light-error dark:hover:bg-dark-error 
              text-white dark:text-white hover:scale-90 transition-all ease-in"
                >
                  Thanh toán
                </Button>
                </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      </div>


      <Dialog open={isPaid} onOpenChange={setIsPaid}>
      <DialogContent className="max-w-[330px] md:max-w-[450px] bg-light-bg_2 dark:bg-dark-bg_2 rounded-md text-white dark:text-white">
        <DialogHeader className="w-full flex flex-col items-center justify-center gap-3 ">
          <DialogTitle className="text-[25px] font-normal">Thank You!</DialogTitle>
          <div className="px-2 py-2 rounded-full border-[6px] border-green-1 ">
          <Check width={85} height={85} className="text-green-1" />
          </div>
        </DialogHeader>
        <div className="w-full">
            <h2 className="leading-6 text-center">Cảm ơn cháu đã dùng dịch vụ nhà hàng của chúng ta. Check your bill?</h2>
        </div>
        <div className="flex items-center justify-end py-2 gap-5">
              <DialogClose asChild>
                <Button
                  className="bg-light-success dark:bg-dark-success hover:bg-light-success dark:hover:bg-dark-success 
                text-white dark:text-white hover:scale-90 transition-all ease-in"
                >
                  Đóng
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button
                onClick={()=> router.push('/dashboard/reservations/completedBill/'+ reservation_id)}
                className="bg-light-error dark:bg-dark-error hover:bg-light-error dark:hover:bg-dark-error 
              text-white dark:text-white hover:scale-90 transition-all ease-in"
                >
                  Check bill
                </Button>
                </DialogClose>
            </div>
      </DialogContent>
    </Dialog>
    </div>
  )
}
export default Calculator

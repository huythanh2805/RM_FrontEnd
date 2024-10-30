import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ShoppingCart } from "lucide-react"
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { useEffect, useMemo, useState } from "react"
import { useCart } from "@/contexts/CartProvider"
import { formatCurrency } from "@/utilities/utils"
import { useNavigate } from "react-router-dom"
import { Button } from "./ui/button"
const Cart = () => {
    const [isClient, setIsClient]= useState(false)
    const router = useNavigate()
    // Get cart and method from cartProvider
    const {cart, updateQuantity, removeItem} = useCart()
    
    useEffect(()=>{
        setIsClient(true)
    },[])

    const handleMinus = (dish_id, quantitiy)=>{
        if(quantitiy < 1) removeItem(dish_id)
        updateQuantity(dish_id, quantitiy)
    }
    const handlePlus = (dish_id, quantitiy)=>{
        updateQuantity(dish_id, quantitiy)
    }
    const handleRemoveItem = (dish_id)=>{
        removeItem(dish_id)
    }
    const totalPrice = cart.reduce((sum, item) => {
        return sum + item.quantity * item.price
      }, 0)

    const totalOrderedFood = cart.reduce((sum, item)=>{ return sum += item.quantity},0) 
     

    return (
    <Sheet>
      <SheetTrigger>
        <div className="relative btnCustom dark:btnCustom_dark px-2 py-2 dark:px-2 dark:py-2">
          <ShoppingCart
            width={30}
            strokeWidth={"1.5px"}
            height={30}
            className="cursor-pointer"
          />
         {
            isClient && (
            <p className="absolute top-0 translate-x-[-60%] translate-y-[-50%] text-white bg-red-1 font-medium w-5 h-5 rounded-full flex items-center justify-center">
            {totalOrderedFood}
          </p>
            )
         }
        </div>
      </SheetTrigger>
      
      <SheetContent className="w-full sm:max-w-full md:max-w-[640px] h-screen border-none">
      <div className="bg-light-bg_2 dark:bg-dark-bg_2 text-light-text dark:text-dark-text w-full h-screen p-6">
         
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[200px]">Tên</TableHead>
            <TableHead className="max-w-[130px]">Số lượng</TableHead>
            <TableHead className="text-right min-w-[135px] max-w-[150px]">
              Thành tiền
            </TableHead>
            <TableHead className="max-w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cart.map((orderedFood) => (
            <TableRow key={orderedFood.dish_id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                <img
                  width={50}
                  height={50}
                  alt="dishImage"
                  src={orderedFood?.image}
                />
                <div className="flex flex-col leading-7 truncate">
                  <h2>{orderedFood.title}</h2>
                  <p className="text-light-textSoft dark:text-dark-textSoft font-thin">
                    {formatCurrency(orderedFood.price)}
                  </p>
                </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      handleMinus(orderedFood.dish_id, orderedFood.quantity-1 )
                    }
                    className="px-3 py-2 text-white bg-blur_bg dark:bg-blur_bg rounded-lg cursor-pointer hover:scale-[80%] transition-all ease-in hover:shadow-button_shadow"
                  >
                    {" "}
                    -{" "}
                  </button>
                  <span>{orderedFood.quantity}</span>
                  <button
                    onClick={() =>
                      handlePlus(orderedFood.dish_id, orderedFood.quantity+1)
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
                  orderedFood.quantity * orderedFood.price
                )}
              </TableCell>
              <TableCell className="text-right max-w-[50px]">
                <button
                  onClick={(e) => handleRemoveItem(orderedFood.dish_id)}
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
        <div className="w-full flex items-center gap-5 py-3">
        <SheetClose className="flex-1">
         <button className="text-[18px] w-full px-3 py-3 rounded-lg bg-gradient-to-r from-orange-1 to-red-1 text-white dark:text-white 
         hover:scale-95 transition-transform duration-150 ease-linear"
        >
            Đóng
        </button>
        </SheetClose>

         <SheetClose className="flex-1">
         <Button
         onClick={()=>router('/reservation')}
         className=" text-[18px] w-full px-3 py-6 bg-gradient-to-r from-[#11c4ef] to-[#1187ef] text-white dark:text-white 
         hover:scale-95 transition-transform duration-150 ease-linear"
        >
            Tạo đơn
        </Button>
         </SheetClose>
        </div>
      </div>

      </SheetContent>
    </Sheet>
  )
}

export default Cart

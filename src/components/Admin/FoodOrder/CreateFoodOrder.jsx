import { useFetchData } from '@/hooks/useFetchData'
import { cn } from '@/lib/utils'
import { formatCurrency, ServerUrl } from '@/utilities/utils'
import { Check } from 'lucide-react'
import React, { useMemo, useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

const CreateFoodOrder = () => {
  const [orderedFoods, setOrderedFoods] = useState([])
  const { data: dishes, loading: dishLoading } = useFetchData(ServerUrl+"/dishes")
  const { data: categories, loading: categoryLoading } = useFetchData(ServerUrl+"/categories")
  const [activedLink, setActiveLink] = useState('all')
  // choose dish depend on category id
  const categoryDishes = useMemo(()=>{
       if(activedLink === 'all'){
        return dishes
       }else if(dishes){
        return [...dishes?.filter(dish=> dish.category_id._id === activedLink)]
       }
  },[activedLink, dishes])
console.log(dishes)
  const totalPrice = orderedFoods.reduce((sum, item) => {
    if(item.status === "ISCANCELED") return sum + 0
    return sum + item.quantity * item.dish_id.price
  }, 0)

  return (
    <div className="px-3 md:px-5 py-2 md:py-4 flex flex-col xl:flex-row gap-5 w-full h-full pb-[80px]">
    <div className="flex-[2] bg-light-bg_2 dark:bg-dark-bg_2 rounded-md">
      {
        categories && dishes && (
            <div className='px-3 py-4 grid grid-cols-2  [grid-auto-rows:200px] md:grid-cols-3 xl:grid-cols-4 gap-3'>
            <div className='hidden xl:block col-span-1 row-span-2 px-3 py-4'>
             <div className='xl:flex flex-col items-center justify-center h-full'>
                <div 
                  onClick={()=>setActiveLink("all")}
                  className={cn(
                     'w-full px-3 py-4 rounded-md cursor-pointer',
                     activedLink === 'all' ? 'bg-dark-bg text-white' : ''
                  )}
                >
                   Tất cả
                </div>
             {
                categories?.map(item=>(
                 <div
                 key={item._id}
                  onClick={()=>setActiveLink(item._id)}
                  className={cn(
                     'w-full px-3 py-4 rounded-md cursor-pointer',
                     activedLink === item._id ? 'bg-dark-bg text-white' : ''
                  )}
                 >
                     {item.name}
                 </div>
                ))
             }
             </div>
            </div>
            {
             categoryDishes?.map(dish=>
               <div 
                key={dish._id}
                onClick={()=>hanleChooseDish(dish._id)}
                className='relative rounded-md overflow-hidden cursor-pointer hover:scale-95 transition-transform duration-200 ease-in'
               >
                 <img 
                 src={dish.images[0]}
                 alt={dish.name}
                 className='w-full h-full object-cover relative'
                  />
                 <h2 className='absolute z-20 left-0 bottom-0 w-full h-[50px] flex items-center justify-center bg-blur_bg text-white'>{dish.name}</h2>
     
                 <div className={`absolute z-20 right-0 top-0 w-[45px] h-[45px] flex items-center justify-center bg-blur_bg text-white rounded-md 
                    ${orderedFoods.find(orderedFood => orderedFood.dish_id._id === dish._id ) ? 'block' : 'hidden'}`}>
                   <Check width={35} height={35} className='font-extrabold text-light-success dark:text-dark-success' />
                 </div>
               </div>
             )
            }
         </div>
        )
      }
    </div>
    <div className="flex-[1] bg-light-bg_2 dark:bg-dark-bg_2 rounded-md">
      {
        categories && dishes && (
            <div className="px-3 py-4 max-h-[800px] overflow-scroll">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[200px]">Tên</TableHead>
                  <TableHead>Số lượng</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="text-right min-w-[105px]">
                    Thành tiền
                  </TableHead>
                  <TableHead className="max-w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orderedFoods?.map((orderedFood) => (
                  <TableRow >
                    <TableCell className="font-medium">
                      <div className="flex items-center justify-start gap-2 md:gap-4">
                        <div className="w-16 h-16 flex items-center justify-center overflow-hidden rounded-full">
                          <img
                            src={orderedFood.dish_id.images[0]}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex flex-col leading-7 truncate">
                          <h2>{orderedFood.dish_id.name}</h2>
                          <p className="text-light-textSoft dark:text-dark-textSoft font-thin">
                            {formatCurrency(orderedFood.dish_id.price)}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleMinus(orderedFood._id, orderedFood.quantity)
                          }}
                          className="px-3 py-2 text-white bg-blur_bg dark:bg-blur_bg rounded-lg cursor-pointer hover:scale-[80%] transition-all ease-in hover:shadow-button_shadow"
                        >
                          {" "}
                          -{" "}
                        </button>
                        <span>{orderedFood.quantity}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handlePlus(orderedFood._id, orderedFood.quantity)
                          }}
                          className="px-3 py-2 text-white bg-blur_bg dark:bg-blur_bg rounded-lg cursor-pointer hover:scale-[80%] transition-all ease-in hover:shadow-button_shadow"
                        >
                          {" "}
                          +{" "}
                        </button>
                      </div>
                    </TableCell>
      
                    <TableCell>
                      <div
                        className={`
                        py-1 px-3 text-white rounded-full
                         ${
                             orderedFood.status === "ISPREPARED"
                             ? "bg-gray-1"
                             : orderedFood.status === "ISCOMPLETED"
                             ? "bg-yellow-1"
                             : "bg-red-1"
                         }
                        `}
                      >
                        {
                         orderedFood.status === "ISPREPARED"?
                         <div className="text-nowrap text-center">Đang chuẩn bị</div>:
                         orderedFood.status === "ISCOMPLETED"?
                         <div className="text-nowrap text-center">Hoàn thành</div>: 
                         <div className="text-nowrap text-center">Đã hủy</div>
                        }
                      </div>
                    </TableCell>
      
                    <TableCell className="text-right">
                      {formatCurrency(
                        orderedFood.quantity * orderedFood.dish_id.price
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
      
                <TableRow className="bg-light-bg_2 dark:bg-dark-bg_2 w-full">
                  <TableCell colSpan={2} className="text-[20px] font-medium">
                    Tổng
                  </TableCell>
      
                 <TableCell/>
      
                  <TableCell colSpan={2} className="text-right">
                    {formatCurrency(totalPrice)}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
      
            {/* <div className="w-full py-4 flex gap-5">
              <Button
                onClick={() => router("/admin/tables")}
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
                      {change < 0 ? "Tiền thiếu" : "Tiền thừa"}
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
                        onClick={() => handlePayment()}
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
                  <DialogTitle className="text-[25px] font-normal text-light-text dark:text-dark-text">
                    Thank You!
                  </DialogTitle>
                  <div className="px-2 py-2 rounded-full border-[6px] border-green-1 ">
                    <Check width={85} height={85} className="text-green-1" />
                  </div>
                </DialogHeader>
                <div className="w-full">
                  <h2 className="leading-6 text-center text-light-text dark:text-dark-text">
                    Cảm ơn bạn đã dùng dịch vụ nhà hàng của chúng tôi. Check your
                    bill?
                  </h2>
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
                      onClick={()=> router(`/admin/completedBill/${billId}`)}
                      className="bg-light-error dark:bg-dark-error hover:bg-light-error dark:hover:bg-dark-error 
                    text-white dark:text-white hover:scale-90 transition-all ease-in"
                    >
                      Check bill
                    </Button>
                  </DialogClose>
                </div>
              </DialogContent>
            </Dialog> */}
                
          </div>
        )
      }
    </div>
  </div>
  )
}

export default CreateFoodOrder
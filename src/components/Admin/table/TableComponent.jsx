import { useSortable } from '@dnd-kit/sortable'
import { CSS } from "@dnd-kit/utilities"
import { Button } from '@/components/ui/button'
import { UsersRound } from 'lucide-react'
import { useEffect, useState } from 'react'
import TimeInterval from '@/components/custom_ui/TimeInterval'
import TimeIntervalCountDown from '@/components/custom_ui/TimeIntervalCountDown'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useNavigate, useNavigation, useParams, useSearchParams } from 'react-router-dom'
import { toast } from '@/hooks/use-toast'
import { ServerUrl } from '@/utilities/utils'
import { cn } from '@/lib/utils'


export default function TableComponent({
  table,
  updateTable
} ) {
  // input for updating
  const [inputValue, setInputValue] = useState({
    number_of_seats: table.number_of_seats,
    name: table.name,
    table_id: table._id
  })
  const [editModelForTextInput, setEditModelForTextInput] = useState(false)
  const [editModleForNumberInput, setEditModleForNumberInput] = useState(false)
  const [reservationDetail, setReservationDetail] = useState({})
  const [getTimeLoading, setGetTimeLoading] = useState(false)
  const router = useNavigate()
  const [isDialogOpen, setIsDialogOpen] = useState(false) 

  const { reservationId } = useParams();
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type'); 

  const {
    setNodeRef,
     transform,
     transition,
     listeners,
     attributes,
     isDragging
    } = useSortable({
      id: table._id,
      data: {
        type: "table",
        table
      },
    })
    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    }

  // Get start time for interval timer
  const getReservationDetailByTableId = async () => {
    setGetTimeLoading(true)
    try {
      const res = await fetch( ServerUrl+"/api/reservations/v2/" + table._id, { 
        method: "GET",
      }
      )
      if(!res.ok) {
        return toast({
          variant: "destructive",
          title: data.message 
        })
      }
      const data = await res.json()
      const reservationDetail = data.reservationDetail 
      console.log({reservationDetail})
      setReservationDetail(reservationDetail)
      setGetTimeLoading(false)
    } catch (error) {
      console.log(error)
      setGetTimeLoading(false)
      return toast({
        variant: "destructive",
        title: "Can't get reservation detail" 
      })
    }
  }
  useEffect(()=>{
     if (table.status === 'ISSERVING') {
      getReservationDetailByTableId()
     }
  },[])
console.log({
  getTimeLoading
})
  // update information
  const handleUpdateTable = (e)=>{
    e.preventDefault()
    e.stopPropagation()
    setEditModelForTextInput(false)
    setEditModleForNumberInput(false)
    updateTable(inputValue)
  }
  const handleOnKeyDown = (e) =>{
    e.stopPropagation()
    if(e.key === "Enter"){
      setEditModelForTextInput(false)
      setEditModleForNumberInput(false)
      updateTable(inputValue)
    }
  }
  const handleChangeInput = (e )=>{
    e.stopPropagation()
    if(e.target.name === 'number_of_seats'){
       if(parseInt(e.target.value) < 1){
        return toast({
          variant: "destructive",
          title: "At least 1"
        })
       }
      return setInputValue(pre=>({
        ...pre,
        [e.target.name]: parseInt(e.target.value)
       }))
    }
   setInputValue(pre=>({
    ...pre,
    [e.target.name]: e.target.value
   }))
  }
  // Func pick up reservation for reser which didn't order table online and reselect table
  const updateReservation = async (reservationId, table_id, type)=>{
      const URL = type == "SELECT" ?
                  ServerUrl+'/api/reservations/select':
                  ServerUrl+'/api/reservations/reselect'
        try {
          const res = await fetch(URL ,{
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({table_id, reservation_id: reservationId})
          })
          const data = await res.json()
          if(!res.ok){
            return toast({
              variant: "destructive",
              title: data.message 
            })
          }
           toast({
            variant: "success",
            title: data.message
          })
          router('/admin/listReser')
        } catch (error) {
          console.log(error)
           toast({
            variant: "destructive",
            title: "There is something wrong with reselect table"
          })
        }
        
  }
  const handleSelectTable = (table_id)=>{
    if (reservationId) {
      updateReservation(reservationId , table_id, type)
    }else{
      router('/admin/reservations/createReservation/'+ table_id)
    }
  }
  const editReservation = (table_id)=>{
   router('/admin/reservations/updateReservation/'+ table_id)
 }
  const OrderFood = (reservation_id)=>{
   router('/admin/foodOrder/'+ reservation_id)
 }
  // Overlayout

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="relative max-h-[140px] min-w-[170px]"
      onClick={() => setIsDialogOpen(!isDialogOpen)}
    >
      <div
        className={cn(
          "relative z-10 min-w-[80px] min-h-[80px] rounded-md flex flex-col items-center justify-center bg-light-bg_2",
          "dark:bg-dark-bg_2 px-4 py-3 text-light-text dark:text-dark-text",
          table.status === "ISSERVING" ? "border border-yellow-1" : ""
        )}
      >
        {editModelForTextInput ? (
          <input
            autoFocus
            type="text"
            name="name"
            value={inputValue.name}
            onChange={(e) => handleChangeInput(e)}
            onBlur={(e) => handleUpdateTable(e)}
            onKeyDown={(e) => handleOnKeyDown(e)}
            className="bg-transparent dark:bg-transparent w-full px-2 focus:outline-none text-[18px]"
          />
        ) : (
          <h4
            className="text-[18px]"
            onClick={(e) => {
              e.stopPropagation(), setEditModelForTextInput(true)
            }}
          >
            {inputValue.name}
          </h4>
        )}
        <p className="separate_line my-2"></p>
        <div className="w-full flex flex-col justify-between gap-3 mt-1">
          <div className="flex items-center gap-2">
            <div className="min-h-[20px] min-w-[20px]">
              <UsersRound width={20} height={20} />
            </div>
            {editModleForNumberInput ? (
              <input
                autoFocus
                type="number"
                name="number_of_seats"
                value={inputValue.number_of_seats}
                onChange={(e) => handleChangeInput(e)}
                onBlur={(e) => handleUpdateTable(e)}
                onKeyDown={(e) => handleOnKeyDown(e)}
                className="bg-transparent dark:bg-transparent w-full focus:outline-none text-[20px]"
              />
            ) : (
              <h4
                onClick={(e) => {
                  e.stopPropagation(), setEditModleForNumberInput(true)
                }}
                className="flex-grow text-[20px]"
              >
                {inputValue.number_of_seats}
              </h4>
            )}
          </div>
          <div className="flex items-center gap-2">
            {/* <Annoyed width={20} height={20}/> */}
            <span className="text-[17px]">TT :</span>
            <p
              className={cn(
                "font-thin text-[17px]",
                table.status === "AVAILABLE" ? "text-black" : "text-yellow-1"
              )}
            >
              {table.status === "AVAILABLE" ? "Có Sẵn" : "Đang phục vụ"}
            </p>
          </div>
        </div>
        {/* <div className='mt-2 w-full flex items-center justify-end'>
        <Button 
        onClick={()=>handleSelectTable(table._id)}
        className='font-medium hover:scale-90 transition-all duration-300 ease-in-out backface-visibility-hidden'
        >
         {type === "RESELECT" ? "Đổi bàn": type === "SELECT" ? "Chọn bàn" : " Tạo đơn"}
        </Button>
      </div> */}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger></DialogTrigger>
        <DialogContent className="bg-light-bg_2 dark:bg-dark-bg_2 text-light-text dark:text-dark-text">
          <DialogHeader>
            <DialogTitle className="text-light-textSoft dark:text-dark-textSoft font-normal text-[19px]">
               {`Bạn đang tìm kiếm gì trong    ${table.name} ?` }
            </DialogTitle>
            {table.status === "ISSERVING" && (
              <div className="flex items-center gap-2 py-2 text-light-textSoft dark:text-dark-textSoft font-normal">
                Bàn đã phục vụ trong:
                <div className="text-light-text dark:text-dark-text">
                  {getTimeLoading ? (
                    <div>00:00:00</div>
                  ) : (
                    <TimeInterval
                      reservationStartTime={reservationDetail?.startTime}
                    />
                  )}
                </div>
              </div>
            )}
          </DialogHeader>
          <div className="flex items-center justify-end py-2 gap-5">

            {
              table.status === "ISSERVING" ? (
                <>
                <DialogClose>
              <Button
                onClick={() => editReservation(reservationDetail._id)}
                className="bg-blue-1 hover:bg-blue-1
              text-white dark:text-white hover:scale-90 transition-all ease-in"
              >
                Update
              </Button>
                </DialogClose>
                <DialogClose>
                  <Button
                    onClick={() => OrderFood(reservationDetail._id)}
                    className="bg-yellow-1 hover:bg-yellow-1
                  text-white dark:text-white hover:scale-90 transition-all ease-in"
                  >
                    Order food
                  </Button>
                </DialogClose>
                </>
              ) : (
                <DialogClose>
              <Button
                onClick={()=>handleSelectTable(table._id)}
                className="bg-light-success dark:bg-dark-success hover:bg-light-success dark:hover:bg-dark-success 
              text-white dark:text-white hover:scale-90 transition-all ease-in"
              >
                {type === "RESELECT" ? "Đổi bàn": type === "SELECT" ? "Chọn bàn" : " Tạo đơn"}
              </Button>
            </DialogClose>
              )
            }

            <DialogClose asChild>
              <Button
                className="bg-light-error dark:bg-dark-error hover:bg-light-error dark:hover:bg-dark-error 
            text-white dark:text-white hover:scale-90 transition-all ease-in"
              >
                Đóng
              </Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

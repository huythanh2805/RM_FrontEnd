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
import { useNavigate, useNavigation, useParams } from 'react-router-dom'
import { toast } from '@/hooks/use-toast'
import { ServerUrl } from '@/utilities/utils'


export default function TableComponent({
  table,
  deleteTable,
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

  const { reservationId, type } = useParams();

  // const searchParams = useSearchParams()
  // const reservation_id = searchParams.get('reservation_id')
  // const type = searchParams.get('type')

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
  const getReservationDetail = async () => {
    setGetTimeLoading(true)
    try {
      const res = await fetch(
        ServerUrl+"/api/reservations/" +
          table._id,
        {
          method: "GET",
        }
      )
      const data = await res.json()
      const reservationDetail = data.reservationDetail 
      console.log({reservationDetail})
      setReservationDetail(reservationDetail)
      setGetTimeLoading(false)
    } catch (error) {
      setGetTimeLoading(false)
    }
  }
  useEffect(()=>{
     if (table.status === 'ISSERVING' || table.status === 'ISBOOKED') {
      getReservationDetail()
     }
  },[table])
  console.log({table})
  const handleDelete = (e) =>{
    e.preventDefault()
    deleteTable(table._id)
  }
  // update information
  const handleUpdateTable = (e)=>{
    e.preventDefault()
    setEditModelForTextInput(false)
    setEditModleForNumberInput(false)
    updateTable(inputValue)
  }
  const handleOnKeyDown = (e) =>{
    if(e.key === "Enter"){
      setEditModelForTextInput(false)
      setEditModleForNumberInput(false)
      updateTable(inputValue)
    }
  }
  const handleChangeInput = (e )=>{
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
  const updateReservation = async (reservationId, type, table_id)=>{
        try {
          const res = await fetch(ServerUrl+'/api/reservations/selectTable/' + reservationId,{
            method: "PATCH",
            body: JSON.stringify({table_id, type})
          })
          const data = await res.json()
          if(!res.ok){
            return toast({
              variant: "destructive",
              title: data.message
            })
          }
           toast({
            variant: "sucess",
            title: data.message
          })
          router('/dashboard/invoices')
        } catch (error) {
          console.log(error)
           toast({
            variant: "destructive",
            title: "There is something wrong with select or reselect table"
          })
        }
        
  }
  const handleSelectTable = (table_id)=>{
    if (reservationId && type) {
      updateReservation(reservationId, type , table_id)
    }else{
      router('/dashboard/reservations/createReservation/'+ table_id)
    }
  }
  const editReservation = (table_id)=>{
   router('/dashboard/reservations/updateReservation/'+ table_id)
 }
  const OrderFood = (reservation_id)=>{
   router('/dashboard/foodOrder/'+ reservation_id)
 }
  // Overlayout
  if(isDragging) return (
    <div
    ref={setNodeRef}
    style={style}
    {...attributes}
    {...listeners}
    className='relative pointer-events-none opacity-45'
    >
    <div className={
      `
      ${!( table.status === "AVAILABLE") && 'opacity-30'}
      'relative z-10 min-w-[80px] min-h-[80px] rounded-md flex flex-col items-center justify-center bg-light-bg_2 dark:bg-dark-bg_2 px-4 py-3 text-light-text dark:text-dark-text'
      `
    }>
      {
        table.status === "AVAILABLE" && (<button
          onClick={(e)=>handleDelete(e)}
          className='absolute text-[15px] w-[20px] h-[20px] flex items-center justify-center top-0 left-0 translate-x-[-50%] translate-y-[-50%] rounded-full
          bg-light-error dark:bg-dark-error border-none text-white dark:text-white hover:scale-90 transition-all ease-in-out shadow-none hover:shadow-shadown_hover'
         >
           X
         </button>)
      }
      
      {
        editModelForTextInput ? (<input 
          autoFocus
          type="text"  
          name='name' 
          value={inputValue.name} 
          onChange={e=>handleChangeInput(e)} 
          onBlur={(e)=>handleUpdateTable(e)}
          onKeyDown={(e)=>handleOnKeyDown(e)}
          className='bg-transparent dark:bg-transparent w-full px-2 focus:outline-none'
          />) : <h4 onClick={()=>setEditModelForTextInput(true)}>{inputValue.name}</h4>
      }
      <p className='separate_line my-2'></p>
      <div className='w-full flex flex-col justify-between gap-3 mt-1'>
        <div className='flex items-center gap-2'>
       <div className='min-h-[20px] min-w-[20px]'>
       <UsersRound width={20} height={20}/>
       </div>
        {
        editModleForNumberInput ? (<input 
          autoFocus
          type="number"  
          name='number_of_seats' 
          value={inputValue.number_of_seats} 
          onChange={e=>handleChangeInput(e)} 
          onBlur={(e)=>handleUpdateTable(e)}  
          onKeyDown={(e)=>handleOnKeyDown(e)}
          className='bg-transparent dark:bg-transparent w-full focus:outline-none'
          />) : <h4 onClick={()=>setEditModleForNumberInput(true)} className='flex-grow'>{inputValue.number_of_seats}</h4>
      }
        </div>
        <div className='flex items-center gap-2'>
        {/* <Annoyed width={20} height={20}/> */}
        <span>TT :</span>
        <p className='font-thin text-[14px] text-light-error dark:text-dark-error'>{table.status === "AVAILABLE" ? "Có Sẵn" : table.status === "ISBOOKED" ? "Đã được đặt" : "Đang phục vụ" }</p>
        </div>
      </div>
      <div className='mt-2 w-full flex items-center justify-end'>
        <Button className='font-medium hover:scale-90 transition-all duration-300 ease-in-out backface-visibility-hidden'>Tạo đơn</Button>
      </div>
    </div>

    {
      !(table.status === "AVAILABLE") && (
        <div className='absolute z-30 inset-0 top-0 left-0 w-full h-full bg-blur_bg dark:bg-blur_bg flex items-center justify-center rounded-md'>
        {
          table.status === "ISSERVING" ? 
          <h1 className='font-semibold text-[19px] text-light-warning dark:text-dark-warning'>Đang phục vụ</h1>:
          <h1 className='font-semibold text-[19px] text-light-error dark:text-dark-error'>Đã được đặt</h1> 
        }
        </div>
      )
    }
    </div>
  )

  return (
    <div
    ref={setNodeRef}
    style={style}
    {...attributes}
    {...listeners}
    className='relative max-h-[177px]'
    >
    <div className={
      `
      ${!( table.status === "AVAILABLE") && 'opacity-30'}
      'relative z-10 min-w-[80px] min-h-[80px] rounded-md flex flex-col items-center justify-center bg-light-bg_2 dark:bg-dark-bg_2 px-4 py-3 text-light-text dark:text-dark-text'
      `
    }>
      {
        table.status === "AVAILABLE" && (<button
          onClick={(e)=>handleDelete(e)}
          className='absolute text-[15px] w-[20px] h-[20px] flex items-center justify-center top-0 left-0 translate-x-[-50%] translate-y-[-50%] rounded-full
          bg-light-error dark:bg-dark-error border-none text-white dark:text-white hover:scale-90 transition-all ease-in-out shadow-none hover:shadow-shadown_hover'
         >
           X
         </button>)
      }
      
      {
        editModelForTextInput ? (<input 
          autoFocus
          type="text"  
          name='name' 
          value={inputValue.name} 
          onChange={e=>handleChangeInput(e)} 
          onBlur={(e)=>handleUpdateTable(e)}
          onKeyDown={(e)=>handleOnKeyDown(e)}
          className='bg-transparent dark:bg-transparent w-full px-2 focus:outline-none'
          />) : <h4 onClick={()=>setEditModelForTextInput(true)}>{inputValue.name}</h4>
      }
      <p className='separate_line my-2'></p>
      <div className='w-full flex flex-col justify-between gap-3 mt-1'>
        <div className='flex items-center gap-2'>
       <div className='min-h-[20px] min-w-[20px]'>
       <UsersRound width={20} height={20}/>
       </div>
        {
        editModleForNumberInput ? (<input 
          autoFocus
          type="number"  
          name='number_of_seats' 
          value={inputValue.number_of_seats} 
          onChange={e=>handleChangeInput(e)} 
          onBlur={(e)=>handleUpdateTable(e)}  
          onKeyDown={(e)=>handleOnKeyDown(e)}
          className='bg-transparent dark:bg-transparent w-full focus:outline-none'
          />) : <h4 onClick={()=>setEditModleForNumberInput(true)} className='flex-grow'>{inputValue.number_of_seats}</h4>
      }
        </div>
        <div className='flex items-center gap-2'>
        {/* <Annoyed width={20} height={20}/> */}
        <span>TT :</span>
        <p className='font-thin text-[14px] text-light-error dark:text-dark-error'>{table.status === "AVAILABLE" ? "Có Sẵn" : table.status === "ISBOOKED" ? "Đã được đặt" : "Đang phục vụ" }</p>
        </div>
      </div>
      <div className='mt-2 w-full flex items-center justify-end'>
        <Button 
        onClick={()=>handleSelectTable(table._id)}
        className='font-medium hover:scale-90 transition-all duration-300 ease-in-out backface-visibility-hidden'
        >
        Tạo đơn
        </Button>
      </div>
    </div>

    {
      !(table.status === "AVAILABLE") && (
        <>
          { table.status === "ISSERVING" ? (
         
        <Dialog>
        <DialogTrigger>
        <div 
          
          className='absolute z-30 inset-0 top-0 left-0 w-full h-full bg-blur_bg dark:bg-blur_bg flex items-center justify-center rounded-md'>
            <div className='w-full h-full flex flex-col gap-1 items-center justify-center'>
            <h1 className='font-semibold text-[19px] text-light-warning dark:text-dark-warning'>Đang phục vụ </h1>
            {getTimeLoading ? <div>00:00:00</div>: <TimeInterval reservationStartTime={reservationDetail.startTime}/>} 
            </div>
        </div>
        </DialogTrigger>
        <DialogContent className="bg-light-bg_2 dark:bg-dark-bg_2 text-light-text dark:text-dark-text">
          <DialogHeader>
            <DialogTitle className='text-light-textSoft dark:text-dark-textSoft font-normal'>
             What are you looking for? 
            </DialogTitle>
            <div className='flex items-center gap-2 py-2 text-light-textSoft dark:text-dark-textSoft font-normal'>
             This table has been serving for:
            <div className='text-light-text dark:text-dark-text'>
            {getTimeLoading ? <div>00:00:00</div>: <TimeInterval reservationStartTime={reservationDetail.startTime}/>} 
            </div>
            </div>
          </DialogHeader>
          <div className="flex items-center justify-end py-2 gap-5">

           <DialogClose>
            <Button
              onClick={()=>editReservation(reservationDetail._id)}
              className="bg-light-success dark:bg-dark-success hover:bg-light-success dark:hover:bg-dark-success 
              text-white dark:text-white hover:scale-90 transition-all ease-in"
            >
              Update
            </Button>
            </DialogClose>

           <DialogClose>
            <Button
              onClick={()=>OrderFood(reservationDetail._id)}
              className="bg-light-success dark:bg-dark-success hover:bg-light-success dark:hover:bg-dark-success 
              text-white dark:text-white hover:scale-90 transition-all ease-in"
            >
              Order food
            </Button>
            </DialogClose>


            <DialogClose asChild>
              <Button
               className="bg-light-error dark:bg-dark-error hover:bg-light-error dark:hover:bg-dark-error 
            text-white dark:text-white hover:scale-90 transition-all ease-in"
              >
                Close
              </Button>
            </DialogClose>
            
          </div>
        </DialogContent>
      </Dialog>
        ): ( 
          <Dialog>
          <DialogTrigger>
              <div
              className='absolute z-30 inset-0 top-0 left-0 w-full h-full bg-blur_bg dark:bg-blur_bg flex items-center justify-center rounded-md'>
              <div className='w-full h-full flex flex-col gap-1 items-center justify-center'>
              <h1 className='font-semibold text-[19px] text-light-error dark:text-dark-error'>Đã được đặt</h1> 
              {getTimeLoading ? <div>00:00:00</div>: <TimeIntervalCountDown reservationStartTime={reservationDetail.startTime}/>} 
              </div>
              </div> 
          </DialogTrigger>
          <DialogContent className="bg-light-bg_2 dark:bg-dark-bg_2 text-light-text dark:text-dark-text">
            <DialogHeader>
              <DialogTitle className='text-light-textSoft dark:text-dark-textSoft font-normal'>
               Bạn có chắc muốn đặt 1 bàn hiện tại không? 
              </DialogTitle>
              <div className='flex items-center gap-2 py-2 text-light-textSoft dark:text-dark-textSoft font-normal'>
               Book gần nhất:
              <div className='text-light-text dark:text-dark-text'>
              {getTimeLoading ? <div>00:00:00</div>: <TimeIntervalCountDown reservationStartTime={reservationDetail.startTime}/>} 
              </div>
              </div>
            </DialogHeader>
            <div className="flex items-center justify-end py-2 gap-5">
              <DialogClose asChild>
                <Button
                 className="bg-light-error dark:bg-dark-error hover:bg-light-error dark:hover:bg-dark-error 
              text-white dark:text-white hover:scale-90 transition-all ease-in"
                >
                  Đóng
                </Button>
              </DialogClose>

              {
                reservationId && type == "RESELECT" ? (
                <DialogClose asChild>
                <Button
                onClick={()=> updateReservation(reservationId, type, table._id)}
                className="bg-light-success dark:bg-dark-success hover:bg-light-success dark:hover:bg-dark-success 
                text-white dark:text-white hover:scale-90 transition-all ease-in"
                >
                  Choose table
                </Button>
              </DialogClose>
                ) : (
              <DialogClose>
              <Button
                onClick={()=>handleSelectTable(table._id)}
                className="bg-light-success dark:bg-dark-success hover:bg-light-success dark:hover:bg-dark-success 
                text-white dark:text-white hover:scale-90 transition-all ease-in"
              >
                Ok
              </Button>
              </DialogClose>
                )
              }

              
            </div>
          </DialogContent>
        </Dialog>
          )
        } 
        </>
      )
    }
    </div>
  )
}

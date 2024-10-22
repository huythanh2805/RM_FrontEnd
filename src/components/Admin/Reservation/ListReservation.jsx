import React, { useEffect, useState } from "react"

import { FadeLoader } from "react-spinners"
import { useNavigate } from "react-router-dom"
import { toast } from "@/hooks/use-toast"
import { ServerUrl } from "@/utilities/utils"
import { ReservationColumn } from "./dataTable/ReserColumn"
import { ReserDataTable } from "./dataTable/ReserDataTable"
import { updateData } from "@/hooks/useFetchData"

export default function ListReservation() {
  const [reservations, setReservations] = useState([])
  const [unChangedReservations, setUnChangedReservations] = useState([])
  const [loading, setLoading] = useState(false)
  const [dateValidation, setDateValidation] = useState()
  const router = useNavigate()

  // Get All reservation
  useEffect(() => {
    const fetData = async () => {
      setLoading(true)
      try {
        const res = await fetch(ServerUrl+"/api/reservations", {
          method: "GET",
        })
        if (!res.ok) {
          return toast({
            variant: "destructive",
            title: "Can't get any data for reservations!",
          })
        }
        const data = await res.json()
        setReservations(data.reservations)
        setUnChangedReservations(data.reservations)
        setLoading(false)
      } catch (error) {
        console.log({error})
        setLoading(false)
        toast({
          variant: "destructive",
          title: "Something wrong with get all reservations!",
        })
      }
    }
    fetData()
  }, [])
//   Delete selected row
  const handleDeleteDishes = async (IdArray) => {
    //  There are two way to delete rows, 1: at DataTable component will task delete selected rows, 2: at Column component will task delete specific row
    // All will be converted to string ids array
    if (IdArray.length <= 0) {
      toast({
        variant: "destructive",
        title: "There is no selected item",
      })
      return
    }
    try {
      const res = await fetch(ServerUrl+"/api/reservations", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({IdArray}),
      })
      if (!res.ok) {
        return toast({
          variant: "destructive",
          title: "Can't delete, server might be cracked",
        })
      }
      toast({
        variant: "sucess",
        title: "Successfully!",
      })
      const newReservations = reservations?.filter(
        (item) => !IdArray.includes(item._id)
      )
      setReservations(newReservations)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something wrong with delete dishes",
      })
    }
  }
//   Data validate 
 const handleDateValidation = async (date) => {
    // update dateValidation
    setDateValidation(date)
    console.log(new Date(date))
    // update reservation
    setReservations(
         unChangedReservations.filter((reservation) => {
            const startTime = new Date(reservation.startTime);
            const selectedDate = new Date(date);
        
            // Kiểm tra cùng ngày
            const isSameDay =
              startTime.getFullYear() === selectedDate.getFullYear() &&
              startTime.getMonth() === selectedDate.getMonth() &&
              startTime.getDate() === selectedDate.getDate();
        
            // Kiểm tra startTime lớn hơn thời gian của date, và không vượt quá 23:59
            const isWithinTime =
              startTime.getTime() >= selectedDate.getTime() &&
              startTime.getTime() <= new Date(selectedDate.setHours(23, 59, 59, 999)).getTime();
        
            return isSameDay && isWithinTime;
          })
    )
  }
  const resetDateValidate = ()=>{
    setReservations(unChangedReservations)
    setDateValidation(null)
  }
// Update Table_id for reservation
  const updateTable = (reservationId)=>{
   router(`/dashboard/tables/${reservationId}?type=RESELECT`)
  }
// select Table_id for reservation
  const selectTable = (reservationId)=>{
   router(`/dashboard/tables/${reservationId}?type=SELECT`)
  }
// confirm reservation
  const confirmReser = async (reservationId)=>{
    const data = await updateData(`${ServerUrl}/api/reservations/${reservationId}`, {status: "ISCOMFIRMED"})
    if(data.success){
      toast({
        variant: "sucess",
        title: "Confirmed reservation successfully!",
      })
      return setReservations(currentData=>(
        [...currentData.map(item=> item._id === reservationId ? {...item, status: "ISCOMFIRMED" } : item)]
      ))
    }else{
      toast({
        variant: "destructive",
        title: "Something wrong!",
      })
    }
  }
// Cancel reservation
  const cancelReser = async (reservationId)=>{
    const data = await updateData(`${ServerUrl}/api/reservations/${reservationId}`, {status: "CANCELED"})
    if(data.success){
      toast({
        variant: "sucess",
        title: "Cancel reservation successfully!",
      })
      return setReservations(currentData=>(
        [...currentData.map(item=> item._id === reservationId ? {...item, status: "CANCELED" } : item)]
      ))
    }else{
      toast({
        variant: "destructive",
        title: "Something wrong!",
      })
    }
  }

  return (
    <div>
      {loading && (
        <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center">
          <FadeLoader
            color={"#11cdef"}
            loading={loading}
          />
        </div>
      )}
      {!loading && reservations && (
        <ReserDataTable
          columns={ReservationColumn({
            updateTable,
            selectTable,
            confirmReser,
            cancelReser
          })}
          data={reservations}
          onDelete={handleDeleteDishes}
          dateValidation={dateValidation}
          handleDateValidation={handleDateValidation}
          resetDateValidate={resetDateValidate}
        />
      )}
    </div>
  )
}

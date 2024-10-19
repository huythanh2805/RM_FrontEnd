import React, { useEffect, useState } from "react"
import { FadeLoader } from "react-spinners"
import { useParams } from "react-router-dom"
import ReservationForm from "./ReservationForm"
import { toast } from "@/hooks/use-toast"

export default function CreateReservation() {

  let { tableId } = useParams();
  const [loading, setLoading] = useState(false)
  const [numberOfSeats, setNumberOfSeats] = useState()

  useEffect(() => {
    const fetData = async () => {
      setLoading(true)
      try {
        const res = await fetch("/api/reservations/tables/" + tableId, {
          method: "GET",
        })

        if (!res.ok) {
          return toast({
            variant: "destructive",
            title: "Can't get table detail!",
          })
        }
        const data = await res.json()
        const table = data.table 
        setNumberOfSeats(table.number_of_seats)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        toast({
          variant: "destructive",
          title: "Something wrong with get detail table in create reservation!",
        })
      }
    }
    fetData()
  }, [])
  return (
    <div className="flex flex-col xl:flex-row gap-5 w-full h-full pb-[80px]">
      <div className="w-full bg-light-bg_2 dark:bg-dark-bg_2 rounded-md flex justify-start">
        <div className="w-full lg:w-1/2 px-3 py-4 md:px-6 md:py-6">
          {loading && (
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
              <FadeLoader
                color={"#11cdef"}
                loading={loading}
              />
            </div>
          )}
          {!loading && tableId && numberOfSeats && (
            <ReservationForm
              tableId={tableId}
              numberOfSeats={numberOfSeats}
            />
          )}
        </div>
      </div>
    </div>
  )
}

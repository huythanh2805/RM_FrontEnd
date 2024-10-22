import { FadeLoader } from "react-spinners"
import ReservationForm from "./ReservationForm"
import { useParams } from "react-router-dom"
import { ServerUrl } from "@/utilities/utils"
import { useEffect, useState } from "react"


export default function UpdateReservation() {
  const { reservationId: reservation_id } = useParams()
  const [reservation, setReservation] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetData = async () => {
      setLoading(true)
      try {
        const res = await fetch(ServerUrl+"/api/reservations/" + reservation_id, {
            method: "GET",
          }
        )
        if (!res.ok) return
        const data = await res.json()
        setReservation(data)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
        toast({
          variant: "destructive",
          title: "Something wrong with get detail reservation!",
        })
      }
    }
    fetData()
  }, [reservation_id])

console.log(reservation)
  return (
    <div className="flex flex-col xl:flex-row gap-5 w-full h-full pb-[80px]">
      <div className="w-full bg-light-bg_2 dark:bg-dark-bg_2 rounded-md flex justify-start">
        {loading && (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <FadeLoader
              color={"#11cdef"}
              loading={loading}
            />
          </div>
        )}
        <div className="w-full lg:w-1/2 px-3 py-4 md:px-6 md:py-6">
          {reservation && !loading && (
            <ReservationForm
              reservation={reservation}
              numberOfSeats={reservation.table_id.number_of_seats}
            />
          )}
        </div>
      </div>
    </div>
  )
}

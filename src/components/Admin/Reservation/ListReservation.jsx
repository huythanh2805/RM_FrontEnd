import React, { useEffect, useState } from "react"

import { FadeLoader } from "react-spinners"
import { useNavigate } from "react-router-dom"
import { toast } from "@/hooks/use-toast"
import { ServerUrl } from "@/utilities/utils"
import { ReservationColumn } from "./dataTable/ReserColumn"
import { ReserDataTable } from "./dataTable/ReserDataTable"

export default function ListReservation() {
  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(false)
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
  console.log({reservations})
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
            reservations,
          })}
          data={reservations}
        />
      )}
    </div>
  )
}

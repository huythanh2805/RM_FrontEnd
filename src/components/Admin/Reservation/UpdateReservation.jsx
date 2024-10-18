import { FadeLoader } from "react-spinners"
import ReservationForm from "./ReservationForm"


export default function CreateReservation() {
  const { id: table_id } = params
  const [reservation, setReservation] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetData = async () => {
      setLoading(true)
      try {
        const res = await fetch(
          "/api/reservations/seatedReservation/" + table_id,
          {
            method: "GET",
          }
        )
        if (!res.ok) return
        const data = await res.json()
        const reser = data.reservationDetail
        setReservation(reser)
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
  }, [table_id])

  return (
    <div className="flex flex-col xl:flex-row gap-5 w-full h-full pb-[80px]">
      <div className="w-full bg-light-bg_2 dark:bg-dark-bg_2 rounded-md flex justify-start">
        {loading && (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <FadeLoader
              color={sideBarColor ? sideBarColor : "#11cdef"}
              loading={loading}
            />
          </div>
        )}
        <div className="w-full lg:w-1/2 px-3 py-4 md:px-6 md:py-6">
          {reservation && !loading && (
            <ReservationForm
              reservation={reservation}
              table_id={table_id}
              numberOfSeats={reservation.table_id.number_of_seats}
            />
          )}
        </div>
      </div>
    </div>
  )
}

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetchData } from "@/hooks/useFetchData";
import AdminMenu from "./AdminMenu";
import Calculator from "./Calculator";
import { toast } from "@/hooks/use-toast";

export default function FoodOrder() {
  const { reservationId } = useParams()
  const [orderedFoods, setOrderedFoods] = useState([])
  const [loading, setLoading] = useState(false)

  // Get all dishes and categories
  const { data: dishes, loading: dishLoading } = useFetchData("/api/inventories/dishes")
  const { data: categories, loading: categoryLoading } = useFetchData("/api/inventories/categories")

  //  Get ordered food for reservation
  useEffect(() => {
    const fetData = async () => {
      setLoading(false)
      const res = await fetch('/api/reservations/orderedFood/getAllFoodByReservationId/' + reservationId, {
        method: "GET"
      })
      const data = await res.json() 
      if (!res.ok) {
        toast({
          variant: "destructive",
          title: "Can't get any data for ordered dishes!",
        })
      }
      setOrderedFoods(data)
    }
    fetData()
  }, [reservationId])

  const deleteOrderedFood = async (orderedFood_id) => {
    const res = await fetch('/api/reservations/orderedFood/' + orderedFood_id, {
      method: "DELETE",
    })
    const data = await res.json()
    if (!res.ok) return null
    return { res, data }
  }
  const updateOrderedFood = async (orderedFood_id, quantity) => {
    const res = await fetch('/api/reservations/orderedFood/' + orderedFood_id, {
      method: "PATCH",
      body: JSON.stringify({ quantity: quantity })
    })
    const data = await res.json()
    if (!res.ok) return null
    return data.orderedFood
  }



  return (
    <div className="px-3 md:px-5 py-2 md:py-4 flex flex-col xl:flex-row gap-5 w-full h-full pb-[80px]">
      <div className="flex-[2] bg-light-bg_2 dark:bg-dark-bg_2 rounded-md">
        {
          dishes && categories && (
            <AdminMenu
              dishes={dishes}
              categories={categories}
              reservation_id={reservationId}
              orderedFoods={orderedFoods}
              setOrderedFoods={setOrderedFoods}
              deleteOrderedFood={deleteOrderedFood}
            />
          )
        }
      </div>
      <div className="flex-[1] bg-light-bg_2 dark:bg-dark-bg_2 rounded-md">
        {
          dishes && categories && (
            <Calculator
              dishes={dishes}
              categories={categories}
              reservation_id={reservationId}
              orderedFoods={orderedFoods}
              setOrderedFoods={setOrderedFoods}
              deleteOrderedFood={deleteOrderedFood}
              updateOrderedFood={updateOrderedFood}
            />
          )
        }
      </div>
    </div>
  )
}
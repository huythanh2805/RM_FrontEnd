import { toast } from "@/hooks/use-toast";
import { useFetchData } from "@/hooks/useFetchData";
import { ServerUrl } from "@/utilities/utils";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminMenu from "./AdminMenu";
import Calculator from "./Calculator";

export default function FoodOrder() {
  const { reservationId } = useParams();
  const [orderedFoods, setOrderedFoods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [newCategories, setNewCategories] = useState([])
  // Get all dishes and categories
  const { data: combos, loading: comboloading } = useFetchData(ServerUrl + "/api/orderedCombo");
  const { data: dishes, loading: dishLoading } = useFetchData(ServerUrl + "/dishes");
  const { data: categories, loading: categoryLoading } = useFetchData(ServerUrl + "/categories");
  const { data: discount, loading: discountLoading } = useFetchData(
    ServerUrl + "/api/userDiscount/reservation/" + reservationId
  );
  const { data: reservationDetail, loading: reservationDetailLoading } = useFetchData(
    ServerUrl + "/api/reservations/" + reservationId
  );

  useEffect(() => {
    if (!dishes) return;
    if (combos) setProducts((pre) => [...pre, ...combos.map((combo) => ({ ...combo, type: "combo" }))]);
  }, [combos, dishes]);
  useEffect(() => {
    if (dishes) setProducts((pre) => [...pre, ...dishes.map((dish) => ({ ...dish, type: "dish" }))]);
  }, [dishes]);
  useEffect(() => {
    if (products) setProducts(pre => ([...pre.filter(item => item.isShow === true)]))
  }, [combos, dishes]);
  useEffect(() => {
    if (categories) setNewCategories(pre => ([...categories.filter(item => item.isShow === true)]))
  }, [categories]);
  //  Get ordered food for reservation
  useEffect(() => {
    if (!reservationId) return;
    const fetData = async () => {
      setLoading(false);
      const res = await fetch(ServerUrl + "/api/orderedFood/" + reservationId, {
        method: "GET",
      });
      const data = await res.json();
      if (!res.ok) {
        toast({
          variant: "destructive",
          title: "Can't get any data for ordered dishes!",
        });
      }
      setOrderedFoods(data);
    };
    fetData();
  }, [reservationId]);

  const deleteOrderedFood = async (orderedFood_id) => {
    const res = await fetch(ServerUrl + "/api/orderedFood/" + orderedFood_id + "/" + reservationId, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!res.ok) return null;
    return { res, data };
  };
  const deletedOrderedCombo = async (orderedFood_id) => {
    const res = await fetch(ServerUrl + "/api/orderedCombo/" + orderedFood_id + "/" + reservationId, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!res.ok) return null;
    return { res, data };
  };
  const updateOrderedFood = async (orderedFood_id, quantity, type) => {
    const url =
      type === "combo"
        ? ServerUrl + "/api/orderedCombo/" + orderedFood_id
        : ServerUrl + "/api/orderedFood/" + orderedFood_id;
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify({ quantity: quantity }),
    });
    const data = await res.json();
    if (!res.ok) return null;
    return data.orderedFood;
  };
  return (
    <div className="px-3 md:px-5 py-2 md:py-4 flex flex-col xl:flex-row gap-5 w-full h-full pb-[80px]">
      <div className="flex-[2] bg-light-bg_2 dark:bg-dark-bg_2 rounded-md">
        {categories && dishes && (
          <AdminMenu
            products={products}
            dishes={dishes}
            combos={combos}
            categories={newCategories}
            reservation_id={reservationId}
            orderedFoods={orderedFoods}
            setOrderedFoods={setOrderedFoods}
            deleteOrderedFood={deleteOrderedFood}
            updateOrderedFood={updateOrderedFood}
          />
        )}
      </div>
      <div className="flex-[1] bg-light-bg_2 dark:bg-dark-bg_2 rounded-md">
        {categories && dishes && (
          <Calculator
            dishes={dishes}
            categories={newCategories}
            reservation_id={reservationId}
            orderedFoods={orderedFoods}
            setOrderedFoods={setOrderedFoods}
            deleteOrderedFood={deleteOrderedFood}
            deletedOrderedCombo={deletedOrderedCombo}
            updateOrderedFood={updateOrderedFood}
            userDiscount={discount}
          />
        )}
      </div>
    </div>
  );
}

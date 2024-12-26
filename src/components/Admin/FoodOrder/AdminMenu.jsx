import { Check } from 'lucide-react'
import React, { useCallback, useMemo, useState } from 'react'
import { cn } from '@/lib/utils'
import { ServerUrl } from '@/utilities/utils'
import MenuItem from '@/pages/MenuItem'
import _ from "lodash";
import jwtDecode from 'jwt-decode'

 const AdminMenu =({ products ,dishes,combos, categories, reservation_id, orderedFoods, setOrderedFoods, deleteOrderedFood, updateOrderedFood})=>{
    const [activedLink, setActiveLink] = useState('all')
      const [decodedToken, setDecodeToken] = useState(()=>{
        const token = localStorage.getItem('token')
        return jwtDecode(token)
      })
    // choose dish depend on category id
    const categoryDishes = useMemo(()=>{

         if(activedLink === 'combo'){
          return products.filter(item=>item.type === 'combo')
          }
         if(activedLink === 'all'){
          return products

         }else if(products){
          return [...products?.filter(item=> (item?.type === 'dish' &&  item.category_id._id === activedLink))]
         } 
    },[activedLink , products])
    const addOrderedFood = async (reservation_id ,dish_id, type)=>{
      const url = type === 'combo' ? ServerUrl+'/api/orderedCombo' : ServerUrl+'/api/orderedFood'
      const res = await fetch(url,{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({dish_id, reservation_id, user_id: decodedToken.id})
      })
      const data = await res.json()
      if(!res.ok) return null
      return data.orderedFood
    }
    const hanleChooseDish = async (dish)=>{
      const {_id: dish_id} = dish
      try {
      //   let existedOrderedFood
      //    dish.type === 'combo' ? existedOrderedFood = orderedFoods.find(orderedFood => orderedFood.dish_id._id === dish.dish_id._id):
      //    existedOrderedFood = orderedFoods.find(item => item.dish_id._id === dish_id)
      // if(existedOrderedFood){
      //   if(reservation_id) await updateOrderedFood(existedOrderedFood._id, existedOrderedFood.quantity + 1, dish.type)
      //   setOrderedFoods(pre=> [...pre.map(item=> item._id === existedOrderedFood._id ? {...item, quantity: item.quantity + 1} : item )]) 
      // }else{

        if(reservation_id) {
          const newOrderedFood = await addOrderedFood(reservation_id, dish_id, dish.type)
          dish.type === 'combo' ? setOrderedFoods(pre => [...pre, {...newOrderedFood}]):
          setOrderedFoods(pre => [...pre, {...newOrderedFood}])
        }else{
          dish.type === 'combo' ? setOrderedFoods(pre => [...pre, {...dish, quantity: 1, status: "ORDERED"} ]):
          setOrderedFoods(pre => [...pre, {...dish, quantity: 1, status: "ORDERED", dish_id: {_id: dish._id }}])
        }

      // }
      } catch (error) {
        console.log(error)
      }
    }
  return (
    <div className='w-full'>
       <div className='hidden xl:block'>
        <div className='xl:flex  items-center justify-center h-full'>
           <div 
             onClick={()=>setActiveLink("all")}
             className={cn(
                'w-full px-3 py-2 rounded-md cursor-pointer text-center text-[19px]',
                activedLink === 'all' ? 'w-full transition-all duration-500 hover:translate-y-[-2%] hover:opacity-75 bg-gradient-to-r from-[#ef5b11] to-[#ef6a11] text-white dark:text-white overflow-hidden' 
                : ''
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
                'w-full px-3 py-2 rounded-md cursor-pointer text-center text-[19px] ',
                 activedLink === item._id ? 'w-full transition-all duration-500 hover:translate-y-[-2%] hover:opacity-75 bg-gradient-to-r from-[#ef5b11] to-[#ef6a11] text-white dark:text-white overflow-hidden'
                 : ''
             )}
            >
                {item.name}
            </div>
           ))
        }
        <div 
             onClick={()=>setActiveLink("combo")}
             className={cn(
                'w-full px-3 py-2 rounded-md cursor-pointer text-center text-[19px]',
                activedLink === 'combo' ? 'w-full transition-all duration-500 hover:translate-y-[-2%] hover:opacity-75 bg-gradient-to-r from-[#ef5b11] to-[#ef6a11] text-white dark:text-white overflow-hidden' 
                : ''
             )}
           >
              Combo
           </div>

        </div>
       </div>
       <div className='w-full pt-5 grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-x-6 gap-y-4 auto-rows-max'>
       {
        categoryDishes?.map(item=>( 
          <MenuItem item={item} onCLick={hanleChooseDish} />
        ))
       }
       </div>
    </div>
  )
}
export default AdminMenu
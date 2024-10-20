import { Check } from 'lucide-react'
import React, { useMemo, useState } from 'react'
import { cn } from '@/lib/utils'
import { ServerUrl } from '@/utilities/utils'


 const AdminMenu =({dishes, categories, reservation_id, orderedFoods, setOrderedFoods, deleteOrderedFood})=>{
    const [activedLink, setActiveLink] = useState('all')
    // choose dish depend on category id
    const categoryDishes = useMemo(()=>{
         if(activedLink === 'all'){
          return dishes
         }else if(dishes){
          return [...dishes?.filter(dish=> dish.category_id === activedLink)]
         }
    },[activedLink])
  
    const addOrderedFood = async (reservation_id ,dish_id)=>{
      const res = await fetch(ServerUrl+'/api/orderedFood',{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({dish_id, reservation_id})
      })
      const data = await res.json()
      if(!res.ok) return null
      return data.orderedFood
    }

    const hanleChooseDish = async (dish_id)=>{
      try {
      const existedOrderedFood = orderedFoods.find(item => item.dish_id._id === dish_id)
      if(existedOrderedFood){
        const {res, data} = await deleteOrderedFood(existedOrderedFood._id)
        if(res.status === 201 && data.message === "Successfully" && setOrderedFoods)
        setOrderedFoods(pre=> [...pre.filter(item=> item._id !== existedOrderedFood?._id)]) 
      }else{
       const addedFood = await addOrderedFood(reservation_id, dish_id)
       if( addedFood && setOrderedFoods) setOrderedFoods(pre => [...pre, addedFood])
      }
      } catch (error) {
        console.log(error)
      }
    }
    console.log(orderedFoods);
    console.log(categoryDishes)
  return (
    <div className='px-3 py-4 grid grid-cols-2  [grid-auto-rows:200px] md:grid-cols-3 xl:grid-cols-4 gap-3'>
       <div className='hidden xl:block col-span-1 row-span-2 px-3 py-4'>
        <div className='xl:flex flex-col items-center justify-center h-full'>
           <div 
             onClick={()=>setActiveLink("all")}
             className={cn(
                'w-full px-3 py-4 rounded-md cursor-pointer',
                activedLink === 'all' ? 'bg-dark-bg text-white' : ''
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
                'w-full px-3 py-4 rounded-md cursor-pointer',
                activedLink === item._id ? 'bg-dark-bg text-white' : ''
             )}
            >
                {item.name}
            </div>
           ))
        }
        </div>
       </div>
       {
        categoryDishes?.map(dish=>
          <div 
           key={dish._id}
           onClick={()=>hanleChooseDish(dish._id)}
           className='relative rounded-md overflow-hidden cursor-pointer hover:scale-95 transition-transform duration-200 ease-in'
          >
            <img 
            src={dish.images[0]}
            alt={dish.name}
            className='w-full h-full object-cover relative'
             />
            <h2 className='absolute z-20 left-0 bottom-0 w-full h-[50px] flex items-center justify-center bg-blur_bg text-white'>{dish.name}</h2>

            <div className={`absolute z-20 right-0 top-0 w-[45px] h-[45px] flex items-center justify-center bg-blur_bg text-white rounded-md 
               ${orderedFoods.find(orderedFood => orderedFood.dish_id._id === dish._id ) ? 'block' : 'hidden'}`}>
              <Check width={35} height={35} className='font-extrabold text-light-success dark:text-dark-success' />
            </div>

            

          </div>
        )
       }
    </div>
  )
}
export default AdminMenu
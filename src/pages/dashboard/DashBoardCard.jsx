import React, { useEffect, useState } from 'react'
import { FaArrowDown, FaArrowUp, FaMoneyBillAlt } from 'react-icons/fa'
import DashBoardCardChart from './charts/DashBoardCardChart'
import { cn } from '@/lib/utils'

function DashBoardCard({title, value, icon, data, type, month}) {
  const [modifiedData, setModifiedData] = useState([])
  const [isUp, setIsUp] = useState(true)
   useEffect(()=>{
    if(!data || data.length == 0) return
    switch (type) {
      case 'revenue':
        setModifiedData(data.map(item=>({day: item.day, value: item.total_money})))
        // Xem số liệu gần đây tăng hay giảm
        const threeDatesBofore = data.reduce((sum, item, index)=> {
          if(index >= data.length - 5){
            sum+= item.total_money
          }
          return sum
        } , 0)
        const sixDatesBofore = data.reduce((sum, item, index)=> {
          if(index < data.length - 5 && index >= data.length -10){
            sum+= item.total_money
          }
          return sum
        } , 0)
        if(threeDatesBofore < sixDatesBofore) setIsUp(false)
        break;
      case 'toalReser':
       setModifiedData(data.map(item=>({day: item.day, value: (item.completed + item.canceled)})))
          // Xem số liệu gần đây tăng hay giảm
          const threeDatesBoforeToltal = data.reduce((sum, item, index)=> {
            if(index >= data.length - 5){
              sum+= (item.completed + item.canceled)
            }
            return sum
          } , 0)
          const sixDatesBoforeToltal = data.reduce((sum, item, index)=> {
            if(index < data.length - 5 && index >= data.length -10){
              sum+= (item.completed + item.canceled)
            }
            return sum
          } , 0)
          if(threeDatesBoforeToltal < sixDatesBoforeToltal) setIsUp(false)
        break;
      case 'successReser':
       setModifiedData(data.map(item=>({day: item.day, value: item.completed})))
        // Xem số liệu gần đây tăng hay giảm
        const threeDatesBoforeSuccess = data.reduce((sum, item, index)=> {
          if(index >= data.length - 5){
            sum+= item.completed
          }
          return sum
        } , 0)
        const sixDatesBoforeSuccess = data.reduce((sum, item, index)=> {
          if(index < data.length - 5 && index >= data.length - 10){
            sum+= item.completed
          }
          return sum
        } , 0)
        if(threeDatesBoforeSuccess < sixDatesBoforeSuccess) setIsUp(false)
        break;
      case 'canceledReser':
       setModifiedData(data.map(item=>({day: item.day, value: item.canceled})))
        // Xem số liệu gần đây tăng hay giảm
        const threeDatesBoforeatesBoforeCancel = data.reduce((sum, item, index)=> {
          if(index >= data.length - 5){
            sum+= item.canceled
          }
          return sum
        } , 0)
        const sixDatesBoforeatesBoforeCancel = data.reduce((sum, item, index)=> {
          if(index < data.length - 5 && index >= data.length -10){
            sum+= item.canceled
          }
          return sum
        } , 0)
        if(threeDatesBoforeatesBoforeCancel < sixDatesBoforeatesBoforeCancel) setIsUp(false)
        break;
    
      default:
        break;
    }
    
   }, [data , month])
  return (
    <div className="relative rounded-lg border border-gray-300 bg-white py-6  shadow-lg hover:shadow-xl transition-shadow">
      <div className="px-6">
         {icon}
        <div className="mt-6 flex items-end justify-between">
          <div>
            <h4 className="text-xl font-bold text-gray-800 dark:text-white">
              {value}
            </h4>
            <span className="text-sm font-medium text-gray-500">
              {title}
            </span>
          </div>
          <span className={cn(
            "flex items-center gap-1 text-xl font-medium",
            isUp ? 'text-green-1' : 'text-red-1'
          )}>
            {
             isUp ?
             <FaArrowUp /> : 
             <FaArrowDown />
            } 
          </span>
        </div>
      </div>

      <div className="absolute top-3 right-4">
        <div className="w-16 h-10">
          <DashBoardCardChart modifiedData={modifiedData} />
        </div>
      </div>
      
    </div>
  )
}

export default DashBoardCard
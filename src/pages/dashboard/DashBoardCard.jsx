import React from 'react'
import { FaArrowUp, FaMoneyBillAlt } from 'react-icons/fa'
import DashBoardCardChart from './charts/DashBoardCardChart'

function DashBoardCard({title, value, icon}) {
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
          <span className="flex items-center gap-1 text-sm font-medium text-green-600">
            42% <FaArrowUp />
          </span>
        </div>
      </div>

      <div className="absolute top-3 right-4">
        <div className="w-16 h-10">
          <DashBoardCardChart/>
        </div>
      </div>
      
    </div>
  )
}

export default DashBoardCard
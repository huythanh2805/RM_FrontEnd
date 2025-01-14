import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import DashBoardCardChart from './charts/DashBoardCardChart';

function DashBoardCard({ title, value, icon, data, type, month }) {
  const gradients = {
    revenue: "from-blue-50 to-blue-100 border-blue-200",
    toalReser: "from-purple-50 to-pink-100 border-pink-200",
    successReser: "from-teal-50 to-emerald-100 border-emerald-200",
    canceledReser: "from-orange-50 to-amber-100 border-amber-200"
  };
  const [modifiedData, setModifiedData] = useState([])
  const [isUp, setIsUp] = useState(true)
  useEffect(() => {
    if (!data || data.length == 0) return
    switch (type) {
      case 'revenue':
        setModifiedData(data.map(item => ({ day: item.day, value: item.total_money })))
        // Xem số liệu gần đây tăng hay giảm
        const threeDatesBofore = data.reduce((sum, item, index) => {
          if (index >= data.length - 5) {
            sum += item.total_money
          }
          return sum
        }, 0)
        const sixDatesBofore = data.reduce((sum, item, index) => {
          if (index < data.length - 5 && index >= data.length - 10) {
            sum += item.total_money
          }
          return sum
        }, 0)
        if (threeDatesBofore < sixDatesBofore) setIsUp(false)
        break;
      case 'toalReser':
        setModifiedData(data.map(item => ({ day: item.day, value: (item.completed + item.canceled) })))
        // Xem số liệu gần đây tăng hay giảm
        const threeDatesBoforeToltal = data.reduce((sum, item, index) => {
          if (index >= data.length - 5) {
            sum += (item.completed + item.canceled)
          }
          return sum
        }, 0)
        const sixDatesBoforeToltal = data.reduce((sum, item, index) => {
          if (index < data.length - 5 && index >= data.length - 10) {
            sum += (item.completed + item.canceled)
          }
          return sum
        }, 0)
        if (threeDatesBoforeToltal < sixDatesBoforeToltal) setIsUp(false)
        break;
      case 'successReser':
        setModifiedData(data.map(item => ({ day: item.day, value: item.completed })))
        // Xem số liệu gần đây tăng hay giảm
        const threeDatesBoforeSuccess = data.reduce((sum, item, index) => {
          if (index >= data.length - 5) {
            sum += item.completed
          }
          return sum
        }, 0)
        const sixDatesBoforeSuccess = data.reduce((sum, item, index) => {
          if (index < data.length - 5 && index >= data.length - 10) {
            sum += item.completed
          }
          return sum
        }, 0)
        if (threeDatesBoforeSuccess < sixDatesBoforeSuccess) setIsUp(false)
        break;
      case 'canceledReser':
        setModifiedData(data.map(item => ({ day: item.day, value: item.canceled })))
        // Xem số liệu gần đây tăng hay giảm
        const threeDatesBoforeatesBoforeCancel = data.reduce((sum, item, index) => {
          if (index >= data.length - 5) {
            sum += item.canceled
          }
          return sum
        }, 0)
        const sixDatesBoforeatesBoforeCancel = data.reduce((sum, item, index) => {
          if (index < data.length - 5 && index >= data.length - 10) {
            sum += item.canceled
          }
          return sum
        }, 0)
        if (threeDatesBoforeatesBoforeCancel < sixDatesBoforeatesBoforeCancel) setIsUp(false)
        break;

      default:
        break;
    }

  }, [data, month])
  return (
    <div className={`relative rounded-xl border bg-gradient-to-br ${gradients[type]} p-6 shadow-sm transition-all duration-200 hover:shadow-md hover:scale-[1.02]`}>
      {/* Icon Section */}
      <div className="flex items-start justify-between">
        <div className="rounded-lg p-2 backdrop-blur-sm bg-white/30">
          {icon}
        </div>
        <div className="w-20 h-12">
          <DashBoardCardChart modifiedData={modifiedData} />
        </div>
      </div>

      {/* Content Section */}
      <div className="mt-4">
        <div className="flex items-baseline justify-between">
          <h4 className="text-2xl font-bold text-gray-800">
            {value}
          </h4>
          <span className={cn(
            "flex items-center gap-1 text-lg font-medium rounded-full px-2 py-0.5",
            isUp ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'
          )}>
            {isUp ? <FaArrowUp size={14} /> : <FaArrowDown size={14} />}
            {isUp ? '+12%' : '-8%'}
          </span>
        </div>
        <span className="mt-1 block text-sm font-medium text-gray-500">
          {title}
        </span>
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 rounded-xl transition-colors duration-200 group-hover:bg-black/[0.02]" />
    </div>
  )
}

export default DashBoardCard
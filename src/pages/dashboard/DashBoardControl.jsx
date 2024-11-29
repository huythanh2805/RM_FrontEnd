import React, { useEffect, useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import DatePicker from "react-datepicker"
function DashBoardControl() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [months, setMonths] = useState(new Date().getMonth() + 1)
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1)
  console.log({selectedMonth})
  useEffect(()=>{
    const currentYear = new Date().getFullYear();

    const selectedYear = new Date(selectedDate).getFullYear()

    if(selectedYear === currentYear){
        setMonths(new Date().getMonth() + 1)
    }else if(selectedYear < currentYear){
        setMonths(12)
    }else if(selectedYear > currentYear){
        setMonths(0)
    }

  },[selectedDate])
  return (
    <div className="flex items-center gap-5">
      <div>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          showYearPicker
          dateFormat="yyyy"
          placeholderText="Chọn năm"
          className="border px-3 py-2 rounded focus-within:border-none"
        />
      </div>
      <div>
        <Select value={selectedMonth} onValueChange={setSelectedMonth}>
          <SelectTrigger className="w-[120px] focus-within:border-none focus:ring-0">
            <SelectValue
              placeholder={`Tháng ${selectedMonth}`}
              className="focus-within:border-none focus:ring-0"
            />
          </SelectTrigger>
          <SelectContent className="focus-within:border-none">
           {
            ([...Array(months).keys()].map(item=>(
                <SelectItem key={item} value={item + 1}>Tháng {item + 1}</SelectItem>
            )))
           }
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

export default DashBoardControl

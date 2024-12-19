import React, { useEffect, useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import DatePicker from "react-datepicker"
function DashBoardControl({ startDate, setStartDate, endDate, setEndDate }) {
  return (
    <div className="flex items-center gap-5">
      <div className="max-w-fit">
      <DatePicker
          className="w-full bg-light-bg dark:bg-dark-bg focus:outline-none px-3 py-2 border border-gray-200 dark:border-gray-800 rounded-md focus:border-b-blue-1"
          placeholderText="Chọn ngày"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat={"dd/MM/yyyy"}
        />
      </div>
      <div className="max-w-fit">
        <DatePicker
          className="w-full bg-light-bg dark:bg-dark-bg focus:outline-none px-3 py-2 border border-gray-200 dark:border-gray-800 rounded-md  focus:border-b-blue-1"
          placeholderText="Chọn ngày"
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          dateFormat={"dd/MM/yyyy"}
        />
      </div>
    </div>
  )
}

export default DashBoardControl

import { CalendarRange } from "lucide-react"
import { Input } from "@/components/ui/input";

function DashBoardControl({ startDate, setStartDate, endDate, setEndDate }) {
  return (
    <div className="flex items-center gap-5">
      <div className="relative">
        <Input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="pl-10"
        />
        <CalendarRange className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
      </div>

      <div className="relative">
        <Input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="pl-10"
        />
        <CalendarRange className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
      </div>
    </div>
  )
}

export default DashBoardControl

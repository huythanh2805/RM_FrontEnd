import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from "@/components/ui/chart"
// const chartData = [
//   { month: "January", desktop: 186, mobile: 80 },
//   { month: "February", desktop: 305, mobile: 200 },
//   { month: "March", desktop: 237, mobile: 120 },
//   { month: "April", desktop: 73, mobile: 190 },
//   { month: "May", desktop: 209, mobile: 130 },
//   { month: "June", desktop: 214, mobile: 140 },
//   { month: "June", desktop: 214, mobile: 140 },
//   { month: "June", desktop: 214, mobile: 140 },
//   { month: "January", desktop: 186, mobile: 80 },
//   { month: "February", desktop: 305, mobile: 200 },
//   { month: "March", desktop: 237, mobile: 120 },
//   { month: "April", desktop: 73, mobile: 190 },
//   { month: "May", desktop: 209, mobile: 130 },
//   { month: "June", desktop: 214, mobile: 140 },
//   { month: "June", desktop: 214, mobile: 140 },
//   { month: "June", desktop: 214, mobile: 140 },
//   { month: "January", desktop: 186, mobile: 80 },
//   { month: "February", desktop: 305, mobile: 200 },
//   { month: "March", desktop: 237, mobile: 120 },
//   { month: "April", desktop: 73, mobile: 190 },
//   { month: "May", desktop: 209, mobile: 130 },
//   { month: "June", desktop: 214, mobile: 140 },
//   { month: "June", desktop: 214, mobile: 140 },
//   { month: "June", desktop: 1, mobile: 5 },
//   { month: "June", desktop: 1, mobile: 5 },
//   { month: "June", desktop: 1, mobile: 5 },
//   { month: "June", desktop: 1, mobile: 5 },
// ]

const chartConfig = {
  
  canceled: {
    label: "Hủy",
    color: "hsl(var(--chart-1))",
  },
  completed: {
    label: "Thành công",
    color: "hsl(var(--chart-2))",
  },
}

export default function ReserVationChart({reservationStatusChart, month, year}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Biểu đồ đơn đặt bàn</CardTitle>
        <CardDescription>Tháng {month} {year}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="max-h-[350px] w-full">
          <BarChart accessibilityLayer data={reservationStatusChart}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              // tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="canceled" fill="var(--color-canceled)" radius={4} />
            <Bar dataKey="completed" fill="var(--color-completed)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

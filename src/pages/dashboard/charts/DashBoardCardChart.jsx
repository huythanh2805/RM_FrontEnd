"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

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
} from "@/components/ui/chart"
// const chartData = [
//   { day: "January", value: 134 },
//   { day: "February", value: 305 },
//   { day: "March", value: 237 },
//   { day: "April", value: 73 },
//   { day: "May", value: 209 },
//   { day: "June", value: 214 },
// ]

const chartConfig = {
  value: {
    label: "Value",
    color: "hsl(var(--chart-1))",
  },
}

export default function DashBoardCardChart({modifiedData}) {
  return (
    <div className="w-full h-full">
      <ChartContainer config={chartConfig}>
    <LineChart
      accessibilityLayer
      data={ modifiedData}
     
    >
      <Line
        dataKey="value"
        type="linear"
        stroke="var(--color-value)"
        strokeWidth={2}
        dot={false}
      />
    </LineChart>
  </ChartContainer>
    </div>
  )
}

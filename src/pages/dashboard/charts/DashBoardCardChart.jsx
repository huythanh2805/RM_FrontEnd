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
const chartData = [
  { month: "January", value: 134 },
  { month: "February", value: 305 },
  { month: "March", value: 237 },
  { month: "April", value: 73 },
  { month: "May", value: 209 },
  { month: "June", value: 214 },
]

const chartConfig = {
  value: {
    label: "Value",
    color: "hsl(var(--chart-1))",
  },
}

export default function DashBoardCardChart() {
  return (
    <div className="w-full h-full">
      <ChartContainer config={chartConfig}>
    <LineChart
      accessibilityLayer
      data={chartData}
     
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

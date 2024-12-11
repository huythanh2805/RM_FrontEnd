import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 190, fill: "var(--color-other)" },
]

const chartConfig = {
  quantity: {
    label: "Số lượng",
  },
  top_1: {
    label: "top_1",
    color: "hsl(var(--chart-1))",
  },
  top_2: {
    label: "top_2",
    color: "hsl(var(--chart-2))",
  },
  top_3: {
    label: "top_3",
    color: "hsl(var(--chart-3))",
  },
  top_4: {
    label: "top_4",
    color: "hsl(var(--chart-4))",
  },
  top_5: {
    label: "top_5",
    color: "hsl(var(--chart-5))",
  },
} 

export default function FavorFoodChart({top5Dishes, month, year}) {
  // const totalVisitors = React.useMemo(() => {
  //   return chartData.reduce((acc, curr) => acc + curr.visitors, 0)
  // }, [])
 
  const modifiedTop5Dishes = React.useMemo(()=>{
    return top5Dishes.map((item, index)=>({...item, fill: `var(--color-top_${index + 1})`,name: item.name}))
  })
  return (
    <Card className="flex flex-col ">
      <CardHeader className="items-center pb-0">
        <CardTitle>5 món ăn bán chạy</CardTitle>
        <CardDescription>Tháng {month} {year}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            {/* <ChartLegend content={<ChartLegendContent />} /> */}
            <Pie
              data={modifiedTop5Dishes}
              dataKey="quantity"
              nameKey="name"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {top5Dishes[0].quantity}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Top 1
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      
      <CardFooter className="flex-col gap-2 text-sm py-4">
        <div className="flex items-center gap-2 font-medium leading-none">
          {/* Trending up by 5.2% this month <TrendingUp className="h-4 w-4" /> */}
        </div>
        <div className="leading-none text-muted-foreground">
           5 món ăn được yêu thích nhất tháng {month} {year}
        </div>
      </CardFooter>
    </Card>
  )
}

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalendarRange, TrendingUp, Utensils } from "lucide-react";
import React from "react";
import { Cell, Label, Pie, PieChart, ResponsiveContainer } from "recharts";

const COLORS = [
  '#3B82F6', // Blue
  '#10B981', // Emerald
  '#F59E0B', // Amber
  '#6366F1', // Indigo
  '#EC4899', // Pink
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 shadow-lg rounded-lg border">
        <p className="text-sm font-medium text-gray-900">
          {payload[0].name}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Số lượng: <span className="font-semibold">{payload[0].value}</span>
        </p>
      </div>
    );
  }
  return null;
};

const CustomLegend = ({ dishes }) => {
  return (
    <div className="grid grid-cols-1 gap-2 mt-4">
      {dishes.map((dish, index) => (
        <div key={dish.name} className="flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-gray-50">
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: COLORS[index] }}
            />
            <span className="text-sm text-gray-600 truncate max-w-[150px]">
              {dish.name}
            </span>
          </div>
          <span className="text-sm font-medium text-gray-900">
            {dish.quantity}
          </span>
        </div>
      ))}
    </div>
  );
};

export default function FavorFoodChart({ top5Dishes = [], startTime, endTime }) {
  // Kiểm tra nếu mảng rỗng thì trả về 0
  const totalQuantity = React.useMemo(
    () => (top5Dishes.length > 0 ? top5Dishes.reduce((sum, dish) => sum + (dish.quantity || 0), 0) : 0),
    [top5Dishes]
  );

  // Kiểm tra trước khi truy cập vào top5Dishes[0]
  const topDish = top5Dishes[0] || { name: "Không có dữ liệu", quantity: 0 };

  return (
    <Card className="bg-white">
      <CardHeader className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Utensils className="h-4 w-4 text-blue-600" />
            </div>
            <CardTitle className="text-lg font-bold">Top 5 Món Ăn</CardTitle>
          </div>
          <div className="flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full">
            <TrendingUp className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium text-green-600">
              {totalQuantity > 0 ? Math.round((topDish.quantity / totalQuantity) * 100) : 0}%
            </span>
          </div>
        </div>
        <CardDescription className="flex items-center gap-2 text-sm text-gray-500">
          <CalendarRange className="h-4 w-4" />
          <span>{startTime} - {endTime}</span>
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-4">
        <div className="h-[240px]">
          {top5Dishes.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={top5Dishes}
                  dataKey="quantity"
                  nameKey="name"
                  innerRadius="60%"
                  outerRadius="80%"
                  paddingAngle={2}
                >
                  {top5Dishes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} className="hover:opacity-80 transition-opacity" />
                  ))}
                  <Label
                    content={({ viewBox: { cx, cy } }) => (
                      <g>
                        <text x={cx} y={cy - 10} textAnchor="middle" className="fill-gray-900 text-2xl font-bold">
                          {topDish.quantity}
                        </text>
                        <text x={cx} y={cy + 15} textAnchor="middle" className="fill-gray-500 text-sm">
                          Số lượng
                        </text>
                      </g>
                    )}
                  />
                </Pie>
                <tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500 text-center">Không có dữ liệu</p>
          )}
        </div>

        <CustomLegend dishes={top5Dishes} />
      </CardContent>

      <CardFooter className="border-t">
        <div className="flex items-center justify-between w-full pt-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Utensils className="h-4 w-4" />
            <span>Tổng số lượng: {totalQuantity}</span>
          </div>
          <div className="text-blue-600 font-medium">{topDish.name}</div>
        </div>
      </CardFooter>
    </Card>
  );
}

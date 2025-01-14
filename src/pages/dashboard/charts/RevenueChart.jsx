
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { CalendarRange, TrendingUp } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

const chartConfig = {
  colors: {
    stroke: "rgb(59, 130, 246)", // Blue-500
    fill: "rgb(59, 130, 246, 0.1)",
  },
  tooltip: {
    background: "white",
    border: "#E5E7EB",
    text: "#1F2937"
  }
};

const formatCurrency = (value) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(value);
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 shadow-lg rounded-lg border border-gray-200">
        <p className="text-sm font-medium text-gray-600 mb-1">{label}</p>
        <p className="text-sm font-bold text-blue-600">
          {formatCurrency(payload[0].value)}
        </p>
      </div>
    );
  }
  return null;
};

export default function RevenueChart({ allBillByMonth, startTime, endTime }) {
  // Tính tổng doanh thu và % tăng trưởng
  const totalRevenue = allBillByMonth.reduce((sum, item) => sum + item.total_money, 0);
  const previousPeriodRevenue = allBillByMonth.slice(0, Math.floor(allBillByMonth.length / 2))
    .reduce((sum, item) => sum + item.total_money, 0);
  const currentPeriodRevenue = allBillByMonth.slice(Math.floor(allBillByMonth.length / 2))
    .reduce((sum, item) => sum + item.total_money, 0);
  const growthRate = ((currentPeriodRevenue - previousPeriodRevenue) / previousPeriodRevenue * 100).toFixed(1);

  return (
    <Card className="bg-white">
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold text-gray-900">
              Biểu đồ doanh số
            </CardTitle>
          </div>

          {growthRate > 0 && (
            <div className="flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-600">+{growthRate}%</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between border-b pb-4">
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-500">Tổng doanh thu</p>
            <p className="text-2xl font-bold text-gray-900">
              {formatCurrency(totalRevenue)}
            </p>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: chartConfig.colors.stroke }}></div>
              <span className="text-sm text-gray-600">Doanh số</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={allBillByMonth}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={chartConfig.colors.stroke} stopOpacity={0.1} />
                <stop offset="95%" stopColor={chartConfig.colors.stroke} stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#E5E7EB"
            />

            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={12}
              tick={{ fill: '#6B7280', fontSize: 12 }}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={12}
              tick={{ fill: '#6B7280', fontSize: 12 }}
              tickFormatter={(value) => formatCurrency(value).slice(0, -2)}
            />

            <Tooltip content={<CustomTooltip />} />

            <Area
              type="monotone"
              dataKey="total_money"
              stroke={chartConfig.colors.stroke}
              strokeWidth={2}
              fill="url(#colorRevenue)"
              fillOpacity={1}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>

      <CardFooter className="border-t pt-4">
        <div className="flex w-full items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <CalendarRange className="h-4 w-4" />
            <span>Cập nhật lần cuối: {new Date().toLocaleDateString('vi-VN')}</span>
          </div>
          {growthRate > 0 ? (
            <div className="text-green-600 flex items-center gap-1">
              <TrendingUp className="h-4 w-4" />
              <span>Tăng trưởng tốt</span>
            </div>
          ) : (
            <div className="text-red-600 flex items-center gap-1">
              <TrendingUp className="h-4 w-4 rotate-180" />
              <span>Cần cải thiện</span>
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}

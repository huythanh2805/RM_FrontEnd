import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, CalendarRange, TrendingUp } from "lucide-react";
import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

const COLORS = {
  completed: "#10B981", // Emerald/Success
  canceled: "#EF4444",  // Red/Error
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 shadow-lg rounded-lg border">
        <p className="text-sm font-medium text-gray-900 mb-2">{label}</p>
        {payload.map((entry, index) => (
          <div
            key={index}
            className="flex items-center justify-between gap-4 text-sm"
          >
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-gray-600">
                {entry.name === 'completed' ? 'Thành công' : 'Đã hủy'}
              </span>
            </div>
            <span className="font-medium text-gray-900">
              {entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const NoDataDisplay = () => (
  <div className="flex flex-col items-center justify-center h-[300px] text-gray-500">
    <AlertCircle className="h-12 w-12 mb-4 text-gray-400" />
    <p className="text-lg font-medium">Không có dữ liệu</p>
    <p className="text-sm">Vui lòng thử lại với khoảng thời gian khác</p>
  </div>
);

export default function ReserVationChart({ reservationStatusChart = [], startTime, endTime }) {
  // Check for empty or invalid data
  const hasValidData = React.useMemo(() => {
    return reservationStatusChart?.length > 0 &&
      reservationStatusChart.some(item => item.completed > 0 || item.canceled > 0);
  }, [reservationStatusChart]);

  // Calculate totals and success rate
  const stats = React.useMemo(() => {
    if (!hasValidData) return { total: 0, completed: 0, canceled: 0, successRate: 0 };

    return reservationStatusChart.reduce((acc, curr) => {
      acc.completed += curr.completed || 0;
      acc.canceled += curr.canceled || 0;
      acc.total = acc.completed + acc.canceled;
      acc.successRate = Math.round((acc.completed / acc.total) * 100);
      return acc;
    }, { total: 0, completed: 0, canceled: 0, successRate: 0 });
  }, [reservationStatusChart, hasValidData]);

  return (
    <Card className="bg-white h-full">
      <CardHeader className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-xl font-bold text-gray-900">
              Biểu đồ đơn đặt bàn
            </CardTitle>
            <CardDescription className="flex items-center gap-2 text-sm">
              <CalendarRange className="h-4 w-4" />
              <span>{startTime} - {endTime}</span>
            </CardDescription>
          </div>

          {hasValidData && (
            <div className="flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-600">
                {stats.successRate}% thành công
              </span>
            </div>
          )}
        </div>

        {hasValidData && (
          <div className="grid grid-cols-3 gap-4 pt-2">
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Tổng đơn</p>
              <p className="text-lg font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Thành công</p>
              <p className="text-lg font-bold text-emerald-600">{stats.completed}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Đã hủy</p>
              <p className="text-lg font-bold text-red-600">{stats.canceled}</p>
            </div>
          </div>
        )}
      </CardHeader>

      <CardContent>
        {!hasValidData ? (
          <NoDataDisplay />
        ) : (
          <div className="h-[300px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={reservationStatusChart}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                barGap={8}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#E5E7EB"
                />
                <XAxis
                  dataKey="day"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: '#6B7280', fontSize: 12 }}
                  tickMargin={12}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: '#6B7280', fontSize: 12 }}
                  tickMargin={12}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  verticalAlign="top"
                  height={36}
                  formatter={(value) => (
                    <span className="text-sm text-gray-600">
                      {value === 'completed' ? 'Thành công' : 'Đã hủy'}
                    </span>
                  )}
                />
                <Bar
                  dataKey="completed"
                  fill={COLORS.completed}
                  radius={[4, 4, 0, 0]}
                  maxBarSize={40}
                />
                <Bar
                  dataKey="canceled"
                  fill={COLORS.canceled}
                  radius={[4, 4, 0, 0]}
                  maxBarSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>

      {hasValidData && (
        <CardFooter className="pt-20">
          <div className="flex w-full items-center justify-between pt-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <CalendarRange className="h-4 w-4" />
              <span>Cập nhật lần cuối: {new Date().toLocaleDateString('vi-VN')}</span>
            </div>
            {stats.completed > stats.canceled ? (
              <div className="text-emerald-600 font-medium">Hiệu suất tốt</div>
            ) : (
              <div className="text-red-600 font-medium">Cần cải thiện</div>
            )}
          </div>
        </CardFooter>
      )}
    </Card>
  );
}

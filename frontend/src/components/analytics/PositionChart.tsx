"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface PositionChartProps {
  data: Array<{
    position: string;
    total_hands: number;
    wins: number;
    losses: number;
    ties: number;
    win_rate: number;
  }>;
}

const COLORS = {
  early: "#EF4444", // Red
  middle: "#F59E0B", // Orange
  late: "#10B981", // Green
};

export default function PositionChart({ data }: PositionChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="h-48 sm:h-64 flex items-center justify-center text-gray-400 text-sm sm:text-base">
        No data available
      </div>
    );
  }

  return (
    <ResponsiveContainer
      width="100%"
      height={window.innerWidth < 640 ? 250 : 300}
    >
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis
          dataKey="position"
          stroke="#9CA3AF"
          tick={{ fontSize: window.innerWidth < 640 ? 10 : 12 }}
          tickFormatter={(value) =>
            value.charAt(0).toUpperCase() + value.slice(1)
          }
        />
        <YAxis
          stroke="#9CA3AF"
          tick={{ fontSize: window.innerWidth < 640 ? 10 : 12 }}
          label={{
            value: "Win Rate (%)",
            angle: -90,
            position: "insideLeft",
            fill: "#9CA3AF",
            fontSize: window.innerWidth < 640 ? 10 : 12,
          }}
          domain={[0, 100]}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "#1F2937",
            border: "1px solid #374151",
            borderRadius: "8px",
            color: "#F3F4F6",
            fontSize: window.innerWidth < 640 ? "12px" : "14px",
          }}
          formatter={(value: number) => [`${value.toFixed(2)}%`, "Win Rate"]}
          labelFormatter={(label) =>
            `${label.charAt(0).toUpperCase() + label.slice(1)} Position`
          }
        />
        <Bar dataKey="win_rate" radius={[8, 8, 0, 0]}>
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[entry.position as keyof typeof COLORS] || "#6B7280"}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

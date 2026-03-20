"use client";

import { Loader2 } from "lucide-react";

type Odds = {
  win: number;
  tie: number;
  loss: number;
};

function OddsCell({
  label,
  value,
  isCalculating,
  color,
}: {
  label: string;
  value: number | null;
  isCalculating: boolean;
  color: "green" | "blue" | "red";
}) {
  const colorMap = {
    green: {
      label: "text-emerald-400",
      value: "text-emerald-300",
      bar: "bg-emerald-500",
      bg: "bg-emerald-500/5",
      border: "border-emerald-500/10",
    },
    blue: {
      label: "text-sky-400",
      value: "text-sky-300",
      bar: "bg-sky-500",
      bg: "bg-sky-500/5",
      border: "border-sky-500/10",
    },
    red: {
      label: "text-rose-400",
      value: "text-rose-300",
      bar: "bg-rose-500",
      bg: "bg-rose-500/5",
      border: "border-rose-500/10",
    },
  };
  const c = colorMap[color];

  return (
    <div
      className={`flex flex-col items-center justify-center p-4 rounded-lg border h-full ${c.bg} ${c.border}`}
    >
      <p
        className={`text-[10px] uppercase tracking-[0.12em] font-semibold mb-2 ${c.label}`}
      >
        {label}
      </p>
      <div className={`text-2xl font-bold tabular-nums ${c.value}`}>
        {isCalculating ? (
          <Loader2 className="w-5 h-5 animate-spin opacity-50" />
        ) : (
          <span>{value !== null ? (value * 100).toFixed(1) : "0.0"}%</span>
        )}
      </div>
      {!isCalculating && value !== null && (
        <div className="w-full mt-2 h-0.5 bg-white/5 rounded-full overflow-hidden">
          <div
            className={`h-full ${c.bar} rounded-full transition-all duration-700`}
            style={{ width: `${value * 100}%` }}
          />
        </div>
      )}
    </div>
  );
}

export default function OddsDisplay({
  odds,
  isCalculating,
}: {
  odds: Odds | null;
  isCalculating: boolean;
}) {
  return (
    <div className="grid grid-cols-3 gap-2 w-full h-full">
      <OddsCell
        label="Win"
        value={odds?.win ?? null}
        isCalculating={isCalculating}
        color="green"
      />
      <OddsCell
        label="Tie"
        value={odds?.tie ?? null}
        isCalculating={isCalculating}
        color="blue"
      />
      <OddsCell
        label="Loss"
        value={odds?.loss ?? null}
        isCalculating={isCalculating}
        color="red"
      />
    </div>
  );
}

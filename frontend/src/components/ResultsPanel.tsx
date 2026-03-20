"use client";

import { Loader2 } from "lucide-react";

type Odds = {
  win: number;
  tie: number;
  loss: number;
};

interface ResultsPanelProps {
  handRank?: string;
  odds: Odds | null;
  isCalculating: boolean;
}

function StatRow({
  label,
  value,
  sub,
  accent,
  isCalculating,
  barPct,
}: {
  label: string;
  value: string;
  sub?: string;
  accent: string;
  isCalculating?: boolean;
  barPct?: number;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between">
        <p className="text-[10px] uppercase tracking-[0.14em] text-slate-500 font-semibold">
          {label}
        </p>
        {sub && <p className="text-[10px] text-slate-600">{sub}</p>}
      </div>
      <div className="relative" style={{ height: "22px" }}>
        <div className={`absolute inset-0 flex items-center transition-opacity duration-200 ${isCalculating ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
          <Loader2 className="w-[22px] h-[22px] animate-spin text-slate-600" />
        </div>
        <div className={`absolute inset-0 flex items-center transition-opacity duration-200 ${isCalculating ? "opacity-0" : "opacity-100"}`}>
          <p className="font-bold tabular-nums" style={{ color: accent, fontSize: "22px", lineHeight: "22px" }}>
            {value}
          </p>
        </div>
      </div>
      <div className="h-1 bg-[#1a1f29] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${barPct ?? 0}%`, backgroundColor: accent, opacity: isCalculating ? 0 : 0.7 }}
        />
      </div>
    </div>
  );
}

export default function ResultsPanel({ handRank, odds, isCalculating }: ResultsPanelProps) {
  return (
    <div className="flex flex-col p-5 rounded-xl bg-[#0e1117] border border-[#1e2530] flex-1 gap-5">

      {/* Hand rank */}
      <div className="space-y-2">
        <p className="text-[10px] uppercase tracking-[0.14em] text-slate-500 font-semibold">
          Hand Rank
        </p>
        <div style={{ height: "28px" }} className="flex items-center">
          {handRank ? (
            <p className="text-lg font-semibold text-white truncate">{handRank}</p>
          ) : (
            <p className="text-lg font-semibold text-slate-700">—</p>
          )}
        </div>
      </div>

      <div className="border-t border-[#1e2530]" />

      {/* Odds rows */}
      <StatRow
        label="Win"
        value={odds ? `${(odds.win * 100).toFixed(1)}%` : "—"}
        sub={odds ? `${(odds.win * 100).toFixed(2)}% exact` : undefined}
        accent="#10b981"
        isCalculating={isCalculating}
        barPct={odds ? odds.win * 100 : undefined}
      />

      <div className="border-t border-[#1e2530]" />

      <StatRow
        label="Tie"
        value={odds ? `${(odds.tie * 100).toFixed(1)}%` : "—"}
        accent="#38bdf8"
        isCalculating={isCalculating}
        barPct={odds ? odds.tie * 100 : undefined}
      />

      <div className="border-t border-[#1e2530]" />

      <StatRow
        label="Loss"
        value={odds ? `${(odds.loss * 100).toFixed(1)}%` : "—"}
        accent="#f43f5e"
        isCalculating={isCalculating}
        barPct={odds ? odds.loss * 100 : undefined}
      />
    </div>
  );
}
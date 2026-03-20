"use client";

import { TrendingUp, Target, Activity, Zap } from "lucide-react";

interface StatsCardsProps {
  stats: {
    total_hands: number;
    win_rate: number;
    wins: number;
    losses: number;
    ties: number;
    total_sessions: number;
    vpip: number;
    aggression_factor: number;
  };
}

function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  accent,
}: {
  label: string;
  value: string;
  sub: string;
  icon: React.ElementType;
  accent: string;
}) {
  return (
    <div className="relative rounded-xl bg-[#0e1117] border border-[#1e2530] p-5 overflow-hidden">
      {/* Subtle accent glow in corner */}
      <div
        className="absolute -top-6 -right-6 w-20 h-20 rounded-full opacity-10 blur-xl"
        style={{ backgroundColor: accent }}
      />
      <div className="flex items-start justify-between mb-3">
        <p className="text-[10px] uppercase tracking-[0.14em] text-slate-500 font-semibold">
          {label}
        </p>
        <div
          className="w-7 h-7 rounded-md flex items-center justify-center"
          style={{ backgroundColor: `${accent}18` }}
        >
          <Icon className="w-3.5 h-3.5" style={{ color: accent }} />
        </div>
      </div>
      <p className="text-3xl font-bold text-white tabular-nums mb-1">{value}</p>
      <p className="text-xs text-slate-500">{sub}</p>
    </div>
  );
}

export default function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      <StatCard
        label="Win Rate"
        value={`${stats.win_rate.toFixed(1)}%`}
        sub={`${stats.wins}W · ${stats.losses}L · ${stats.ties}T`}
        icon={TrendingUp}
        accent="#10b981"
      />
      <StatCard
        label="Hands Played"
        value={String(stats.total_hands)}
        sub={`${stats.total_sessions} session${stats.total_sessions !== 1 ? "s" : ""}`}
        icon={Target}
        accent="#3b82f6"
      />
      <StatCard
        label="VPIP"
        value={`${stats.vpip.toFixed(1)}%`}
        sub={stats.vpip < 20 ? "Tight" : stats.vpip < 35 ? "Balanced" : "Loose"}
        icon={Activity}
        accent="#a78bfa"
      />
      <StatCard
        label="Aggression"
        value={stats.aggression_factor.toFixed(2)}
        sub={
          stats.aggression_factor < 1
            ? "Passive"
            : stats.aggression_factor < 2
              ? "Balanced"
              : "Aggressive"
        }
        icon={Zap}
        accent="#f59e0b"
      />
    </div>
  );
}

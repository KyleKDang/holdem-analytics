"use client";

interface StyleProfileProps {
  style: {
    vpip: number;
    aggression_factor: number;
    fold_frequency: number;
    raise_frequency: number;
    tight_loose: string;
    passive_aggressive: string;
    style_rating: string;
  };
}

function MetricBar({
  label,
  value,
  display,
  color,
  max = 100,
}: {
  label: string;
  value: number;
  display: string;
  color: string;
  max?: number;
}) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-500">{label}</p>
        <p className="text-sm font-semibold text-white tabular-nums">
          {display}
        </p>
      </div>
      <div className="h-1 bg-[#1e2530] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

export default function StyleProfile({ style }: StyleProfileProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Style rating */}
      <div className="rounded-xl bg-[#080a0d] border border-[#1e2530] p-5 flex flex-col justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.14em] text-slate-500 font-semibold mb-4">
            Playing Style
          </p>
          <p className="text-3xl font-bold text-white mb-1">
            {style.style_rating}
          </p>
        </div>
        <div className="space-y-3 mt-4 pt-4 border-t border-[#1e2530]">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500">Tight / Loose</span>
            <span className="text-xs font-semibold text-[#d4af37]">
              {style.tight_loose}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500">Passive / Aggressive</span>
            <span className="text-xs font-semibold text-[#d4af37]">
              {style.passive_aggressive}
            </span>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="rounded-xl bg-[#080a0d] border border-[#1e2530] p-5 space-y-5">
        <p className="text-[10px] uppercase tracking-[0.14em] text-slate-500 font-semibold">
          Metrics
        </p>
        <MetricBar
          label="VPIP"
          value={style.vpip}
          display={`${style.vpip.toFixed(1)}%`}
          color="#a78bfa"
        />
        <MetricBar
          label="Aggression Factor"
          value={style.aggression_factor}
          display={style.aggression_factor.toFixed(2)}
          color="#f59e0b"
          max={4}
        />
        <MetricBar
          label="Fold Frequency"
          value={style.fold_frequency}
          display={`${style.fold_frequency.toFixed(1)}%`}
          color="#6b7280"
        />
        <MetricBar
          label="Raise Frequency"
          value={style.raise_frequency}
          display={`${style.raise_frequency.toFixed(1)}%`}
          color="#10b981"
        />
      </div>
    </div>
  );
}

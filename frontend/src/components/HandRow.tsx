"use client";

import Image from "next/image";

interface HandRowProps {
  hand: {
    id: number;
    hole_cards: string[];
    board_cards: string[];
    player_position: string;
    action_taken: string | null;
    result: string | null;
  };
  handNumber: number;
}

function CardDisplay({ code, size = 36 }: { code: string; size?: number }) {
  return (
    <div className="inline-flex items-center justify-center bg-white rounded shadow-sm">
      <Image
        src={`/cards/${code}.png`}
        alt={code}
        width={200}
        height={300}
        style={{ width: `${size}px`, height: "auto", display: "block" }}
        className="rounded-[2px]"
      />
    </div>
  );
}

const positionColors: Record<string, string> = {
  early: "text-violet-400 bg-violet-500/10 border-violet-500/20",
  middle: "text-sky-400 bg-sky-500/10 border-sky-500/20",
  late: "text-amber-400 bg-amber-500/10 border-amber-500/20",
};

const actionColors: Record<string, string> = {
  fold: "text-slate-400 bg-slate-500/10 border-slate-500/20",
  check: "text-sky-400 bg-sky-500/10 border-sky-500/20",
  call: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  raise: "text-orange-400 bg-orange-500/10 border-orange-500/20",
};

export default function HandRow({ hand, handNumber }: HandRowProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 px-4 py-3 rounded-lg bg-[#080a0d] border border-[#1a1f29] hover:border-[#2a3040] transition-colors group">
      <span className="text-xs font-mono text-slate-600 group-hover:text-slate-500 min-w-[28px]">
        #{handNumber}
      </span>

      <div className="flex items-center gap-3 flex-1">
        <div className="flex gap-1">
          {hand.hole_cards.map((card, i) => (
            <CardDisplay key={i} code={card} size={32} />
          ))}
        </div>

        <div className="w-px h-6 bg-[#1e2530]" />

        <div className="flex gap-1">
          {hand.board_cards.map((card, i) => (
            <CardDisplay key={i} code={card} size={28} />
          ))}
        </div>
      </div>

      <div className="flex items-center gap-1.5 flex-wrap sm:ml-auto">
        {hand.player_position && (
          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide border ${positionColors[hand.player_position] || "text-slate-400 bg-slate-500/10 border-slate-500/20"}`}>
            {hand.player_position}
          </span>
        )}
        {hand.action_taken && (
          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide border ${actionColors[hand.action_taken] || "text-slate-400 bg-slate-500/10 border-slate-500/20"}`}>
            {hand.action_taken}
          </span>
        )}
        {hand.result && (
          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide border ${
            hand.result === "win"
              ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
              : hand.result === "loss"
                ? "text-rose-400 bg-rose-500/10 border-rose-500/20"
                : "text-slate-400 bg-slate-500/10 border-slate-500/20"
          }`}>
            {hand.result}
          </span>
        )}
      </div>
    </div>
  );
}
"use client";

export default function HandRankDisplay({ handRank }: { handRank?: string }) {
  return (
    <div className="text-center py-2">
      <p className="text-[11px] uppercase tracking-[0.12em] text-slate-500 mb-1.5 font-medium">
        Hand Rank
      </p>
      {handRank ? (
        <p className="text-xl font-semibold text-white tracking-wide">
          {handRank}
        </p>
      ) : (
        <p className="text-base text-slate-600 tracking-wide">
          —
        </p>
      )}
    </div>
  );
}
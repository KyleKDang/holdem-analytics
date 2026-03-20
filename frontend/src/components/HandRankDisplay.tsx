"use client";

export default function HandRankDisplay({ handRank }: { handRank?: string }) {
  return (
    <div className="text-center" style={{ height: "32px" }}>
      {handRank ? (
        <p className="text-xl font-semibold text-white tracking-wide leading-8">
          {handRank}
        </p>
      ) : (
        <p className="text-xl text-slate-700 leading-8">—</p>
      )}
    </div>
  );
}
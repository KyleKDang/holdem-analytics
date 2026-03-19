"use client";

import HandRankDisplay from "./HandRankDisplay";
import OddsDisplay from "./OddsDisplay";

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

export default function ResultsPanel({ handRank, odds, isCalculating }: ResultsPanelProps) {
  return (
    <div className="flex flex-col gap-5 p-5 rounded-xl bg-[#0e1117] border border-[#1e2530] flex-1">
      <div>
        <p className="text-[10px] uppercase tracking-[0.14em] text-slate-500 font-semibold mb-3">
          Results
        </p>
        <HandRankDisplay handRank={handRank} />
      </div>

      <div
        className="border-t border-[#1e2530] pt-4"
      >
        <p className="text-[10px] uppercase tracking-[0.14em] text-slate-500 font-semibold mb-3">
          Odds
        </p>
        <OddsDisplay odds={odds} isCalculating={isCalculating} />
      </div>
    </div>
  );
}
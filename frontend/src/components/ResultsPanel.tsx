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

export default function ResultsPanel({
  handRank,
  odds,
  isCalculating,
}: ResultsPanelProps) {
  return (
    <div className="flex flex-col items-center justify-around flex-1 p-4 sm:p-6 border-2 border-yellow-400 rounded-2xl bg-gray-800/90 shadow-xl">
      <div className="w-full">
        <h2 className="text-xl sm:text-2xl font-bold text-yellow-400 mb-4 text-center">
          Results
        </h2>

        <HandRankDisplay handRank={handRank} />
      </div>

      <div className="w-full">
        <OddsDisplay odds={odds} isCalculating={isCalculating} />
      </div>
    </div>
  );
}

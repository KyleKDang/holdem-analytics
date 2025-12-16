"use client";

import { Loader2 } from "lucide-react";

type Odds = {
  win: number;
  tie: number;
  loss: number;
};

export default function OddsDisplay({
  odds,
  isCalculating,
}: {
  odds: Odds | null;
  isCalculating: boolean;
}) {
  return (
    <div className="grid grid-cols-3 w-full gap-2 sm:gap-4">
      <div className="flex flex-col gap-1 sm:gap-2 justify-center p-3 sm:p-4 rounded-xl bg-green-700/60 shadow text-center min-h-[100px] sm:min-h-[120px]">
        <p className="font-bold text-green-200 text-sm sm:text-base">Win</p>
        <div className="text-lg sm:text-xl md:text-2xl font-extrabold flex items-center justify-center">
          {isCalculating ? (
            <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 animate-spin" />
          ) : (
            <span>{odds ? (odds.win * 100).toFixed(2) : "0.00"}%</span>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-1 sm:gap-2 justify-center p-3 sm:p-4 rounded-xl bg-blue-700/60 shadow text-center min-h-[100px] sm:min-h-[120px]">
        <p className="font-bold text-blue-200 text-sm sm:text-base">Tie</p>
        <div className="text-lg sm:text-xl md:text-2xl font-extrabold flex items-center justify-center">
          {isCalculating ? (
            <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 animate-spin" />
          ) : (
            <span>{odds ? (odds.tie * 100).toFixed(2) : "0.00"}%</span>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-1 sm:gap-2 justify-center p-3 sm:p-4 rounded-xl bg-red-700/60 shadow text-center min-h-[100px] sm:min-h-[120px]">
        <p className="font-bold text-red-200 text-sm sm:text-base">Loss</p>
        <div className="text-lg sm:text-xl md:text-2xl font-extrabold flex items-center justify-center">
          {isCalculating ? (
            <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 animate-spin" />
          ) : (
            <span>{odds ? (odds.loss * 100).toFixed(2) : "0.00"}%</span>
          )}
        </div>
      </div>
    </div>
  );
}

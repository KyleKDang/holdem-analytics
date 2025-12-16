"use client";

export default function HandRankDisplay({ handRank }: { handRank?: string }) {
  return (
    <div className="mb-4 text-center">
      <p className="text-sm sm:text-base text-gray-400 mb-1">Hand Rank</p>
      {handRank ? (
        <p className="text-base sm:text-lg font-semibold text-white">
          {handRank}
        </p>
      ) : (
        <p className="text-base sm:text-lg font-normal text-gray-500">
          Not evaluated yet
        </p>
      )}
    </div>
  );
}

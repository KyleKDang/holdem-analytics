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

function CardDisplay({ code, size = 40 }: { code: string; size?: number }) {
  return (
    <div className="inline-flex items-center justify-center p-0.5 sm:p-1 bg-white rounded shadow">
      <Image
        src={`/cards/${code}.png`}
        alt={code}
        width={200}
        height={300}
        style={{ width: `${size}px`, height: "auto" }}
      />
    </div>
  );
}

export default function HandRow({ hand, handNumber }: HandRowProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-2 sm:p-3 bg-green-800/30 rounded hover:bg-green-700/40 transition-colors">
      {/* Hand number and cards */}
      <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
        <span className="text-gray-300 font-bold text-sm sm:text-lg min-w-[30px] sm:min-w-[40px]">
          #{handNumber}
        </span>

        <div className="flex gap-1">
          {hand.hole_cards.map((card, i) => (
            <CardDisplay
              key={i}
              code={card}
              size={window.innerWidth < 640 ? 30 : 40}
            />
          ))}
        </div>

        <div className="flex gap-1">
          {hand.board_cards.map((card, i) => (
            <CardDisplay
              key={i}
              code={card}
              size={window.innerWidth < 640 ? 30 : 40}
            />
          ))}
        </div>
      </div>

      {/* Tags */}
      <div className="flex items-center gap-2 sm:gap-3 flex-wrap sm:ml-auto">
        {hand.player_position && (
          <span className="px-2 sm:px-3 py-0.5 sm:py-1 rounded text-white text-xs sm:text-sm font-semibold bg-purple-600">
            {hand.player_position.toUpperCase()}
          </span>
        )}
        {hand.action_taken && (
          <span className="px-2 sm:px-3 py-0.5 sm:py-1 rounded text-white text-xs sm:text-sm font-semibold bg-blue-600">
            {hand.action_taken.toUpperCase()}
          </span>
        )}
        {hand.result && (
          <span
            className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded text-white text-xs sm:text-sm font-semibold ${
              hand.result === "win"
                ? "bg-green-600"
                : hand.result === "loss"
                  ? "bg-red-600"
                  : "bg-gray-600"
            }`}
          >
            {hand.result.toUpperCase()}
          </span>
        )}
      </div>
    </div>
  );
}

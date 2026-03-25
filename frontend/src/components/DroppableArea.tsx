"use client";

import { useDroppable } from "@dnd-kit/core";
import Card from "./Card";

interface DroppableAreaProps {
  id: string;
  cards: string[];
}

const SLOT_CONFIG = {
  hole:  { slots: 2, cardSize: 58 },
  board: { slots: 5, cardSize: 58 },
};

export default function DroppableArea({ id, cards }: DroppableAreaProps) {
  const { setNodeRef, isOver } = useDroppable({ id });
  const config = SLOT_CONFIG[id as keyof typeof SLOT_CONFIG] ?? { slots: 5, cardSize: 58 };

  // Pick size based on screen width — only runs client-side
  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
  const cardSize = isMobile
    ? Math.floor((window.innerWidth - 48) / config.slots) // 48px accounts for padding + gaps
    : config.cardSize;
  const slotHeight = Math.floor(cardSize * 1.55);

  return (
    <div
      ref={setNodeRef}
      className={`flex items-center gap-1 sm:gap-2 p-2 sm:p-3 rounded-lg border transition-colors duration-150 ${
        isOver
          ? "border-[#d4af37]/60 bg-[#d4af37]/5"
          : "border-[#1e2530] bg-[#080a0d]"
      }`}
      style={{ height: `${slotHeight + 28}px` }}
    >
      {Array.from({ length: config.slots }).map((_, i) => {
        const card = cards[i];
        return (
          <div
            key={i}
            className="flex items-center justify-center flex-shrink-0"
            style={{ width: `${cardSize}px`, height: `${slotHeight}px` }}
          >
            {card ? (
              <Card code={card} id={card} size={cardSize} />
            ) : (
              <div
                className="rounded border border-dashed border-[#1e2530]"
                style={{ width: `${cardSize}px`, height: `${slotHeight}px` }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
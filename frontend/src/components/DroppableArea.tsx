"use client";

import { useDroppable } from "@dnd-kit/core";
import Card from "./Card";

interface DroppableAreaProps {
  id: string;
  cards: string[];
}

const SLOT_CONFIG = {
  hole:  { slots: 2, cardSize: 58, mobileCardSize: 44 },
  board: { slots: 5, cardSize: 58, mobileCardSize: 44 },
};

export default function DroppableArea({ id, cards }: DroppableAreaProps) {
  const { setNodeRef, isOver } = useDroppable({ id });
  const config = SLOT_CONFIG[id as keyof typeof SLOT_CONFIG] ?? { slots: 5, cardSize: 58, mobileCardSize: 44 };

  return (
    <div
      ref={setNodeRef}
      className={`flex items-center gap-1 sm:gap-2 p-2 sm:p-3 rounded-lg border transition-colors duration-150 ${
        isOver
          ? "border-[#d4af37]/60 bg-[#d4af37]/5"
          : "border-[#1e2530] bg-[#080a0d]"
      }`}
      style={{ height: "118px" }}
    >
      {Array.from({ length: config.slots }).map((_, i) => {
        const card = cards[i];
        return (
          <div key={i} className="flex items-center justify-center flex-shrink-0">
            {card ? (
              <>
                <span className="sm:hidden">
                  <Card code={card} id={card} size={config.mobileCardSize} />
                </span>
                <span className="hidden sm:block">
                  <Card code={card} id={card} size={config.cardSize} />
                </span>
              </>
            ) : (
              <>
                <div
                  className="sm:hidden rounded border border-dashed border-[#1e2530]"
                  style={{ width: `${config.mobileCardSize}px`, height: "62px" }}
                />
                <div
                  className="hidden sm:block rounded border border-dashed border-[#1e2530]"
                  style={{ width: `${config.cardSize}px`, height: "90px" }}
                />
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
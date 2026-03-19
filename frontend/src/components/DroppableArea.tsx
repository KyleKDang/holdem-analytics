"use client";

import { useDroppable } from "@dnd-kit/core";
import Card from "./Card";

interface DroppableAreaProps {
  id: string;
  cards: string[];
}

export default function DroppableArea({ id, cards }: DroppableAreaProps) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-wrap sm:flex-nowrap items-center min-h-[90px] gap-2 p-3 rounded-lg border transition-all duration-200 ${
        isOver
          ? "border-[#d4af37]/60 bg-[#d4af37]/5 shadow-[inset_0_0_20px_rgba(212,175,55,0.05)]"
          : "border-[#1e2530] bg-[#080a0d]"
      }`}
    >
      {cards.map((c, i) => (
        <div key={i} className="flex-shrink-0">
          <Card code={c} id={c} size={id === "hole" ? 52 : 46} />
        </div>
      ))}
      {cards.length === 0 && (
        <span className="text-slate-600 text-sm m-auto tracking-wide select-none">
          {id === "hole" ? "Drop 2 hole cards" : "Drop up to 5 board cards"}
        </span>
      )}
    </div>
  );
}
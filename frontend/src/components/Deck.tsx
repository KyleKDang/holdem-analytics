"use client";

import { useDroppable } from "@dnd-kit/core";
import Card from "./Card";

interface DeckProps {
  deck: string[];
}

export default function Deck({ deck }: DeckProps) {
  const { setNodeRef, isOver } = useDroppable({ id: "deck" });

  return (
    <div className="relative">
      <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#0c0f14] to-transparent pointer-events-none z-10 rounded-r-lg" />
      <div
        ref={setNodeRef}
        className={`flex gap-1.5 overflow-x-auto overflow-y-hidden p-3 rounded-lg transition-all duration-200 ${
          isOver
            ? "bg-[#d4af37]/5 ring-1 ring-[#d4af37]/30"
            : "bg-[#080a0d]"
        }`}
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#2a2f3a #080a0d",
          height: "110px",
          alignItems: "center",
        }}
      >
        {deck.map((c) => (
          <div key={c} className="flex-shrink-0">
            <Card code={c} id={c} size={46} />
          </div>
        ))}
      </div>
    </div>
  );
}
"use client";

import { useDroppable } from "@dnd-kit/core";
import Card from "./Card";

interface DeckProps {
  deck: string[];
}

export default function Deck({ deck }: DeckProps) {
  const { setNodeRef } = useDroppable({ id: "deck" });

  return (
    <div
      ref={setNodeRef}
      className="flex gap-1.5 sm:gap-2 h-[120px] sm:h-auto overflow-x-auto overflow-y-hidden p-2 sm:p-4 border rounded bg-gray-900"
      style={{
        scrollbarWidth: 'auto',
        scrollbarColor: '#9CA3AF #1F2937',
      }}
    >
      {deck.map((c) => (
        <div key={c} className="flex-shrink-0">
          <Card code={c} id={c} size={50} />
        </div>
      ))}
    </div>
  );
}

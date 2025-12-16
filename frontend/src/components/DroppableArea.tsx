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
      className={`flex flex-wrap sm:flex-nowrap items-center min-h-[100px] sm:min-h-[120px] gap-1.5 sm:gap-2 p-2 border-2 border-dashed rounded transition-colors ${
        isOver ? "border-yellow-400 bg-gray-700" : "border-gray-600 bg-gray-800"
      }`}
    >
      {cards.map((c, i) => (
        <div key={i} className="flex-shrink-0">
          <Card code={c} id={c} size={id === "hole" ? 55 : 50} />
        </div>
      ))}
      {cards.length === 0 && (
        <span className="text-gray-400 text-sm sm:text-base m-auto">
          Drop cards here
        </span>
      )}
    </div>
  );
}

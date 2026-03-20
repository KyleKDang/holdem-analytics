"use client";

import Image from "next/image";
import { useDraggable } from "@dnd-kit/core";

interface CardProps {
  code: string;
  size?: number;
  id: string;
}

export default function Card({ code, size = 60, id }: CardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    opacity: isDragging ? 0.3 : 1,
    touchAction: "none" as const,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="inline-flex items-center justify-center rounded-[4px] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.4)] cursor-grab active:cursor-grabbing touch-none hover:shadow-[0_4px_16px_rgba(212,175,55,0.3)] transition-shadow duration-150"
    >
      <Image
        src={`/cards/${code}.png`}
        alt={code}
        width={200}
        height={300}
        style={{
          width: `${size}px`,
          height: "auto",
          maxHeight: `${size * 1.5}px`,
          display: "block",
        }}
        className="pointer-events-none select-none object-contain rounded-[3px]"
        draggable={false}
      />
    </div>
  );
}

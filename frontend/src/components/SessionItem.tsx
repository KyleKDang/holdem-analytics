"use client";

import { useState, useEffect, useCallback } from "react";
import { Trash2, ChevronDown, ChevronRight, Hash } from "lucide-react";
import api from "@/services/api";
import HandRow from "./HandRow";

interface Session {
  id: number;
  user_id: number;
  start_time: string;
  end_time: string | null;
  notes: string | null;
  hand_count: number;
}

interface Hand {
  id: number;
  session_id: number;
  hole_cards: string[];
  board_cards: string[];
  player_position: string;
  action_taken: string | null;
  result: string | null;
  created_at: string;
}

interface SessionItemProps {
  session: Session;
  onDelete: (id: number) => void;
}

export default function SessionItem({ session, onDelete }: SessionItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hands, setHands] = useState<Hand[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchHands = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get(`/sessions/${session.id}/hands`);
      setHands(response.data);
    } catch (err) {
      console.error("Error fetching hands:", err);
    } finally {
      setLoading(false);
    }
  }, [session.id]);

  useEffect(() => {
    if (isOpen && hands.length === 0) fetchHands();
  }, [isOpen, hands.length, fetchHands]);

  return (
    <div className={`rounded-xl border transition-all duration-200 overflow-hidden ${
      isOpen ? "border-[#2a3040] bg-[#0c0f14]" : "border-[#1a1f29] bg-[#0e1117] hover:border-[#2a3040]"
    }`}>
      <div
        className="flex items-center gap-3 px-5 py-4 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <button className="text-slate-500 hover:text-slate-300 transition-colors flex-shrink-0">
          {isOpen
            ? <ChevronDown className="w-4 h-4" />
            : <ChevronRight className="w-4 h-4" />
          }
        </button>

        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-white truncate">
            {session.notes || "Unnamed Session"}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            {new Date(session.start_time).toLocaleDateString("en-US", {
              month: "short", day: "numeric", year: "numeric"
            })}
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-slate-500 mr-3">
          <Hash className="w-3 h-3" />
          <span>{session.hand_count} hands</span>
        </div>

        <button
          onClick={(e) => { e.stopPropagation(); onDelete(session.id); }}
          className="p-1.5 text-slate-600 hover:text-rose-400 hover:bg-rose-500/10 rounded-md transition-colors flex-shrink-0"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {isOpen && (
        <div
          className="px-5 pb-5 pt-1"
          style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
        >
          {loading ? (
            <p className="text-slate-500 text-center py-6 text-sm">Loading hands...</p>
          ) : hands.length === 0 ? (
            <p className="text-slate-600 text-center py-6 text-sm">No hands logged in this session</p>
          ) : (
            <div className="space-y-1.5 mt-3">
              {hands.map((hand, index) => (
                <HandRow key={hand.id} hand={hand} handNumber={index + 1} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
"use client";

import { useState, useEffect } from "react";
import { Save, X } from "lucide-react";
import api from "@/services/api";

interface HandLoggerModalProps {
  isOpen: boolean;
  onClose: () => void;
  holeCards: string[];
  boardCards: string[];
}

interface Session {
  id: number;
  notes: string | null;
  start_time: string;
  hand_count: number;
}

const POSITIONS = ["early", "middle", "late"];
const ACTIONS = ["fold", "check", "call", "raise"];
const RESULTS = ["win", "tie", "loss"];

export default function HandLoggerModal({
  isOpen,
  onClose,
  holeCards,
  boardCards,
}: HandLoggerModalProps) {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [selectedSession, setSelectedSession] = useState("");
  const [position, setPosition] = useState("middle");
  const [action, setAction] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const resetForm = () => {
    setPosition("middle");
    setAction(null);
    setResult(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  useEffect(() => {
    if (!isOpen) return;
    const fetchSessions = async () => {
      try {
        const response = await api.get("/sessions");
        setSessions(response.data);
        if (response.data.length > 0 && !selectedSession) {
          setSelectedSession(response.data[0].id.toString());
        }
      } catch (err) {
        console.error("Error fetching sessions:", err);
      }
    };
    fetchSessions();
  }, [isOpen, selectedSession]);

  const handleSave = async () => {
    if (!selectedSession) { alert("Please select a session"); return; }
    if (holeCards.length !== 2) { alert("Please select exactly 2 hole cards"); return; }
    if (boardCards.length < 3 || boardCards.length > 5) { alert("Board must have 3-5 cards"); return; }
    setIsLoading(true);
    try {
      await api.post("/hands", {
        session_id: parseInt(selectedSession),
        hole_cards: holeCards,
        board_cards: boardCards,
        player_position: position,
        action_taken: action,
        result: result,
      });
      handleClose();
    } catch (error) {
      console.error("Error saving hand:", error);
      let errorMessage = "Unknown error";
      if (error instanceof Error) errorMessage = error.message;
      if (typeof error === "object" && error !== null && "response" in error) {
        const axiosError = error as { response?: { data?: { detail?: string } } };
        const apiError = axiosError.response?.data?.detail;
        if (apiError) errorMessage = apiError;
      }
      alert("Error saving hand: " + errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={handleClose}
    >
      <div
        className="bg-[#0e1117] border border-[#1e2530] rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-[0_24px_80px_rgba(0,0,0,0.6)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#1e2530]">
          <div>
            <h2 className="text-base font-semibold text-white">Log Hand</h2>
            <p className="text-xs text-slate-500 mt-0.5">Save this hand to your session</p>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 text-slate-500 hover:text-white hover:bg-white/5 rounded-md transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-6 py-5 space-y-6">
          {/* Session */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.1em] text-slate-400 mb-2">
              Session
            </label>
            {sessions.length === 0 ? (
              <p className="text-slate-500 text-sm py-2">
                No sessions found. Create one in the Sessions page first.
              </p>
            ) : (
              <select
                value={selectedSession}
                onChange={(e) => setSelectedSession(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg bg-[#080a0d] border border-[#1e2530] text-white text-sm focus:ring-1 focus:ring-[#d4af37]/40 focus:border-[#d4af37]/40 outline-none transition-colors"
              >
                {sessions.map((session) => (
                  <option key={session.id} value={session.id}>
                    {session.notes || "Unnamed Session"} — {new Date(session.start_time).toLocaleDateString()}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Position */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.1em] text-slate-400 mb-2">
              Position
            </label>
            <div className="grid grid-cols-3 gap-2">
              {POSITIONS.map((pos) => (
                <button
                  key={pos}
                  onClick={() => setPosition(pos)}
                  className={`py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                    position === pos
                      ? "bg-[#d4af37] text-[#0c0f14] shadow-[0_0_16px_rgba(212,175,55,0.2)]"
                      : "bg-[#080a0d] border border-[#1e2530] text-slate-400 hover:text-white hover:border-slate-600"
                  }`}
                >
                  {pos.charAt(0).toUpperCase() + pos.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Action */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.1em] text-slate-400 mb-2">
              Action
            </label>
            <div className="grid grid-cols-4 gap-2">
              {ACTIONS.map((a) => (
                <button
                  key={a}
                  onClick={() => setAction(action === a ? null : a)}
                  className={`py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                    action === a
                      ? "bg-[#d4af37] text-[#0c0f14] shadow-[0_0_16px_rgba(212,175,55,0.2)]"
                      : "bg-[#080a0d] border border-[#1e2530] text-slate-400 hover:text-white hover:border-slate-600"
                  }`}
                >
                  {a.charAt(0).toUpperCase() + a.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Result */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.1em] text-slate-400 mb-2">
              Result
            </label>
            <div className="grid grid-cols-3 gap-2">
              {RESULTS.map((r) => (
                <button
                  key={r}
                  onClick={() => setResult(result === r ? null : r)}
                  className={`py-2 rounded-lg text-sm font-medium transition-all duration-150 border ${
                    result === r
                      ? r === "win"
                        ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300"
                        : r === "loss"
                          ? "bg-rose-500/20 border-rose-500/40 text-rose-300"
                          : "bg-sky-500/20 border-sky-500/40 text-sky-300"
                      : r === "win"
                        ? "bg-emerald-500/5 border-emerald-500/10 text-slate-500 hover:text-emerald-400 hover:border-emerald-500/20"
                        : r === "loss"
                          ? "bg-rose-500/5 border-rose-500/10 text-slate-500 hover:text-rose-400 hover:border-rose-500/20"
                          : "bg-sky-500/5 border-sky-500/10 text-slate-500 hover:text-sky-400 hover:border-sky-500/20"
                  }`}
                >
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="rounded-lg bg-[#080a0d] border border-[#1e2530] p-4">
            <p className="text-[10px] uppercase tracking-[0.1em] text-slate-500 font-semibold mb-2">Summary</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
              <p className="text-xs text-slate-500">Hole: <span className="text-slate-300">{holeCards.join(", ") || "—"}</span></p>
              <p className="text-xs text-slate-500">Board: <span className="text-slate-300">{boardCards.join(", ") || "—"}</span></p>
              <p className="text-xs text-slate-500">Position: <span className="text-slate-300">{position}</span></p>
              <p className="text-xs text-slate-500">Action: <span className="text-slate-300">{action || "—"}</span></p>
              <p className="text-xs text-slate-500">Result: <span className="text-slate-300">{result || "—"}</span></p>
            </div>
          </div>

          {/* Save */}
          <button
            onClick={handleSave}
            disabled={isLoading || sessions.length === 0}
            className="w-full py-3 bg-[#d4af37] text-[#0c0f14] font-semibold rounded-lg hover:bg-[#e8c547] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all duration-150 shadow-[0_0_24px_rgba(212,175,55,0.15)]"
          >
            <Save className="w-4 h-4" />
            {isLoading ? "Saving..." : "Save Hand"}
          </button>
        </div>
      </div>
    </div>
  );
}
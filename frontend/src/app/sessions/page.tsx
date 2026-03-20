"use client";

import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import api from "@/services/api";
import SessionItem from "@/components/SessionItem";

interface Session {
  id: number;
  user_id: number;
  start_time: string;
  end_time: string | null;
  notes: string | null;
  hand_count: number;
}

export default function SessionsPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const response = await api.get("/sessions");
      setSessions(response.data);
    } catch (err) {
      console.error("Error fetching sessions:", err);
    } finally {
      setLoading(false);
    }
  };

  const createSession = async () => {
    try {
      const response = await api.post("/sessions", {
        notes: notes.trim() || null,
      });
      setSessions([response.data, ...sessions]);
      setNotes("");
    } catch (err) {
      console.error("Error creating session:", err);
      alert("Failed to create session");
    }
  };

  const deleteSession = async (id: number) => {
    if (confirm("Delete this session? This will also delete all hands.")) {
      try {
        await api.delete(`/sessions/${id}`);
        setSessions(sessions.filter((s) => s.id !== id));
      } catch (err) {
        console.error("Error deleting session:", err);
        alert("Failed to delete session");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-65px)] bg-[#080a0d] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-6 h-6 border-2 border-[#d4af37]/30 border-t-[#d4af37] rounded-full animate-spin" />
          <p className="text-slate-500 text-sm">Loading sessions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-65px)] p-4 sm:p-8 bg-[#080a0d]">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-xl font-bold text-white mb-1">Sessions</h1>
          <p className="text-sm text-slate-500">
            {sessions.length > 0
              ? `${sessions.length} session${sessions.length !== 1 ? "s" : ""} — ${sessions.reduce((sum, s) => sum + s.hand_count, 0)} total hands`
              : "Create a session to start logging hands"}
          </p>
        </div>

        {/* Create session */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Session name (optional)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && createSession()}
            className="flex-1 px-4 py-2.5 rounded-lg bg-[#0e1117] border border-[#1e2530] text-white text-sm placeholder:text-slate-600 focus:ring-1 focus:ring-[#d4af37]/40 focus:border-[#d4af37]/40 outline-none transition-colors"
          />
          <button
            onClick={createSession}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#d4af37] text-[#0c0f14] font-semibold text-sm rounded-lg hover:bg-[#e8c547] transition-all duration-150 shadow-[0_0_20px_rgba(212,175,55,0.15)]"
          >
            <Plus className="w-4 h-4" />
            New Session
          </button>
        </div>

        {/* Sessions list */}
        {sessions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-12 h-12 rounded-xl bg-[#0e1117] border border-[#1e2530] flex items-center justify-center mb-4">
              <Plus className="w-5 h-5 text-slate-600" />
            </div>
            <p className="text-slate-400 font-medium mb-1">No sessions yet</p>
            <p className="text-slate-600 text-sm">
              Create your first session to start logging hands
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {sessions.map((session) => (
              <SessionItem
                key={session.id}
                session={session}
                onDelete={deleteSession}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
